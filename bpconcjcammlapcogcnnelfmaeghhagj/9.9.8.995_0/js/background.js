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

const { version } = chrome.runtime.getManifest()
const extension_id = chrome.i18n.getMessage('@@extension_id')
const { language } = window.navigator

localStorage.appHotkeys = localStorage.appHotkeys || JSON.stringify({
    tab_video: 55,
    desktop_video: 56,
    stop_video: 57,
    visible: 49,
    fragment: 54,
    selected: 50,
    scroll: 51,
    entire: 52,
    window: 53
})
localStorage.hotkeysSendNS = localStorage.hotkeysSendNS || JSON.stringify({
    key: 13,
    title: 'Enter'
})
localStorage.appMenuItem = localStorage.appMenuItem || JSON.stringify({
    'entire': true,
    'window': true,
    'selected': true,
    'fragment': true,
    'visible': true,
    'blank': true,
    'delayed': true,
    'scroll': true,
    'video': true
})
localStorage.pageInfo = localStorage.pageInfo || JSON.stringify({
    'url': '',
    'title': '',
    'time': nscExt.getTimeStamp()
})

localStorage.recordVideoCore = localStorage.recordVideoCore || 'default'
localStorage.recordAudioCore = localStorage.recordAudioCore || 'default'
localStorage.youtubePlaylist = localStorage.youtubePlaylist || 'no-playlist'
localStorage.popupAccountShow = localStorage.popupAccountShow || 'true'
localStorage.popupRate = localStorage.popupRate || JSON.stringify({ show: true, date: Date.now() })
localStorage.videoCameraEnable = localStorage.videoCameraEnable || 'false'
localStorage.videoMicSoundEnable = localStorage.videoMicSoundEnable || 'true'
localStorage.videoTabSoundEnable = localStorage.videoTabSoundEnable || 'false'
localStorage.videoAnimationCursor = localStorage.videoAnimationCursor || 'true'
localStorage.videoReEncoding = 'false' // localStorage.videoReEncoding || 'true';
localStorage.videoPrivateUploadEnable = localStorage.videoPrivateUploadEnable || 'false'
localStorage.videoDrawingToolsEnable = localStorage.videoDrawingToolsEnable || 'false'
localStorage.videoRecordType = localStorage.videoRecordType || 'tab'
localStorage.videoBitrate = localStorage.videoBitrate || '4000000'
localStorage.videoAudioBitrate = localStorage.videoAudioBitrate || '96000'
localStorage.videoFps = localStorage.videoFps || '24'
localStorage.videoDrawingToolsDelete = localStorage.videoDrawingToolsDelete || '0'
localStorage.videoCountdown = localStorage.videoCountdown || 0
localStorage.imageFormat = localStorage.imageFormat || 'png'
localStorage.videoName = localStorage.videoName || 'video'
localStorage.videoFormat = localStorage.videoFormat || 'webm'
localStorage.imageQuality = localStorage.imageQuality || '92'
localStorage.imageDepth = localStorage.imageDepth || '1'
localStorage.redactorFillTextColor = localStorage.redactorFillTextColor || '#ffee77'
localStorage.redactorFillColor = localStorage.redactorFillColor || 'rgba(0,0,0,0)'
localStorage.quickCapture = localStorage.quickCapture || 'false'
localStorage.quickCaptureType = localStorage.quickCaptureType || 'visible'
localStorage.quickVideoCapture = localStorage.quickVideoCapture || 'false'
localStorage.quickVideoCaptureType = 'tab' // localStorage.quickVideoCaptureType || 'tab';
localStorage.quickVideoCaptureGithub = localStorage.quickVideoCaptureGithub || 'false'
localStorage.enableEdit = localStorage.enableEdit || 'edit'
localStorage.enableVideoEdit = 'done' //localStorage.enableVideoEdit || 'done';
localStorage.quickVideoCaptureGithubWelcome = localStorage.quickVideoCaptureGithubWelcome || 'true'
localStorage.quickVideoCaptureGithubCount = localStorage.quickVideoCaptureGithubCount || 0
localStorage.enableSaveAs = localStorage.enableSaveAs || 'true'
localStorage.saveCropPosition = localStorage.saveCropPosition || 'false'
localStorage.appContentMenuShow = localStorage.appContentMenuShow || 'true'
localStorage.nimbusAutoShortUrl = localStorage.nimbusAutoShortUrl || (localStorage.appType === 'google' ? 'false' : 'true')
localStorage.imageOriginalResolution = localStorage.imageOriginalResolution || 'true'
localStorage.actionHideFixedElements = localStorage.actionHideFixedElements || 'true'
localStorage.shareOnGoogle = localStorage.shareOnGoogle || 'true'
localStorage.shareOnYoutube = localStorage.shareOnYoutube || 'public'
localStorage.cropPosition = localStorage.cropPosition || JSON.stringify({
    'x': 50,
    'y': 50,
    'w': 400,
    'h': 200
})
localStorage.cropScrollPosition = localStorage.cropScrollPosition || JSON.stringify({
    'x': 50,
    'y': 50,
    'w': 400,
    'h': 200
})
localStorage.fragmentPosition = localStorage.fragmentPosition || JSON.stringify({
    'x': 50,
    'y': 50,
    'w': 400,
    'h': 200
})
localStorage.fileNamePatternScreenshot = localStorage.fileNamePatternScreenshot || 'screenshot-{domain}-{date}-{time}'
localStorage.fileNamePatternScreencast = localStorage.fileNamePatternScreencast || 'screencast-{domain}-{date}-{time}'
localStorage.actionEntirePageScrollDelay = localStorage.actionEntirePageScrollDelay || 200
localStorage.redactorStrokeSize = localStorage.redactorStrokeSize || 5
localStorage.redactorStrokeColor = localStorage.redactorStrokeColor || '#f00'
localStorage.redactorShadow = localStorage.redactorShadow || 'false'
localStorage.redactorShadowBlur = localStorage.redactorShadowBlur || 10
localStorage.redactorShadowColor = localStorage.redactorShadowColor || '#000'
localStorage.redactorFontFamily = localStorage.redactorFontFamily || 'Arial'
localStorage.redactorFontSize = localStorage.redactorFontSize || 24
localStorage.googleUploadFolder = localStorage.googleUploadFolder || '{"id": "root", "title": "Main folder"}'
localStorage.popupHelperShow = localStorage.popupHelperShow || 'true'
localStorage.nimbusShare = localStorage.nimbusShare || 'false'
localStorage.showInfoPrint = localStorage.showInfoPrint || 'true'
localStorage.redactorEnableNumbers = localStorage.redactorEnableNumbers || 'false'
localStorage.videoEditorTools = 'cursorRing' // localStorage.videoEditorTools || 'cursorRing';
localStorage.videoCameraPosition = localStorage.videoCameraPosition || JSON.stringify({ 'x': 10, 'y': 10 })
localStorage.watermarkEnable = localStorage.watermarkEnable || 'false'
localStorage.watermarkFile = localStorage.watermarkFile || ''
localStorage.watermarkType = localStorage.watermarkType || 'image'
localStorage.watermarkPosition = localStorage.watermarkPosition || 'rb'
localStorage.watermarkPercent = localStorage.watermarkPercent || 0.5
localStorage.watermarkAlpha = localStorage.watermarkAlpha || 1
localStorage.watermarkFont = localStorage.watermarkFont || 'Times New Roman'
localStorage.watermarkSize = localStorage.watermarkSize || 24
localStorage.watermarkColor = localStorage.watermarkColor || 'rgb(0, 0, 0)'
localStorage.watermarkText = localStorage.watermarkText || 'Watermark'
localStorage.appShowButtonNew = localStorage.appShowButtonNew || 'true'
localStorage.watermarkEnableTime = localStorage.watermarkEnableTime || 'false'
localStorage.watermarkTime = localStorage.watermarkTime || 30
localStorage.quickVideoStreamMenuEnable = localStorage.quickVideoStreamMenuEnable || 'false'
localStorage.quickVideoStorageLimit = localStorage.quickVideoStorageLimit || 'false'
localStorage.nimbusOrganizationSelect = localStorage.nimbusOrganizationSelect || ''
localStorage.nimbusWorkspaceSelect = localStorage.nimbusWorkspaceSelect || ''
localStorage.nimbusFolderSelect = localStorage.nimbusFolderSelect || 'default'
localStorage.recordToGif = localStorage.recordToGif || 'false'
localStorage.videoResolution = localStorage.videoResolution || 'auto'
localStorage.appVersion = localStorage.appVersion || version
// localStorage.isTrialPopupShow = localStorage.isTrialPopupShow || 'true';
localStorage.injectGmailScreenshot = localStorage.injectGmailScreenshot || 'true'
localStorage.injectGmailScreencast = localStorage.injectGmailScreencast || 'true'
localStorage.trialFullPageScreenshotCount = localStorage.trialFullPageScreenshotCount || 0
localStorage.modePremiumNoNimbus = localStorage.modePremiumNoNimbus || 'false'
localStorage.modePremiumNoNimbusGoogleMeet = localStorage.modePremiumNoNimbusGoogleMeet || 'false'

if (localStorage.appVersion !== version && localStorage.appShowButtonNew === 'true') {
    browserAction.setUpdate()
}

chrome.browserAction.onClicked.addListener(async function () {
    if (localStorage.appVersion !== version && localStorage.appShowButtonNew === 'true') {
        localStorage.appVersion = version
        browserAction.setDefault()

        await nscCore.tabCreate({
            url: 'https://nimbusweb.me/capture-install/releasecapture.php?utm_source=capture&utm_medium=addon&utm_campaign=release_page',
            active: true
        })
    }
})

const crypto = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

chrome.runtime.setUninstallURL('https://nimbusweb.me/screenshot-uninstall/?utm_source=capture&utm_medium=addon&utm_campaign=unistall_page');

(async function () {
    nscNimbus.authState().then(async (is_auth) => {
        if (is_auth) {
            await nscNimbus.checkPremium(false)

            const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')

            if (!modePremiumNoNimbus) {
                await nscNimbus.getInfo()
                await nscNimbus.getPersonalOrganizations()
            }
        }
    })

    let storage = await nscCore.storageGet()
    storage.isTrialPopupShow = nscExt.getOption('isTrialPopupShow', true)

    const default_setting = {}
    default_setting.firstTime = Date.now() // - (nscExt.trialTime - 60 * 15 * 1000);
    default_setting.firstInstall = true
    default_setting.isTrial = false
    default_setting.isTrialScreenshot = false
    default_setting.nimbusPremium = false
    default_setting.nimbusAuthorized = false
    default_setting.appGlobalId = crypto() + crypto() + crypto() + crypto()
    default_setting.appType = extension_id === 'jmledidimmdphjmmopbhligmpfjhcgig' ? 'google' : 'nimbus'
    storage = Object.assign(default_setting, storage)

    if (storage.appType === 'google') {
        localStorage.modePremiumNoNimbus = true
    }

    if (!storage.firstInstall) {
        if (!storage.isTrial) {
            storage.firstTime = Date.now()
        } else {
            storage.isTrialPopupShow = false
            storage.firstTime = Date.now() - nscExt.trialTime
        }
    }

    storage.isTrial = true

    if (storage.firstInstall) {
        storage.isTrialScreenshot = true
        storage.isTrialPopupShow = false
        storage.firstTime = Date.now() - nscExt.trialTime

        if (!window.nimbus_core.is_app && storage.appType === 'nimbus') {
            // const patch = `install${storage.appType !== 'nimbus' ? '-nimbus-google-drive' : ''}${language === 'ru' ? 'ru' : ''}.php`
            // const url = `https://nimbusweb.me/capture-install/${patch}?utm_source=capture&utm_medium=addon&utm_campaign=welcom_page`

            await nscCore.tabCreate({ url: 'welcome.html' })
        }
    }

    storage.firstInstall = false

    for (const [key, value] of Object.entries(storage)) {
        localStorage[key] = value
    }

    // console.log(storage)

    await nscCore.storageSet(storage)
})()

let xs, ys, ws, hs,
    scroll_crop = false, download_scroll_crop = false, send_nimbus_scroll_crop = false, send_slack_scroll_crop = false,
    send_google_scroll_crop = false, send_print_scroll_crop = false, send_pdf_scroll_crop = false,
    send_quick_scroll_crop = false, copy_to_clipboard_scroll_crop = false,
    fragment = false, download_fragment = false, send_nimbus_fragment = false, send_slack_fragment = false,
    send_google_fragment = false, send_print_fragment = false, send_pdf_fragment = false, send_quick_fragment = false,
    copy_to_clipboard_fragment = false, gmail_auto = false,
    manifest = chrome.runtime.getManifest()

let screenshot = {
    id: chrome.i18n.getMessage('@@extension_id'),
    currentTab: {},
    path: `filesystem:chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/persistent/`,
    dataUrl: null,
    file: {
        parts: []
    },
    template: {
        panel_video_compact: ''
    },
    button_content_container: null,
    button_video: null,
    insertPopup: async function (action, data = {}) {
        try {
            Logger.info(`Insert popup ${action} data: ${data}`)
            await nscCore.executeFiles([
                'css/jquery.ambiance.min.css',
                'css/flex.min.css',
                'css/new-style.min.css',
                'css/icons.min.css',
                'css/popup.min.css',
                'css/fix-style.min.css',
                'js/lib/jquery-3.3.1.js',
                'js/lib/jquery.ambiance.js',
                'js/connect-nimbus.js',
                'js/content-popup.js'
            ])
            await nscCore.checkContentReady()
            await nscCore.sendTabMessage(null, { operation: action, ...data })
        } catch (e) {

        }
    },
    mediaAccess: async function (constraints, params) {
        try {
            await nscCore.executeFiles(['js/class/nscChromeCore.js', 'js/class/nscVideoRecorder.js', 'js/content-core.js', 'js/content-automation.js'])
            console.log(`mediaAccess`, constraints, params)
            nscCore.syncSendTabMessage(null, {
                operation: 'content_automation_media_access',
                constraints: JSON.stringify(constraints),
                params: JSON.stringify(params)
            })
        } catch (e) {
            console.log('BG: Permission check: error, open tab', e)
            await nscCore.tabCreate({ url: 'template/frame-media-access.html?' + JSON.stringify(constraints) + '?' + JSON.stringify(params) })
        }
    },
    automatic: {
        data: {
            auth: '',
            action: '',
            type: '',
            site: '',
            workspace: {},
            premium_note: null,
            max_attachment_size_note: null,
            dataUrl: null,
        },
        clearData: () => {
            screenshot.automatic.data = {
                auth: null,
                action: null,
                type: null,
                site: null,
                workspace: {},
                premium_note: null,
                max_attachment_size_note: null,
                dataUrl: null,
            }
        },
        sendData: async (url) => {
            const { data } = screenshot.automatic
            url = await nscNimbus.shortUrl({ url: url || data.url })
            nscCore.syncSendAllTabMessage({ operation: 'content_automation_send_url', ...data, url })
            screenshot.automatic.clearData()
        },
        auth: async function () {
            const { type, auth, site, action } = screenshot.automatic.data

            await nscExt.createPageInfo(type)

            switch (auth) {
                case 'nimbus':
                    if (site !== 'gmail' || action === 'image') {
                        const is_auth = await nscNimbus.authState()
                        if (is_auth) {
                            await nscNimbus.checkPremium(false)
                            if (nscNimbus.user.id === null) {
                                await nscNimbus.getInfo()
                            }

                            const { id } = nscNimbus.personalOrganization || await nscNimbus.getPersonalOrganizations()

                            screenshot.automatic.data.workspace = await nscNimbus.getWorkspaces({ orgId: id })
                        } else {
                            return await screenshot.insertPopup('nsc_popup_login_open')
                        }
                    }
                    break
                case 'google':
                    if (!googleShare.story.get.accessToken()) return window.google_oauth.login()
                    break
                case 'youtube':
                    if (!youtubeShare.getAccessToken()) return window.youtube_oauth.login()
                    break
            }
            console.log(action)
            if (action === 'video' || auth === 'youtube') {
                await screenshot.videoRecorder.capture({ type: type })
            } else {
                await screenshot.capture.activate.imageCaptureType(type)
            }
        },
        send: async function (blob) {
            console.log('send', blob, 'screenshot.automatic.data', screenshot.automatic.data)

            if (nimbusShare.server.send.pending) {
                Logger.warning('Double click automatic send')
            }

            if (screenshot.automatic.data.auth === 'nimbus') {
                if (blob.size > screenshot.automatic.data.workspace?.org?.limits?.attachmentSize) {
                    if (screenshot.automatic.data.workspace.org.user.premium && screenshot.automatic.data.workspace.org.user.premium.status === 'active') {
                        return await screenshot.insertPopup('nsc_popup_limitorgpremium_open')
                    } else {
                        return await screenshot.insertPopup('nsc_popup_limitorgfree_open')
                    }
                }

                if (blob.size + screenshot.automatic.data.workspace.org.usage.traffic.current > screenshot.automatic.data.workspace.org.usage.traffic.max) {
                    return await screenshot.insertPopup('nsc_popup_limitorglimit_open')
                }
            }

            nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload' })
            browserAction.setLoading()

            const { auth, action, site } = screenshot.automatic.data

            switch (auth) {
                case 'quick':
                    switch (action) {
                        case 'video':
                            nimbusShare.server.send.quick({
                                data: blob,
                                title: nscExt.getFileNameVideo(),
                            }, function (err, res) {
                                nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                browserAction.setDefault()
                                if (!err && res) {
                                    screenshot.automatic.sendData(res.url)
                                } else if (action !== 'abort') {
                                    chrome.tabs.create({ url: 'edit.html?video' })
                                    screenshot.automatic.clearData()
                                }
                            })
                            break
                        case 'image':
                            nimbusShare.server.send.quick({
                                data: blob,
                                title: nscExt.getFileNameImage(),
                            }, function (err, res) {
                                nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                browserAction.setDefault()
                                if (!err && res) {
                                    screenshot.automatic.sendData(res.url)
                                } else if (action !== 'abort') {
                                    chrome.tabs.create({ url: 'edit.html' })
                                    screenshot.automatic.clearData()
                                }
                            })
                    }
                    break
                case 'nimbus':
                    switch (action) {
                        case 'video':
                            nimbusShare.server.send.screencast({
                                data: blob,
                                title: nscExt.getFileNameVideo(),
                                name: nscExt.getFileNameVideo('webm'),
                                shared: true
                            }, function (err, res) {
                                nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                browserAction.setDefault()
                                if (!err && res) {
                                    screenshot.automatic.sendData(res.body.location)
                                } else if (action !== 'abort') {
                                    chrome.tabs.create({ url: 'edit.html?video' })
                                    screenshot.automatic.clearData()
                                }
                            })
                            break
                        case 'image':
                            if (site === 'gmail') {
                                const url = await nscExt.blobToDataUrl(blob)
                                const { dataUrl } = await nscExt.toCanvas(url, 128)
                                screenshot.automatic.data.dataUrl = dataUrl
                                screenshot.automatic.data.title = nscExt.getFileNameImage()
                            }

                            nimbusShare.server.send.screenshot({
                                    data: blob,
                                    title: nscExt.getFileNameImage(),
                                    name: nscExt.getFileNameImage(),
                                    shared: true
                                },
                                function (err, res) {
                                    nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                    browserAction.setDefault()
                                    if (!err && res) {
                                        screenshot.automatic.sendData(res.body.location)
                                    } else if (action !== 'abort') {
                                        chrome.tabs.create({ url: 'edit.html' })
                                        screenshot.automatic.clearData()
                                    }
                                })
                            break
                    }
                    break
                case 'google':
                    switch (screenshot.automatic.data.action) {
                        case 'video':
                            googleShare.save(blob, screenshot.getFileName2(true, 'webm'), async function (err, res) {
                                await nscCore.sendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                browserAction.setDefault()
                                if (err && err.name === 401) {
                                    window.google_oauth.login()
                                } else if (!err && res) {
                                    googleShare.setPublicGdrive(res.id)
                                    await nscCore.sendTabMessage(null, {
                                        operation: 'content_automation_send_url',
                                        site: screenshot.automatic.data.site,
                                        url: 'https://drive.google.com/file/d/' + res.id
                                    })
                                    screenshot.automatic.clearData()
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    screenshot.automatic.clearData()
                                    chrome.tabs.create({ url: 'edit.html?video' })
                                }
                            })
                            break
                        case 'image':
                            googleShare.save(blob, screenshot.getFileName('format'), async function (err, res) {
                                await nscCore.sendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                browserAction.setDefault()

                                if (err && err.name === 401) {
                                    window.google_oauth.login()
                                } else if (!err && res) {
                                    googleShare.setPublicGdrive(res.id)
                                    await nscCore.sendTabMessage(null, {
                                        operation: 'content_automation_send_url',
                                        site: screenshot.automatic.data.site,
                                        url: 'https://drive.google.com/file/d/' + res.id
                                    })

                                    screenshot.automatic.clearData()
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    screenshot.automatic.clearData()
                                    chrome.tabs.create({ url: 'edit.html' })
                                }
                            })
                            break
                    }
                    break
                case 'youtube':
                    switch (screenshot.automatic.data.action) {
                        case 'video':
                            youtubeShare.save(blob, screenshot.getFileName2(true, 'webm'), async function (err, res) {
                                nscCore.syncSendAllTabMessage({ operation: 'content_automation_status_upload_end' })
                                browserAction.setDefault()
                                if (err && err.name === 401) {
                                    window.youtube_oauth.login()
                                } else if (!err && res) {
                                    await nscCore.sendTabMessage(null, {
                                        operation: 'content_automation_send_url',
                                        site: screenshot.automatic.data.site,
                                        url: 'https://youtu.be/' + res.id
                                    })
                                    screenshot.automatic.clearData()
                                } else if (screenshot.automatic.data.action !== 'abort') {
                                    screenshot.automatic.clearData()
                                    chrome.tabs.create({ url: 'edit.html?video' })
                                }
                            })
                            break
                    }
                    break
            }
        },
        abort: function () {
            switch (screenshot.automatic.data.auth) {
                case 'nimbus':
                    nimbusShare.server.send.abort()
                    break
                case 'google':
                    googleShare.abort()
                    break
                case 'youtube':
                    youtubeShare.abort()
                    break
                case 'quick':
                    nimbusShare.server.send.abort()
                    break
            }
        }
    },
    capture: {
        activate: {
            imageCaptureType: async (type) => {
                nscExt.setOption('lastTypeScreenshot', type)

                let trialFullPageScreenshotCount = nscExt.getOption('trialFullPageScreenshotCount', 0)

                if (type === 'capture-entire' || type === 'capture-scroll') {
                    trialFullPageScreenshotCount = trialFullPageScreenshotCount + 1

                    nscExt.setOption('trialFullPageScreenshotCount', trialFullPageScreenshotCount)
                }

                const premium = nscExt.getOption('nimbusPremium')
                const isTrialScreenshot = nscExt.getOption('isTrialScreenshot')

                if ((type === 'capture-entire' || type === 'capture-scroll') && trialFullPageScreenshotCount > 5 && !premium && isTrialScreenshot) {
                    screenshot.capture.entire.status = false
                    return await screenshot.insertPopup('nsc_popup_premium_open')
                }

                switch (type) {
                    case 'capture-visible' :
                        await screenshot.capture.visible.init()
                        break
                    case 'capture-fragment' :
                        await screenshot.capture.fragment.init()
                        break
                    case 'capture-fragment-scroll' :
                        await screenshot.capture.fragment_scroll.init()
                        break
                    case 'capture-selected' :
                        await screenshot.capture.selected.init()
                        break
                    case 'capture-scroll' :
                        await screenshot.capture.scroll.init()
                        break
                    case 'capture-entire' :
                        await screenshot.capture.entire.init()
                        break
                    case 'capture-window' :
                        screenshot.capture.window.init()
                        break
                    case 'capture-delayed' :
                        await screenshot.capture.delayed.init()
                        break
                    case 'capture-desktopApp' :
                        const loadImage = () => {
                            return new Promise(resolve => {
                                const img = document.createElement('img')
                                img.onload = () => {
                                    const canvas = document.createElement('canvas')
                                    const ctx = canvas.getContext('2d')
                                    canvas.width = img.naturalWidth
                                    canvas.height = img.naturalHeight
                                    console.log(canvas.width)

                                    ctx.drawImage(img, 0, 0)
                                    img.remove()

                                    screenshot.file.parts = []
                                    screenshot.capture.window.parts.push({
                                        x: 0,
                                        y: 0,
                                        w: canvas.width,
                                        h: canvas.height
                                    })
                                    screenshot.file.parts.push(canvas.toDataURL('image/' + localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png', +localStorage.imageQuality / 100))
                                    localStorage.imageFileInfo = JSON.stringify({
                                        w: canvas.width,
                                        h: canvas.height,
                                        z: 1,
                                        parts: screenshot.capture.window.parts
                                    })
                                    screenshot.capture.window.parts = []
                                    resolve()
                                }
                                img.src = `/bin/screen.${localStorage.imageFormat}?${Math.random()}`
                            })
                        }
                        await loadImage()
                        break
                    case 'capture-blank' :
                    case 'capture-blank-popup' :
                        screenshot.capture.blank.init(type)
                        break
                }
            },
            image: async function (type) {
                Logger.info(`capture.activate.image ${type} enable-edit ${localStorage.enableEdit}`)
                if (localStorage.enableEdit === 'nimbus' || localStorage.enableEdit === 'google' || localStorage.enableEdit === 'quick') {
                    screenshot.automatic.data.action = 'image'
                    screenshot.automatic.data.auth = localStorage.enableEdit
                    screenshot.automatic.data.type = type
                    screenshot.automatic.data.site = undefined
                    await screenshot.automatic.auth()
                } else {
                    const pageInfo = await nscExt.createPageInfo(type)
                    if (pageInfo) {
                        await screenshot.capture.activate.imageCaptureType(type)
                    }
                }
            },
            video: async function (type) {
                await screenshot.videoRecorder.capture({ type: type })
            }
        },
        visible: {
            parts: [],
            init: async () => {
                screenshot.file.parts = []

                await nscCore.executeFiles(['js/content-clear-capture.js', 'js/content/scrollbar-toggle.js'])
                await screenshot.capture.visible.capture()
                await screenshot.capture.visible.finish()
            },
            capture: async () => {
                const { w, h, z } = await nscCore.sendTabMessage(null, { operation: 'nsc_scrollbar_invisible' })

                const dataUrl = await nscCore.captureVisibleTab()
                screenshot.file.parts.push(dataUrl)

                screenshot.capture.visible.parts.push({ x: 0, y: 0, w, h })
                localStorage.imageFileInfo = JSON.stringify({ w, h, z, parts: screenshot.capture.visible.parts })
                screenshot.capture.visible.parts = []

                nscCore.syncSendTabMessage(null, { operation: 'nsc_scrollbar_visible' })
                await screenshot.createEditPage()
            },
            finish: function () {
            }
        },
        selected: {
            parts: [],
            init: async () => {
                screenshot.file.parts = []

                await nscCore.executeFiles([
                    'css/nsc-cropper.min.css',
                    'js/class/nscLogger.js',
                    'js/class/nscExtensionCore.js',
                    'js/class/nscChromeCore.js',
                    'js/class/nscCropper.js',
                    'js/lib/jquery-3.3.1.js',
                    'js/content-core.js',
                    'js/content-clear-capture.js',
                    'js/content-crop.js'
                ])

                await nscCore.sendTabMessage(null, { operation: 'crop_after_clear_capture' })
                await nscCore.setTimeout(100)
                const dataUrl = await nscCore.captureVisibleTab()
                screenshot.file.parts.push(dataUrl)
                await nscCore.sendTabMessage(null, { operation: 'crop_data_screen', dataUrl, appType: localStorage.appType })
            },
            capture: function (cb) {
                const { x, y, w, h, z } = JSON.parse(localStorage.cropPosition)
                screenshot.capture.selected.parts.push({ x: x, y, w, h })
                localStorage.imageFileInfo = JSON.stringify({ w, h, z, parts: screenshot.capture.selected.parts })
                screenshot.capture.selected.parts = []
                cb ? cb() : screenshot.createEditPage()
            },
            finish: function (cb) {
            }
        },
        entire: {
            parts: [],
            parts_load: 0,
            status: false,
            init: async () => {
                screenshot.capture.entire.parts_load = 0
                screenshot.file.parts = []

                const {
                    isDebug,
                    actionEntirePageScrollDelay,
                    cropScrollPosition,
                    actionHideFixedElements,
                    fragmentPosition
                } = nscExt.getOption(['isDebug', 'actionEntirePageScrollDelay', 'cropScrollPosition', 'actionHideFixedElements', 'fragmentPosition'])

                await nscCore.executeFiles([
                    `var actionEntirePageScrollDelay = ${actionEntirePageScrollDelay};`,
                    `var isDebug = ${isDebug};`,
                    'js/content-core.js',
                    'js/content-clear-capture.js',
                    'js/content-page.js'
                ])

                const data = scroll_crop ? cropScrollPosition : (fragment ? fragmentPosition : {})

                nscCore.syncSendTabMessage(null, {
                    operation: 'content_scroll_page',
                    scroll_crop,
                    fragment,
                    actionHideFixedElements,
                    ...data
                })

                scroll_crop = false
                fragment = false
            },
            capture: async (data) => {
                let x = 0
                let y = Math.floor((data.windowHeight - data.h) * data.z)
                let w = Math.floor(data.w * data.z)
                let h = Math.floor(data.h * data.z)
                let x2 = Math.floor(data.x * data.z)
                let y2 = Math.floor(data.y * data.z)
                let w2 = w
                let h2 = h

                if (data.scroll_crop || data.fragment) {
                    x = Math.ceil(data.x * data.z)
                    y = Math.ceil(data.y_shift * data.z)
                    x2 = 0
                    y2 = Math.ceil(data.y_crop * data.z)
                }

                screenshot.capture.entire.parts.push({ x: x, y: y, w: w, h: h, x2: x2, y2: y2, w2: w2, h2 })

                const dataUrl = await nscCore.captureVisibleTab()
                screenshot.file.parts.push(dataUrl)

                if (++screenshot.capture.entire.parts_load === data.count_parts) {
                    let maxSize = 32767
                    let maxArea = 268435456
                    let w = Math.ceil(Math.min(data.totalWidth * data.z, maxSize))
                    let h = Math.ceil(Math.min(data.totalHeight * data.z, maxSize))

                    if (w * h > maxArea) h = Math.floor(maxArea / w)

                    localStorage.imageFileInfo = JSON.stringify({
                        w, h, z: 1, parts: screenshot.capture.entire.parts
                    })
                    screenshot.capture.entire.parts = []
                    screenshot.capture.entire.parts_load = 0
                    await screenshot.capture.entire.finish()
                }
            },
            captureNew: async (data) => {
                const { x, y, w, h, x2, y2, z } = data
                screenshot.capture.entire.parts.push({ x, y, w, h, x2, y2, w2: w, h2: h })
                screenshot.capture.entire.status = (data.status !== 'finish' && data.status !== 'cancel')

                const maxSize = 32767
                const maxArea = 268435456
                const dataUrl = await nscCore.captureVisibleTab()
                screenshot.file.parts.push(dataUrl)

                if (data.status === 'finish' || data.status === 'cancel') {
                    const w = Math.min(data.pageWidth, maxSize)
                    let h = Math.min(data.pageHeight, maxSize)

                    if (w * h > maxArea) h = Math.floor(maxArea / w)

                    localStorage.imageFileInfo = JSON.stringify({ w, h, z, parts: screenshot.capture.entire.parts })
                    screenshot.capture.entire.parts = []
                    screenshot.capture.entire.parts_load = 0

                    if (data.status === 'finish') {
                        await screenshot.capture.entire.finish()
                    }
                }
            },
            finish: async function () {
                if (download_scroll_crop || download_fragment) {
                    download_scroll_crop = false
                    download_fragment = false
                    await screenshot.download()
                } else if (send_nimbus_scroll_crop || send_nimbus_fragment) {
                    send_nimbus_scroll_crop = false
                    send_nimbus_fragment = false
                    await screenshot.createEditPage('nimbus')
                } else if (send_slack_scroll_crop || send_slack_fragment) {
                    send_slack_scroll_crop = false
                    send_slack_fragment = false
                    await screenshot.createEditPage('slack')
                } else if (send_google_scroll_crop || send_google_fragment) {
                    send_google_scroll_crop = false
                    send_google_fragment = false
                    await screenshot.createEditPage('google')
                } else if (send_print_scroll_crop || send_print_fragment) {
                    send_print_scroll_crop = false
                    send_print_fragment = false
                    await screenshot.createEditPage('print')
                } else if (send_pdf_scroll_crop || send_pdf_fragment) {
                    send_pdf_scroll_crop = false
                    send_pdf_fragment = false
                    await screenshot.createEditPage('pdf')
                } else if (send_quick_scroll_crop || send_quick_fragment) {
                    send_quick_scroll_crop = false
                    send_quick_fragment = false
                    await screenshot.createEditPage('quick')
                } else if (copy_to_clipboard_scroll_crop || copy_to_clipboard_fragment) {
                    copy_to_clipboard_scroll_crop = false
                    copy_to_clipboard_fragment = false
                    await screenshot.copyToClipboard()
                } else {
                    await screenshot.createEditPage()
                }
            }
        },
        scroll: {
            init: async () => {
                await nscCore.executeFiles([
                    'css/nsc-cropper.min.css',
                    'js/class/nscExtensionCore.js',
                    'js/class/nscChromeCore.js',
                    'js/class/nscCropper.js',
                    'js/lib/jquery-3.3.1.js',
                    'js/content-clear-capture.js',
                    'js/content-core.js',
                    'js/content-scroll-crop.js',
                ])
                nscCore.syncSendTabMessage(null, {
                    operation: 'scroll_crop_data_screen',
                    appType: localStorage.appType
                })
            },
        },
        fragment: {
            init: async () => {
                await nscCore.executeFiles([
                    'css/fragment.min.css',
                    'css/crop.min.css',
                    'js/lib/jquery-3.3.1.js',
                    'js/content-core.js',
                    'js/content-fragment.js'
                ])
                nscCore.syncSendTabMessage(null, {
                    operation: 'content_capture_fragment_init',
                    appType: localStorage.appType
                })
            },
        },
        fragment_scroll: {
            init: async () => {
                await nscCore.executeFiles([
                    'css/fragment.min.css',
                    'css/crop.min.css',
                    'js/lib/jquery-3.3.1.js',
                    'js/content-core.js',
                    'js/content-fragment-scroll.js'
                ])
                nscCore.syncSendTabMessage(null, {
                    operation: 'content_capture_scroll_fragment_init',
                    appType: localStorage.appType
                })
            },
        },
        delayed: {
            init: async function () {
                try {
                    const tab = await nscCore.executeFiles([
                        'js/lib/jquery-3.3.1.js',
                        'js/lib/progressbar.js',
                        'js/content-timer.js',
                        'css/timer.min.css'
                    ])

                    await window.nimbus_core.setTimerContent(tab, localStorage.delayedScreenshotTime || 3)
                    await window.nimbus_core.setActiveTab(tab)
                    await screenshot.capture.visible.init()
                } catch (e) {
                    console.error(e)
                }
            },
        },
        window: {
            parts: [],
            init: function (cb) {
                screenshot.file.parts = []
                chrome.desktopCapture.chooseDesktopMedia(['tab', 'screen', 'window'], async (streamId) => {
                    await screenshot.capture.window.capture(streamId, cb)
                })
            },
            capture: async function (streamId, cb) {
                await nscVideo.getUserMedia({
                    audio: false,
                    video: { mandatory: { chromeMediaSource: 'desktop', chromeMediaSourceId: streamId } }
                }).then(function (stream) {
                    let video = document.createElement('video')
                    video.onloadedmetadata = function () {
                        let canvas = document.createElement('canvas')
                        let ctx = canvas.getContext('2d')
                        canvas.width = video.videoWidth
                        canvas.height = video.videoHeight

                        ctx.drawImage(video, 0, 0)
                        stream.getTracks()[0].stop()
                        video.remove()

                        screenshot.capture.window.parts.push({ x: 0, y: 0, w: canvas.width, h: canvas.height })
                        screenshot.file.parts.push(canvas.toDataURL('image/' + localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png', +localStorage.imageQuality / 100))
                        localStorage.imageFileInfo = JSON.stringify({
                            w: canvas.width,
                            h: canvas.height,
                            z: 1,
                            parts: screenshot.capture.window.parts
                        })
                        screenshot.capture.window.parts = []
                        screenshot.capture.window.finish(cb)

                        if (cb) {
                            chrome.tabs.create({ url: 'nimbus_screnshot_active_tab' })
                            cb()
                        } else {
                            screenshot.createEditPage()
                        }
                    }
                    try {
                        video.srcObject = stream
                    } catch (error) {
                        video.src = window.URL.createObjectURL(stream)
                    }
                    video.play()
                }).catch(console.error)
            },
            finish: function (cb) {
            },
        },
        blank: {
            canvas: null,
            popup: false,
            ctx: null,
            parts: [],
            init: function (type) {
                screenshot.file.parts = []
                localStorage.removeItem('imageFileInfo')
                screenshot.capture.blank.popup = (type === 'capture-blank-popup')
                screenshot.capture.blank.capture()
            },
            capture: function () {
                screenshot.capture.blank.canvas = document.createElement('canvas')
                screenshot.capture.blank.ctx = screenshot.capture.blank.canvas.getContext('2d')
                screenshot.capture.blank.canvas.width = screenshot.capture.blank.popup ? 1150 : screen.width - 40
                screenshot.capture.blank.canvas.height = screenshot.capture.blank.popup ? 500 : screen.height - 100

                screenshot.capture.blank.ctx.fillStyle = '#FFF'
                screenshot.capture.blank.ctx.fillRect(0, 0, screenshot.capture.blank.canvas.width, screenshot.capture.blank.canvas.height)

                screenshot.capture.blank.parts.push({
                    x: 0,
                    y: 0,
                    w: screenshot.capture.blank.canvas.width,
                    h: screenshot.capture.blank.canvas.height
                })
                screenshot.file.parts.push(screenshot.capture.blank.canvas.toDataURL())
                screenshot.capture.blank.finish()
            },
            finish: function () {
                localStorage.imageFileInfo = JSON.stringify({
                    w: screenshot.capture.blank.canvas.width,
                    h: screenshot.capture.blank.canvas.height,
                    z: 1,
                    parts: screenshot.capture.blank.parts
                })

                screenshot.capture.blank.canvas = null
                screenshot.capture.blank.ctx = null
                screenshot.capture.blank.parts = []

                if (!window.nimbus_core.is_app) {
                    screenshot.createEditPage(screenshot.capture.blank.popup ? 'popup' : 'blank')
                }
            }
        }
    },
    createMenu: function () {
        chrome.contextMenus.removeAll()
        if (localStorage.appContentMenuShow !== 'false') {
            let menu = JSON.parse(localStorage.appMenuItem)

            screenshot.button_content_container = chrome.contextMenus.create({
                'title': chrome.i18n.getMessage('appNameMini'),
                'contexts': ['all']
            })

            menu.visible && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnVisiblePage'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-visible')
            })

            menu.fragment && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnCaptureFragment'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-fragment')
            })

            menu.selected && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnSelectedArea'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-selected')
            })

            menu.scroll && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnSelectedScroll'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-scroll')
            })

            menu.entire && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnEntirePage'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-entire')
            })

            menu.delayed && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnDelayedScreen'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-delayed')
            })

            menu.blank && chrome.contextMenus.create({
                title: chrome.i18n.getMessage('btnBlankScreen'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-blank')
            })

            if (window.nimbus_core.is_chrome) {
                menu.window && chrome.contextMenus.create({
                    title: chrome.i18n.getMessage('btnBrowserWindow'),
                    contexts: ['all'],
                    parentId: screenshot.button_content_container,
                    onclick: screenshot.capture.activate.image.bind(screenshot, 'capture-window')
                })

                menu.video && screenshot.addVideoButton()
            }

            chrome.contextMenus.create({
                title: 'separator',
                type: 'separator',
                contexts: ['all'],
                parentId: screenshot.button_content_container
            })

            chrome.contextMenus.create({
                title: chrome.i18n.getMessage('tooltipOptions'),
                contexts: ['all'],
                parentId: screenshot.button_content_container,
                onclick: function () {
                    chrome.tabs.create({ url: 'options.html' })
                }
            })
        }
    },
    removeVideoButton: function () {
        screenshot.button_video && chrome.contextMenus.remove(screenshot.button_video)
        screenshot.button_video = null
    },
    addVideoButton: function () {
        if (screenshot.button_video) return
        screenshot.button_video = chrome.contextMenus.create({
            title: chrome.i18n.getMessage('btnCaptureVideo'),
            contexts: ['all'],
            parentId: screenshot.button_content_container,
            onclick: screenshot.capture.activate.video.bind(screenshot, 'tab')
        })
    },
    changeVideoButton: function () {
        if (localStorage.appContentMenuShow === 'true') {
            if (screenshot.videoRecorder.getStatus()) {
                chrome.contextMenus.update(screenshot.button_video, {
                    title: chrome.i18n.getMessage('optionsLabelStopVideo'),
                    onclick: videoRecorder.stopRecord
                })
            } else {
                chrome.contextMenus.update(screenshot.button_video, {
                    title: chrome.i18n.getMessage('btnCaptureVideo'),
                    onclick: function () {
                        videoRecorder.capture({
                            type: 'tab',
                            countdown: localStorage.videoCountdown
                        })
                    }
                })
            }
        }
    },
    openPage: function (url) {
        chrome.tabs.create({ url: url })
    },
    // setPageInfo: function (cb, type) {
    //     chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    //         let info = {
    //             id: tabs[0].id,
    //             windowId: tabs[0].windowId,
    //             url: tabs[0].url,
    //             title: tabs[0].title,
    //             time: nscExt.getTimeStamp()
    //         }
    //         if (type === 'desktop' || type === 'capture-window') {
    //             info.title = 'nimbus-capture'
    //             info.url = 'http://nimbus-capture'
    //         }
    //
    //         localStorage.pageInfo = JSON.stringify(info)
    //         cb && cb(info)
    //     })
    // },
    createEditPage: async function (params) {
        const { auth } = screenshot.automatic.data
        if (params !== 'video' && params !== 'blank' &&
            (auth === 'nimbus' || auth === 'google' || auth === 'quick' ||
                localStorage.enableEdit === 'nimbus' || localStorage.enableEdit === 'google' || localStorage.enableEdit === 'quick')
        ) {
            const info = JSON.parse(localStorage.imageFileInfo)
            const { canvas, blob } = await nscExt.createCanvasParts({
                info,
                format: localStorage.imageFormat
            }, screenshot.file.parts)

            await screenshot.setWaterMark(canvas, blob, function (finish_canvas, finish_blob) {
                screenshot.file.parts = []
                screenshot.automatic.send(finish_blob)
            })
        } else {
            params = params || localStorage.enableEdit
            switch (params) {
                case 'copy':
                    await screenshot.copyToClipboard()
                    break
                case 'save':
                    await screenshot.download()
                    break
                case 'popup':
                    await videoRecorder.createPopupRedactor()
                    break
                default:
                    chrome.tabs.create({ url: 'edit.html' + ((params === 'edit' || !params) ? '' : `?${params}`) })
                    break
            }
        }
    },
    init: function () {
        if (window.nimbus_core.is_chrome) screenshot.videoRecorder = videoRecorder
        screenshot.createMenu()
    },
    setWaterMark: async function (canvas, blob, cb) {
        try {
            await nscExt.checkWaterMark()
            const premium = await nscNimbus.checkPremium(false)
            if (!premium) return cb && cb(canvas, blob)
            const watermark = await nscExt.getWaterMark()
            const position = nscExt.getWaterMarkPosition(watermark, canvas)

            canvas.getContext('2d').drawImage(watermark, position.x, position.y, watermark.width, watermark.height)
            canvas.toBlob(function (blob) {
                cb && cb(canvas, blob)
            }, 'image/' + (localStorage.imageFormat === 'jpg' ? 'jpeg' : 'png'))
        } catch (e) {
            cb && cb(canvas, blob)
        }
    },
    copyToClipboard: async function () {
        console.log('copyToClipboard')
        let imageinfo = JSON.parse(localStorage.imageFileInfo)

        if (window.nimbus_core.is_firefox) {
            window.nimbus_core.createCanvasParts(imageinfo, screenshot.file.parts, function (canvas, blob) {
                screenshot.setWaterMark(canvas, blob, function (finish_canvas, finish_blob) {
                    window.nimbus_core.toArrayBuffer(window.URL.createObjectURL(finish_blob), function (buffer) {
                        chrome.clipboard.setImageData(buffer, (localStorage.format === 'jpg' ? 'jpeg' : 'png'))

                        chrome.notifications.create(null, {
                                type: 'basic',
                                iconUrl: 'images/icons/48x48.png',
                                title: chrome.i18n.getMessage('appName'),
                                message: chrome.i18n.getMessage('notificationCopy')
                            },
                            function (notificationId) {
                                window.setTimeout(function (id) {
                                    chrome.notifications.clear(id)

                                    screenshot.file.parts = []
                                    localStorage.removeItem('imageFileInfo')
                                }.bind(this, notificationId), 3000)
                            })
                    })
                })
            })
        } else {
            let pageInfo = JSON.parse(localStorage.pageInfo)
            await window.nimbus_core.setActiveTab(pageInfo.id)

            window.setTimeout(function () {
                nscCore.syncSendMessage({
                    operation: 'copy_to_clipboard',
                    info: imageinfo,
                    parts: screenshot.file.parts
                })

                screenshot.file.parts = []
                localStorage.removeItem('imageFileInfo')
            }, 200)
        }
    },
    download: async function () {
        const info = JSON.parse(localStorage.imageFileInfo)
        const { canvas, blob } = await nscExt.createCanvasParts({
            info,
            format: localStorage.imageFormat
        }, screenshot.file.parts)

        // window.nimbus_core.createCanvasParts(info, screenshot.file.parts, function (canvas, blob) {
        screenshot.setWaterMark(canvas, blob, function (finish_canvas, finish_blob) {
            screenshot.file.parts = []
            localStorage.removeItem('imageFileInfo')
            chrome.downloads.download({
                url: window.URL.createObjectURL(finish_blob),
                filename: screenshot.getFileName(),
                saveAs: localStorage.enableSaveAs !== 'false'
            })
        })
        // });
    },
    getFileName: function () {
        let s = localStorage.fileNamePatternScreenshot
        let f = localStorage.imageFormat
        let info = JSON.parse(localStorage.pageInfo)
        let url = document.createElement('a')
        url.href = info.url || ''
        s = s.replace(/\{url}/, info.url || '')
            .replace(/\{title}/, info.title || '')
            .replace(/\{domain}/, url.host || '')
            .replace(/\{date}/, info.time.split(' ')[0] || '')
            .replace(/\{time}/, info.time.split(' ')[1] || '')
            .replace(/\{ms}/, info.time.split(' ')[2] || '')
            .replace(/\{timestamp}/, info.time.split(' ')[3] || '')

        return s.replace(/[\*\|\\\:\"\<\>\?\/#]+/ig, '_') + ('.' + f)
    },
    getFileName2: function (is_format, format) {
        let is_video = (format === 'webm' || format === 'mp4' || format === 'gif')
        let s = is_video ? localStorage.fileNamePatternScreencast : localStorage.fileNamePatternScreenshot
        let info = JSON.parse(localStorage.pageInfo)
        let url = document.createElement('a')
        url.href = info.url || ''
        s = s.replace(/\{url}/, info.url || '')
            .replace(/\{title}/, info.title || '')
            .replace(/\{domain}/, url.host || '')
            .replace(/\{date}/, info.time.split(' ')[0] || '')
            .replace(/\{time}/, info.time.split(' ')[1] || '')
            .replace(/\{ms}/, info.time.split(' ')[2] || '')
            .replace(/\{timestamp}/, info.time.split(' ')[3] || '')

        return s.replace(/[\*\|\\\:\"\<\>\?\/#]+/ig, '_') + (is_format ? '.' + format : '')
    },
}

// localStorage.appType = 'google';

window.onload = screenshot.init

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        // console.log('request', JSON.stringify(request))

        switch (request.operation) {
            case 'ever_helper_message':
                if (request.data.action === 'event:login') {
                    localStorage.nimbusSessionId = request.data.sessionId;
                    (async function () {
                        await nscCore.setTimeout(2000)
                        await nscCore.sendAllTabMessage({ operation: 'access_nimbus' })
                    })()
                }
                break
            case 'oauth_google':
                google_oauth.login()
                break
            case 'oauth_google_refresh':
                google_oauth.refreshToken()
                break
            case 'oauth_youtube':
                window.youtube_oauth.login()
                break
            case 'oauth_youtube_refresh':
                window.youtube_oauth.refreshToken()
                break
            case 'update_menu':
                screenshot.createMenu()
                break
            case 'set_video_panel':
                localStorage.videoDrawingToolsEnable = request.value
                break
            case 'set_option':
                localStorage[request.key] = request.value
                break
            case 'get_option':
                sendResponse(localStorage[request.key])
                break
            case 'get_crop_position':
                sendResponse(localStorage.saveCropPosition === 'true' ? JSON.parse(localStorage.cropPosition) : {})
                break
            case 'get_crop_scroll_position':
                sendResponse(localStorage.saveCropPosition === 'true' ? JSON.parse(localStorage.cropScrollPosition) : {})
                break
            case 'get_hotkeys':
                sendResponse({ hotkeys: localStorage.appHotkeys })
                break
            case 'get_local_storage':
                sendResponse(localStorage)
                break
            case 'get_file_parts':
                sendResponse({ parts: screenshot.file.parts })
                break
            case 'get_extension_data':
                sendResponse({
                    recordState: is_chrome ? screenshot.videoRecorder.getState() : false,
                    recordStatus: is_chrome ? screenshot.videoRecorder.getStatus() : false,
                    recordTime: is_chrome ? screenshot.videoRecorder.getTimeRecord() : 0,
                    streamLoading: nscStream.loading,
                    entireStatus: screenshot.capture.entire.status,
                    currentTab: screenshot.currentTab
                })
                break
            case 'get_info_record':
                sendResponse({
                    state: screenshot.videoRecorder.getState(),
                    status: screenshot.videoRecorder.getStatus(),
                    time: screenshot.videoRecorder.getTimeRecord(),
                    streamLoading: nscStream.loading
                })
                break
            case 'get_quick_capture':
                sendResponse({
                    enable_edit: localStorage.enableEdit,
                    enable_video_edit: localStorage.enableVideoEdit,
                    quick_capture: localStorage.quickCapture,
                    quick_capture_type: localStorage.quickCaptureType,
                    quick_video_capture: localStorage.quickVideoCapture,
                    quick_video_capture_type: localStorage.quickVideoCaptureType,
                    entire_status: screenshot.capture.entire.status
                })
                break
            case 'get_automation_setting':
                sendResponse({
                    quick_capture_github: localStorage.quickVideoCaptureGithub,
                    quick_capture_github_welcome: localStorage.quickVideoCaptureGithubWelcome
                })
                break
            case 'get_capture_desktop':
                screenshot.capture.window.init(sendResponse)
                return true
            case 'get_is_media_access':
                (async function () {
                    try {
                        (await nscVideo.getUserMedia().stop())
                        sendResponse(true)
                    } catch (e) {
                        sendResponse(false)
                    }
                })()
                break
            case 'save_crop_position':
                localStorage.cropPosition = JSON.stringify(request.value)
                break
            case 'save_crop_scroll_position':
                localStorage.cropScrollPosition = JSON.stringify(request.value)
                break
            case 'save_fragment_scroll_position':
                localStorage.fragmentPosition = JSON.stringify(request.value)
                break
            case 'save_position_video_camera':
                localStorage.videoCameraPosition = JSON.stringify(request.position)
                break
            case 'open_page':
                screenshot.openPage(request.url)
                break
            case 'content_camera_toggle':
                (async function () {
                    await nscCore.sendAllTabMessage({ operation: 'content_camera_toggle_tab' })
                })()
                break
            case 'content_panel_toggle':
                (async function () {
                    await nscCore.sendAllTabMessage({ operation: 'content_panel_toggle_tab' })
                })()
                break
            case 'update_context_menu':
                screenshot.createMenu()
                break

            case 'activate_hotkey':
            case 'activate_capture':
                (async function () {
                    await screenshot.capture.activate.image(request.value)
                })()
                break
            case 'activate_record':
                (async function () {
                    Logger.log(`Recorder ${request.key}`)
                    switch (request.key) {
                        case 'start' :
                            await screenshot.videoRecorder.capture(JSON.parse(request.params || '{}'))
                            break
                        case 'pause' :
                            await screenshot.videoRecorder.pauseRecord()
                            break
                        case 'stop' :
                            await screenshot.videoRecorder.stopRecord()
                            break
                    }
                })()
                break
            case 'send_to':
                switch (request.path) {
                    /*
                    * crop
                    * */
                    case 'edit' :
                        screenshot.automatic.data.action = 'image'
                        screenshot.automatic.data.auth = localStorage.enableEdit
                        screenshot.automatic.data.type = 'capture-selected'
                        screenshot.automatic.data.site = undefined
                        screenshot.capture.selected.capture()
                        break
                    case 'download' :
                        screenshot.capture.selected.capture(screenshot.download)
                        break
                    case 'nimbus' :
                    case 'slack' :
                    case 'google' :
                    case 'print' :
                    case 'pdf' :
                    case 'quick' :
                        screenshot.automatic.data.action = 'image'
                        screenshot.automatic.data.auth = localStorage.enableEdit
                        screenshot.automatic.data.type = 'capture-selected'
                        screenshot.automatic.data.site = undefined
                        screenshot.capture.selected.capture(screenshot.createEditPage.bind(this, request.path))
                        break
                    case 'copy_to_clipboard' :
                        screenshot.capture.selected.capture(screenshot.copyToClipboard)
                        break
                    /*
                    *  scroll crop
                    * */
                    case 'edit_scroll':
                        screenshot.automatic.data.action = 'image'
                        screenshot.automatic.data.auth = localStorage.enableEdit
                        screenshot.automatic.data.type = 'capture-scroll'
                        screenshot.automatic.data.site = undefined

                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'download_scroll':
                        download_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'nimbus_scroll' :
                        send_nimbus_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'slack_scroll' :
                        send_slack_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'google_scroll' :
                        send_google_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'print_scroll' :
                        send_print_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'pdf_scroll' :
                        send_pdf_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'quick_scroll' :
                        send_quick_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    case 'copy_to_clipboard_scroll' :
                        copy_to_clipboard_scroll_crop = true
                        scroll_crop = true
                        screenshot.capture.entire.init()
                        break
                    /*
                    *  fragment
                    * */
                    case 'redactor_fragment':
                        screenshot.automatic.data.action = 'image'
                        screenshot.automatic.data.auth = localStorage.enableEdit
                        screenshot.automatic.data.type = 'capture-fragment'
                        screenshot.automatic.data.site = undefined

                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'download_fragment':
                        download_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'nimbus_fragment' :
                        send_nimbus_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'slack_fragment' :
                        send_slack_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'google_fragment' :
                        send_google_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'print_fragment' :
                        send_print_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'pdf_fragment' :
                        send_pdf_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'quick_fragment' :
                        send_quick_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break
                    case 'copy_to_clipboard_fragment' :
                        copy_to_clipboard_fragment = true
                        fragment = true
                        screenshot.capture.entire.init()
                        break

                    case 'gmail_auto' :
                        screenshot.automatic.data.action = 'image'
                        screenshot.automatic.data.auth = localStorage.enableEdit
                        screenshot.automatic.data.type = 'capture-window'
                        screenshot.automatic.data.site = 'gmail'

                        localStorage.enableEdit = 'nimbus'

                        gmail_auto = true
                        screenshot.capture.window.init()
                        break
                }
                break

            case 'status_video_change':
                switch (request.status) {
                    case 'play' :
                        screenshot.videoRecorder.pauseRecord()
                        break
                    case 'pause' :
                        screenshot.videoRecorder.pauseRecord()
                        break
                    case 'stop' :
                        screenshot.videoRecorder.stopRecord()
                        break
                }
                break

            case 'check_tab_action':
                switch (request.action) {
                    case 'insert_page' :
                        (async function () {
                            await nscCore.executeScript('js/content-check-action.js').catch(async () => {
                                const action = {
                                    chrome: true,
                                    fragment: false,
                                    crop: false,
                                    scroll_crop: false,
                                    url: false
                                }
                                await nscCore.sendMessage({
                                    'operation': 'check_tab_action',
                                    'action': 'back_is_page',
                                    'value': action
                                })
                            })
                        })()
                        break
                }
                break
            case 'content_media_access':
                (async function () {
                    await screenshot.mediaAccess({
                        audio: localStorage.videoMicSoundEnable === 'true',
                        video: localStorage.videoCameraEnable === 'true',
                        media_access: true
                    }, false, request.access)
                })()
                break
            case 'content_capture':
                (async function () {
                    await screenshot.capture.entire.capture(request)
                    sendResponse(true)
                })()

                return true
            case 'content_capture_area':
                (async function () {
                    await screenshot.capture.entire.captureNew(request)
                    sendResponse(true)
                })()
                return true
            case 'content_automation':
                screenshot.automatic.data.action = request.action
                if (request.action !== 'abort') {
                    screenshot.automatic.data.auth = request.auth
                    screenshot.automatic.data.type = request.type
                    screenshot.automatic.data.site = request.site
                    screenshot.automatic.auth()
                }
                if (request.action === 'abort') {
                    screenshot.automatic.abort()
                }
                break
            case 'content_popup':
                (async function () {
                    await screenshot.insertPopup(request.action)
                })()
                break
            case 'content_popup_close':
                (async function () {
                    await nscCore.sendTabMessage(null, { operation: 'content_popup_close' })
                })()
                break
            case 'content_popup_request':
                (async function () {
                    switch (request.action) {
                        case 'auth':
                            nimbusShare.server.user.auth(request.email, request.password, sendResponse)
                            break
                        case 'challenge':
                            nimbusShare.server.user.challenge(request.state, request.code, sendResponse)
                            break
                        // case 'register':
                        //     nimbusShare.server.user.register(request.email, request.password, sendResponse)
                        //     break
                        case 'remind':
                            nimbusShare.server.user.remindPassword(request.email, sendResponse)
                            break
                        case 'info':
                            const info = await nscNimbus.getInfo()
                            sendResponse(info)
                            break
                        case 'gmailUpdateScreencast':
                            await nscNimbus.updateScreencast(request.idToken, { title: request.title })
                            screenshot.automatic.data.title = request.title
                            await screenshot.automatic.sendData()
                            sendResponse(true)
                    }
                })()
                return true
            case 'content_message':
                nscCore.syncSendMessage(request.message)
                break
        }
    }
)

if (window.nimbus_core.is_chrome) {
    chrome.commands.onCommand.addListener(function (command) {
        console.log(command)
        const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')
        const modePremiumNoNimbusGoogleMeet = nscExt.getOption('modePremiumNoNimbusGoogleMeet')

        if (modePremiumNoNimbus && !modePremiumNoNimbusGoogleMeet && /meet\.google\.com/.test(screenshot.currentTab.url)) return

        switch (command) {
            case 'start_tab_video':
                screenshot.videoRecorder.capture({ type: 'tab' })
                break
            case 'start_desktop_video':
                screenshot.videoRecorder.capture({ type: 'desktop' })
                break
            case 'stop_video':
                screenshot.videoRecorder.stopRecord()
                break
            case 'pause_video':
                screenshot.videoRecorder.pauseRecord()
                break
        }
    })
}

chrome.tabs.onUpdated.addListener(async function (tabId, info, tab) {
    screenshot.currentTab = tab

    try {
        if (info.status === 'loading') {
            if (/nimbusweb\.me\/slack\/\?code/.test(tab.url)) {
                localStorage.slackCode = tab.url.match(/code=(.+)&/)[1]
                nscCore.tabRemove(tabId)
                await nscCore.setTimeout(200)
                nscCore.syncSendAllTabMessage({ action: 'access_slack' })
            }
            await nscCore.executeFiles([
                'js/content-core.js',
                'js/content-fragment-scroll-detected.js',
                'js/content-hotkeys.js',
                'js/content-automation.js',
                'js/class/nscChromeCore.js',
                'js/class/nscInjectGmail.js'
            ])
        }
        if (info.status === 'complete') {
            if (/###EVERFAUTH:/.test(tab.title)) {
                nscCore.tabRemove(tabId)
                await nscCore.setTimeout(200)
                nscCore.syncSendAllTabMessage({ operation: 'access_nimbus' })
            } else if (/nimbusweb.me\/auth\/t\/s.html\?capture-login-success=1/.test(tab.url)) {
                await nscCore.tabRemove(tabId)
            }

            await screenshot.videoRecorder.tabsUpdated(tab)
        }

        if (/nimbus_screnshot_active_tab/.test(tab.url)) {
            nscCore.tabRemove(tabId)
        }

        if (/everhelper\.me\/nimbus-download-image\.html/.test(tab.url)) {
            const access_token_dropbox = tab.url.match(/access_token=([^&]+)/)[1]
            nscCore.tabRemove(tabId)
            if(access_token_dropbox) {
                localStorage.access_token_dropbox = access_token_dropbox;
                await nscCore.setTimeout(200)
                await nscCore.sendAllTabMessage({ action: 'access_dropbox' })
            }
        }

        if (/1b2ef364cb034e4ea520a7382c6caba8/.test(tab.url)) {
            nscExt.setOption('modePremiumNoNimbus', true)
            nscCore.tabRemove(tabId)
        }

        if (/02e7acf518524abbb8b5b129b10c4421/.test(tab.url)) {
            nscExt.setOption('modePremiumNoNimbusGoogleMeet', true)
            nscCore.tabRemove(tabId)
        }

        const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')
        const modePremiumNoNimbusGoogleMeet = nscExt.getOption('modePremiumNoNimbusGoogleMeet')

        if (modePremiumNoNimbus && !modePremiumNoNimbusGoogleMeet && /meet\.google\.com/.test(tab.url)) {
            screenshot.removeVideoButton()
        } else {
            screenshot.addVideoButton()
        }

    } catch (e) {
        // Logger.info(e)
    }

    if (/accounts\.google\.com\/o\/oauth2\/approval/.test(tab.url) && /code=/.test(tab.title) && google_oauth.is_tab) {
        const code = tab.title.match(/.+?code=([\w\/\-]+)/)[1]
        const xhr = new XMLHttpRequest()
        const body = `code=${code}&client_id=${google_oauth.client_id}&client_secret=${google_oauth.client_secret}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto`
        xhr.open('POST', 'https://www.googleapis.com/oauth2/v4/token', true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function () {
            if (xhr.readyState !== 4 && xhr.status !== 200) return
            google_oauth.is_tab = false
            const response = JSON.parse(xhr.responseText)

            if (response.access_token !== undefined && response.refresh_token !== undefined) {
                localStorage.accessTokenGoogle = response.access_token
                localStorage.refresh_token_google = response.refresh_token
                localStorage.expires_in_google = Date.now() + +response.expires_in * 1000

                if (localStorage.appType === 'google') {
                    xhr.open('GET', 'https://nimbusweb.me/auth/openidconnect.php?env=app&provider=google&oauth_email_key=' + response.id_token, true)
                    xhr.send()
                }

                xhr.open('GET', 'https://oauth2.googleapis.com/tokeninfo?id_token=' + response.id_token, true)
                xhr.send()

                if ((localStorage.quickCapture === 'true' && localStorage.enableEdit === 'google') || (localStorage.quickVideoCapture === 'true' && localStorage.enableVideoEdit === 'google')) {
                    nimbus_core.setActiveTab(JSON.parse(localStorage.pageInfo))
                    nimbus_core.toBlob(localStorage.filePatch, screenshot.automatic.send)
                }
                chrome.tabs.remove(tabId)
            } else if (response.email !== undefined) {
                localStorage.googleEmail = response.email
                nscCore.syncSendAllTabMessage({ operation: 'access_google' })
            }
        }
        xhr.onerror = function (err) {
            console.error(err)
        }
        xhr.send(body)
    }
    if (/*info.status === "complete" && *//accounts\.google\.com\/o\/oauth2\/approval/.test(tab.url) && /code=/.test(tab.title) && youtube_oauth.is_tab) {
        const code = tab.title.match(/.+?code=([\w\/\-]+)/)[1]
        const xhr = new XMLHttpRequest()
        const body = `code=${code}&client_id=${youtube_oauth.client_id}&client_secret=${youtube_oauth.client_secret}&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto`
        xhr.open('POST', 'https://www.googleapis.com/oauth2/v4/token', true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function () {
            if (xhr.readyState !== 4 && xhr.status !== 200) return
            youtube_oauth.is_tab = false
            let response = JSON.parse(xhr.responseText)
            if (response.access_token !== undefined && response.refresh_token !== undefined) {
                localStorage.access_token_youtube = response.access_token
                localStorage.refresh_token_youtube = response.refresh_token
                localStorage.expires_in_youtube = +response.expires_in * 1000

                if ((localStorage.quickVideoCapture === 'true' && localStorage.enableVideoEdit === 'youtube')) {
                    nimbus_core.setActiveTab(JSON.parse(localStorage.pageInfo))
                    nimbus_core.toBlob(localStorage.filePatch, screenshot.automatic.send)
                } else {
                    nscCore.syncSendAllTabMessage({ operation: 'access_youtube' })
                }

                chrome.tabs.remove(tabId)
            }
        }
        xhr.onerror = function (err) {
            console.error(err)
        }
        xhr.send(body)
    }
})

chrome.tabs.onActivated.addListener(async function (info) {
    await nscCore.setTimeout(200)
    const tab = await nscCore.tabGet(info.tabId)
    screenshot.currentTab = tab

    const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')
    const modePremiumNoNimbusGoogleMeet = nscExt.getOption('modePremiumNoNimbusGoogleMeet')

    if (modePremiumNoNimbus && !modePremiumNoNimbusGoogleMeet && tab && /meet\.google\.com/.test(tab.url)) {
        screenshot.removeVideoButton()
    } else {
        screenshot.addVideoButton()
        await screenshot.videoRecorder.tabsActivated(tab)
    }

    if (tab && tab.url.search(screenshot.id) !== -1) nscCore.syncSendAllTabMessage({ operation: 'page_extension_activated' })
})

chrome.tabs.onRemoved.addListener(async function (tabId, info) {
    await screenshot.videoRecorder.tabsRemoved({ id: tabId })

    if (JSON.parse(localStorage.pageInfo).id === tabId) {
        screenshot.capture.entire.status = false
        screenshot.capture.entire.parts = []
        screenshot.capture.entire.parts_load = 0

        screenshot.capture.visible.parts = []
        screenshot.capture.selected.parts = []

        screenshot.file.parts = []
    }
})

window.google_oauth = {
    client_id: '330587763390.apps.googleusercontent.com',
    client_secret: 'Wh5_rPxGej6B7qmsVxvGolg8',
    scopes: 'openid email https://www.googleapis.com/auth/drive.readonly.metadata https://www.googleapis.com/auth/drive.file',
    is_tab: false,
    login: function () {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            '&client_id=' + google_oauth.client_id +
            '&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto' +
            '&scope=' + google_oauth.scopes +
            '&access_type=offline' +
            '&response_type=code'
        google_oauth.is_tab = true
        chrome.tabs.create({ url: url })
    },
    refreshToken: function () {
        if (localStorage.refresh_token_google === undefined) {
            this.login()
        } else {
            if (Date.now() < +localStorage.expires_in_google) {
                nscCore.syncSendAllTabMessage({ operation: 'access_google' })
            } else {
                let xhr = new XMLHttpRequest()
                let body = 'refresh_token=' + localStorage.refresh_token_google +
                    '&client_id=' + google_oauth.client_id +
                    '&client_secret=' + google_oauth.client_secret +
                    '&grant_type=refresh_token'

                xhr.open('POST', 'https://www.googleapis.com/oauth2/v4/token', true)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.onload = function () {
                    let response = JSON.parse(xhr.responseText)
                    if (xhr.readyState !== 4 && xhr.status !== 200) return

                    console.log(xhr.responseText)
                    if (response.access_token === undefined || response.expires_in === undefined) return
                    localStorage.accessTokenGoogle = response.access_token
                    localStorage.expires_in_google = Date.now() + +response.expires_in * 1000

                    nscCore.syncSendAllTabMessage({ operation: 'access_google' })
                }
                xhr.onerror = function (err) {
                    console.error(err)
                }
                xhr.send(body)
            }
        }
    }
}

window.youtube_oauth = {
    client_id: '330587763390.apps.googleusercontent.com',
    client_secret: 'Wh5_rPxGej6B7qmsVxvGolg8',
    scopes: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner',
    is_tab: false,
    login: function () {
        let url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            '&client_id=' + window.youtube_oauth.client_id +
            '&redirect_uri=urn:ietf:wg:oauth:2.0:oob:auto' +
            '&scope=' + window.youtube_oauth.scopes +
            '&access_type=offline' +
            '&response_type=code'
        window.youtube_oauth.is_tab = true
        chrome.tabs.create({ url: url })
    },
    refreshToken: function () {
        if (localStorage.refresh_token_youtube === undefined) {
            this.login()
        } else {
            if (Date.now() < +localStorage.expires_in_youtube) {
                nscCore.syncSendAllTabMessage({ operation: 'access_youtube' })
            } else {
                let xhr = new XMLHttpRequest()
                let body = 'refresh_token=' + localStorage.refresh_token_youtube +
                    '&client_id=' + window.youtube_oauth.client_id +
                    '&client_secret=' + window.youtube_oauth.client_secret +
                    '&grant_type=refresh_token'

                xhr.open('POST', 'https://www.googleapis.com/oauth2/v4/token', true)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.onload = function () {
                    if (xhr.readyState !== 4 && xhr.status !== 200) return
                    let response = JSON.parse(xhr.responseText)
                    if (response.access_token === undefined || response.expires_in === undefined) return
                    localStorage.access_token_youtube = response.access_token
                    localStorage.expires_in_youtube = Date.now() + +response.expires_in * 1000

                    nscCore.syncSendAllTabMessage({ operation: 'access_youtube' })

                }
                xhr.onerror = function (err) {
                    console.error(err)
                }
                xhr.send(body)
            }
        }
    }
}
