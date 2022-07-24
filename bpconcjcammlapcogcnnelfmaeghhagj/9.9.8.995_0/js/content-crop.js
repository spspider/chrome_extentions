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
    if (window.__nscContentScriptCrop) return;
    window.__nscContentScriptCrop = true;

    window.thisCrop = true;

    const cropStart = async function (image) {
        window.thisCrop = true;
        // document.documentElement.style.overflow = 'hidden';
        afterClearCapture();

        await nscCropper.setImage(image);
        nscCropper.setOptions({wrapperFull: false, scrollEnable: false})
        nscCropper.mounted();
        await nscCropper.openPopup();

        const {x, y, w, h} = await nscCore.sendMessage({operation: 'get_crop_position'})

        if (x && y && w && h) {
            const {pageYOffset, pageXOffset} = window;
            nscCropper.setPoints({x: x + pageXOffset, y: y + pageYOffset, w, h});
            nscCropper.render();
        }
    }

    nscCropper.on('removePopup', function () {
        if (!window.thisCrop) return;
        nscCore.syncSendMessage({operation: 'set_option', key: 'popupActionMessageCrop', value: 'true'});
    })

    nscCropper.on('destroy', function () {
        if (!window.thisCrop) return;
        window.thisCrop = false;
        beforeClearCapture(true);
    })

    nscCropper.on('end', function () {
        if (!window.thisCrop) return;
        const z = window.devicePixelRatio;
        chrome.runtime.sendMessage({operation: 'save_crop_position', value: {z, ...nscCropper.getFinishPoints()}});
    })

    nscCropper.on('action', function (action) {
        if (!window.thisCrop) return;
        console.log('action', action)

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
                chrome.runtime.sendMessage({operation: 'send_to', path: action});
                break;
        }
    })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request)
        if (request.operation === 'crop_data_screen') {
            cropStart(request.dataUrl);
        }
        if (request.operation === 'crop_after_clear_capture') {
            afterClearCapture();
            sendResponse();
        }
    });
}());
