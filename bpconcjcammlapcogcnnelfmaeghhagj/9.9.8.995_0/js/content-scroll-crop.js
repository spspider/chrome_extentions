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

(function () {
    if (window.__nscContentScriptScrollCrop) return;
    window.__nscContentScriptScrollCrop = true;

    window.thisScrollCrop = true;

    async function scrollCrop() {
        afterClearCapture(true);
        window.thisScrollCrop = true;
        nscCropper.setOptions();
        nscCropper.mounted();
        await nscCropper.openPopup();

        const {x, y, w, h} = await nscCore.sendMessage({operation: 'get_crop_scroll_position'})

        if (x && y && w && h) {
            const {pageYOffset, pageXOffset} = window;
            nscCropper.setPoints({x: x + pageXOffset, y: y + pageYOffset, w, h});
            nscCropper.render();
        }
    }

    nscCropper.on('removePopup', function () {
        if (!window.thisScrollCrop) return;
        nscCore.syncSendMessage({operation: 'set_option', key: 'popupActionMessageCrop', value: 'true'});
    })

    nscCropper.on('destroy', () => {
        if (!window.thisScrollCrop) return;
        window.thisScrollCrop = false;
        beforeClearCapture(true);
    })

    nscCropper.on('end', function () {
        if (!window.thisScrollCrop) return;
        const z = window.devicePixelRatio;
        nscCore.syncSendMessage({operation: 'save_crop_scroll_position', value: {z, ...nscCropper.getFinishPoints()}})
    })

    nscCropper.on('action', function (action) {
        if (!window.thisScrollCrop) return;

        switch (action) {
            case 'edit':
            case 'download':
            case 'nimbus':
            case 'slack':
            case 'google':
            case 'quick':
            case 'print':
            case 'pdf':
            case 'copy_to_clipboard':
                nscCore.syncSendMessage({operation: 'send_to', path: `${action}_scroll`});
                break;
        }
    })

    chrome.runtime.onMessage.addListener(({operation}) => {
        if (operation === 'scroll_crop_data_screen') {
            scrollCrop();
        }
    });

}());
