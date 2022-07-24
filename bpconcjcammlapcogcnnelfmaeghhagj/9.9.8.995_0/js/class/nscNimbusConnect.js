axios.defaults.withCredentials = true;

class nscNimbusConnect {
    constructor() {
        this.dev = false;
        this.log = true;
        this.pending = false;
        this.matchesOrgAutoDomain = false;
        this.client_software = 'screens_chrome';
        this.site = {
            sync: 'https://sync.nimbusweb.me',
            nimbus: 'https://nimbusweb.me',
            // sync: 'http://sync.develop.nimbustest.com',
            // nimbus: 'http://develop.nimbustest.com'
        }
        this.user = {
            authorized: false,
            id: null,
            login: null,
            premium: false,
            usage: {
                current: 0,
                max: 0,
            },
            limits: {
                NOTES_MAX_ATTACHMENT_SIZE: 0,
                NOTES_MAX_SIZE: 0,
                NOTES_MONTH_USAGE_QUOTA: 0,
            }
        }
        this.organizations = [];
        this.workspaces = [];
        this.notes = [];
        this.personalOrganization = null;
        this.premium = null;
    }

    /** @description check is organization private.
     * @return {boolean} is private
     */

    get isOrgPrivate() {
        return this.user.id !== null && localStorage.nimbusOrganizationSelect === 'u' + this.user.id.toString(36);
    }

    /** @description organization select.
     * @return {string}
     */

    get orgSelect() {
        return localStorage.nimbusOrganizationSelect || '';
    }

    /** @description workspace select.
     * @return {string}
     */

    get workSelect() {
        return localStorage.nimbusWorkspaceSelect || '';
    }

    /** @description get short url used dantist_api.
     * @param params Information send to server.
     * @param {string} params.url url
     * @param {string} params.domain? domain.
     * @return {string} short url
     */

    async shortUrl(params) {
        const {url, domain} = params;

        if (localStorage.nimbusAutoShortUrl !== 'false') {
            const formData = new FormData();

            formData.append('url', url);
            domain && formData.append('domain', domain);

            try {
                const {data} = await axios.post('https://nimb.ws/dantist_api.php', formData);
                const {short_url} = data;
                return short_url;
            } catch (error) {
                Logger.error(`Connect dantist_api error, return ${url}`);

                return url;
            }
        }
        return url;
    }

    async req(method = 'get', url = '', obj = {}, headers = {}) {
        this.pending = true;

        localStorage.nimbusSessionId && (headers = {'EverHelper-Session-ID': localStorage.nimbusSessionId, ...headers});
        headers = {'x-api-version': 5, ...headers}

        try {
            const {data} = await axios({
                method: method,
                url: url || this.site.sync,
                data: obj,
                headers: headers
            });

            this.pending = false;
            return data;

        } catch (error) {
            console.log('Connect', error);

            if ($ && $.ambiance) $.ambiance({message: chrome.i18n.getMessage("notificationNetworkError"), timeout: 5});
            this.pending = false;
            return null;
        }
    }

    /** @description notesShare шаринг заметки.
     * @param {array| string} global_id массив заметок/папок, либо строка с global_id, для которой надо отменить шаринг.
     * @param {string} workspaceId Параметр workspaceId может быть опущен, тогда работа будет вестись в воркспейсе, который является воркспейсом по умолчанию для текущего пользователя.
     * @return {object} body
     */

    async notesShare(global_id = [], workspaceId) {
        const {body} = await this.req('post', '', {
            "action": "notes:share",
            "body": {global_id, workspaceId}
        });
        return body;
    }

    /** @description notesUnShare отмена шаринга.
     * @param {array| string} global_id массив заметок/папок, либо строка с global_id, для которой надо отменить шаринг.
     * @param {string} workspaceId Параметр workspaceId может быть опущен, тогда работа будет вестись в воркспейсе, который является воркспейсом по умолчанию для текущего пользователя.
     * @return {object} body
     */

    async notesUnShare(global_id = [], workspaceId) {
        const {body} = await this.req('post', '', {
            "action": "notes:unshare",
            "body": {global_id, workspaceId}
        });
        return body;
    }

    /** @description updateScreencast the nimbus server.
     * @param {string} idToken токен обновления.
     * @param {{title?,commentText?,url?}} data данные для обновления.
     */

    async updateScreencast(idToken, data = {}) {
        const {body} = await this.req('post', '', {
            action: "screencasts:update",
            body: {idToken, screen: data},
        });
        return body;
    }

    /** @description updateScreenshots the nimbus server.
     * @param {string} idToken токен обновления.
     * @param {{title?,commentText?,url?,share?}} data данные для обновления.
     * @param {string} workspaceId Параметр workspaceId может быть опущен, тогда работа будет вестись в воркспейсе, который является воркспейсом по умолчанию для текущего пользователя.
     */

    async updateScreenshots(idToken, data = {}, workspaceId) {
        const {body} = await this.req('post', '', {
            action: "screenshots:update",
            body: {idToken, workspaceId, screen: data},
        });
        return body;
    }

    /** @description createMultipartUpload the nimbus server.
     * @return {object} body
     */

    async createMultipartUpload(size = 0, type = 'video/webm', name = 'video.webm') {
        const {body} = await this.req('post', '', {
            action: "files:createMultipartUpload",
            body: {size, type, name},
        });
        return body;
    }

    /** @description completeMultipartUpload the nimbus server.
     * @return {object} body
     */

    async completeMultipartUpload(id, parts, tempFileName) {
        const {body} = await this.req('post', '', {
            action: "files:completeMultipartUpload",
            body: {id, parts, tempFileName},
        });
        return body;
    }

    /** @description createMultipartUpload the nimbus server.
     * @return {object} body
     */

    async multipartUpload(url = '', file, type = 'video/webm') {
        return new Promise(async function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('put', url);
            xhr.onload = function () {
                const etag = xhr.getResponseHeader('etag').replaceAll('"', '');
                resolve(etag)
            };

            xhr.onerror = function (error) {
                reject(error)
            };

            xhr.send(file);
        });
    }

    /** @description Check premium capture.
     * @param {boolean} popup is open popup.
     * @param {string} utm_campaign key analitick.
     * @return {boolean} is premium
     */

    async checkPremium(popup, utm_campaign = 'premium_banner_savescreen_upgrade') {
        popup = (popup === undefined ? true : !!popup);

        let premium = nscExt.getOption('nimbusPremium');
        // Logger.info(`checkPremium after ${premium}`)

        const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')

        $(`.is-premium-${premium ? 'hide' : 'show'}`).addClass('nsc-hide');
        $(`.is-premium-${premium ? 'show' : 'hide'}`).removeClass('nsc-hide');

        if(modePremiumNoNimbus) {
            $(`.is-premium-hide`).addClass('nsc-hide');
            $(`.is-premium-show`).removeClass('nsc-hide');
            nscExt.setOption('nimbusPremium', true);
            $(document).data('user_premium', true).trigger('user_premium_change');
            return true
        }

        // if (nscExt.checkLocation()) {
        //     utm_campaign += '_' + nscExt.checkLocation();
        // }

        const popupPremium = document.getElementById(localStorage.appType === 'google' ? 'nsc_popup_google_premium' : 'nsc_popup_premium');
        $(popupPremium).find('.nsc-popup-form-actions a').attr('href', `https://nimbusweb.me/capture-pro?utm_source=capture&utm_medium=addon&utm_campaign=${utm_campaign}`)

        try {
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-client-software': 'screens_chrome',
            }

            localStorage.nimbusSessionId && (headers = {'EverHelper-Session-ID': localStorage.nimbusSessionId, ...headers});

            await axios({
                method: 'post',
                url: 'https://capture-pro.everhelper.me/v1/premium',
                data: {"device": {"globalId": localStorage.appGlobalId}},
                headers,
            });

            premium = true;
        } catch (error) {
            const {data} = error.response;
            if (data.reason === 'devicequota') {
                premium = true;
            } else {
                premium = false;
                popup && nscPopup.addToQueue(popupPremium);
            }
        }

        nscExt.setOption('nimbusPremium', premium);
        $(document).data('user_premium', premium).trigger('user_premium_change');

        $(`.is-premium-${premium ? 'hide' : 'show'}`).addClass('nsc-hide');
        $(`.is-premium-${premium ? 'show' : 'hide'}`).removeClass('nsc-hide');

        // Logger.info(`checkPremium before ${premium}`)
        this.premium = premium;
        return premium;
    }

    async authState() {
        let auth = nscExt.getOption('nimbusAuthorized');
        // Logger.info(`authState after ${auth}`)

        $(`.is-auth-${auth ? 'hide' : 'show'}`).addClass('nsc-hide');
        $(`.is-auth-${auth ? 'show' : 'hide'}`).removeClass('nsc-hide');

        const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')

        if(modePremiumNoNimbus) {
            $(`.is-auth--hide`).addClass('nsc-hide');
            $(`.is-auth--show`).removeClass('nsc-hide');
            nscExt.setOption('nimbusAuthorized', true);
            $(document).data('user_auth', true).trigger('user_auth_change');
            return true
        }

        try {
            const {errorCode, body} = await this.req('post', '', {
                "action": "user:authstate",
                "_client_software": this.client_software
            });

            const {authorized, sessionid, matchesOrgAutoDomain, login} = body;

            if (errorCode === 0 && authorized) {
                if (sessionid !== undefined) {
                    localStorage.nimbusSessionId = sessionid;
                }
                if (matchesOrgAutoDomain !== undefined) {
                    this.matchesOrgAutoDomain = matchesOrgAutoDomain;
                }

                auth = true;

                if (localStorage.login !== login) { // clear data;
                    localStorage.login = login;
                    localStorage.nimbusOrganizationSelect = '';
                    localStorage.nimbusWorkspaceSelect = '';
                    localStorage.nimbusFolderSelect = 'default';
                }
            } else {
                const {nimbusSessionId} = localStorage;
                localStorage.removeItem('nimbusSessionId');
                if (nimbusSessionId) {
                    return this.authState()
                } else {
                    auth = false;
                }
            }

            nscExt.setOption('nimbusAuthorized', auth);
            $(document).data('user_auth', auth).trigger('user_auth_change');

            $(`.is-auth-${auth ? 'hide' : 'show'}`).addClass('nsc-hide');
            $(`.is-auth-${auth ? 'show' : 'hide'}`).removeClass('nsc-hide');

            // Logger.info(`authState before ${auth}`)
            return auth;
        } catch (e) {

        }
    }

    /** @description logout user the nimbus.
     * @return {object} info user
     */

    async logout() {
        const {errorCode} = await this.req('post', '', {
            "action": "user:logout",
            "_client_software": this.client_software
        });
        localStorage.removeItem('nimbusSessionId');
        this.matchesOrgAutoDomain = false;
        // this.user.authorized = false;

        return errorCode === 0;
    }

    /** @description Loading info of user from the nimbus server.
     * @return {object} info user
     */

    async getInfo() {
        let premium = nscExt.getOption('nimbusNotePremium');

        $(`.is-note-premium-${premium ? 'hide' : 'show'}`).addClass('nsc-hide');
        $(`.is-note-premium-${premium ? 'show' : 'hide'}`).removeClass('nsc-hide');

        const {errorCode, body} = await this.req('post', '', {
            "action": "user:info",
            "_client_software": this.client_software
        });

        if (errorCode === 0) {
            this.user.id = body.user_id;
            this.user.login = body.login;
            this.user.premium = !!body.premium.active;
            this.user.usage.current = body.usage.notes.current;
            this.user.usage.max = body.usage.notes.max;
            this.user.limits.NOTES_MAX_ATTACHMENT_SIZE = body.limits.NOTES_MAX_ATTACHMENT_SIZE;
        }

        nscExt.setOption('nimbusNotePremium', this.user.premium);
        $(document).data('user_info', true).trigger('user_info_change');

        $(`.is-note-premium-${this.user.premium ? 'hide' : 'show'}`).addClass('nsc-hide');
        $(`.is-note-premium-${this.user.premium ? 'show' : 'hide'}`).removeClass('nsc-hide');

        return body || {};
    }

    /** @description Send to analytics data.
     * @param {boolean} authState is authState.
     * @return {object} response server
     */

    async sendAnalytics(authState) {
        if (authState === undefined) {
            authState = await nscNimbus.authState();
        }

        authState && await this.req('post', 'https://a.nimbusweb.me/e', {
            nonPersonalizedAds: false,
            e: {
                name: "check_auth_addon",
                params: {
                    event_category: "capture",
                    verify: authState,
                    event_label: localStorage.appVersion
                }
            }
        });
    }

    /** @description Set default Select Org/Work/Note.
     * @param {object} items data array.
     * @param {string} id_key id in data key.
     * @param {string} store_key localStorage key.
     * @return {object} default item
     */

    async setDefaultSelect(items, id_key, store_key) {
        if (!items || !items.length) return null;

        // console.log('setDefaultSelect', items, id_key, store_key)

        const search = items.find(item => item[id_key] === localStorage[store_key])

        if (search) {
            return search;
        } else {
            localStorage[store_key] = items[0][id_key];
            return items[0];
        }
    }

    /** @description Loading organizations from the nimbus server.
     * @return {object} default organization
     */

    async getPersonalOrganizations() {
        const globalId = 'u' + this.user.id.toString(36);

        const {errorCode, body} = await this.req('post', '', {
            "action": "orgs:info",
            globalId,
            "_client_software": this.client_software,
        });

        if (errorCode !== 0) {
            console.error('getOrganizations', errorCode, body)
            return []
        }

        const {org} = body;
        this.personalOrganization = org;
        return org;
    }

    /** @description Loading organizations from the nimbus server.
     * @return {object} default organization
     */

    async getOrganizations() {
        const {errorCode, body} = await this.req('post', '', {
            "action": "orgs:getAll",
            "features": {"privateOrgs": true},
            "_client_software": this.client_software,
        });

        if (errorCode !== 0) {
            console.error('getOrganizations', errorCode, body)
            return []
        }

        const {orgs} = body;
        this.organizations = orgs.filter(org => !org.suspended && org.id !== 'u' + this.user.id.toString(36)).sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });

        const [personalOrganization] = orgs.filter(org => org.id === 'u' + this.user.id.toString(36));
        personalOrganization && this.organizations.unshift(personalOrganization);

        return await this.setDefaultSelect(this.organizations, 'id', 'nimbusOrganizationSelect');
    }

    /** @description Loading workspaces from the nimbus server.
     * @return {object} default workspace
     */

    async getWorkspaces(params = {}) {
        // params = {...(nscNimbus.isOrgPrivate ? {orgType: 'private'} : {orgId: nscNimbus.orgSelect}), ...params};
        params = {orgId: nscNimbus.orgSelect, ...params};

        const {errorCode, body} = await this.req('post', '', {
            "action": "notes:getWorkspaces",
            "body": params,
            "_client_software": nscNimbus.client_software,
        });

        if (errorCode !== 0) {
            console.error('getWorkspaces', errorCode, body)
            return [];
        }

        const {workspaces} = body;
        this.workspaces = workspaces.filter(work => !work.isDefault).sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });
        const [workspaceDefault] = workspaces.filter(work => work.isDefault);
        workspaceDefault && this.workspaces.unshift(workspaceDefault);

        return await this.setDefaultSelect(this.workspaces, 'globalId', 'nimbusWorkspaceSelect');
    }

    /** @description Loading notes from the nimbus server.
     * @return {object} default note
     */

    async getNotes() {
        const {errorCode, body} = await this.req('post', '', {
            "action": "notes:getFolders",
            "body": {
                "workspaceId": nscNimbus.workSelect,
            },
            "_client_software": nscNimbus.client_software,
        });

        if (errorCode !== 0) {
            console.error('getNotes', errorCode, body)
            return [];
        }

        const {notes} = body;
        this.notes = notes.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            return 0;
        });

        return await this.setDefaultSelect(this.notes, 'global_id', 'nimbusFolderSelect');
    }

    /** @description Rendering info.
     * @return {void}
     */

    async viewInfo() {
        await this.getInfo();

        const $usage_group = $('#nsc_nimbus_usage_group');
        const progress = this.user.usage.current / this.user.usage.max * 100;
        const current = nscExt.formatBytes(this.user.usage.current);
        const max = nscExt.formatBytes(this.user.usage.max);
        const limitUsage = chrome.i18n.getMessage("nimbusLimitUsage");
        const limitOf = chrome.i18n.getMessage("nimbusLimitOf");

        $usage_group.find('.nsc-aside-usage-text').text(`${limitUsage} ${current} ${limitOf} ${max}`);
        $usage_group.find('.nsc-aside-usage-line-colored').width(progress);
        $('#nsc_nimbus_email').text(this.user.login);
        $('#nsc_nimbus_private_share').prop('checked', nscExt.getOption('nimbusShare'));

        if (progress > 90) {
            $('#nsc_nimbus_upgrade_pro').removeClass('nsc-hide');
            $usage_group.find('.nsc-aside-usage-line-colored').css({background: '#ff0000'});
        }
    }

    /** @description Rendering organizations in page done.
     * @return {void}
     */

    async viewOrganizations() {
        const _self = this;
        const $nsc_select_organization = $('#nsc_select_organization');
        let ul = $nsc_select_organization.find('.nsc-aside-select-dropdown ul').empty();

        const defOrganization = await _self.getOrganizations();
        $nsc_select_organization.find('.nsc-aside-select-text').text(defOrganization.title).data('id', defOrganization.id);
        nscExt.setOption('orgCNameUsed', !!defOrganization.domain);

        for (const organization of this.organizations) {
            ul.append(
                $('<li>', {
                    'class': 'nsc-aside-select-dropdown-item',
                    'flex': '',
                    'layout': '',
                    'layout-align': 'start center'
                })
                    .data('id', organization.id)
                    .data('title', organization.title)
                    .data('domain', organization.domain)
                    .append($('<div>', {
                        'class': 'nsc-aside-select-dropdown-item-title',
                    }).text(organization.title))
                    .on('click', async function (e) {
                        $nsc_select_organization.find('.nsc-aside-select-dropdown').removeClass('active');
                        $nsc_select_organization.find('.nsc-aside-select-text').text($(this).data('title')).data('id', $(this).data('id'));
                        if (localStorage.nimbusOrganizationSelect === $(this).data('id')) return;
                        nscExt.setOption('nimbusOrganizationSelect', $(this).data('id'));
                        nscExt.setOption('orgCNameUsed', !!$(this).data('domain'));
                        $('#nsc_done_nimbus .nsc-aside-main').addClass('nsc-loading');
                        await _self.viewWorkspaces();
                        await _self.viewNotes();
                        $('#nsc_done_nimbus .nsc-aside-main').removeClass('nsc-loading');
                    })
            );
        }
    }

    /** @description Rendering workspaces in page done.
     * @return {void}
     */

    async viewWorkspaces() {
        const _self = this;
        const $nsc_select_workspaces = $('#nsc_select_workspaces');
        let ul = $nsc_select_workspaces.find('.nsc-aside-select-dropdown ul').empty();

        const defWorkspaces = await _self.getWorkspaces();
        $nsc_select_workspaces.find('.nsc-aside-select-text').html(defWorkspaces.title).data('id', defWorkspaces.globalId);

        for (let workspace of _self.workspaces) {
            // if (workspace.access && workspace.access.role === 'reader') continue;

            let destruction = '';
            if (workspace.user) {
                if (workspace.user.id === _self.user.id) destruction = 'Business workspace'; // персональные шаренные (пищем количество мемберов)
                else destruction = workspace.user.email; // бизнес проекты (пишем емайл овнера).
            } else if (workspace.userId === _self.user.id) {
                if (workspace.countMembers > 0) destruction = workspace.countMembers + ' users'; // персональные шаренные (пищем количество мемберов)
                else destruction = 'Personal workspace'; // персональными (пишем Personal)
            } else {
                destruction = workspace.org.user.email; // шаренные (пишем владельца проекта)
            }

            ul.append(
                $('<li>', {
                    'class': 'nsc-aside-select-dropdown-item',
                    'flex': '',
                    'layout': '',
                    'layout-align': 'start center'
                })
                    .data('id', workspace.globalId)
                    .data('title', workspace.title)
                    .append($('<div>', {
                        'class': 'nsc-aside-select-dropdown-item-title',
                    }).text(workspace.title))
                    .append($('<div>', {
                        'class': 'nsc-aside-select-dropdown-item-destruction',
                    }).text(destruction))
                    .on('click', async function (e) {
                        $nsc_select_workspaces.find('.nsc-aside-select-dropdown').removeClass('active');
                        $nsc_select_workspaces.find('.nsc-aside-select-text').text($(this).data('title')).data('id', $(this).data('id'));
                        if (localStorage.nimbusWorkspaceSelect === $(this).data('id')) return;
                        localStorage.nimbusWorkspaceSelect = $(this).data('id');
                        $('#nsc_done_nimbus .nsc-aside-main').addClass('nsc-loading');
                        await _self.viewNotes();
                        $('#nsc_done_nimbus .nsc-aside-main').removeClass('nsc-loading');
                    })
            );
        }
    }

    /** @description Rendering notes in page done.
     * @return {void}
     */

    async viewNotes() {
        const _self = this;
        let nsc_select_folder = $('#nsc_select_folder');
        let ul = nsc_select_folder.find('ul').empty();

        const defNote = await _self.getNotes();

        for (let note of _self.notes) {
            ul.append(
                $('<li>', {'data-id': note.global_id})
                    .addClass(function () {
                        if (defNote.global_id === note.global_id) return 'nsc-aside-list-selected';
                    })
                    .append(
                        $('<a>', {
                            'href': '#',
                            'text': note.title,
                            'data-id': note.global_id
                        }).on('click', function () {
                            if (localStorage.nimbusFolderSelect === $(this).data('id')) return;
                            nsc_select_folder.find('li').removeClass('nsc-aside-list-selected').filter(this.closest('li')).addClass('nsc-aside-list-selected');
                            localStorage.nimbusFolderSelect = $(this).data('id');
                            return false;
                        })
                    ).append(
                    $('<span>', {
                        'class': 'nsc-icon nsc-fast-send',
                        'title': chrome.i18n.getMessage("tooltipUploadTo") + ' ' + note.title,
                        'data-id': note.global_id
                    }).on('click', function () {
                        $('#nsc_send').data('channel', $(this).data('id')).trigger('click');
                    })
                )
            );
        }
    }

    /** @description Init nimbus panel in done page
     * @return {boolean} is auth nimbus
     */

    async init() {
        const modePremiumNoNimbus = nscExt.getOption('modePremiumNoNimbus')

        if(modePremiumNoNimbus) {
            return true;
        }

        const authState = await this.authState();
        if (authState) {
            if (nimbus_screen.getPanel('nimbus')) return;

            if (!this.matchesOrgAutoDomain) {
                $('#nsc_nimbus_email').text('Loading ...');
                $('#nsc_done_nimbus .nsc-aside-main').addClass('nsc-loading');
                nimbus_screen.togglePanel('nimbus');
                await this.viewInfo();
                await this.viewOrganizations();
                await this.viewWorkspaces();
                await this.viewNotes();
                $('#nsc_aside_main_nimbus').removeClass('nsc-loading');
                $('#nsc_send').data('type', 'nimbus').trigger('change-type');
            } else {
                $('#nsc_button_nimbus, #nsc_button_quick, #nsc_button_slack, .nsc-trigger-panel-container.dropbox').addClass('nsc-hide');
                $('#nsc_nimbus_logout_link').removeClass('nsc-hide');
            }
        } else {
            nimbus_screen.togglePanel();
        }

        const premium = await nscNimbus.checkPremium(false);

        if (!premium) {
            $('#nsc_upgrade_to_nimbus_pro').removeClass('nsc-hide')
        } else {
            $('#nsc_upgrade_to_nimbus_pro').addClass('nsc-hide')
        }

        if (!premium && is_chrome && nimbus_screen.getLocationParam() === 'video' && nscExt.getOption('isTrialPopupShow')) {
            await nimbus_screen.popup.trial();
        } else {
            await nimbus_screen.popup.account();
        }

        return authState;
    }
}

const nscNimbus = new nscNimbusConnect();


// $('#nsc_nimbus_email').text('Loading ...');
// $('#nsc_done_nimbus .nsc-aside-main').addClass('nsc-loading');
// nimbus_screen.togglePanel('nimbus');
// nscNimbus.viewInfo();
// nscNimbus.viewOrganizations();
// nscNimbus.viewWorkspaces();
// nscNimbus.viewNotes();
// $('#nsc_aside_main_nimbus').removeClass('nsc-loading');
// $('#nsc_send').data('type', 'nimbus').trigger('change-type');
