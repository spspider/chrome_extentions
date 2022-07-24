(() => {
    if (window.nscInjGmail) {
        return
    }

    class nscInjectGmail {
        constructor () {
            const config = {
                attributes: true,
                childList: true,
                subtree: true
            }

            chrome.runtime.onMessage.addListener(function (req) {
                const { operation, site, action, title, url } = req

                if (operation === 'content_automation_send_url' && site === 'gmail') {
                    const label = chrome.i18n.getMessage(`labelInsert${action === 'image' ? 'Screenshot' : 'Screencast'}`)

                    const html = document.getElementsByClassName('Am Al editable LW-avf')[0].innerHTML
                    const skip = '<div><br></div>'
                    // const image = dataUrl ? `<img style="display: flex;margin-right: 5px" src="${dataUrl}" alt="${title}">` : '';
                    const link = `<a href="${url}" target="_blank" style="display: flex;color: #4d799a; text-decoration: none; cursor: pointer">${label}</a>`
                    const content = `${skip}<div style="display: flex;width: 100%;align-items: center;flex-direction: row;background-color: #f9f9f9; padding: 10px"><div>${title}${link}</div></div>${skip}`

                    document.getElementsByClassName('Am Al editable LW-avf')[0].innerHTML = html + content
                }
            });

            (async () => {
                const { injectGmailScreenshot } = await nscCore.sendMessage({ operation: 'get_local_storage' })

                if (injectGmailScreenshot === 'true' && window.location.host === 'mail.google.com') {
                    const observer = new MutationObserver((mutationsList) => {
                        this.observerCallback({ mutationsList })
                    })
                    observer.observe(document, config)
                }
            })()
        }

        observerCallback ({ mutationsList }) {
            for (let mutation of mutationsList) {
                const { target } = mutation;
                const { classList } = target;
                if (classList.contains('aoP') && !document.getElementById(':nsc')) {
                    const current = target.getElementsByClassName('gU Up')[0]
                    const parent = current.parentNode;
                    const container = document.createElement('td')
                    container.classList.add('a8X', 'gU')
                    // container.style.position = 'relative';
                    // container.style.zIndex = '1';
                    container.id = ':nsc';

                    const injectPopup = document.createElement('div')
                    injectPopup.id = 'nsc_gmail_inject_popup'
                    injectPopup.style.fontSize = '.875rem'
                    injectPopup.style.transform = 'translate(-50%, 0)'
                    injectPopup.style.marginBottom = '10px';
                    injectPopup.style.display = 'none';
                    injectPopup.style.backgroundColor = '#fff';
                    injectPopup.style.position = 'absolute';
                    injectPopup.style.zIndex = '111';
                    injectPopup.style.bottom = '100%';
                    injectPopup.style.left = '0';
                    injectPopup.style.border = '1px solid #ccc';
                    injectPopup.style.borderRadius = '3px';

                    const screenshotContainer = document.createElement('div')
                    screenshotContainer.style.display = 'flex';
                    screenshotContainer.style.padding = '10px';
                    screenshotContainer.onclick = () => {
                        this.screenshot()
                        injectPopup.style.display = 'none';
                    }

                    screenshotContainer.onmouseenter = () => {
                        screenshotContainer.style.backgroundColor = '#f1f1f1';
                    }

                    screenshotContainer.onmouseleave = () => {
                        screenshotContainer.style.backgroundColor = 'transparent';
                    }

                    const screenshotButton = document.createElement('div')
                    screenshotButton.classList.add('aaA')
                    screenshotButton.style.backgroundImage = `url('${chrome.runtime.getURL('images/video/inject-screenshot.svg')}')`
                    screenshotButton.style.backgroundPosition = 'center'
                    screenshotButton.style.backgroundRepeat = 'no-repeat'
                    screenshotButton.style.backgroundSize = '20px'
                    screenshotButton.style.marginRight = '5px'

                    const screenshotText = document.createElement('div')
                    screenshotText.innerText = chrome.i18n.getMessage('btnInjectGmailScreenshot')

                    screenshotContainer.appendChild(screenshotButton)
                    screenshotContainer.appendChild(screenshotText)
                    injectPopup.appendChild(screenshotContainer)

                    const screencastContainer = document.createElement('div')
                    screencastContainer.style.display = 'flex'
                    screencastContainer.style.padding = '10px';
                    screencastContainer.onclick = () => {
                        this.screencast()
                        injectPopup.style.display = 'none'
                    }

                    screencastContainer.onmouseenter = () => {
                        screencastContainer.style.backgroundColor = '#f1f1f1';
                    }

                    screencastContainer.onmouseleave = () => {
                        screencastContainer.style.backgroundColor = 'transparent';
                    }

                    const screencastButton = document.createElement('div')
                    screencastButton.classList.add('aaA')
                    screencastButton.style.backgroundImage = `url('${chrome.runtime.getURL('images/video/inject-screencast.svg')}')`
                    screencastButton.style.backgroundPosition = 'center'
                    screencastButton.style.backgroundRepeat = 'no-repeat'
                    screencastButton.style.backgroundSize = '20px'
                    screencastButton.style.marginRight = '5px'

                    const screencastText = document.createElement('div')
                    screencastText.innerText = chrome.i18n.getMessage('btnInjectGmailScreencast')

                    screencastContainer.appendChild(screencastButton)
                    screencastContainer.appendChild(screencastText)
                    injectPopup.appendChild(screencastContainer)

                    const injectContainer = document.createElement('div')
                    injectContainer.classList.add('wG', 'J-Z-I')
                    injectContainer.style.marginRight = '4px'
                    injectContainer.style.zIndex = '1';

                    const injectButton = document.createElement('div')
                    injectButton.classList.add('aaA')
                    injectButton.style.backgroundImage = `url('${chrome.runtime.getURL('images/icons/24x24.png')}')`
                    injectButton.style.backgroundPosition = 'center'
                    injectButton.style.backgroundRepeat = 'no-repeat'
                    injectButton.style.backgroundSize = '20px'
                    injectButton.setAttribute('data-tooltip', chrome.i18n.getMessage('btnInjectGmailMain'))

                    injectButton.onclick = () => {
                        if (injectPopup.style.display === 'none') {
                            injectPopup.style.display = 'block'
                        } else {
                            injectPopup.style.display = 'none'
                        }
                    }

                    injectContainer.appendChild(injectButton)
                    injectContainer.appendChild(injectPopup)
                    container.appendChild(injectContainer)

                    parent.insertBefore(container, current.nextSibling)
                }
            }
        }

        sendMessage (data, cb) {
            try {
                chrome.runtime.sendMessage(data, cb)
            } catch (e) {
            }
        }

        screenshot () {
            this.sendMessage({
                operation: 'content_automation',
                action: 'image',
                type: 'capture-window',
                auth: 'nimbus',
                site: 'gmail'
            })
        }

        screencast () {
            this.sendMessage({ operation: 'set_option', key: 'videoRecordIsStream', value: 'true' })
            this.sendMessage({ operation: 'set_option', key: 'videoCameraEnable', value: 'true' })
            this.sendMessage({
                operation: 'content_automation',
                action: 'video',
                type: 'desktop',
                auth: 'nimbus',
                site: 'gmail'
            })
        };
    }

    window.nscInjGmail = new nscInjectGmail()
})()

