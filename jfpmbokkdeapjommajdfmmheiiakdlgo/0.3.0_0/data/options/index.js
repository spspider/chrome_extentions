'use strict';

const $ = id => document.getElementById(id);

const notify = (e, delay = 2000) => {
  const status = $('status');
  clearTimeout(notify.id);
  notify.id = setTimeout(() => status.textContent = '', delay);
  status.textContent = e.message || e;
  if (e.message) {
    status.scrollIntoView();
  }
};

const config = {};
config.command = {
  executable: {
    Mac: 'open',
    Win: '%LocalAppData%\\JDownloader 2.0\\JDownloader2.exe',
    Lin: 'JDownloader2'
  },
  args: {
    Mac: '-a "JDownloader2"',
    Win: '',
    Lin: ''
  },
  get guess() {
    const key = navigator.platform.substr(0, 3);
    return {
      executable: config.command.executable[key],
      args: config.command.args[key]
    };
  }
};

// testing your downloader with sample files
$('test').addEventListener('click', () => chrome.tabs.create({
  url: 'https://webbrowsertools.com/test-download-with/'
}));

function restore() {
  $('batch').checked = false;
  $('batch').closest('tr').style = 'opacity: 0.5; pointer-events: none;';

  $('remote').closest('tr').classList.remove('hidden');

  [...document.querySelectorAll('[autostart]')].forEach(e => e.classList.add('disabled'));

  chrome.storage.local.get(Object.assign(config.command.guess, {
    'cookies': false,
    'context.open-video': true,
    'context.open-link': true,
    'context.extract': true,
    'context.grab': true,
    'context.test': true,
    'engine': 'flash/add',
    'delay': 5000,
    'autostart': 1,
    'mimes': [],
    'whitelist': [],
    'remote': 'http://127.0.0.1:9666/'
  }), prefs => {
    $('context.extract').checked = prefs['context.extract'];
    $('args').value = prefs.args;
    $('executable').value = prefs.executable;
    $('context.open-link').checked = prefs['context.open-link'];
    $('cookies').checked = prefs.cookies;
    $('context.grab').checked = prefs['context.grab'];
    $('context.test').checked = prefs['context.test'];
    $('context.open-video').checked = prefs['context.open-video'];
    $('engine').value = prefs.engine;
    $('delay').value = prefs.delay;
    $('autostart').checked = prefs.autostart === 1;
    $('mimes').value = prefs.mimes.join(', ');
    $('whitelist').value = prefs.whitelist.join(', ');
    $('remote').value = prefs.remote;
  });
}

function save() {
  const args = $('args').value;
  const executable = $('executable').value;
  const mimes = $('mimes').value
    .split(/\s*,\s*/).filter((s, i, l) => s && l.indexOf(s) === i && s.indexOf('/') !== -1);
  const cookies = $('cookies').checked;
  const whitelist = $('whitelist').value
    .split(/\s*,\s*/).filter((s, i, l) => s && l.indexOf(s) === i);

  chrome.storage.local.set({
    args,
    cookies,
    executable,
    'context.open-video': $('context.open-video').checked,
    'context.open-link': $('context.open-link').checked,
    'context.extract': $('context.extract').checked,
    'context.grab': $('context.grab').checked,
    'context.test': $('context.test').checked,
    'engine': $('engine').value,
    'autostart': $('autostart').checked ? 1 : 0,
    'delay': Math.max(50, $('delay').value),
    'remote': $('remote').value,
    mimes,
    whitelist
  }, () => {
    notify('Options saved.');
    restore();
  });
}

document.addEventListener('DOMContentLoaded', restore);
$('save').addEventListener('click', save);

// support
$('support').addEventListener('click', () => chrome.tabs.create({
  url: chrome.runtime.getManifest().homepage_url + '&rd=donate'
}));
// reset
$('reset').addEventListener('click', e => {
  if (e.detail === 1) {
    notify('Double-click to reset!');
  }
  else {
    localStorage.clear();
    chrome.storage.local.clear(() => {
      chrome.runtime.reload();
      window.close();
    });
  }
});
// check cookies permission status
$('cookies').addEventListener('change', e => {
  if (e.target.checked) {
    chrome.permissions.request({
      permissions: ['cookies'],
      origins: ['*://*/*']
    }, granted => {
      const lastError = chrome.runtime.lastError;
      if (lastError) {
        notify(lastError, 5000);
      }

      if (!granted) {
        e.target.checked = false;
      }
    });
  }
});
// YT Links
$('yt-linux').addEventListener('click', () => chrome.tabs.create({
  url: 'https://www.youtube.com/watch?v=2asPoW2gJ-c'
}));
$('yt-windows').addEventListener('click', () => chrome.tabs.create({
  url: 'https://www.youtube.com/watch?v=yZAoy8SOd7o'
}));
$('preview').addEventListener('click', () => chrome.tabs.create({
  url: 'https://www.youtube.com/watch?v=vSnZp2wflTc'
}));
