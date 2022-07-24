'use strict';

// try to remove the old injected iframe
try {
  window.iframe.remove();
}
catch (e) {}

window.iframe = document.createElement('iframe');
chrome.storage.local.get({
  width: 750,
  height: 650
}, prefs => {
  const {width, height} = prefs;
  window.iframe.setAttribute('style', `
    position: fixed;
    border: none;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
    max-width: 80%;
    width: ${width}px;
    max-height: 90%;
    height: ${height}px;
    background-color: #f0f0f0;
    margin: auto;
    box-shadow: 0 0 0 10000px rgba(0, 0, 0, 0.3);
    z-index: 10000000000;
  `);
  window.iframe.src = chrome.runtime.getURL('data/grab/index.html?mode=' + window.mode);
  document.body.appendChild(window.iframe);
});

(cb => {
  document.addEventListener('click', e => {
    if (window.iframe && window.iframe.contains(e.target) === false) {
      cb();
    }
  });
  chrome.runtime.onMessage.addListener(request => {
    if (request.cmd === 'close-interface') {
      cb();
    }
  });
})(() => {
  if (window.iframe) {
    window.iframe.remove();
    window.iframe = null;
  }
});
