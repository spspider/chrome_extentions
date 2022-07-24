$(document).ready(async function () {
    nscExt.initI18n()

    const sendMessage = (data, cb) => {
        try {
            chrome.runtime.sendMessage(data, cb)
        } catch (e) {
        }
    }

    const nextStep = () => {
        const currentStep = $('.section.active').data('step')
        const nextStep = currentStep + 1

        $('.step').removeClass('active')
        $('.section').removeClass('active')
        $(`.section[data-step="${nextStep}"]`).addClass('active')
        $(`.step[data-step="${nextStep}"]`).addClass('active')
    }

    const isAuth = await nscNimbus.authState()

    if (isAuth) {
        nextStep()
    }

    $('#nsc_open_register_nimbus').on('click', function () {
        $(this).closest('.nsc-popup-actions').addClass('nsc-hide')
        $('#nsc_form_register_nimbus').closest('.nsc-popup-actions').removeClass('nsc-hide')
    })

    $('#nsc_open_login_nimbus').on('click', function () {
        $(this).closest('.nsc-popup-actions').addClass('nsc-hide')
        $('#nsc_form_login_nimbus').closest('.nsc-popup-actions').removeClass('nsc-hide')
    })

    $('#nsc_form_login_nimbus').on('submit', function () {
        const { email, password } = this.elements;

        if (password.value.length < 8) {
            $(password).addClass('wrong').focus()
            $.ambiance({ message: chrome.i18n.getMessage('tooltipPassInfo'), type: 'error', timeout: 5 })
            return false
        }
        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus()
            $.ambiance({ message: chrome.i18n.getMessage('tooltipWrongEmail'), type: 'error', timeout: 5 })
            return false
        }

        nimbusShare.server.user.auth(email.value, password.value, function (res) {
            if (res.errorCode === 0) {
                nextStep()
            } else {
                $.ambiance({ message: chrome.i18n.getMessage('notificationLoginFail'), type: 'error', timeout: 5 })
            }
        })

        return false
    })

    $('#nsc_form_register_nimbus').on('submit', function () {
        const { email, password } = this.elements;

        if (password.value.length < 8) {
            $(password).addClass('wrong').focus()
            $.ambiance({ message: chrome.i18n.getMessage('tooltipPassInfo'), type: 'error', timeout: 5 })
            return false
        }

        if (!/\S+@\S+\.\S+/.test(email.value)) {
            $(email).addClass('wrong').focus()
            $.ambiance({ message: chrome.i18n.getMessage('tooltipWrongEmail'), type: 'error', timeout: 5 })
            return false
        }

        nimbusShare.server.user.register({
            login: email.value,
            password: password.value,
            meta: JSON.stringify({referer: `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/welcome.html`})
            }, function (res) {
            if (res.errorCode === 0) {
                nimbusShare.server.user.auth(email.value, password.value, function (res) {
                    if (res.errorCode === 0) {
                        nextStep()
                    } else {
                        $.ambiance({
                            message: chrome.i18n.getMessage('notificationLoginFail'),
                            type: 'error',
                            timeout: 5
                        })
                    }
                })
            } else if (res.errorCode === -4) {
                $.ambiance({ message: chrome.i18n.getMessage('notificationEmailFail'), type: 'error', timeout: 5 })
            } else {
                $.ambiance({ message: chrome.i18n.getMessage('notificationRegisterFail'), type: 'error', timeout: 5 })
            }
        })
        return false
    })

    $('#nsc_connect_to_google').on('click', function (e) {
        window.open('https://nimbusweb.me/auth/openidconnect.php?env=app&provider=google', '_blank')
    })

    $('#nsc_connect_to_facebook').on('click', function (e) {
        window.open('https://nimbusweb.me/auth/openidconnect.php?env=app&provider=facebook', '_blank')
    })

    $('.section__permissions-btn').on('click', () => {
        const permissionFirstBlock = $('.section__wrapper-permission')
        const permissionRequestBlock = $('.section__wrapper-request')
        const permissionErrorBlock = $('.section__wrapper-error')

        permissionFirstBlock.removeClass('active')
        permissionRequestBlock.addClass('active')

        nscVideo.getUserMedia().then(function (stream) {
            localStorage.videoMicSoundEnable = 'true'
            localStorage.videoCameraEnable = 'true'

            stream.stop()
            nextStep()
        }).catch(function () {
            localStorage.videoMicSoundEnable = 'false'
            localStorage.videoCameraEnable = 'false'

            permissionRequestBlock.removeClass('active')
            permissionErrorBlock.addClass('active')
        })
    })

    $('.section__pin-btn, .section__permission-error-btn, .promo__button-1, .promo__button-2').on('click', nextStep)
    $('.section__record-btn').on('click', (e) => {
        if ($(e.target).data('type') === 'screencast') {
            sendMessage({ operation: 'set_option', key: 'videoRecordIsStream', value: 'false' })
            sendMessage({ operation: 'set_option', key: 'videoCameraEnable', value: 'true' })
            sendMessage({
                operation: 'content_automation',
                action: 'video',
                type: 'desktop',
                auth: false,
                site: false
            })
        } else {
            sendMessage({
                operation: 'content_automation',
                action: 'image',
                type: 'capture-window',
                auth: false,
                site: false
            })
        }

        // window.close()
    })

    chrome.runtime.onMessage.addListener(function ({ operation }) {
        if (operation === 'access_nimbus') {
            nextStep()
        }
    })
})


