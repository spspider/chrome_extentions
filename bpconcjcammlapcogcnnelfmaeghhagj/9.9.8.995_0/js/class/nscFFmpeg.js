(() => {
    if (window.nscFFmpeg) {
        return
    }

    class nscFFmpegConvert {
        patch = `${PATCH}${localStorage.videoName}.${localStorage.videoFormat}`
        name = localStorage.videoName
        nameConvert = `video-convert-${Date.now()}`
        format = localStorage.videoFormat
        formatConvert = localStorage.videoFormat
        ffmpeg = null
        duration = 0
        width = 0
        height = 0
        blob = null
        size = 0
        isCropDuration = false
        failed = false
        isInit = false

        video_resolution = [
            { width: 320, height: 180 },
            { width: 640, height: 360 },
            { width: 960, height: 540 },
            { width: 1280, height: 720 },
            { width: 1600, height: 900 },
            { width: 1920, height: 1080 },
            { width: 2048, height: 1152 },
            { width: 2560, height: 1440 },
            { width: 3200, height: 1800 },
            { width: 3840, height: 2160 }
        ]

        frame_rate = {
            1: 5,
            2: 10,
            3: 15,
            4: 20,
            5: 25
        }

        init = async () => {
            console.log(localStorage.videoName, localStorage.videoFormat, nscFFmpeg.patch)

            await nscExt.checkUrlFile()

            const { createFFmpeg } = FFmpeg

            if (this.ffmpeg === null) {
                this.ffmpeg = createFFmpeg({
                    corePath: 'js/ffmpeg/ffmpeg-core.js',
                    // corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
                    // log: true,
                })
            }

            if (!this.ffmpeg.isLoaded()) {
                await this.ffmpeg.load()

                this.ffmpeg.setLogger(({ type, message }) => {
                    // console.log(type, message)

                    if (/Conversion failed/.test(message)) {
                        this.failed = true
                    }

                    if (message.match(/,\s(\d+)x(\d+)/)) {
                        const [, width, height] = message.match(/,\s(\d+)x(\d+)/)
                        this.width = width
                        this.height = height
                    }

                    // if(message.match(/Duration:\s([^:]+):([^:]+):([^,]+)/)) {
                    //     const [, house, min, second] = message.match(/Duration:\s([^:]+):([^:]+):([^,]+)/)
                    //     this.duration = +house * 3600 + +min * 60 + +second;
                    // }

                    if (message.match(/time=([^:]+):([^:]+):([^\s]+)/) && this.isCropDuration) {
                        const [, house, min, second] = message.match(/time=([^:]+):([^:]+):([^\s]+)/)
                        this.duration = +house * 3600 + +min * 60 + +second
                    }
                })

                this.ffmpeg.setProgress(({ time, duration, ratio }) => {
                    // console.log(time, duration, ratio)

                    if (duration) {
                        this.duration = duration
                    }

                    const text = ratio > 0 && !duration
                        ? chrome.i18n.getMessage('labelPreviewLoadingVideo').replace('-', Math.floor(ratio * 100) + '%')
                        : chrome.i18n.getMessage('labelPreviewLoading')

                    if (!this.isCropDuration) {
                        $('#nsc_video_loading').find('[data-i18n]').text(text)
                        $('#nsc_preview_loading').find('[data-i18n]').text(text)
                    }

                })
            }

            if(!this.isInit) {
                // if (nscExt.getOption('isSeekableVideo')) {
                //     await this.info()
                // } else {
                    await this.encoding()
                // }
            }

            this.isInit = true
        }

        saveNewFile = async (blob, name) => {
            try {
                const removeEntry = await nscVideo.getFile(name, {})
                await nscVideo.removeFile(removeEntry)
            } catch (e) {
                Logger.log(e)
            }
            try {
                const entryWrite = await nscVideo.getFile(name, { create: true })
                await nscVideo.writeFile(entryWrite, blob)
            } catch (e) {
                Logger.log(e)
            }

            Logger.log(`Create video ${name} completed, size ${nscExt.formatBytes(blob.size)}`)
            this.saveNewInfo(blob, name)
        }

        saveNewInfo = (blob, name) => {
            this.blob = blob;
            this.size = Math.floor(blob.size);
            this.patch = `${PATCH}${name}`;
            this.name = this.nameConvert;
            this.format = this.formatConvert;
            this.nameConvert = `video-convert-${Date.now()}`;

            localStorage.videoFormat = this.format;
            localStorage.videoName = this.name;
            localStorage.videoSize = blob.size;
        }

        fetchFile = async () => {
            const blob = await nscExt.urlToArrayBuffer(this.patch)
            this.ffmpeg.FS('writeFile', `${this.name}.${this.format}`, blob)
        }

        readFile = async () => {
            let name = `${this.nameConvert}.${this.formatConvert}`

            if(this.failed) {
                this.failed = false
                name = `${this.name}.${this.format}`
                nscPopup.addToQueue('#nsc_popup_video_error_convert')
            }

            const data = this.ffmpeg.FS('readFile', name)
            const blob = new Blob([data.buffer], { type: `video/${this.formatConvert}` })
            this.ffmpeg.FS('unlink', `${this.name}.${this.format}`)

            if(name !== `${this.name}.${this.format}`) {
                this.ffmpeg.FS('unlink', name)
            }

            // this.ffmpeg.exit()
            // this.ffmpeg = null

            await this.saveNewFile(blob, name)
        }

        info = async () => {
            await this.fetchFile()
            Logger.info('FFmpeg info')

            await this.ffmpeg.run('-i', `${this.name}.${this.format}`, '-strict', '2')

            this.nameConvert = this.name
            this.formatConvert = this.format

            await this.readFile()
        }

        encoding = async () => {
            await this.fetchFile()
            Logger.info('FFmpeg encoding')

            await this.ffmpeg.run(
                '-fflags', '+genpts',
                '-i', `${this.name}.${this.format}`,
                '-c:a', 'copy', '-c:v', 'copy', '-cpu-used', '7', '-threads', '7', '-preset', 'veryfast',
                `${this.nameConvert}.${this.formatConvert}`
            )

            await this.readFile()
        }

        trim = async (ss = 1, to = 2, name) => {
            await this.fetchFile()
            Logger.info('FFmpeg trimming')

            if (!name) {
                name = `${this.nameConvert}.${this.formatConvert}`
            }

            await this.ffmpeg.run(
                '-i', `${this.name}.${this.format}`, '-ss', `${ss}`,
                '-c:a', 'copy', '-c:v', 'copy', '-cpu-used', '7', '-threads', '7', '-preset', 'veryfast',
                '-to', `${to}`, `${name}`
            )
        }

        concat = async (names) => {
            Logger.info('FFmpeg concat')

            names = names.map(name => `file ${name}`)

            this.ffmpeg.FS('writeFile', 'concat_list.txt', names.join('\n'))
            await this.ffmpeg.run(
                '-f', 'concat', '-safe', '0', '-i', 'concat_list.txt',
                '-c:a', 'copy', '-c:v', 'copy', '-cpu-used', '7', '-threads', '7', '-preset', 'veryfast',
                `${this.nameConvert}.${this.formatConvert}`
            )
            await this.readFile()
        }

        crop = async (position) => {
            await this.fetchFile()
            Logger.info('FFmpeg crop')

            if(this.format === 'webm') {
                await this.ffmpeg.run(
                    '-i', `${this.name}.${this.format}`,
                    '-filter:v', `crop=${Math.floor(position.w)}:${Math.floor(position.h)}:${Math.floor(position.x)}:${Math.floor(position.y)}`,
                    '-c:a', 'copy',
                    '-c:v', 'libvpx',
                    '-lossless', '1',
                    '-quality', 'good',
                    '-level', '3.0',
                    '-qmin', '0',
                    '-qmax', '50',
                    '-b:v', '1M',
                    '-cpu-used', '7',
                    '-threads', '7',
                    '-preset', 'ultrafast',
                    `${this.nameConvert}.${this.formatConvert}`
                    )
            } else {
                await this.ffmpeg.run(
                    '-i', `${this.name}.${this.format}`,
                    '-filter:v', `crop=${Math.floor(position.w)}:${Math.floor(position.h)}:${Math.floor(position.x)}:${Math.floor(position.y)}`,
                    '-c:a', 'copy',
                    '-c:v', 'libx264',
                    '-fflags', '+genpts',
                    '-r', '25',
                    '-crf', '28',
                    '-maxrate', '2M',
                    '-bufsize', '4M',
                    '-threads', '7',
                    '-preset', 'ultrafast',
                    '-profile:v', 'baseline',
                    '-tune', 'fastdecode',
                    '-level', '4.0',
                    '-c:a', 'aac',
                    '-b:a', '48k',
                    `${this.nameConvert}.${this.formatConvert}`
                )
            }

            await this.readFile()
        }

        blur = async (name, ss = 0, to = 0) => {
            await this.fetchFile()
            Logger.info('FFmpeg blur')

            await this.ffmpeg.run('-i', name, '-ss', ss, '-to', to, 'output.mp4')
            await this.readFile()
        }

        toGif = async (size, frame_rate, is_size) => {
            await this.fetchFile()
            Logger.info('FFmpeg convert gif')

            const resolution = this.video_resolution[size - 1]
            this.formatConvert = 'gif'

            await this.ffmpeg.run(
                '-i', `${this.name}.${this.format}`,
                '-filter_complex', `fps=${frame_rate},${is_size ? `scale=${resolution.width}:-2,` : ``}setsar=1,palettegen`,
                'palette.png'
            )

            await this.ffmpeg.run(
                '-i', `${this.name}.${this.format}`,
                '-i', 'palette.png',
                '-filter_complex', `[0]fps=${frame_rate},${is_size ? `scale=${resolution.width}:-2,` : ``}setsar=1[x];[x][1:v]paletteuse`,
                `${this.nameConvert}.${this.formatConvert}`
            )

            await this.readFile()
        }

        toWebm = async (size, is_size) => {
            await this.fetchFile()
            Logger.info('FFmpeg convert webm')

            const resolution = this.video_resolution[size - 1]
            this.formatConvert = 'webm'

            await this.ffmpeg.run(
                '-i',
                `${this.name}.${this.format}`,
                `${is_size ? '-filter:v' : ''}`,
                `${is_size ? `scale=${resolution.width}:-2` : ''}`,
                '-c:v', 'libvpx',
                '-fflags', '+genpts',
                '-c:a', 'libvorbis',
                '-cpu-used', '7',
                '-threads', '7',
                '-preset', 'ultrafast',
                `${this.nameConvert}.${this.formatConvert}`
            )
            await this.readFile()
        }

        toMp4 = async (size, is_size) => {
            await this.fetchFile()
            Logger.info('FFmpeg convert mp4')

            const resolution = this.video_resolution[size - 1]
            this.formatConvert = 'mp4'

            await this.ffmpeg.run(
                '-i',
                `${this.name}.${this.format}`,
                `${is_size ? '-filter:v' : ''}`,
                `${is_size ? `scale=${resolution.width}:-2` : ''}`,
                '-c:a', 'copy',
                '-c:v', 'libx264',
                '-fflags', '+genpts',
                '-r', '25',
                '-crf', '28',
                '-maxrate', '2M',
                '-bufsize', '4M',
                '-threads', '7',
                '-preset', 'ultrafast',
                '-profile:v', 'baseline',
                '-tune', 'fastdecode',
                '-level', '4.0',
                '-c:a', 'libopus',
                '-b:a', '48k',
                `${this.nameConvert}.${this.formatConvert}`
            )
            await this.readFile()
        }
    }

    window.nscFFmpeg = new nscFFmpegConvert()
})()

