'use strict';

const links = {
  latest: 'https://api.github.com/repos/belaviyo/native-client/releases/latest',
  releases: 'https://github.com/belaviyo/native-client/releases'
};

document.getElementById('lnk').href = 'https://github.com/belaviyo/native-client/releases';
document.getElementById('win').href = 'https://www.youtube.com/watch?v=yZAoy8SOd7o';
document.getElementById('mac').href = 'https://www.youtube.com/watch?v=2asPoW2gJ-c';

const locales = {
  error: 'Something went wrong! Please download the package manually',
  info: 'Looking for the latest version of the native-client',
  success: 'Download is started. Extract and install when it is done',
  nonative: 'Cannot find the native client. Follow the 3 steps to install the native client'
};

let os = 'windows';
if (navigator.userAgent.indexOf('Mac') !== -1) {
  os = 'mac';
}
else if (navigator.userAgent.indexOf('Linux') !== -1) {
  os = 'linux';
}
document.body.dataset.os = (os === 'mac' || os === 'linux') ? 'linux' : 'windows';

const check = (silent = false, callback = () => {}) => chrome.runtime.sendNativeMessage('com.add0n.native_client', {
  method: 'spec'
}, response => {
  callback(response);
  if (silent) {
    return;
  }
  if (response) {
    notify.show('success', 'Native client version is ' + response.version);
  }
  else {
    notify.show('error', locales.nonative);
  }
});

const notify = (() => {
  const parent = document.getElementById('notify');
  const elems = [];
  return {
    show: (type, msg, delay) => {
      const elem = document.createElement('div');
      elem.textContent = msg;
      elem.dataset.type = type;
      parent.appendChild(elem);
      setTimeout(() => {
        try {
          parent.removeChild(elem);
        }
        catch (e) {}
      }, delay || 3000);
      elems.push(elem);
    },
    destroy: () => {
      elems.forEach(elem => {
        try {
          parent.removeChild(elem);
        }
        catch (e) {}
      });
    }
  };
})();

document.addEventListener('click', e => {
  const target = e.target;
  if (target.dataset.cmd === 'options') {
    chrome.runtime.openOptionsPage();
  }
  else if (target.dataset.cmd === 'download') {
    notify.show('info', locales.info, 60000);
    const req = new window.XMLHttpRequest();
    req.open('GET', links.latest);
    req.responseType = 'json';
    req.onload = () => {
      try {
        chrome.downloads.download({
          url: req.response.assets.filter(a => a.name === os + '.zip')[0].browser_download_url,
          filename: os + '.zip'
        }, () => {
          notify.destroy();
          notify.show('success', locales.success);
          document.body.dataset.step = 1;
        });
      }
      catch (e) {
        notify.show('error', e.message || e);
      }
    };
    req.onerror = () => {
      notify('error', locales.error);
      setTimeout(() => {
        window.open(links.releases);
      }, 5000);
    };
    req.send();
  }
  else if (target.dataset.cmd === 'check') {
    check();
  }
});

check(true, response => {
  if (response && response.version) {
    document.getElementById('followup').dataset.hidden = false;
  }
});
