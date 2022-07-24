/*
 * Quick Javascript Switcher Chrome Extension
 * http://github.com/maximelebreton/quick-javascript-switcher/
 *
 * GPL License. by Maxime Le Breton [www.maximelebreton.com]
 * Gear icon by Yusuke Kamiyamane
 */

var contextMenuId = null;

var chromeContentSettings = chrome.contentSettings;

var chromeStorageMethod;

var isIncognitoWindows;

var alreadyRun = false

var cache = {

  options: {
    "showContextMenu": true,
    "autoRefresh": true,
    "useSync": true
  },

  rules: []

}
var loading
var timer

var alreadyNotifiedByClick = false


chrome.contextMenus.removeAll(function() {

 
  var contextMenuIdSeparator = chrome.contextMenus.create({
    "type": "separator",
    "contexts": ["browser_action"]
  });

  var contextMenuId3 = chrome.contextMenus.create({
    "id": "toggleJavascript",
    "title": "Toggle JavaScript",
    "type": "normal",
    "contexts": ["page"]
  });

  var contextMenuId = chrome.contextMenus.create({
    "id": "goToJavaScriptSettings",
    "title": "Go to JavaScript settings",
    "type": "normal",
    "contexts": ["browser_action"]
  });

  

})




init();

if (chromeContentSettings) {

  var extractHostname = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im'),
    forbiddenOrigin = /(chrome\:\/\/|chrome-extension\:\/\/)/g,
    incognito,
    url,
    setting,
    tabId,
    matchForbiddenOrigin;

  chrome.tabs.onUpdated.addListener(function (tabId, props, tab) {
    // Prevent multiple calls
    if (props.status == "loading" && tab.selected) {
      //console.info("onUpdated");
      getSettings();
    }
  });

  chrome.tabs.onActivated.addListener(async function (tab) {
    getSettings();
  })

  // chrome.tabs.onHighlighted.addListener(function () {
  //   //console.info("onHighlighted");
  //   getSettings();
  // });

  // chrome.windows.onFocusChanged.addListener(function () {
  //   //console.info("onFocusChanged");
  //   getSettings();
  // });

  chrome.windows.getCurrent(function () {
    getSettings();
  });

  chrome.browserAction.onClicked.addListener(changeSettings);


  chrome.commands.onCommand.addListener(function (command) {
    if (command == "toggle-qjs") {
      
      changeSettings();
      
    }
  });

  chrome.storage.onChanged.addListener(function (callback) {

    for (var index in callback) {
      if (callback.hasOwnProperty(index)) {
        console.log(callback[index]);
        if (index === 'version') {
          cache[index] = callback[index].newValue;
        } else {
            cache[index] = JSON.parse(callback[index].newValue);
        }
      }
    }

    refresh();

  });


} else {
  chrome.browserAction.onClicked.addListener(openJsPanel.call());
}

function updateIconAndMenu(setting) {
  chrome.browserAction.setIcon({
    path: "icons/icon-" + setting + ".png"
  });
  
  
    var text = '';
    var visible = true;
    if (setting === 'allow') {
      text = 'Block';
    } else if (setting === 'block') {
      text = 'Allow';
    }
     if (setting === 'inactive') {
      visible = false;
    }
     chrome.contextMenus.update("toggleJavascript", {
      "title": text + ' JavaScript',
      "visible": visible,
    });
  
}



function getSettings() {

  chrome.tabs.query({
    'active': true,
    'windowId': chrome.windows.WINDOW_ID_CURRENT
  }, function (tabs) {
    var tab = tabs[0];

    if (tab) {

      //console.log(tab);
      incognito = tab.incognito;
      url = tab.url;
      tabId = tab.id;
      tabIndex = tab.index;

      /*var regex = /(.+):\/+([^\/]+)\/(.*)/gm;
      var getDomain = /[^.]*.[^.]*$/gm;

      var urlGroup = regex.exec(url);
      var primaryPattern = urlGroup[0];
      var scheme = urlGroup[1];
      var host = urlGroup[2];
      var path = urlGroup[3];

      var domain = getDomain.exec(host);
      
      var subdomain = host.replace(domain, '');

      
      chrome.contextMenus.update(contextMenuId2, {
        "title": "Block subdomain (" + host + "/*)",
        "type": "normal",
        "contexts": ["all"],
        "onclick": openJsPanel()
      });
      chrome.contextMenus.update(contextMenuId3, {
        "title": "Block domain (*." + domain + "/*) [✓]",
        "type": "normal",
        "contexts": ["all"],
        "onclick": openJsPanel()
      });

      chrome.contextMenus.update(contextMenuId4, {
        "title": "Block url ",
        "type": "normal",
        "contexts": ["all"],
        "onclick": openJsPanel()
      });*/

      //console.info("Current tab settings : "+url);
      chromeContentSettings.javascript.get({
          'primaryUrl': url,
          'incognito': incognito
        },
        function (details) {

          

          //console.info("Current tab settings : "+url);
          url ? matchForbiddenOrigin = url.match(forbiddenOrigin, '') : matchForbiddenOrigin = true;
          matchForbiddenOrigin ? updateIconAndMenu("inactive") : updateIconAndMenu(details.setting);
        });
    };
  });
}



function changeSettings() {

  

  if (!matchForbiddenOrigin) {
    chromeContentSettings.javascript.get({
        'primaryUrl': url,
        'incognito': incognito
      },
      function (details) {
        setting = details.setting;
        if (setting) {

          var pattern = /^file:/.test(url) ? url : url.match(extractHostname)[0] + '/*';

          // old method : url.replace(/\/[^\/]*?$/, '/*')
          var newSetting = (setting == 'allow' ? 'block' : 'allow');
          chromeContentSettings.javascript.set({
            'primaryPattern': pattern,
            'setting': newSetting,
            'scope': (incognito ? 'incognito_session_only' : 'regular')
          }, function () {

            updateIconAndMenu(newSetting);

            
            
            /**
             * hack to fix chrome issue in incognito mode:
             * https://code.google.com/p/chromium/issues/detail?id=494501
             */
            if (incognito) {
              
              chrome.tabs.create({
                'url': url,
                'index': tabIndex
              }, function() {
                  chrome.tabs.remove(tabId);
              });
              
            } else {
              
              if (cache.options.autoRefresh) {
                chrome.tabs.reload(tabId, {bypassCache: false});
              }
            }

            setStorageRule(pattern, newSetting);

          });

          //console.info("javascript is now "+newSetting+"ed on "+pattern);
        } else {
          //console.error("error, the setting is "+setting);
        }
      });
  } else {

    //console.error("You can't disable javascript on "+url);

  }

}


function setStorageRule(pattern, newSetting) {

  if (!incognito) {

    var keyExist = false;

    if (cache.rules.length) {
      for (i = 0; i < cache.rules.length; i++) {
        if (pattern == cache.rules[i].primaryPattern) {
          cache.rules[i].setting = newSetting;
          keyExist = true;
          break;
        }
      }
    }

    if (!keyExist) {

      // to do : keep only block, only allow or both

      cache.rules.push({
        'primaryPattern': pattern,
        'setting': newSetting,
        'scope': (incognito ? 'incognito_session_only' : 'regular')
      });
    }

    //window.localStorage.setItem('qjs_rules',JSON.stringify(rules));
    chromeStorageMethod.set({
      "rules": JSON.stringify(cache.rules)
    }, function () {
      console.log("saved ok");
    });

  }

}

function importRules(importedRules) {

  var rules = importedRules;

  // todo : delete spaces

  if (importedRules.length) {
    for (i = 0; i < importedRules.length; i++) {

      chrome.contentSettings.javascript.set({
        'primaryPattern': rules[i].primaryPattern,
        'setting': rules[i].setting,
        'scope': rules[i].scope
      });
    }
  }

  //window.localStorage.setItem('qjs_rules',JSON.stringify(rules));
  chromeStorageMethod.set({
    "rules": JSON.stringify(importedRules)
  }, function () {
    cache.rules = importedRules;
    console.log("import ok");
  });

}

function clearRules(arg, incognito) {

  var incognito = incognito || false;

  if (arg == "contentSettings" || arg === undefined) {
    chromeContentSettings.javascript.clear({
      'scope': (incognito ? 'incognito_session_only' : 'regular')
    });
  }
  if (arg == "localStorage" || arg === undefined) {
    cache.rules = [];
    //window.localStorage.setItem('qjs_rules',[]);
    chromeStorageMethod.set({
      "rules": JSON.stringify([])
    }, function () {
      console.log("clear ok");
    });
  }
}

function checkVersion(callback) {

  /**
   * version storage need to be local
   */
  chrome.storage.local.get(['version'], function (data) {

    var oldValue = data['version'] || window.localStorage.qjs_version || undefined;
    var newValue = getVersion();

    if (oldValue !== newValue) {
      if (typeof oldValue == 'undefined') {
        onInstall();
      } else {
        onUpdate();
      }

      chrome.storage.local.set({
        "version": newValue
      }, function () {
        console.log("version ok");
      });

      if (callback) {
        callback();
      }
    }

  });

}

function getStoragePrefs(callback) {


  chrome.storage.sync.get(['options', 'rules'], function (data) {

    if (data['options']) {

      cache.options = JSON.parse(data['options']);
    }

    /*
     * set chrome storage method (local or sync) for options and rules
     */
    if (cache.options.useSync) {
      chromeStorageMethod = chrome.storage.sync;
    } else {
      chromeStorageMethod = chrome.storage.local;
    }

    if (data['rules']) {
      //console.log(data['rules']);

      cache.rules = JSON.parse(data['rules']);
    } else {

      clearRules("localStorage");
    }

    if (callback) {
      callback();
    }

  });

}


// Check if the version has changed.

function onInstall() {
  console.log('install');
  if (cache.rules) {
    importRules(cache.rules);
  }
}

function onUpdate() {
  console.log('update');
  // if old rules, save with the new method
  old_rules = window.localStorage.qjs_rules ? JSON.parse(window.localStorage.qjs_rules) : null;
  if (!cache.rules.length && old_rules && old_rules.length) {
    importRules(old_rules);
  }

  // else
  if (cache.rules.length) {
    importRules(cache.rules);
  }

}

function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}


  chrome.contextMenus.onClicked.addListener(function(info, tab) {

    if (info.menuItemId == "toggleJavascript") {
      changeSettings()
    }
    if (info.menuItemId == "goToJavaScriptSettings") {
      openJsPanel()
    }

  })


function toggleContextMenu() {
  if (cache.options.showContextMenu && !contextMenuId) {
    
/* 
        
    contextMenuId2 = chrome.contextMenus.create({
      "title": "Block subdomain",
      "type": "normal",
      "contexts": ["all"],
      "onclick": openJsPanel()
    });
    contextMenuId3 = chrome.contextMenus.create({
      "title": "Block domain",
      "type": "normal",
      "contexts": ["all"],
      "onclick": openJsPanel()
    });

    contextMenuId4 = chrome.contextMenus.create({
      "title": "Block path",
      "type": "normal",
      "contexts": ["all"],
      "onclick": openJsPanel()
    }); */


   

  }

  if (!cache.options.showContextMenu) {

    chrome.contextMenus.remove("goToJavaScriptSettings");

  }

}

function refresh() {
  toggleContextMenu();
}

function openJsPanel() {
  return function (info, tab) {
    chrome.tabs.create({
      "url": "chrome://settings/content/javascript",
      "selected": true
    });
  };
}



function initIncognitoClear() {



  

  chrome.windows.onRemoved.addListener(function (windowId) {

    chrome.windows.getAll(function (windows) {

      windows.forEach(function (window) {

        console.log(window.incognito);
        if (window.incognito) {
          isIncognitoWindows = true;
        }
      });

      if (isIncognitoWindows !== true) {
        console.log("clear incognito");
        clearRules("contentSettings", true);
      } else {
        // still remaining incognito windows
      }

    });

  });
}






function init() {
  

  getStoragePrefs(function () {

    checkVersion();
    toggleContextMenu();

  });

  initIncognitoClear();


}
