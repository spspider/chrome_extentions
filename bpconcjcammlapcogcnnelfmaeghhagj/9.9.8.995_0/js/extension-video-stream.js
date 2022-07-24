/*
 * "This work is created by NimbusWeb and is copyrighted by NimbusWeb. (c) 2017 NimbusWeb.
 * You may not replicate, copy, distribute, or otherwise create derivative works of the copyrighted
 * material without prior written permission from NimbusWeb.
 *
 * Certain parts of this work contain code licensed under the MIT License.
 * https://www.webrtc-experiment.com/licence/ THE SOFTWARE IS PROVIDED "AS IS",
 * WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */
'use strict'

const isDebug = localStorage.isDebug === 'true'
let isRecording = false
let blobs = []

browserAction.setDefault()

const videoRecorder = (function () {
    let recorder = null
    let lastFileBlob = null
    let windowRedactor = null

    let videoRecordIsStream, typeCapture,
        videoTabSoundEnable, videoMicSoundEnable,
        videoCameraEnable, videoDrawingToolsEnable,
        videoResolution,
        audioPlayer, audioStream,
        videoStream, micStream, camStream,
        videoEditorTools
    let videoCountdown = 0
    let timer = null
    let timerGif = null
    let activeTab = null

    let timeStart = null
    let timePause = null

    async function createMediaRecorder () {
        Logger.log('Recorder: init MediaRecorder')
        timeStart = Date.now()

        if (videoRecordIsStream) {
            browserAction.setLoading()
        } else browserAction.setRec()

        recorder = new MediaRecorder(videoStream, { mimeType: 'video/webm; codecs=vp8' })
        // recorder = new MediaRecorder(videoStream, {mimeType: 'video/webm; codecs=h264'});

        await videoStream.getVideoTracks()[0].applyConstraints({
            width: +videoResolution.width,
            height: +videoResolution.height
        })

        const { deviceId, aspectRatio, height, width, frameRate } = videoStream.getVideoTracks()[0].getSettings()
        Logger.log(`Recorder: MediaRecorder start: deviceId ${deviceId} aspectRatio ${aspectRatio} width ${width} height ${height} frameRate ${frameRate}`)

        recorder.ondataavailable = (e) => {
            if (videoRecordIsStream) {
                nscStream.send(e.data)
            } else {
                blobs.push(e.data)
            }

            if ((videoRecordIsStream || nscExt.getTrial()) && localStorage.nimbusPremium === 'false' && Date.now() - timeStart > nscExt.trialVideoDuration) {
                if (localStorage.streamLimitTime === undefined) {
                    localStorage.streamLimitTime = true
                }
                return stopRecord()
            }
        }
        recorder.start(videoRecordIsStream ? 5000 : 1000)
    }

    async function preRecord () {
        if (videoRecordIsStream && !nscStream.file.image) {
            const { dataUrl } = await nscExt.videoToCanvas(videoStream, 128)
            nscStream.file.image = dataUrl
        }

        if (typeCapture === 'tab' && videoTabSoundEnable && !videoRecordIsStream) {
            audioStream = new MediaStream([videoStream.getAudioTracks()[0].clone()])
            const ctx = new AudioContext({ latencyHint: 0.03 })
            const output = ctx.createMediaStreamSource(videoStream)
            output.connect(ctx.destination)
        }

        if (videoMicSoundEnable) {
            try {
                micStream = await nscVideo.getUserMedia({
                    audio: {
                        deviceId: localStorage.selectedMicrophone,
                        echoCancellation: true,
                        noiseSuppression: true
                    }
                })

                const mixedStream = new MediaStream()
                const mixedAudioStream = await nscVideo.getMixedAudioStream([micStream, videoStream])
                mixedAudioStream.getTracks().forEach(track => mixedStream.addTrack(track))
                videoStream.getTracks().forEach(track => mixedStream.addTrack(track))
                videoStream = mixedStream
            } catch (e) {
                console.error(e)
            }
        }

        videoStream.getVideoTracks().forEach(track => track.onended = stopRecord)

        try {
            if (videoCountdown) {
                if (typeCapture === 'desktop') await window.nimbus_core.setExtensionBadge(videoCountdown)
                else await window.nimbus_core.setTimerContent(activeTab, videoCountdown)
            } /*else await nscCore.setTimeout(1000);*/
            await startRecord()
        } catch (e) {
            console.error(e)
            await stopRecord()
        }
    }

    async function startRecord () {
        if (videoRecordIsStream) {
            await nscStream.init()
        } else {
            await createMediaRecorder()
        }

        screenshot.changeVideoButton()
        await sendStatusVideo()
    }

    async function stopRecord () {
        Logger.info(`Record: stop record, isRecording ${isRecording}, isStream ${videoRecordIsStream} count files ${blobs.length}`)

        if (!isRecording || (!videoRecordIsStream && !blobs.length)) return
        isRecording = false

        if (videoRecordIsStream) {
            if (nscStream.active) {
                nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload_stream' })
                browserAction.hidePopup()
            }
        } else {
            browserAction.setDefault()
        }

        const clear = async function () {
            audioStream && audioStream.active && audioStream.stop()
            videoStream && videoStream.active && videoStream.stop()
            micStream && micStream.active && micStream.stop()
            camStream && camStream.active && camStream.stop()

            if (timer) clearInterval(timer)
            if (timerGif) clearInterval(timerGif)
            if (windowRedactor) await nscCore.windowRemove(windowRedactor)

            videoStream = null
            micStream = null
            camStream = null
            timeStart = null
            timePause = null
            activeTab = null
            typeCapture = null
            audioPlayer = null
            windowRedactor = null

            screenshot.changeVideoButton()
            await sendStatusVideo()
        }

        if (!recorder || (recorder && recorder.state === 'inactive')) {
            await clear()
            return
        }

        if (typeCapture === 'tab' || typeCapture === 'camera' || screenshot.automatic.data.site) await nimbus_core.setActiveTab(activeTab)

        await nscCore.setTimeout(500)

        try {
            Logger.info(`Record: Recorder stop`)
            recorder.stop()
            recorder = null
        } catch (e) {
        }

        localStorage.videoDuration = Math.floor(getTimeRecord() / 1000) - 1
        await clear()
        await nscCore.setTimeout(500)

        if (videoRecordIsStream) {
            if (nscStream.active) {
                await nscStream.stop()
                // await openExtensionPage();
            }
        } else {
            await openExtensionPage()
        }

        videoRecordIsStream = null
        localStorage.videoCameraEnable = videoCameraEnable
        localStorage.videoDrawingToolsEnable = videoDrawingToolsEnable
        localStorage.videoEditorTools = videoEditorTools
    }

    async function pauseRecord () {
        Logger.log('Recorder: pause')

        if (recorder && recorder.state === 'recording') {
            timePause = Date.now()
            browserAction.setPause()
            recorder.pause()
        } else {
            timePause = null
            browserAction.setRec()
            recorder.resume()
        }

        await sendStatusVideo()
    }

    async function sendStatusVideo () {
        nscCore.syncSendAllTabMessage({
            operation: 'status_video',
            type: typeCapture,
            status: getStatus(),
            state: getState()
        })
    }

    function getState () {
        return (recorder && recorder.state)
    }

    function getStatus () {
        return timer || (videoStream && !!videoStream.active)
    }

    async function captureTab () {
        let constraints = {
            audio: videoTabSoundEnable,
            video: true,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    maxFrameRate: 30,
                    maxWidth: videoResolution.width,
                    maxHeight: videoResolution.height,
                }
            }
        }

        Logger.log(`Recorder: record tab, constraints ${JSON.stringify(constraints)}`)

        try {
            videoStream = await nscVideo.tabCapture(constraints)
            await preRecord()
        } catch (e) {
            console.error('Record tab', e)
            await sendStatusVideo()
            isRecording = false
        }
    }

    async function captureCamera () {
        // await nscCore.setTimeout(500)
        //
        // try {
        //     const constraints = {
        //         video: {
        //             // deviceId: localStorage.selectedVideoCamera,
        //             // echoCancellation: true,
        //             width: { ideal: +videoResolution.width },
        //             height: { ideal: +videoResolution.height }
        //             // width: { ideal: 1280 },
        //             // height: { ideal: 720 }
        //         }
        //     }
        //
        //     Logger.log(`Recorder: record camera - ${JSON.stringify(constraints)}`)
        //
        //     videoStream = await nscVideo.getUserMedia(constraints)
        //     return await preRecord()
        // } catch (e) {
        //     Logger.error(e)
        //
        //     await nscCore.setTimeout(500)

            try {
                const constraints = {
                    video: {
                        deviceId: localStorage.selectedVideoCamera
                    }
                }

                Logger.log(`Recorder: record camera - ${JSON.stringify(constraints)}`)

                videoStream = await nscVideo.getUserMedia(constraints)
                return await preRecord()
            } catch (e) {
                Logger.error(e)
                await sendStatusVideo()
                isRecording = false
            }
        // }
    }

    async function captureDesktop () {
        try {
            const { streamId, option } = await nscVideo.desktopCapture()
            let constraints = {
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: streamId,
                        maxFrameRate: 30,
                        maxWidth: videoResolution.width,
                        maxHeight: videoResolution.height,
                    }
                }
            }

            if (option.canRequestAudioTrack) constraints.audio = {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: streamId
                }
            }

            Logger.log(`Recorder: record desktop, constraints ${JSON.stringify(constraints)}`)

            videoStream = await nscVideo.getUserMedia(constraints)
            await preRecord()
        } catch (e) {
            isRecording = false
            console.error('Record desktop', e)
            await sendStatusVideo()
        }
    }

    async function capture (param) {
        if (isRecording) return
        isRecording = true

        param = Object.assign({}, {
            activeTab: false,
            type: localStorage.videoRecordType || 'tab',
            media_access: false,
            auth: false
        }, param)

        blobs = []
        lastFileBlob = null
        windowRedactor = null
        localStorage.streamLimitTime = false
        localStorage.removeItem('saveStreamVideoData')
        localStorage.removeItem('lastRedactorObject')
        typeCapture = param.type
        videoEditorTools = localStorage.videoEditorTools
        videoRecordIsStream = localStorage.videoRecordIsStream === 'true'
        videoCountdown = +localStorage.videoCountdown
        videoCameraEnable = localStorage.videoCameraEnable === 'true'
        videoDrawingToolsEnable = localStorage.videoDrawingToolsEnable === 'true'

        videoMicSoundEnable = localStorage.videoMicSoundEnable === 'true'
        videoTabSoundEnable = localStorage.videoTabSoundEnable === 'true'

        if (typeCapture === 'desktop' || typeCapture === 'camera') videoTabSoundEnable = false

        if (typeCapture === 'camera') {
            videoCameraEnable = false
            videoDrawingToolsEnable = false
        }

        localStorage.pageInfo = await window.nimbus_core.getPageInfo(typeCapture)

        if (!param.auth && videoRecordIsStream) {
            Logger.info(`Recorder: auth ${param.auth} videoRecordIsStream ${videoRecordIsStream}`)

            isRecording = false

            try {
                const auth = await nscExt.eventValue('user_auth')
                if (auth) {
                    await nscExt.eventValue('user_premium')
                    await nscExt.eventValue('user_info')

                    const { id, limits: { notesPerWorkspace } } = nscNimbus.personalOrganization || await nscNimbus.getPersonalOrganizations()

                    const { countNotes } = await nscNimbus.getWorkspaces({ countNotes: true, orgId: id })

                    Logger.info(`Stream limit, notesPerWorkspace ${notesPerWorkspace} / countNotes ${countNotes}`)

                    if (countNotes >= notesPerWorkspace) {
                        return await screenshot.insertPopup('nsc_stream_count_limit')
                    }

                    const month = new Date().getMonth()
                    const streamMonthStart = nscExt.getOption('streamMonthStart', month)
                    const streamCountStart = nscExt.getOption('streamCountStart', 0)

                    nscExt.setOption('streamCountStart', streamMonthStart !== month ? 0 : streamCountStart + 1)

                    param.auth = true
                    return capture(param)
                } else {
                    return await screenshot.insertPopup('nsc_popup_login_open')
                }
            } catch (e) {
                return nscCore.syncSendAllTabMessage({ operation: 'content_automation_stream_error' })
            }
        }

        let constraints = {}
        if (videoMicSoundEnable) constraints.audio = localStorage.selectedMicrophone ? { deviceId: localStorage.selectedMicrophone } : true
        if (videoCameraEnable || typeCapture === 'camera') {
            // constraints.video = { width: { ideal: 1280 }, height: { ideal: 720 }, ...(localStorage.selectedVideoCamera && { deviceId: localStorage.selectedVideoCamera }) }
            constraints.video = localStorage.selectedVideoCamera ? { deviceId: localStorage.selectedVideoCamera } : true
        }
        if ((videoMicSoundEnable || videoCameraEnable || typeCapture === 'camera') && !param.media_access) {
            isRecording = false

            return await screenshot.mediaAccess(constraints, { ...param, media_access: true })
        }

        if (typeCapture === 'desktop' || typeCapture === 'camera') videoTabSoundEnable = false

        try {
            if (!param.activeTab) {
                activeTab = await nscCore.tabActive()
                await nscCore.checkContentReady()
                await nscCore.executeFiles([
                    'var nscTabId = ' + activeTab.id + ';',
                    'css/flex.min.css',
                    'css/icons.min.css',
                    'css/timer.min.css',
                    'css/video-panel.min.css',
                    'js/lib/jquery-3.3.1.js',
                    'js/lib/progressbar.js',
                    'js/class/nscChromeCore.js',
                    'js/content-core.js',
                    'js/content-hotkeys.js',
                    'js/content-automation.js',
                    'js/content-timer.js',
                    'js/content-video-editor.js',
                    'js/content-video-panel.js',
                    'js/content-camera.js',
                    'js/content-watermark.js',
                ])
                await nscCore.checkContentReady()
                isRecording = false
                param.activeTab = true
                return capture(param)
            }
        } catch (e) {
            console.log(e)
            isRecording = false
            if (param.type === 'tab' || param.type === 'camera') {
                alert(chrome.i18n.getMessage('notificationErrorChromeTab'))
            } else {
                param.activeTab = true
                return capture(param)
            }
        }

        videoResolution = await nscVideo.setVideoResolution(videoRecordIsStream ? 'hd' : localStorage.videoResolution, activeTab)

        if (activeTab) {
            await window.nimbus_core.setActiveTab(activeTab)
            injectionWebCamera()
            injectionVideoPanel()
            if (typeCapture !== 'desktop') injectionWatermarkVideo()
        }

        if (typeCapture === 'tab') {
            await captureTab()
        } else if (typeCapture === 'camera') {
            await captureCamera()
        } else {
            await captureDesktop()
        }
    }

    async function createPopupRedactor () {
        windowRedactor = await nscCore.windowCreate(
            chrome.extension.getURL('/edit.html?popup'),
            {
                left: (screen.width - 1200) / 2,
                top: (screen.height - 600) / 2,
                width: 1200,
                height: 600,
            }
        )
    }

    async function isCreateVideoComplete (name) {
        if (!blobs.length) {
            await nscVideo.getFile(name)
                .then(() => {
                    nscCore.setTimeout(500)
                    nscCore.syncSendAllTabMessage({ operation: 'nsc_create_video_complete' })
                }).catch((e) => {
                    console.error(e)
                })
        }
    }

    async function createVideoFile (step, isSaveFileMemory) {
        step = (step || 1)

        const blob = new Blob(blobs, { 'type': 'video/webm' })

        let name = `${localStorage.videoName}.${localStorage.videoFormat}`
        console.log(localStorage.videoName, name)

        try {
            const removeEntry = await nscVideo.getFile(name, {})
            await nscVideo.removeFile(removeEntry)
            Logger.log(`Remove video file completed, name ${name}`)
        } catch (e) {
            Logger.warning(`Remove video file failed, name ${name}, ${e}`)
        }

        localStorage.videoName = `video-${Date.now()}`
        localStorage.videoFormat = 'webm'
        name = `${localStorage.videoName}.${localStorage.videoFormat}`
        console.log(localStorage.videoName, name)
        try {
            const entryWrite = await nscVideo.getFile(name, { create: true })
            const size = blob.size

            localStorage.videoSize = size

            await nscVideo.writeFile(entryWrite, blob)
            Logger.log(`Create video file completed, name ${name}, size ${size}`)
            blobs = []
        } catch (e) {
            if (step <= 5) {
                Logger.warning(`Error file create, step ${step}, timeout ${500 * step}`)
                await nscCore.setTimeout(500 * step)
                await createVideoFile(++step)
            } else {
                Logger.error(`Error create video file ${e.message}`)
                blobs = []
            }
        }
    }

    async function openExtensionPage () {
        if (localStorage.quickVideoCapture !== 'false' && screenshot.automatic.data.site !== 'github') {
            switch (localStorage.enableVideoEdit) {
                case 'nimbus':
                case 'google':
                case 'youtube':
                case 'quick':
                    await createVideoFile(0, true)
                    await screenshot.automatic.send(lastFileBlob)
                    lastFileBlob = null
                    break
                default:
                    await screenshot.createEditPage('video')
                    await createVideoFile()
                    break
            }
        } else if (localStorage.quickVideoCaptureGithub !== 'false' && screenshot.automatic.data.site === 'github') {
            await createVideoFile(0, true)
            await screenshot.automatic.send(lastFileBlob)
            lastFileBlob = null
        } else {
            await screenshot.createEditPage('video')
            await createVideoFile()
        }
    }

    function getTimeRecord () {
        const date = Date.now()
        timeStart = timeStart + (timePause ? date - timePause : 0)
        timePause = timePause ? date : null
        return timeStart ? (date - timeStart) : 0
    }

    async function injectionVideoPanel (tab) {
        if (!tab && !activeTab) return

        tab = tab || activeTab

        Logger.info(`Injection panel, tab: ${tab.id}, title: ${tab.title}`)

        await nscCore.sendTabMessage(tab, {
            operation: 'nsc_content_video_panel_setting',
            typeCapture: typeCapture,
            videoDrawingToolsEnable: localStorage.videoDrawingToolsEnable === 'true',
            videoDrawingToolsDelete: +localStorage.videoDrawingToolsDelete,
            videoEditorTools: localStorage.videoAnimationCursor === 'true' ? 'cursorRing' : 'cursorDefault',
            tabId: tab.id
        })
    }

    async function injectionWebCamera (tab) {
        if (!tab && !activeTab) return

        tab = tab || activeTab

        Logger.info(`Injection web camera, tab: ${tab.id}, title: ${tab.title}`)

        const constraints = {
            video: {
                deviceId: localStorage.selectedVideoCamera,
            }
        }

        await nscCore.sendTabMessage(tab, {
            operation: 'nsc_content_camera_setting',
            typeCapture: typeCapture,
            videoCameraEnable: localStorage.videoCameraEnable === 'true',
            videoCameraPosition: localStorage.videoCameraPosition,
            constraints,
            tabId: tab.id
        })
    }

    async function injectionWatermarkVideo (tab) {
        if (!tab && !activeTab) return

        tab = tab || activeTab

        Logger.info(`Injection watermark, tab: ${tab.id}, title: ${tab.title}`)

        try {
            await nscExt.checkWaterMark()
            const watermark = await nscExt.getWaterMark()
            await nscCore.sendTabMessage(tab, {
                operation: 'set_watermark_video',
                dataUrl: watermark.toDataURL(),
                position: localStorage.watermarkPosition,
                watermarkEnableTime: localStorage.watermarkEnableTime === 'true',
                watermarkTime: localStorage.watermarkTime,
                typeCapture: typeCapture,
                recordTime: getTimeRecord(),
                tabId: tab.id
            })
        } catch (e) {
            Logger.info(e)
        }
    }

    async function tabsUpdated (tab) {
        if (!/^chrome/.test(tab.url) && ((isRecording && typeCapture === 'desktop') || (isRecording && activeTab && activeTab.id === tab.id))) {
            Logger.info(`Record panel updated, tab ${tab.id}, title: ${tab.title}`)
            await nscCore.checkContentReady().then(async () => {
                await nscCore.executeFiles([
                    'var nscTabId = ' + tab.id + ';',
                    'css/flex.min.css',
                    'css/icons.min.css',
                    'css/timer.min.css',
                    'css/video-panel.min.css',
                    'js/lib/jquery-3.3.1.js',
                    'js/lib/progressbar.js',
                    'js/content-core.js',
                    'js/content-hotkeys.js',
                    'js/content-automation.js',
                    'js/content-timer.js',
                    'js/content-video-editor.js',
                    'js/content-video-panel.js',
                    'js/content-camera.js',
                    'js/content-watermark.js',
                ]).then(async () => {
                    await nscCore.checkContentReady().then(async () => {
                        nscCore.syncSendAllTabMessage({ operation: 'nsc_content_remove' })
                        if (typeCapture !== 'desktop') injectionWatermarkVideo(tab)
                        injectionVideoPanel(tab)
                        injectionWebCamera(tab)
                    })
                })
            })
        }
    }

    async function tabsActivated (tab) {
        if (tab && !/^chrome/.test(tab.url) && isRecording && typeCapture === 'desktop') {
            Logger.info(`Record panel activated, tab: ${tab.id}, title: ${tab.title}`)
            await nscCore.checkContentReady().then(async () => {
                await nscCore.executeFiles([
                    'var nscTabId = ' + tab.id + ';',
                    'css/flex.min.css',
                    'css/icons.min.css',
                    'css/timer.min.css',
                    'css/video-panel.min.css',
                    'js/lib/jquery-3.3.1.js',
                    'js/lib/progressbar.js',
                    'js/content-core.js',
                    'js/content-hotkeys.js',
                    'js/content-automation.js',
                    'js/content-timer.js',
                    'js/content-video-editor.js',
                    'js/content-video-panel.js',
                    'js/content-camera.js',
                    'js/content-watermark.js',
                ]).then(async () => {
                    await nscCore.checkContentReady().then(async () => {
                        nscCore.syncSendAllTabMessage({ operation: 'nsc_content_remove' })
                        injectionWebCamera(tab)
                        injectionVideoPanel(tab)
                    })
                })
            })
        }
    }

    async function tabsRemoved (tab) {
        // if (isRecording && activeTab && activeTab.id === tab.id) await stopRecord();
    }

    function recordIsStream (isStream) {
        videoRecordIsStream = isStream
    }

    return {
        capture: capture,
        startRecord: startRecord,
        stopRecord: stopRecord,
        pauseRecord: pauseRecord,
        getStatus: getStatus,
        getState: getState,
        getTimeRecord: getTimeRecord,
        createMediaRecorder: createMediaRecorder,
        tabsUpdated: tabsUpdated,
        tabsActivated: tabsActivated,
        tabsRemoved: tabsRemoved,
        // isCreateVideoComplete: isCreateVideoComplete,
        createPopupRedactor: createPopupRedactor,
        // openExtensionPage: openExtensionPage,
        // recordIsStream: recordIsStream,
    }
})()
