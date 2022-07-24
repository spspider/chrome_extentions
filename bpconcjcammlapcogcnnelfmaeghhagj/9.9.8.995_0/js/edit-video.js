$(document).ready(function () {
    let $nsc_video_player = $('#nsc_video_player')
    let $nsc_video_loading = $('#nsc_video_loading')
    let $nsc_video_container = $('#nsc_video_container')

    let $nsc_video_time_line_box = $('#nsc_video_time_line_box')
    let $nsc_video_time_line = $('#nsc_video_time_line')
    let $nsc_video_time_line_segments = $('#nsc_video_time_line_segments')
    let $nsc_video_timeline_choose = $('#nsc_video_timeline_choose')
    let $nsc_video_time = $('#nsc_video_time')
    let $nsc_video_pause = $('#nsc_video_pause')
    let $nsc_video_play = $('#nsc_video_play')
    let $nsc_video_zoom_range = $('#nsc_video_zoom_range')
    let $nsc_video_button_trim = $('#nsc_video_button_trim')
    let $nsc_video_button_open_trim = $('#nsc_video_button_open_trim')
    let $nsc_video_button_cancel_trim = $('#nsc_video_button_cancel_trim')
    let $nsc_video_button_trim_window = $('#nsc_video_button_trim_window')

    let $nsc_video_zoom_time = $('#nsc_video_zoom_time')
    let $nsc_video_crop = $('#nsc_video_crop')
    let $nsc_video_blur = $('#nsc_video_blur')
    let $nsc_discard = $('#nsc_discard')
    let $nsc_done_video = $('#nsc_done_video')

    let player = $nsc_video_player[0]
    let duration = 0
    let select_crop_start = false
    let select_crop_finish = false
    let start_crop = 0
    let finish_crop = 0
    let position_crop = false
    let position_blur = false
    let cropper = null
    let ratio = 1
    let step = 60

    async function crop () {
        $nsc_video_container.addClass('loading')
        $nsc_video_pause.trigger('click')
        $nsc_video_loading.find('[data-i18n]').text(chrome.i18n.getMessage('labelPreviewLoadingVideo'))

        await nscFFmpeg.crop(position_crop)

        $nsc_video_player.attr('src', nscFFmpeg.patch + '?' + Date.now()).on('loadedmetadata', function () {
            $nsc_video_container.removeClass('loading')
        })
    }

    async function trim () {
        const start = Math.ceil(start_crop / step * ratio)
        const finish = Math.floor(finish_crop / step * ratio)

        if (start === 0 && finish === 0) {
            alert('Nothing selected to trim/cut!')
            return
        }

        $nsc_video_container.addClass('loading')
        $nsc_video_button_cancel_trim.trigger('click')
        $nsc_video_pause.trigger('click')
        $nsc_video_loading.find('[data-i18n]').text(chrome.i18n.getMessage('labelPreviewLoadingVideo'))

        let s = 0
        let f = 0

        if (start === 0 || finish === 0) {
            if (finish === 0) {
                f = start
            } else {
                s = finish
                f = duration
            }
            nscFFmpeg.isCropDuration = true
            // nscFFmpeg.failed = true
            await nscFFmpeg.trim(s, f)
            nscFFmpeg.isCropDuration = false
            await nscFFmpeg.readFile()
        } else {
            f = start

            nscFFmpeg.isCropDuration = true
            await nscFFmpeg.trim(s, f, `video_trim1.${nscFFmpeg.formatConvert}`)
            $nsc_video_loading.find('[data-i18n]').text(chrome.i18n.getMessage('labelPreviewLoadingVideo').replace('-', '30%'))
            s = finish
            f = duration

            await nscFFmpeg.trim(s, f, `video_trim2.${nscFFmpeg.formatConvert}`)
            $nsc_video_loading.find('[data-i18n]').text(chrome.i18n.getMessage('labelPreviewLoadingVideo').replace('-', '60%'))
            await nscFFmpeg.concat([`video_trim1.${nscFFmpeg.formatConvert}`, `video_trim2.${nscFFmpeg.formatConvert}`])
            nscFFmpeg.isCropDuration = false
        }

        $nsc_video_player.attr('src', nscFFmpeg.patch + '?' + Date.now())
            .on('loadedmetadata', () => {
                $nsc_video_container.removeClass('loading')
            })

        start_crop = 0
        finish_crop = 0
    }

    function createCoords () {
        if ($('#ns_crop_button').length) {
            $('#ns_crop_button').removeClass('nsc-hide')
            return
        }

        const $ns_crop_buttons = $('<div/>', {
            'id': 'ns_crop_button',
            'class': 'ns-crop-buttons bottom'
        })

        $('<button/>', {
            html: '<i></i><span>' + chrome.i18n.getMessage('cropBtnSave') + '</span>',
            'class': 'ns-btn save'
        }).on('click', async function () {
            const premium = await nscNimbus.checkPremium(true, 'premium_banner_video_editor')
            if (!premium) return

            if (cropper) {
                $('#nsc_crop').remove()
                $nsc_video_crop.removeClass('active')
                $nsc_video_blur.removeClass('active')
                cropper && cropper.destroy()
                cropper = null
            }
            player.pause()
            if (position_crop) await crop()
        }).appendTo($ns_crop_buttons)

        $('<button/>', {
            html: '<i></i><span>' + chrome.i18n.getMessage('cropBtnCancel') + '</span>',
            'class': 'ns-btn cancel'
        }).on('click', function () {
            $('#nsc_crop').remove()
            $nsc_video_crop.removeClass('active')
            cropper && cropper.destroy()
            cropper = null
        }).appendTo($ns_crop_buttons)

        $('.cropper-crop-box').append($ns_crop_buttons)
    }

    function shadowScroll (data) {
        $('.cropper-modal').css('background-color', 'transparent')

        const { width, height } = document.getElementById('nsc_crop_image')

        const page = { w: width, h: height }

        if (!$('.cropper-shadow').length) {
            $('.cropper-modal')
                .append($('<div/>').addClass('cropper-shadow cropper-shadow-top'))
                .append($('<div/>').addClass('cropper-shadow cropper-shadow-left'))
                .append($('<div/>').addClass('cropper-shadow cropper-shadow-right'))
                .append($('<div/>').addClass('cropper-shadow cropper-shadow-bottom'))
        }

        $('.cropper-shadow-top').css({
            left: data.x,
            width: data.width,
            height: data.y
        })
        $('.cropper-shadow-bottom').css({
            top: data.y + data.height,
            left: data.x,
            width: data.width,
            height: page.h - data.height - data.y
        })
        $('.cropper-shadow-right').css({
            left: data.x + data.width,
            width: page.w - data.width - data.x
        })
        $('.cropper-shadow-left').css({
            width: data.x
        })
    }

    const getTimeLineSegment = function (left, text) {
        if (text) {
            return $('<div>').addClass('nsc-ve-time-segment').css('left', left).append(
                $('<span>').addClass('nsc-ve-time-segment-text').text(text)
            )
        } else {
            return $('<div>').addClass('nsc-ve-time-segment').css('left', left)
        }
    }

    const getTimeString = function (duration) {
        const house = Math.floor(duration / 3600)
        const minute = Math.floor(duration / 60) - house * 60
        const second = Math.floor(duration - house * 3600 - minute * 60)

        return {
            text: (house < 10 ? '0' + house : house) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second),
            house: house,
            minute: minute,
            second: second
        }
    }

    const searchRatio = function (width, cb) {
        step = width / duration * ratio
        if (step < 70) {
            ratio = ratio + 1
            searchRatio(width, cb)
            return
        }
        cb && cb()
    }

    const getZoom = function () {
        return 1
        // return +$nsc_video_zoom_range.val() / 20 + 1;
    }

    const setCropPosition = () => {
        if (select_crop_start || select_crop_finish) {
            const start = start_crop / step * ratio
            const finish = finish_crop / step * ratio
            const time = (player.currentTime - start) * 100

            if (select_crop_start) {
                player.currentTime = start
                $('#nsc_video_time_line_cursor').animate({ 'left': start / ratio * step - 0.5 }, time, 'linear')
            } else {
                player.currentTime = finish
                $('#nsc_video_time_line_cursor').animate({ 'left': finish / ratio * step - 0.5 }, time, 'linear')
            }

            select_crop_start = false
            select_crop_finish = false
        }
    }

    $nsc_video_zoom_time.text(getZoom() + ' / 100')
    $nsc_video_time_line_box.css('overflow', 'hidden')

    player.onloadedmetadata = function () {
        nimbus_screen.dom.$nsc_pre_load.addClass('nsc-hide')
        nimbus_screen.dom.$nsc_video_page.removeClass('nsc-hide')
        $nsc_video_pause.addClass('nsc-hide')

        // duration = Math.floor(nscFFmpeg.duration)
        duration = Math.floor(player.duration)

        $nsc_video_time.text(getTimeString(player.currentTime).text + ' - ' + getTimeString(duration).text)

        const width_time_line = $nsc_video_time_line.width()

        $nsc_video_time_line_segments.empty()
        searchRatio(width_time_line, function () {
            for (let current = 0; current < width_time_line; current += step) {
                if (current + step >= width_time_line && current + 70 <= width_time_line) {
                    $nsc_video_time_line_segments.append(getTimeLineSegment(width_time_line - 1, getTimeString(width_time_line / step * ratio).text, false, true))
                }
                $nsc_video_time_line_segments.append(getTimeLineSegment(current, getTimeString(current / step * ratio).text, current === 0, false))
            }
        })
    }

    player.ontimeupdate = function () {
        if (player.currentTime > duration) {
            player.currentTime = 0
            player.pause()
            $('#nsc_video_time_line_cursor').stop().css({ 'left': player.currentTime / ratio * step - 0.5 })
        } else {
            $('#nsc_video_time_line_cursor').stop().animate({ 'left': player.currentTime / ratio * step - 0.5 }, 250, 'linear')
        }

        $nsc_video_time.text(getTimeString(player.currentTime).text + ' - ' + getTimeString(duration).text)
    }

    player.onplay = function () {
        $nsc_video_play.addClass('nsc-hide')
        $nsc_video_pause.removeClass('nsc-hide')
    }

    player.onpause = function () {
        $nsc_video_play.removeClass('nsc-hide')
        $nsc_video_pause.addClass('nsc-hide')
    }

    $nsc_video_play.on('click', function () {
        if ($nsc_video_container.hasClass('loading')) return

        player.play()
    })

    $nsc_video_pause.on('click', function () {
        if ($nsc_video_container.hasClass('loading')) return

        player.pause()
    })

    $nsc_video_button_open_trim.on('click', function () {
        if ($nsc_video_container.hasClass('loading')) return

        if (!localStorage.videoEditorTrim) {
            $('#nsc_popup_video_trim').removeClass('nsc-hide').find('img').attr('src', chrome.runtime.getURL('images/help/trim.gif')).end().find('.nsc-button-primary').on('click', function () {
                localStorage.videoEditorTrim = true
                $nsc_video_button_open_trim.trigger('click')
            })
            return
        }

        if (cropper) {
            $('#nsc_crop').remove()
            $nsc_video_crop.removeClass('active')
            cropper && cropper.destroy()
            cropper = null
        }

        if ($nsc_video_button_trim_window.is(':visible')) {
            $nsc_video_button_cancel_trim.trigger('click')
        } else {
            player.pause()
            $nsc_video_button_trim_window.removeClass('nsc-hide')
            $nsc_video_timeline_choose.css({
                left: 0,
                right: 0
            }).removeClass('nsc-hide')
        }
    })

    $nsc_video_button_cancel_trim.on('click', function () {
        $nsc_video_button_trim_window.addClass('nsc-hide')
        $nsc_video_timeline_choose.addClass('nsc-hide')
        select_crop_start = false
        select_crop_finish = false
        start_crop = 0
        finish_crop = 0
    })

    $nsc_video_button_trim.on('click', async function () {
        if ($nsc_video_container.hasClass('loading')) return

        const premium = await nscNimbus.checkPremium(true, 'premium_banner_video_editor')
        if (!premium) return

        player.pause()
        await trim()
    })

    $nsc_video_zoom_range.on('input', function () {
        if ($nsc_video_container.hasClass('loading')) return

        const zoom = getZoom()

        if (zoom === 1) $nsc_video_time_line_box.css('overflow', 'hidden')
        else $nsc_video_time_line_box.css('overflow', 'auto')

        $nsc_video_button_cancel_trim.trigger('click')
        $nsc_video_zoom_time.text(zoom + ' / 100')

        player.onloadedmetadata()
    })

    $nsc_video_time_line
        .on('mousemove', function (e) {
            const currentTime = player.currentTime
            const offset = $nsc_video_time_line.offset()

            if (select_crop_start) {
                $nsc_video_timeline_choose.css({ left: (e.pageX - offset.left) + 'px' })
                start_crop = e.pageX - offset.left
                player.pause()
            }

            if (select_crop_finish) {
                $nsc_video_timeline_choose.css({ right: offset.left + $nsc_video_time_line.width() - e.pageX + 'px' })
                finish_crop = e.pageX - offset.left
                player.pause()
            }

            if (select_crop_start || select_crop_finish) {
                if (window.innerWidth - e.pageX < 200) {
                    $nsc_video_time_line_box.stop().animate({ scrollLeft: $nsc_video_time_line_box.scrollLeft() + (200 - (window.innerWidth - e.pageX)) }, 200)
                }

                if (e.pageX < 200) {
                    $nsc_video_time_line_box.stop().animate({ scrollLeft: $nsc_video_time_line_box.scrollLeft() + (e.pageX - 200) }, 200)
                }

                $nsc_video_time.text(getTimeString(currentTime).text + ' - ' + getTimeString(duration).text)
            }
        })
        .on('mousedown', function (e) {
            if ($nsc_video_container.hasClass('loading')) return

            const offset = $nsc_video_time_line.offset()

            if ($(e.target).hasClass('nsc-ve-timeline-choose-handler-left') || $(e.target).closest('.nsc-ve-timeline-choose-handler-left').length) {
                start_crop = e.pageX - offset.left
                select_crop_start = true
            }
            if ($(e.target).hasClass('nsc-ve-timeline-choose-handler-right') || $(e.target).closest('.nsc-ve-timeline-choose-handler-right').length) {
                finish_crop = e.pageX - offset.left
                select_crop_finish = true
            }
        })
        .on('mouseup', function (e) {
            let currentTime = player.currentTime

            if (!select_crop_start && !select_crop_finish) {
                const offset = $nsc_video_time_line.offset()
                const offsetX = e.pageX - offset.left
                currentTime = offsetX / step * ratio
                if (currentTime > duration) {
                    currentTime = duration
                }
                player.currentTime = currentTime
                $('#nsc_video_time_line_cursor').stop().css({ 'left': currentTime / ratio * step - 0.5 })
            }

            setCropPosition()
        })
        .on('mouseleave', setCropPosition)

    $nsc_video_crop.on('click', function () {
        if ($nsc_video_container.hasClass('loading')) {
            return
        }

        if ($nsc_video_timeline_choose.is(':visible') || $nsc_video_button_trim_window.is(':visible')) {
            $nsc_video_button_cancel_trim.trigger('click')
        }

        if (!localStorage.videoEditorCrop) {
            $('#nsc_popup_video_crop').removeClass('nsc-hide').find('img').attr('src', chrome.runtime.getURL('images/help/crop.gif'))
                .end().find('.nsc-button-primary').on('click', function () {
                localStorage.videoEditorCrop = true
                $nsc_video_crop.trigger('click')
            })
            return
        }

        if (cropper) {
            $('#nsc_crop').remove()
            $nsc_video_crop.removeClass('active')
            $nsc_video_blur.removeClass('active')
            cropper && cropper.destroy()
            cropper = null
            return
        }

        $nsc_video_crop.addClass('active')
        const w = $nsc_video_player.width()
        const h = $nsc_video_player.height()
        let zoom = 0

        if (w / player.videoWidth < h / player.videoHeight) {
            zoom = w / player.videoWidth
        } else {
            zoom = h / player.videoHeight
        }

        const canvas = document.createElement('canvas')
        canvas.id = 'nsc_crop_image'
        canvas.width = player.videoWidth * zoom
        canvas.height = player.videoHeight * zoom

        const $bg = $('<div/>', { id: 'nsc_crop' })
        $bg.css('z-index', 1)
        $bg.css('position', 'absolute')
        $bg.css('left', '50%')
        $bg.css('top', 0)
        $bg.css('margin-left', -canvas.width / 2)
        $bg.css('width', canvas.width)
        $bg.css('height', canvas.height)

        $bg.append(canvas)
        $nsc_video_player.before($bg)

        const image = document.getElementById('nsc_crop_image')
        cropper = new Cropper(image, {
            autoCrop: false,
            zoomable: false,
            viewMode: 1,
            toggleDragModeOnDblclick: false,
            ready () {
                $('.cropper-bg').css('background-image', 'inherit')
            },
            cropstart: () => {
                const data = cropper.getData(true)

                createCoords(data)

                $('#ns_crop_button').addClass('nsc-hide')
            },
            cropend: (e) => {
                const data = cropper.getData(true)

                position_crop = { x: data.x / zoom, y: data.y / zoom, w: data.width / zoom, h: data.height / zoom }
                position_blur = false

                createCoords(data)
            },
            crop: () => {
                const data = cropper.getData(true)
                shadowScroll(data)
            }
        })
    })

    $nsc_discard.on('click', async function () {
        if ($nsc_video_container.hasClass('loading')) return

        const result = confirm('Return the original file?')
        if (result) {
            $('#nsc_crop').remove()
            $nsc_video_crop.removeClass('active')
            cropper && cropper.destroy()
            cropper = null

            const blob = await nscExt.urlToBlob(`${PATCH}${localStorage.videoLastName}.${localStorage.videoLastFormat}`)

            nscFFmpeg.nameConvert = localStorage.videoLastName
            nscFFmpeg.formatConvert = localStorage.videoLastFormat
            nscFFmpeg.saveNewInfo(blob, `${localStorage.videoLastName}.${localStorage.videoLastFormat}`)

            $nsc_done_video.trigger('click')
        }
    })

    $nsc_done_video.on('click', function () {
        if ($nsc_video_container.hasClass('loading')) return

        player.pause()
        nimbus_screen.dom.$nsc_video_page.addClass('nsc-hide')
        nimbus_screen.dom.$button_done.click()
    })
})
