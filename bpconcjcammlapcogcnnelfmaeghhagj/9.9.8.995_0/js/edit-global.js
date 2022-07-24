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

const PATH_EXT = 'filesystem:chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/persistent/'

let nimbus_screen = {
    canvasManager: null,
    canvasDone: document.createElement('canvas'),
    pdf: null,
    dom: {},
    blankScreenCreated: false,
    mathField: null,
    path: PATH_EXT,
    timer: {
        loadingVideo: null
    },
    info: {
        page: JSON.parse(localStorage.pageInfo),
        zoom: window.devicePixelRatio || 1,
        file: {
            image: {
                width: 0,
                height: 0,
                format: localStorage.imageFormat,
                info: JSON.parse(localStorage.imageFileInfo || '{}'),
                patch: localStorage.imageFilePatch,
                origin_patch: localStorage.imageFilePatch,
                blob: null
            },
        },
        first_canvas_width: null,
        first_canvas_height: null
    },
    get: {
        quickCapture: function (cb) {
            chrome.runtime.sendMessage({ operation: 'get_quick_capture' }, cb)
        },
        fileName: function (add_format) {
            let s = nimbus_screen.getLocationParam() === 'video' ? localStorage.fileNamePatternScreencast : localStorage.fileNamePatternScreenshot
            let info = nimbus_screen.info.page
            let url = document.createElement('a')
            url.href = info.url || ''
            s = s.replace(/\{url}/, info.url || '')
                .replace(/\{title}/, info.title || '')
                .replace(/\{domain}/, url.host || '')
                .replace(/\{date}/, info.time.split(' ')[0] || '')
                .replace(/\{time}/, info.time.split(' ')[1] || '')
                .replace(/\{ms}/, info.time.split(' ')[2] || '')
                .replace(/\{timestamp}/, info.time.split(' ')[3] || '')

            return s.replace(/[\*\|\\\:\"\<\>\?\/#]+/ig, '_') + (add_format ? '.' + (nimbus_screen.getLocationParam() === 'video' ? nscFFmpeg.formatConvert : nimbus_screen.info.file.image.format) : '')
        },
        image: {}
    },
    view: {
        classRoomButton: function (url) {
            if (is_chrome) {
                gapi.sharetoclassroom.render('nsc_share_classroom', { 'size': '20', 'url': url })
            }
        },
        showButtonLoad: () => {
            $('#nsc_loading_upload_file, #nsc_save_linked_wrapper').addClass('nsc-hide')
            $('#nsc_save_buttons_wrapper, #nsc_button_back').removeClass('nsc-hide')
        },
        showLoadFile: () => {
            $('#nsc_save_buttons_wrapper, #nsc_save_linked_wrapper, #nsc_button_back').addClass('nsc-hide')
            $('#nsc_loading_upload_file').removeClass('nsc-hide')
        },
        showLinkedFile: (url) => {
            $('#nsc_loading_upload_file, #nsc_save_buttons_wrapper, #nsc_linked_customize, #nsc_linked_change_share, #nsc_linked_upload_private').addClass('nsc-hide')
            $('#nsc_save_linked_wrapper, #nsc_button_back').removeClass('nsc-hide').find('input[name=file-link]')
                .val(url).off('click').on('click', async () => { await nscExt.openPage(url) })

            nimbus_screen.view.classRoomButton(url)
            nimbus_core.copyTextToClipboard(url)
        },
        done: async function () {
            const done_height = $(window).innerHeight() - 215 - 120 - 65
            $('.nsc-done-content').height((done_height < 500 ? 500 : done_height))

            nimbus_screen.dom.$nsc_done_page.removeClass('nsc-hide')
            nimbus_screen.dom.$nsc_redactor_page.addClass('nsc-hide')
            nimbus_screen.dom.$nsc_pre_load.addClass('nsc-hide')

            const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')
            const modePremiumNoNimbusPopup = nscExt.getOption('modePremiumNoNimbusPopup')
            if (modePremiumNoNimbus && !modePremiumNoNimbusPopup) {
                nscExt.setOption('modePremiumNoNimbusPopup', true)
                $('#nsc_popup_mode_premium_no_nimbus').removeClass('nsc-hide')
            }

            googleShare.view.tooltip()
            dropboxShare.setUploadFolderTooltip()
            nimbus_screen.rate_popup.init()

            if (nimbus_screen.getLocationParam() === 'video' && is_chrome) {
                nimbus_screen.view.showButtonLoad()
                $('#nsc_button_slack').hide()
                $('#nsc_button_print').hide()
                $('#nsc_button_back').hide()
                $('#nsc_button_pdf').hide()
                $('#nsc_button_save_image').hide()
                $('#nsc_button_save_video').show()

                nimbus_screen.dom.$app_title.text(chrome.i18n.getMessage('nimbusSaveScreencast'))
                nimbus_screen.dom.$preview_loading.removeClass('nsc-hide').find('.status').text(chrome.i18n.getMessage('labelPreviewLoading'))

                await nscFFmpeg.init()
                nimbus_screen.view.video.preview()

                $('#nsc_preview_file_download, #nsc_preview_reload').addClass('nsc-hide')
            } else {
                $('#nsc_button_youtube').addClass('nsc-hide')
                $('#nsc_preview_img').addClass('nsc-hide')
                $('#nsc_button_save_video').addClass('nsc-hide')
                $('#nsc_enable_watermark').closest('div').removeClass('nsc-hide')

                nimbus_screen.dom.$app_title.text(chrome.i18n.getMessage('nimbusSaveScreenshot'))
                nimbus_screen.dom.$preview_loading.removeClass('nsc-hide').find('[data-i18n]').text(chrome.i18n.getMessage('labelPreviewLoading'))

                if (nimbus_screen.canvasManager) {
                    nimbus_screen.canvasManager.done()
                    const fon = nimbus_screen.canvasManager.getCanvas().fon.canvas
                    const bg = nimbus_screen.canvasManager.getCanvas().background.canvas
                    nimbus_screen.canvasDone.width = fon.width
                    nimbus_screen.canvasDone.height = fon.height
                    nimbus_screen.canvasDone.getContext('2d').drawImage(fon, 0, 0)
                    nimbus_screen.canvasDone.getContext('2d').drawImage(bg, 0, 0)
                } else {
                    try {
                        nimbus_screen.view.showButtonLoad()
                        const screen = await nscExt.imageLoad(nimbus_screen.info.file.image.origin_patch)

                        nimbus_screen.canvasDone.width = screen.width
                        nimbus_screen.canvasDone.height = screen.height
                        nimbus_screen.canvasDone.getContext('2d').drawImage(screen, 0, 0)
                        await nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true')

                    } catch (e) {
                        console.log(e)
                    }
                }

                const patch = nimbus_screen.canvasDone.toDataURL('image/' + (nimbus_screen.info.file.image.format === 'jpg' ? 'jpeg' : 'png'));

                if(nimbus_screen.info.file.image.patch !== patch) {
                    nimbus_screen.view.showButtonLoad()
                }

                nimbus_screen.info.file.image.patch = patch;
                nimbus_screen.canvasDone.toBlob(function (blob) {
                    nimbus_screen.info.file.image.blob = blob
                    nimbus_screen.view.image.preview()
                }, 'image/' + (nimbus_screen.info.file.image.format === 'jpg' ? 'jpeg' : 'png'))

                nscExt.eventValue('user_premium').then((premium) => {
                    const screenshotCount = nscExt.getOption('trialFullPageScreenshotCount', 0)
                    const type = nscExt.getOption('lastTypeScreenshot')
                    const isPopup = nscExt.getOption('isTrialScreenshotPopup', true)
                    const isTrialScreenshot = nscExt.getOption('isTrialScreenshot')

                    if (screenshotCount > 3 && (type === 'capture-entire' || type === 'capture-scroll') && !premium && isPopup && isTrialScreenshot) {
                        nscExt.setOption('isTrialScreenshotPopup', false)
                        nscPopup.addToQueue(document.getElementById('nsc_popup_trial_screenshot'))
                    }
                })
            }

            if (localStorage.getItem('environmentInfo') === 'true') {
                $('#nsc_environment_info').prop('checked', true).trigger('change')
            }
            if (localStorage.slackPanel === 'true' && nimbus_screen.getLocationParam() !== 'video') {
                await slackShare.init()
                if (nimbus_screen.getLocationParam() === 'slack') {
                    $('#nsc_button_slack').click()
                }
            }
            if (localStorage.youtubePanel === 'true' && nimbus_screen.getLocationParam() === 'video') {
                youtubeShare.refreshToken('panel')
            }
            if (window.nimbus_core.language === 'ru') {
                $('#nsc_link_twitter').addClass('nsc-hide')
                $('#nsc_link_facebook').addClass('nsc-hide')
            }

            if (localStorage.appType === 'google') {
                return
            }
            if (localStorage.slackPanel !== 'true' && localStorage.youtubePanel !== 'true') {
                await nscNimbus.init()
            }
        },
        image: {
            weight: function () {
                $('#nsc_indicator_weight').text(nscExt.formatBytes(nimbus_screen.info.file.image.blob.size))
            },
            format: function () {
                $('#nsc_indicator_format').text(nimbus_screen.info.file.image.format.toLowerCase())
            },
            resolution: function () {
                nscExt.imageLoad(nimbus_screen.info.file.image.patch).then((image) => {
                    nimbus_screen.info.file.image.width = image.width
                    nimbus_screen.info.file.image.height = image.height
                    $('#nsc_indicator_size').text(image.width + ' x ' + image.height)
                })
            },
            preview: function (done) {
                if (done === undefined) done = true
                $('#nsc_screen_name').val(window.nimbus_core.getImageFileName(nimbus_screen.info.page))
                $('#nsc_done_youtube_name').val(nimbus_screen.get.fileName(true))
                let $nsc_preview_img = $('#nsc_preview_img')
                let indicator_width = 400
                $nsc_preview_img
                    .attr('src', nimbus_screen.info.file.image.patch)
                    .on('load', async function () {
                        $nsc_preview_img.removeClass('nsc-hide')
                        nimbus_screen.dom.$preview_loading.addClass('nsc-hide')
                        nimbus_screen.dom.$nsc_indicator.removeClass('nsc-hide')
                        await nscCore.setTimeout(100)

                        if ($nsc_preview_img.width() > indicator_width) indicator_width = $nsc_preview_img.width()
                        nimbus_screen.dom.$nsc_indicator.css({ 'max-width': indicator_width })
                        // $(window).trigger('resize')
                    }).off('click').on('click', function () {
                    chrome.runtime.sendMessage({ operation: 'open_page', 'url': nimbus_screen.info.file.image.patch })
                })

                nimbus_screen.view.image.weight()
                nimbus_screen.view.image.resolution()
                nimbus_screen.view.image.format()

                done && $(document).trigger('ready_done')
            },
        },
        video: {
            weight: function () {
                $('#nsc_indicator_weight').text(nscExt.formatBytes(nscFFmpeg.size))
            },
            format: function () {
                $('#nsc_indicator_format').text(nscFFmpeg.formatConvert.toLowerCase())
            },
            resolution: function () {
                $('#nsc_indicator_size').text(nscFFmpeg.width + ' x ' + nscFFmpeg.height)
            },
            preview: function () {
                nimbus_screen.get.quickCapture(function (res) {
                    if (res.quick_video_capture !== 'false') {
                        switch (res.enable_video_edit) {
                            case 'edit':
                                $('#nsc_video_convert button[name=editor]').click()
                                break
                            case 'nimbus':
                                $('#nsc_button_nimbus').click()
                                break
                            case 'google':
                                $('#nsc_button_google').click()
                                break
                            case 'dropbox':
                                $('#nsc_button_dropbox').click()
                                break
                            case 'youtube':
                                $('#nsc_button_youtube').click()
                                break
                            case 'save':
                                $('#nsc_button_save_video').click()
                                break
                        }
                    }
                })

                $('#nsc_screen_name').val(window.nimbus_core.getVideoFileName(nimbus_screen.info.page))
                $('#nsc_done_youtube_name').val(nimbus_screen.get.fileName(true))

                let $nsc_stream_video = $('#nsc_stream_video')
                let $nsc_preview_img = $('#nsc_preview_img')
                let indicator_width = 550
                let nsc_stream_video = $nsc_stream_video[0]

                if (nscFFmpeg.formatConvert === 'webm' || nscFFmpeg.formatConvert === 'mp4') {
                    nsc_stream_video.src = nscFFmpeg.patch + '?' + Math.random()

                    nsc_stream_video.oncanplay = async function () {
                        $nsc_stream_video.removeClass('nsc-hide')
                        nimbus_screen.dom.$preview_loading.addClass('nsc-hide')
                        nimbus_screen.dom.$nsc_indicator.removeClass('nsc-hide')

                        if ($nsc_stream_video.width() > indicator_width) indicator_width = $nsc_stream_video.width()
                        nimbus_screen.dom.$nsc_indicator.css({ 'max-width': indicator_width })
                    }
                } else {
                    $nsc_preview_img
                        .attr('src', nscFFmpeg.patch + '?' + Date.now())
                        .on('load', async function () {
                            $nsc_preview_img.removeClass('nsc-hide')
                            nimbus_screen.dom.$preview_loading.addClass('nsc-hide')
                            nimbus_screen.dom.$nsc_indicator.removeClass('nsc-hide')
                            await nscCore.setTimeout(100)

                            if ($nsc_preview_img.width() > indicator_width) indicator_width = $nsc_preview_img.width()
                            nimbus_screen.dom.$nsc_indicator.css({ 'max-width': indicator_width })
                        }).off('click').on('click',
                        function () {
                            chrome.runtime.sendMessage({
                                operation: 'open_page',
                                'url': nscFFmpeg.patch
                            })
                        })
                }
                if (localStorage.appType !== 'google') {
                    $('#nsc_video_convert').removeClass('nsc-hide')
                }
                nimbus_screen.view.video.weight()
                nimbus_screen.view.video.resolution()
                nimbus_screen.view.video.format()
            },
        }
    },
    getLocationParam: function () {
        const { host, pathname, search } = window.location

        if (chrome.i18n.getMessage('@@extension_id') === host && pathname === '/edit.html' && search) {
            return search.replace('?', '')
        }
        return false
    },
    getEditCanvasSize: function () {
        let width = nimbus_screen.dom.$edit_canvas.width()
        let height = nimbus_screen.dom.$edit_canvas.height()
        if (nimbus_screen.info.first_canvas_width == null) {
            nimbus_screen.info.first_canvas_width = width
        }
        if (nimbus_screen.info.first_canvas_height == null) {
            nimbus_screen.info.first_canvas_height = height
        }

        return {
            w: width,
            h: height,
            fW: nimbus_screen.info.first_canvas_width,
            fH: nimbus_screen.info.first_canvas_height
        }
    },
    setImageToRedactor: function (dataURL, cb) {
        nimbus_screen.canvasManager.undoAll()
        nimbus_screen.canvasManager.loadBackgroundImage(dataURL, function () {
            $('#nsc_drop_file').addClass('nsc-hide')
            $('#nsc_canvas').removeClass('nsc-hide')
            cb && cb()
        })
    },
    setWaterMark: async function (enable, cb) {
        if (localStorage.appType === 'google') return cb && cb()
        $('#nsc_enable_watermark').prop('checked', enable)
        const premium = nscExt.getOption('nimbusPremium')

        try {
            await nscExt.checkWaterMark()

            if (!premium) {
                if (nimbus_screen.canvasManager) {
                    nimbus_screen.canvasManager.setWaterMark()
                    return cb ? cb() : false
                } else {
                    const screen = await nscExt.imageLoad(nimbus_screen.info.file.image.origin_patch)
                    nimbus_screen.canvasDone.getContext('2d').drawImage(screen, 0, 0)
                    return cb ? cb() : false
                }
            } else {
                let canvas = nimbus_screen.canvasDone
                if (nimbus_screen.canvasManager) {
                    canvas = nimbus_screen.canvasManager.getCanvas().fon.canvas
                }
                const watermark = await nscExt.getWaterMark()
                const position = nscExt.getWaterMarkPosition(watermark, canvas)

                if (nimbus_screen.canvasManager) {
                    nimbus_screen.canvasManager.setWaterMark(watermark.toDataURL(), {
                        x: position.x,
                        y: position.y,
                        width: watermark.width,
                        height: watermark.height,
                    }, function () {
                        return cb ? cb() : true
                    })
                } else {
                    const screen = await nscExt.imageLoad(nimbus_screen.info.file.image.origin_patch)
                    nimbus_screen.canvasDone.width = screen.width
                    nimbus_screen.canvasDone.height = screen.height
                    nimbus_screen.canvasDone.getContext('2d').drawImage(screen, 0, 0)
                    nimbus_screen.canvasDone.getContext('2d').drawImage(watermark, position.x, position.y, watermark.width, watermark.height)
                    return cb ? cb() : true
                }
            }
        } catch (e) {
            if (nimbus_screen.canvasManager) {
                nimbus_screen.canvasManager.setWaterMark()
                return cb ? cb() : false
            } else {
                const screen = await nscExt.imageLoad(nimbus_screen.info.file.image.origin_patch)
                nimbus_screen.canvasDone.getContext('2d').drawImage(screen, 0, 0)
                return cb ? cb() : false
            }
        }
    },
    saveFile: function (blob, name, cb) {
        window.requestFileSystem(window.PERSISTENT, 10 * 1024 * 1024 * 1024, function (fs) {
                let truncated = false
                fs.root.getFile(name, { create: true, exclusive: false }, function (fileEntry) {
                    fileEntry.createWriter(function (writer) {
                            writer.onwriteend = function (progress) {
                                if (!truncated) {
                                    truncated = true
                                    this.truncate(this.position)
                                    return
                                }
                                console.log('Write completed', blob, progress)

                                cb && cb()
                            }
                            writer.onerror = function (err) {
                                console.error('Write failed', err)
                            }
                            writer.write(blob)

                        }, function (err) {
                            console.error('Create Writer failed', err)
                        }
                    )
                }, function (err) {
                    console.error('Get File failed', err)
                })
            },
            function (err) {
                console.error('File System failed', err)
            }
        )
    },
    changeWaterMark: function () {
        if (nimbus_screen.canvasManager) {
            nimbus_screen.canvasManager.done()
            nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true', function () {
                const fon = nimbus_screen.canvasManager.getCanvas().fon.canvas
                const bg = nimbus_screen.canvasManager.getCanvas().background.canvas

                nimbus_screen.canvasDone.width = fon.width
                nimbus_screen.canvasDone.height = fon.height
                nimbus_screen.canvasDone.getContext('2d').drawImage(fon, 0, 0)
                nimbus_screen.canvasDone.getContext('2d').drawImage(bg, 0, 0)

                nimbus_screen.info.file.image.patch = nimbus_screen.canvasDone.toDataURL('image/' + (nimbus_screen.info.file.format === 'jpg' ? 'jpeg' : 'png'))
                nimbus_screen.canvasDone.toBlob(function (blob) {
                    nimbus_screen.info.file.image.blob = blob
                    nimbus_screen.view.image.preview(false)
                })
            })
        } else {
            let screen = new Image()
            screen.onload = function () {
                nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true', function () {
                    nimbus_screen.info.file.image.patch = nimbus_screen.canvasDone.toDataURL('image/' + (nimbus_screen.info.file.format === 'jpg' ? 'jpeg' : 'png'))
                    nimbus_screen.canvasDone.toBlob(function (blob) {
                        nimbus_screen.info.file.image.blob = blob
                        nimbus_screen.view.image.preview(false)
                    })
                })
            }
            screen.src = nimbus_screen.info.file.image.origin_patch
        }
    },
    initScreenPage: function (canvas) {
        nimbus_screen.canvasManager = nimbus_screen.dom.$edit_canvas.canvasPaint()
        nimbus_screen.canvasManager.loadBackgroundImage(canvas, async function () {
            nimbus_screen.dom.$nsc_redactor_page.removeClass('nsc-hide')
            nimbus_screen.dom.$nsc_pre_load.addClass('nsc-hide')

            nimbus_screen.dropFileInit()

            nimbus_screen.canvasManager.changeStrokeSize(localStorage.redactorStrokeSize)
            nimbus_screen.canvasManager.changeStrokeColor(localStorage.redactorStrokeColor)
            nimbus_screen.canvasManager.changeFillColor(localStorage.redactorFillColor)
            nimbus_screen.canvasManager.changeShadow({
                enable: localStorage.redactorShadow === 'true',
                blur: localStorage.redactorShadowBlur,
                color: localStorage.redactorShadowColor
            })
            nimbus_screen.canvasManager.setEnableNumbers(localStorage.redactorEnableNumbers === 'true')
            nimbus_screen.canvasManager.setFontFamily(localStorage.redactorFontFamily)
            nimbus_screen.canvasManager.setFontSize(localStorage.redactorFontSize)
            nimbus_screen.canvasManager.undoAll()

            if (nimbus_screen.getLocationParam() === 'popup') {
                await nimbus_screen.canvasManager.setObjects(JSON.parse(localStorage.lastRedactorObject || '[]'))
            }

            if (nimbus_screen.getLocationParam() === 'blank') {
                if (!window.nimbus_core.is_app) {
                    nimbus_screen.dom.$edit_canvas.addClass('nsc-hide')
                    nimbus_screen.dom.$nsc_drop_file.removeClass('nsc-hide')
                    if (window.nimbus_core.is_chrome) {
                        nimbus_screen.dom.$nsc_capture_desktop.removeClass('nsc-hide')
                    }
                    if (localStorage.popupHelperShow !== 'true') {
                        nimbus_screen.dom.$nsc_capture_helper.fadeIn(100)
                    }
                } else {
                    document.querySelector('#nsc_redactor_capture_desktop').classList.add('nsc-hide')
                    nimbus_screen.setImageToRedactor(nimbus_screen.info.file.image.patch)
                    nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true')
                    nimbus_screen.blankScreenCreated = true
                }
            }

            $(document).trigger('ready_redactor')

            if (localStorage.appType !== 'google') {
                await nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true')

                // window.setTimeout(function (canvas) {
                //     nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true');
                // }, 0);
            }

            if (localStorage.redactorDefaultTool === undefined) {
                localStorage.redactorDefaultTool = nimbus_screen.canvasManager.getTools()
                window.nimbus_core.setOption('defaultTool', localStorage.redactorDefaultTool)
            }
            $('[data-tool-id=' + localStorage.redactorDefaultTool + ']').trigger('click')

            let event
            $(document).on('mousemove', function (e) {
                event = e
            }).on('keydown', async function (e) {
                let k = e.keyCode
                let hotkeysSend = JSON.parse(localStorage.hotkeysSendNS)

                if (k === 37 /*left*/ || k === 38 /*up*/ || k === 39 /*right*/ || k === 40 /*down*/) nimbus_screen.canvasManager.move(k)
                if (k === 46 || k === 8) nimbus_screen.canvasManager.delete(e)

                if (e.ctrlKey) {
                    if (e.key === 'v') nimbus_screen.getLocationParam() !== 'popup' && nimbus_screen.canvasManager.paste(event)
                    if (e.key === 'c') nimbus_screen.canvasManager.copy(event)
                    if (k === 90) nimbus_screen.canvasManager.undo()
                    if (k === 89) nimbus_screen.canvasManager.redo()
                    if (k === +hotkeysSend.key && nimbus_screen.getLocationParam() !== 'popup') {
                        if (!nimbus_screen.dom.$nsc_done_page.is(':visible')) {
                            nimbus_screen.dom.$button_done.click()
                            await nscCore.setTimeout(2000)
                        }
                        $('#nsc_send').trigger('click')
                    }
                }

                return true
            })
        })
    },
    dropFileInit: function () {
        const setFile = async function (file) {
            const dataURL = await nscExt.blobToDataUrl(file)

            if (nimbus_screen.getLocationParam() === 'blank' && !nimbus_screen.blankScreenCreated) {
                nimbus_screen.blankScreenCreated = true
                nimbus_screen.setImageToRedactor(dataURL, function () {
                    nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true')
                })
            } else {
                nimbus_screen.canvasManager.loadImageObject(dataURL, {}, function () {
                    nimbus_screen.setWaterMark(localStorage.watermarkEnable === 'true')
                })
            }
        }

        $(document).on('paste', async function (e) {
            if (nimbus_screen.canvasManager) {
                // e.stopPropagation();
                // e.preventDefault();
                let files = e.originalEvent.clipboardData.items
                for (let index in files) {
                    let file = files[index]
                    if (file.kind === 'file') {
                        file = file.getAsFile()
                        await setFile(file)
                    }
                }
            }

        })

        function handleFileSelect (e) {
            e.stopPropagation()
            e.preventDefault()

            let files = e.target.files || (e.dataTransfer && e.dataTransfer.files)
            if (files[0].type.match('image.*')) setFile(files[0])
        }

        function handleDragOver (e) {
            e.stopPropagation()
            e.preventDefault()
        }

        let dropZone = document.getElementById('nsc_drop_file')
        dropZone.addEventListener('dragover', handleDragOver, false)
        dropZone.addEventListener('drop', handleFileSelect, false)

        // $('#nsc_drop_file .receiver').on('dragover', false).on('dragleave', false).on('drop', function (e) {
        //     const files = e.originalEvent.dataTransfer.files;
        //     if (files[0].type.match('image.*')) setFile(files[0]);            //
        // });

        $('#nsc_redactor_open_image').prev('input').on('change', function (e) {
            e.stopPropagation()
            e.preventDefault()

            if (this.files[0].type.match('image.*')) setFile(this.files[0])
            $('#nsc_redactor_open_image').prev('input').prop('value', '')
        })
    },
    rate_popup: {
        info: function (show, date) {
            let obj = JSON.parse(localStorage.getItem('popupRate'))

            if (show !== undefined || date !== undefined) {
                obj = { show: show !== undefined ? show : obj.show, date: date !== undefined ? Date.now() : obj.date }
                localStorage.popupRate = JSON.stringify(obj)
                window.nimbus_core.setOption('popupRate', localStorage.popupRate)
            }
            return obj
        },
        not_show_more: function () {
            nimbus_screen.rate_popup.info(false)
            $('#nsc_nimbus_rate, #nsc_nimbus_rate_top').addClass('nsc-hide')
        },
        support: function () {
            nimbus_screen.rate_popup.info(false)
            chrome.runtime.sendMessage({ operation: 'open_page', 'url': 'https://nimbusweb.me/contact-us.php?utm_source=capture&utm_medium=addon&utm_campaign=edit_page' })
            $('#nsc_nimbus_rate, #nsc_nimbus_rate_top').addClass('nsc-hide')
        },
        feedback: function () {
            nimbus_screen.rate_popup.info(false)
            let url = 'https://chrome.google.com/webstore/detail/bpconcjcammlapcogcnnelfmaeghhagj/reviews'
            if (window.nimbus_core.is_edge) url = 'https://microsoftedge.microsoft.com/addons/detail/nimbus-screenshot-scree/lngaebamompmckcjpaenfkkdcadjigbo'
            chrome.runtime.sendMessage({ operation: 'open_page', 'url': url })
            $('#nsc_nimbus_rate, #nsc_nimbus_rate_top').addClass('nsc-hide')
        },
        init: function () {
            const info = nimbus_screen.rate_popup.info()

            if (info.show) {
                $('#nsc_nimbus_rate_top').removeClass('nsc-hide')

                if (!window.nimbus_core.is_app && +info.date + 3600 * 24 * 6 * 1000 < Date.now()) {
                    nimbus_screen.rate_popup.info(true, true)
                    $('#nsc_nimbus_rate').removeClass('nsc-hide')
                }
            }
        }
    },
    popup: {
        trial: async () => {
            const now = moment(nscExt.getOption('firstTime') + nscExt.trialTime)
            const end = moment()
            const duration = moment.duration(now.diff(end))

            if (nscExt.getOption('isTrialPopupShow') && nscExt.getOption('isTrial') && duration.asDays() > 0) {
                nscPopup.addToQueue(document.getElementById('nsc_popup_trial'))
                nscExt.setOption('isTrialPopupShow', false)
            }
        },
        account: async () => {
            if (nscExt.getOption('popupAccountShow')) {
                const authState = await nscNimbus.authState()
                if (!authState) {
                    nscPopup.addToQueue(document.getElementById('nsc_account_popup'))
                }
                nscExt.setOption('popupAccountShow', false)
            }
        },
    },
    togglePanel: function (panel) {
        $('#nsc_done_no_auth').css('display', panel === undefined ? 'flex' : 'none')
        $('#nsc_done_slack').css('display', panel === 'slack' ? 'flex' : 'none')
        $('#nsc_done_nimbus').css('display', panel === 'nimbus' ? 'flex' : 'none')
        $('#nsc_done_youtube').css('display', panel === 'youtube' ? 'flex' : 'none')
        $('#nsc_send').data('type', panel).trigger('change-type')
        if (panel) {
            window.nimbus_core.setOption('nimbusPanel', panel === 'nimbus')
            window.nimbus_core.setOption('slackPanel', panel === 'slack')
            window.nimbus_core.setOption('youtubePanel', panel === 'youtube')
        }

        let indicator_width = 550
        let $nsc_preview_img = $('#nsc_preview_img')
        if ($nsc_preview_img.attr('src') !== '') {
            if ($nsc_preview_img.width() > indicator_width) indicator_width = $nsc_preview_img.width()
            nimbus_screen.dom.$nsc_indicator.css({ 'max-width': indicator_width })
        } else {
            let $nsc_stream_video = $('#nsc_stream_video')
            if ($nsc_stream_video.width() > indicator_width) indicator_width = $nsc_stream_video.width()
            nimbus_screen.dom.$nsc_indicator.css('max-width', indicator_width)
        }
    },
    getPanel: function (panel) {
        return $(`#nsc_done_${panel}`).css('display') === 'flex'
    },
    showFormulaEditor: function (latex, view) {
        $('#nsc_popup_formula').removeClass('nsc-hide')
        if (view) {
            $('#nsc_insert_formula').addClass('nsc-hide')
            $('#nsc_insert_formula_cancel').addClass('nsc-hide')
            $('#nsc_popup_formula textarea').attr('disabled', true)
        } else {
            this.mathField.$perform(['showVirtualKeyboard'])
        }
        const currentObject = nimbus_screen.canvasManager.getCurrent()
        if (currentObject && currentObject.latex) {
            document.getElementById('nsc_formula_enter').value = currentObject.latex
            nimbus_screen.mathField.$latex(currentObject.latex)
        } else {
            latex = latex || '\\begin{multline}a+b=c\\end{multline}'
            document.getElementById('nsc_formula_enter').value = latex
            nimbus_screen.mathField.$latex(latex)
        }
    },
    hideFormulaEditor: function () {
        const redactorFormulaBtn = document.querySelector('#nsc_redactor_formula')
        redactorFormulaBtn.dataset.on = 'false'
        $('#nsc_popup_formula').addClass('nsc-hide')
        $('#nsc_insert_formula').removeClass('nsc-hide')
        $('#nsc_insert_formula_cancel').removeClass('nsc-hide')
        $('#nsc_popup_formula textarea').attr('disabled', false)
        nimbus_screen.mathField.$perform(['hideVirtualKeyboard'])
    },
    insertFormulaImage: async function (latex) {
        const { imageUrl } = await this.getFormulaImage()

        nimbus_screen.canvasManager.loadImageObject(imageUrl, { latex }, function () {
            document.getElementById('nsc_formula_enter').value = ''
            nimbus_screen.mathField.$latex('')
            nimbus_screen.hideFormulaEditor()
        })
    },
    updateFormulaImage: async function (object, value) {
        const { imageData } = await this.getFormulaImage()
        object.latex = value
        object.w = imageData.width
        object.h = imageData.height
        object.data = imageData
        nimbus_screen.canvasManager.done(true)
        document.getElementById('nsc_formula_enter').value = ''
        nimbus_screen.mathField.$latex('')
        nimbus_screen.hideFormulaEditor()
    },
    getFormulaImage: function () {
        return new Promise(resolve => {
            nimbus_screen.htmlToImage
                .toPng(
                    document
                        .getElementById('nsc_math_field')
                        .querySelector('.ML__mathlive')
                )
                .then((data) => {
                    const i = new Image()
                    i.onload = function () {
                        const canvas = document.createElement('canvas')
                        const ctx = canvas.getContext('2d')
                        canvas.width = i.width
                        canvas.height = i.height
                        ctx.drawImage(i, 0, 0, i.width, i.height)

                        ctx.save()
                        ctx.globalAlpha = 1
                        ctx.setTransform(1, 0, 0, 1, 0, 0)
                        ctx.filter = 'none'
                        ctx.globalCompositeOperation = 'destination-over'
                        ctx.fillStyle = '#ffffff'
                        ctx.fillRect(0, 0, canvas.width, canvas.height)
                        ctx.restore()
                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                        const imageUrl = canvas.toDataURL('image/png')

                        canvas.toBlob((blob) => {
                            canvas.remove()
                            resolve({ imageData, imageUrl, blob })
                        }, 'image/png')
                    }
                    i.src = data
                })
        })
    },
    copyFormula: async function () {
        const { blob: blob } = await this.getFormulaImage()
        const item = new ClipboardItem({ 'image/png': blob })
        navigator.clipboard.write([item])
        nimbus_screen.canvasManager.clearCopyObject()
    },
    saveFormula: async function () {
        const { imageUrl } = await this.getFormulaImage()
        const link = document.createElement('a')
        link.download = 'formula.png'
        link.href = imageUrl
        link.click()
        return link
    }
}
