(() => {
    if (window.nscCore) {
        return;
    }

    class nscChromeCore {

        constructor() {
            this.log = true;
        }

        tabRemove(tabId) {
            chrome.tabs.remove(tabId);
        }

        async tabGet(tabId) {
            return new Promise(function (resolve, reject) {
                try {
                    chrome.tabs.get(tabId, resolve)
                } catch (e) {
                    resolve(false)
                }
            });
        }

        async tabQuery(query) {
            return new Promise(function (resolve, reject) {
                chrome.tabs.query(query, resolve);
            });
        }

        async tabActive() {
            return new Promise(async (resolve, reject) => {
                const [tab] = (await this.tabQuery({active: true, currentWindow: true}));

                if (!tab) return reject('Not search page');
                if (!/^chrome/.test(tab.url) && !/chrome.google.com\/webstore/.test(tab.url)) {
                    resolve(tab)
                } else {
                    reject('Is chrome page or webstore page')
                }
            });
        }

        async sendTabMessage(tab, data) {
            const label = 'sendTabMessage ' + (data.operation || Date.now().toString());
            // console.time(label);
            if (!tab) {
                tab = (await this.tabActive());
            }

            return new Promise(function (resolve, reject) {
                if (tab) {
                    chrome.tabs.sendMessage(tab.id, data, {}, function (param) {
                        // console.timeEnd(label);
                        resolve(param)
                    });
                } else {
                    // console.timeEnd(label);
                    reject('No send message to tab. Search tab Active!')
                }
            });
        }

        syncSendTabMessage(tab, data) {
            (async () => {
                if (!tab) tab = (await this.tabActive());

                if (tab) chrome.tabs.sendMessage(tab.id, data, {});
            })()
        }

        async sendAllTabMessage(data, notId) {
            let _self = this;

            // const label = 'sendAllTabMessage ' + (data.operation || Date.now().toString());
            // console.time(label);

            const tabs = await _self.tabQuery({});
            const promises = tabs.map(async (tab) => {
                if ((+tab.id !== +notId)) {
                    return await _self.sendTabMessage(tab, data);
                }
            })

            // console.timeEnd(label);
            return await Promise.all(promises);
        }

        syncSendAllTabMessage(data) {
            // const label = 'syncSendAllTabMessage ' + (data.operation || Date.now().toString());
            // console.time(label);
            (async () => {
                const tabs = await this.tabQuery({});
                tabs.forEach((tab) => {
                    chrome.tabs.sendMessage(tab.id, data);
                })
                // console.timeEnd(label);
            })()
        }

        async sendMessage(data) {
            return new Promise(async function (resolve) {
                chrome.runtime.sendMessage(data, resolve);
            });
        }

        syncSendMessage(data) {
            // console.log(data)
            chrome.runtime.sendMessage(data);
        }

        async executeScript(file, tab) {
            // console.log('executeScript', file)
            return new Promise(async (resolve, reject) => {
                try {
                    if (!tab) {
                        tab = await this.tabActive();
                    }
                    if (/\.js/.test(file)) {
                        chrome.tabs.executeScript(tab.id, {file: file}, resolve);
                    } else {
                        chrome.tabs.executeScript(tab.id, {code: file}, resolve);
                    }
                } catch (e) {
                    reject(e)
                }
            });
        }

        async executeFiles(files, tab) {
            // const label = 'executeFiles ' + (files || Date.now().toString());
            // console.time(label);

            if (!Array.isArray(files)) files = [files];

            if (!tab) {
                tab = await this.tabActive()
            }

            await Promise.all(
                files.map(async (file) => {
                    if (/\.css$/.test(file)) {
                        chrome.tabs.insertCSS(tab.id, {file: file});
                    } else {
                        await this.executeScript(file, tab)
                    }
                })
            )
            // console.timeEnd(label);
            return tab;
        };

        async checkContentReady() {
            return new Promise(async (resolve, reject) => {
                await this.executeScript('js/content-check-content-ready.js').catch(reject)
                await this.sendTabMessage(null, {operation: 'nsc_content_check_ready'}).then(resolve).catch(reject)
            });
        }

        async setTimeout(timeout) {
            if (timeout === undefined) timeout = 0;
            return new Promise(function (resolve, reject) {
                window.setTimeout(resolve, timeout)
            });
        };

        async tabCreate(option) {
            return new Promise(function (resolve) {
                chrome.tabs.create(option, resolve);
            });
        };

        async windowCreate(url, param) {
            param = Object.assign({}, {
                type: 'popup',
                left: screen.width / 4,
                top: screen.height / 4,
                width: screen.width / 2,
                height: screen.height / 2,
            }, param)

            return new Promise(function (resolve, reject) {
                // console.log('windows create', url, param)
                chrome.windows.create({
                    url: url,
                    ...param
                }, resolve);
            });
        };

        async windowRemove(window) {
            return new Promise(function (resolve, reject) {
                // console.log('windows remove', window)
                chrome.windows.remove(window.id, resolve)
            });
        };

        async captureVisibleTab() {
            const {windowId = null} = nscExt.pageInfo;
            const format = nscExt.imgFormat;
            const quality = nscExt.imageQuality;

            return new Promise(async (resolve) => {
                chrome.tabs.captureVisibleTab(windowId, {format, quality}, resolve);
            });
        }

        async commandsGetAll() {
            return new Promise((resolve) => {
                chrome.commands.getAll(resolve);
            });
        };

        async storageGet(key) {
            return new Promise((resolve) => {
                chrome.storage.sync.get(key ? [key] : null, (storage) => {
                    resolve(key ? storage[key] : storage)
                })
            });
        };

        async storageSet(data) {
            chrome.storage.sync.set(data);
        };

        async storageClear() {
            const keys = Object.keys(await nscCore.storageGet())
            return new Promise((resolve) => {
                chrome.storage.sync.remove(keys, (storage) => {
                    resolve(storage)
                })
            });
        };

        async onMessage(cb) {
            chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
                await cb(request)/*.then(sendResponse)*/;
                return true;
            });
        };

        async oneMessage(operation) {
            return new Promise(async function (resolve, reject) {
                // let timeout = setTimeout(function () {
                //     reject(false);
                // }, 1000 * 60 * 30); // timeout error 30 min

                function onMessage(request) {
                    switch (request.operation) {
                        case operation:
                            // clearInterval(timeout);
                            chrome.runtime.onMessage.removeListener(onMessage);
                            resolve(request);
                            break;
                    }
                }

                chrome.runtime.onMessage.addListener(onMessage);

                chrome.runtime.sendMessage({operation: operation + '_is'}, function (request) {
                    // clearInterval(timeout);
                    chrome.runtime.onMessage.removeListener(onMessage);
                    resolve(request)
                });
            });
        };
    }

    window.nscCore = new nscChromeCore();
})()



