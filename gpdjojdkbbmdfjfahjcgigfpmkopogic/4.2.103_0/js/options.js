// send context log event for options change

var browser = chrome || browser;

var update = () => {
  var hazChecked = document.getElementById('hideHoverButtons').checked;
  browser.storage.local.set(
    {
      hideHoverButtons: hazChecked,
    },
    function () {
      var display = document.getElementById('display');
      display.innerText = '\u2713';
      chrome.runtime.sendMessage({
        to: 'background',
        act: 'contextLog',
        data: {
          eventType: 'VIEW',
          viewType: 'BROWSER_EXTENSION_OPTIONS',
          auxData: {
            hideHoverButtons: hazChecked,
          },
        },
      });
      setTimeout(function () {
        display.innerText = '';
      }, 750);
    },
  );
};

var show = () => {
  document.getElementById('hideHoverButtons').addEventListener('click', update);
  document.getElementById('optionHide').innerText = chrome.i18n.getMessage('optionHide');
  document.getElementById('optionTitle').innerText = chrome.i18n.getMessage('optionTitle');
  document.title = chrome.i18n.getMessage('optionTitle');
  browser.storage.local.get(
    {
      hideHoverButtons: 'hideHoverButtons',
    },
    function (items) {
      if (items.hideHoverButtons === true) {
        document.getElementById('hideHoverButtons').checked = items.hideHoverButtons;
      }
    },
  );
};

document.addEventListener('DOMContentLoaded', show);
