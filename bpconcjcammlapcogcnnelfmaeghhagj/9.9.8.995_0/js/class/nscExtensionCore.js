(() => {
    if (window.nscExt) {
        return
    }

    class nscExtensionCore {
        constructor (options) {
            const default_options = { log: false }
            options = Object.assign({}, default_options, options)

            this.trialVideoDuration = 60 * 1000 * 5
            this.trialTime = 7 * 24 * 3600 * 1000
            this.log = options.log
        }

        get imgFormat () {
            return localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png'
        }

        get imageQuality () {
            return +localStorage.imageQuality
        }

        get pageInfo () {
            return JSON.parse(localStorage.pageInfo || '{}')
        }

        initI18n () {
            $('*[data-i18n]').each(function () {
                const text = $(this).data('i18n')
                const attr = $(this).data('i18nAttr')
                const message = chrome.i18n.getMessage(text)

                if (attr && message) {
                    $(this).attr(attr, message)
                } else if (message) {
                    $(this).html(message)
                } else if (attr) {
                    $(this).attr(attr, text)
                }
            })

            $('[data-i18n-attr="title"]').tooltip({
                position: { my: 'center top+10', at: 'center bottom' },
            }).on('click', function () {
                $(this).blur()
                $('.ui-tooltip').fadeOut('fast', function () {
                    $('.ui-tooltip').remove()
                })
            })
        };

        formatBytes (bytes, decimals) {
            if (bytes === 0) return '0 Bytes'

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            const i = Math.floor(Math.log(bytes) / Math.log(k))

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        };

        async openPage (url) {
            await nscCore.sendMessage({ operation: 'open_page', 'url': url })
        }

        async checkUrlFile () {
            return new Promise(async (resolve) => {
                while (true) {
                    try {
                        await nscCore.setTimeout(500)

                        nscFFmpeg.patch = `${PATCH}${localStorage.videoName}.${localStorage.videoFormat}`;
                        nscFFmpeg.name = localStorage.videoName
                        nscFFmpeg.format = localStorage.videoFormat

                        const blob = await this.urlToBlob(nscFFmpeg.patch)

                        if(+blob.size === 0 || +blob.size !== +localStorage.videoSize) {
                            throw 'The file is not completely created.';
                        }

                        resolve(blob)
                        break;
                    } catch (e) {
                        Logger.warning(e)
                    }
                }
            })
        }

        /** @description Onload file and convert to blob.
         * @param {string} url to file.
         * @return {Blob} Blob
         */

        async urlToBlob (url) {
            return new Promise(async (resolve, reject) => {
                try {
                    const buffer = await this.urlToArrayBuffer(url)
                    const blob = new Blob([buffer])
                    resolve(blob)
                } catch (e) {
                    reject('urlToBlob status != 200')
                }
            })
        };

        /** @description Onload file and convert to blob.
         * @param {string} url to file.
         * @return {Blob} Blob
         */

        async urlToArrayBuffer (url) {
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest()
                xhr.open('GET', url, true)
                xhr.responseType = 'arraybuffer'
                xhr.onload = function () {
                    if (this.status === 200) {
                        resolve(new Uint8Array(this.response))
                    } else {
                        reject('arrayBuffer status != 200')
                    }
                }
                xhr.onerror = reject
                xhr.send()
            })
        };

        async blobToDataUrl (blob) {
            return new Promise(function (resolve, reject) {
                const a = new FileReader()
                a.onload = function (e) {
                    resolve(e.target.result)
                }
                a.readAsDataURL(blob)
            })
        };

        /** @description onLoad image.
         * @param {string} url image.
         * @return {HTMLImageElement} image element
         */

        async imageLoad (url) {
            return new Promise(function (resolve, reject) {
                const image = new Image()
                image.onload = function () {
                    resolve(image)
                }
                image.onerror = function (e) {
                    Logger.error(`Error load image ${url}`)
                    reject(e)
                }
                image.src = url
            })
        };

        async checkWaterMark () {
            return new Promise(function (resolve, reject) {
                if (localStorage.watermarkEnable !== 'false') {
                    if (localStorage.watermarkType === 'image') {
                        if (localStorage.watermarkFile === '') return reject('Watermark file empty')
                        let watermark = new Image()
                        watermark.onload = resolve
                        watermark.onerror = reject
                        watermark.src = localStorage.watermarkFile
                    } else {
                        resolve()
                    }
                } else reject('Watermark not activate')
            })
        };

        /** @description get watermark image.
         * @return {HTMLCanvasElement} canvas element
         */

        async getWaterMark (video) {
            const _self = this
            return new Promise(async function (resolve, reject) {
                const c = document.createElement('canvas')
                const ctx = c.getContext('2d')

                if (localStorage.watermarkType === 'image') {
                    let watermark = new Image()
                    watermark.onload = function () {
                        const percent = localStorage.watermarkPercent
                        const width = watermark.width * percent
                        const height = watermark.height * percent
                        c.width = width
                        c.height = height

                        ctx.globalAlpha = +localStorage.watermarkAlpha
                        ctx.drawImage(watermark, 0, 0, width, height)
                        resolve(c)
                    }
                    watermark.onerror = reject
                    watermark.src = localStorage.watermarkFile
                } else {
                    const fontCss = 'bold ' + localStorage.watermarkSize + 'px ' + localStorage.watermarkFont

                    const fontSize = _self.sizeFont({
                        text: localStorage.watermarkText,
                        fontCss,
                    })

                    await _self.checkFontLoad(fontCss)
                    c.width = fontSize.w
                    c.height = fontSize.h
                    ctx.textBaseline = 'top'
                    ctx.textAlign = 'left'
                    ctx.globalAlpha = +localStorage.watermarkAlpha
                    if (video) {
                        ctx.fillStyle = inversion(localStorage.watermarkColor)
                        ctx.fillRect(0, 0, fontSize.w, fontSize.h)
                    }
                    ctx.fillStyle = localStorage.watermarkColor
                    ctx.font = fontCss
                    ctx.fillText(localStorage.watermarkText, 0, 0, fontSize.w)
                    resolve(c)
                }
            })
        };

        getWaterMarkPosition (watermark, canvas) {
            let x, y, shift = 10
            switch (localStorage.watermarkPosition) {
                case 'lt':
                    x = shift
                    y = shift
                    break
                case 'rt':
                    x = canvas.width - watermark.width - shift
                    y = shift
                    break
                case 'lb':
                    x = shift
                    y = canvas.height - watermark.height - shift
                    break
                case 'rb':
                    x = canvas.width - watermark.width - shift
                    y = canvas.height - watermark.height - shift
                    break
                case 'c':
                    x = Math.floor((canvas.width - watermark.width) / 2)
                    y = Math.floor((canvas.height - watermark.height) / 2)
                    break
            }
            return { x, y }
        };

        async checkFontLoad (param) {
            return new Promise(function (resolve) {
                function isCheck () {
                    const check = document.fonts.check(param)
                    if (!check) {
                        setTimeout(isCheck, 10)
                    } else {
                        resolve()
                    }
                }

                isCheck()
            })
        };

        async createCanvasParts ({ info, format }, parts) {
            console.log(info, format, parts)

            const _self = this

            return new Promise(async (resolve, reject) => {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                canvas.width = Math.ceil(info.w * info.z)
                canvas.height = Math.ceil(info.h * info.z)

                for (let index = 0; index < info.parts.length; index++) {
                    const part = info.parts[index]
                    try {
                        const image = await _self.imageLoad(parts[index])

                        if (part.x2 !== undefined && part.y2 !== undefined && part.w2 !== undefined && part.h2 !== undefined) {
                            if (index === info.parts.length - 1 && part.y2 + part.h2 > info.h) { // конец страницы, не доскролл
                                part.y2 = info.h - part.h2
                            }
                            ctx.drawImage(image, part.x * info.z, part.y * info.z, part.w * info.z, part.h * info.z, part.x2 * info.z, part.y2 * info.z, part.w2 * info.z, part.h2 * info.z)
                        } else {
                            ctx.drawImage(image, -part.x * info.z, -part.y * info.z, image.width, image.height)
                        }
                        if (index === info.parts.length - 1) {
                            const dataURL = canvas.toDataURL(`image/${this.imgFormat}`)
                            canvas.toBlob((blob) => {
                                resolve({ canvas, dataURL, blob })
                            }, `image/${this.imgFormat}`, 1)
                        }
                    } catch (e) {

                    }
                }
            })
        };

        checkLocation () {
            const { host, pathname, search } = window.location

            if (chrome.i18n.getMessage('@@extension_id') === host && pathname === '/edit.html') {
                const param = search.replace('?', '')
                if (param) return param
                return 'image'
            }
            return false
        };

        sizeFont (data) {
            let body = document.getElementsByTagName('body')[0]
            let dummy = document.createElement('div')
            dummy.appendChild(document.createTextNode(data.text))
            dummy.setAttribute('style', `font: ${data.fontCss}; float: left; white-space: nowrap; overflow: hidden;`)
            body.appendChild(dummy)
            const result = { w: dummy.offsetWidth, h: dummy.offsetHeight }
            body.removeChild(dummy)
            return result
        };

        getHostInUrl = (url) => {
            const a = document.createElement('a')
            a.href = url || ''
            return a.host
        }

        replaceFileName = (pattern, info) => {
            const { url, title, time } = info || JSON.parse(localStorage.pageInfo)
            const domain = this.getHostInUrl(url)
            pattern = pattern.replace(/\{url}/, url || '')
                .replace(/\{title}/, title || '')
                .replace(/\{domain}/, domain || '')
                .replace(/\{date}/, time.split(' ')[0] || '')
                .replace(/\{time}/, time.split(' ')[1] || '')
                .replace(/\{ms}/, time.split(' ')[2] || '')
                .replace(/\{timestamp}/, time.split(' ')[3] || '')

            return pattern.replace(/[\*\|\\\:\"\<\>\?\/#]+/ig, '_')
        }

        getFileNameVideo = (format, info) => {
            const { fileNamePatternScreencast } = localStorage
            const fileName = this.replaceFileName(fileNamePatternScreencast, info)

            return fileName + (format ? '.' + format : '')
        }

        getFileNameImage = (format, info) => {
            const { fileNamePatternScreenshot } = localStorage
            const fileName = this.replaceFileName(fileNamePatternScreenshot, info)

            return fileName + (format ? '.' + format : '')
        }

        async copyToClipboard (text) {
            return new Promise(function (resolve, reject) {
                const textarea = document.createElement('textarea')
                document.body.appendChild(textarea)
                textarea.value = text
                textarea.select()
                const copied = document.execCommand('copy')
                textarea.remove()

                if (copied) resolve(chrome.i18n.getMessage('notificationUrlCopied'))
                else resolve('Error copy text to clipboard')
            })
        };

        async toCanvas (url, size = 1) {
            return new Promise(function (resolve, reject) {
                const image = new Image()

                image.onload = function () {
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')
                    const { naturalWidth, naturalHeight } = image
                    const horizontal = naturalWidth > naturalHeight
                    const scale = horizontal ? naturalWidth / size : naturalHeight / size
                    const width = naturalWidth / scale
                    const height = naturalHeight / scale

                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(image, 0, 0, width, height)

                    const dataUrl = canvas.toDataURL('image/jpeg')
                    canvas.toBlob(function (blob) {
                        image.remove()
                        resolve({ canvas, dataUrl, blob })
                    }, 'image/png')
                }

                image.onerror = reject
                image.src = url
            })
        };

        async videoToCanvas (stream, size = 1) {
            return new Promise(function (resolve, reject) {
                let video = document.createElement('video')
                video.onloadedmetadata = function () {
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')

                    const { videoWidth, videoHeight } = video
                    const horizontal = videoWidth > videoHeight
                    const scale = horizontal ? videoWidth / size : videoHeight / size
                    const width = videoWidth / scale
                    const height = videoHeight / scale

                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(video, 0, 0, width, height)

                    const dataUrl = canvas.toDataURL('image/jpeg')
                    canvas.toBlob(function (blob) {
                        video.remove()
                        resolve({ canvas, dataUrl, blob })
                    }, 'image/png')
                }

                try {
                    video.srcObject = stream
                } catch (error) {
                    video.src = window.URL.createObjectURL(stream)
                }
                video.onerror = reject
                video.play()
            })
        };

        getTimeStamp () {
            const time = new Date()
            let y, m, d, h, M, s, mm, timestamp
            y = time.getFullYear()
            m = time.getMonth() + 1
            d = time.getDate()
            h = time.getHours()
            M = time.getMinutes()
            s = time.getSeconds()
            mm = time.getMilliseconds()
            timestamp = Date.now()
            if (m < 10) m = '0' + m
            if (d < 10) d = '0' + d
            if (h < 10) h = '0' + h
            if (M < 10) M = '0' + M
            if (s < 10) s = '0' + s
            if (mm < 10) mm = '00' + mm
            else if (mm < 100) mm = '0' + mm
            return y + '.' + m + '.' + d + ' ' + h + ':' + M + ':' + s + ' ' + mm + ' ' + timestamp
        };

        async createPageInfo (type) {
            let tab = {};

            try {
                tab = (await nscCore.tabActive())
            } catch (e) {
                Logger.info(`Get Page Info - ${e}`)
            }

            let info = {
                id: tab.id,
                windowId: tab.windowId,
                url: tab.url,
                title: tab.title,
                time: this.getTimeStamp()
            }

            if (type === 'desktop' || type === 'capture-blank' || type === 'capture-window') {
                info.title = 'nimbus-capture'
                info.url = 'https://nimbusweb.me/'
            }

            localStorage.pageInfo = JSON.stringify(info)

            return info
        }

        /** @description get LocalStorage option.
         * @param {string[] | string} key keys option.
         * @param {any=} values value option.
         * @return {any | {string: any}} value option
         */

        getOption (key, values) {
            values = values === undefined ? false : values

            if (typeof key === 'string') {
                if (values && localStorage[key] === undefined) {
                    return this.setOption(key, values)
                }

                try {
                    return JSON.parse(localStorage[key])
                } catch (e) {
                    return localStorage[key]
                }
            } else {
                return key.reduce((obj, key) => {
                    try {
                        obj[key] = JSON.parse(localStorage[key])
                    } catch (e) {
                        obj[key] = localStorage[key]
                    }
                    return obj
                }, {})
            }
        }

        setOption (key, value) {
            localStorage[key] = value
            return value
        }

        getTrial () {
            const now = moment(nscExt.getOption('firstTime') + nscExt.trialTime)
            const end = moment()
            const duration = moment.duration(now.diff(end))
            return nscExt.getOption('isTrial') && duration.asMilliseconds() <= 0
        }

        async eventValue (event) {
            return new Promise(function (resolve) {
                const value = $(document).data(event);

                if(value !== undefined) {
                    return resolve(value)
                }

                $(document).one(`${event}_change`, function () {
                    const value = $(document).data(event);
                    resolve(value)
                })
            })
        };
    }

    window.nscExt = new nscExtensionCore()
})()

