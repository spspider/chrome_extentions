(async function () {
    if (!/\?(.+)$/.test(window.location.href)) {
        window.close();
    }

    const match = window.location.href.match(/\?([^?]+)\??([^?]+)?/);
    const constraints = JSON.parse((match[1] ?? '{}').replace(/%22/g, '"'));
    const params = JSON.parse((match[2] ?? '{}').replace(/%22/g, '"'));

    const closeParent = () => {
        try {
            window.parent.postMessage(JSON.stringify({
                action: 'nsc_frame_remove',
                value: 'nsc_frame_media_access'
            }), '*');

        } catch (e) {

        }
    }

    const sendMessage = (data) => {
        try {
            chrome.runtime.sendMessage(data);
        } catch (e) {
        }
    }

    try {
        const stream = await nscVideo.getUserMedia(constraints);
        stream.stop();
    } catch (e) {
        console.error(e)
        if (constraints.video) sendMessage({operation: 'set_option', key: 'videoCameraEnable', value: 'false'});
        if (constraints.audio) sendMessage({operation: 'set_option', key: 'videoMicSoundEnable', value: 'false'});
        sendMessage({ operation: 'content_popup', action: 'nsc_popup_media_access_open'});
        document.getElementById('nsc_access_error').style.display = 'block';
    } finally {
        params && sendMessage({operation: 'activate_record', 'key': 'start', params: JSON.stringify(params)});
        closeParent();
        window.close();
    }
})();
