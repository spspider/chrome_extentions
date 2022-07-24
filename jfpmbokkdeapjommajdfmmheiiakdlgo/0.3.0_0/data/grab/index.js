'use strict';

const notify = message => chrome.runtime.sendMessage({
  method: 'notify',
  message
});
const args = new URLSearchParams(location.search);
const cache = [];

const analyze = tr => new Promise(resolve => {
  const type = (type, url) => {
    const mimes = {
      ...['jpeg', 'jpg', 'bmp', 'gif', 'png'].reduce((p, c) => {
        p[c] = 'image/' + c;
        return p;
      }, {}),
      ...['mp3', 'wav', 'wma', 'ogg'].reduce((p, c) => {
        p[c] = 'audio/' + c;
        return p;
      }, {}),
      ...['mp4', 'flv', 'avi', 'mov', 'wmv'].reduce((p, c) => {
        p[c] = 'video/' + c;
        return p;
      }, {}),
      'html': 'text/html',
      'pdf': 'application/pdf',
      'exe': 'application/octet-stream',
      'zip': 'application/zip',
      'tar.gz': 'application/gzip',
      'rar': 'application/x-rar-compressed'
    };
    for (const [ext, mime] of Object.entries(mimes)) {
      if (url.indexOf('.' + ext + '?') !== -1 || url.endsWith('.' + ext)) {
        return mime;
      }
    }
    return (type || 'unknown').split(';')[0];
  };

  const next = r => {
    tr.querySelector('[data-id=type]').textContent =
      tr.dataset.type = type(r || '', tr.link);
    resolve();
  };

  const req = new XMLHttpRequest();
  req.open('GET', tr.link);
  req.timeout = 10000;
  req.ontimeout = req.onerror = () => next('');
  req.onreadystatechange = () => {
    if (req.readyState === req.HEADERS_RECEIVED) {
      const r = req.getResponseHeader('content-type') || '';
      next(r);
      req.abort();
    }
  };
  req.send();
});

const resolve = async () => {
  for (let i = 0; i < cache.length; i += 5) {
    await Promise.all(cache.slice(i, i + 5).map(analyze));
  }
};

const tbody = document.querySelector('tbody');
const next = links => {
  links.filter((s, i, l) => s && l.indexOf(s) === i).forEach(link => {
    const t = document.getElementById('tr');
    const clone = document.importNode(t.content, true);
    const tr = clone.querySelector('tr');
    tr.link = clone.querySelector('[data-id=link]').textContent = link;
    tbody.appendChild(clone);
    cache.push(tr);
  });
  resolve();
};

if (args.get('mode') === 'serve') {
  chrome.runtime.sendMessage({
    method: 'extracted-links'
  }, next);
}
else {
  chrome.runtime.sendMessage({
    method: 'exec'
  }, resp => {
    next([].concat([], ...resp));
  });
}

//
document.addEventListener('change', ({target}) => {
  if (target.id === 'toggle-select') {
    [...document.querySelectorAll('tbody tr input')].forEach(input => input.checked = target.checked);
  }
  else if (target.id === 'hide-unknown') {
    document.body.dataset.unknown = !target.checked;
  }
  else if (target.id === 'hide-html') {
    document.body.dataset.html = !target.checked;
  }
  // update counter
  const inputs = [...document.querySelectorAll('tbody input[type=checkbox]:checked')]
    // make sure element is visible
    .filter(input => input.clientHeight);
  document.getElementById('download').value = inputs.length ? `Download (${inputs.length})` : 'Download';
  document.getElementById('copy').inputs = document.getElementById('download').inputs = inputs;
  document.getElementById('copy').disabled = document.getElementById('download').disabled = inputs.length === 0;
});

document.addEventListener('click', async e => {
  const cmd = e.target.dataset.cmd || '';
  if (cmd === 'image/' || cmd === 'application/pdf' || cmd === 'application/') {
    [...document.querySelectorAll('tbody tr input')].forEach(input => input.checked = false);

    const trs = [...document.querySelectorAll('tbody tr')]
      .filter(tr => tr.dataset.type && tr.dataset.type.startsWith(cmd));
    trs.forEach(tr => {
      const input = tr.querySelector('input');
      input.checked = true;
    });
    document.querySelector('tbody').dispatchEvent(new Event('change', {
      bubbles: true
    }));
  }
  else if (cmd === 'download') {
    chrome.storage.local.get({
      delay: 5000
    }, async prefs => {
      for (const finalUrl of e.target.inputs.map(input => input.closest('tr').link)) {
        chrome.runtime.sendMessage({
          method: 'download',
          job: {finalUrl}
        }, () => chrome.runtime.lastError);

        await new Promise(resolve => setTimeout(resolve, prefs.delay));
      }
    });
  }
  else if (cmd === 'copy') {
    const links = e.target.inputs.map(input => input.closest('tr').link);
    navigator.clipboard.writeText(links.join('\n')).catch(e => {
      const el = document.createElement('textarea');
      el.value = links.join('\n');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      const r = document.execCommand('copy');
      document.body.removeChild(el);
      if (!r) {
        throw e;
      }
    }).then(
      () => notify(links.length + ' link(s) copied to the clipboard'),
      e => notify(e.message)
    );
  }
});
//
document.addEventListener('click', ({target}) => {
  if (target.closest('tbody') && target.tagName !== 'INPUT') {
    const tr = target.closest('tr');
    const input = tr.querySelector('input');
    input.checked = !input.checked;
    input.dispatchEvent(new Event('change', {
      bubbles: true
    }));
  }
});
//
document.getElementById('matched').addEventListener('input', e => {
  [...document.querySelectorAll('tbody tr input')].forEach(input => input.checked = false);

  const value = e.target.value;
  const trs = value.length > 2 ? [...document.querySelectorAll('tbody tr')]
    .filter(tr => tr.textContent.toLowerCase().indexOf(value.toLowerCase()) !== -1) : [];
  trs.forEach(tr => {
    const input = tr.querySelector('input');
    input.checked = true;
  });
  document.querySelector('tbody').dispatchEvent(new Event('change', {
    bubbles: true
  }));
});

// persisting preferences
const prefs = {
  persist: {}
};

document.addEventListener('change', ({target}) => {
  const id = target.id;
  if (id) {
    if (target.type === 'radio' || target.type === 'checkbox') {
      prefs.persist[id] = target.checked;
      // remove other elements in the group
      if (target.type === 'radio') {
        [...document.querySelectorAll(`input[type=radio][name="${target.name}"]`)].filter(e => e !== target)
          .forEach(e => delete prefs.persist[e.id]);
      }
    }
    else {
      let value = target.value;
      if (id === 'timeout') {
        value = Math.min(Math.max(5, value), 120);
      }
      prefs.persist[id] = value;
    }
    chrome.storage.local.set(prefs);
  }
});

document.addEventListener('DOMContentLoaded', () => chrome.storage.local.get(prefs, ps => {
  Object.assign(prefs, ps);
  for (const [key, value] of Object.entries(prefs.persist)) {
    const e = document.getElementById(key);
    if (e) {
      if (e.type === 'radio' || e.type === 'checkbox') {
        e.checked = value;
      }
      else {
        e.value = value;
      }
      e.dispatchEvent(new Event('change', {
        bubbles: true
      }));
    }
  }
}));
