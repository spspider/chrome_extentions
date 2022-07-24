(function () {
  'use strict';

  /*
    Set some globally-available namespaces
  */

  // We'll fill and change these later
  const global = {};

  // check for Chrome first, then "browser," which is the Web standards version
  const browser = chrome || browser;

  // Settings that should never change
  const config = {
    me: 'content',
    localValuesNeeded: ['xv', 'debug'],
    // tag all Pinterest domains, not just the ones with three characters or less in the third-level domain
    // pinterestTagPattern needs prettier-ignore or VSCode will insist on breaking it and then arc diff will insist on patching it right back together
    // prettier-ignore
    pinterestTagPattern: /^https?:\/\/([a-z]*\.|)pinterest\.(at|(c(a|h|l|o(\.(kr|uk)|m(|\.(au|mx)))))|d(e|k)|es|fr|i(e|t)|jp|nz|p(h|t)|se|ru)\//,
  };

  /*
    log a message to console if global.debug is set
    message: anything you want to log
    level: [bool] or [number]
  */

  function debug(message, level = 0) {
    // do we have a message?
    if (message) {
      // is global.debug truthy?
      if (global.debug) {
        // are we filtering our debug messages?
        if (typeof global.debug === 'number') {
          // debug is some number greater than zero, so:
          // is our level greater than or equal to the debug number?
          if (level >= global.debug) {
            console.log(message);
          }
        } else {
          // any other truthy value? log everything
          console.log(message);
        }
      }
    }
  }

  /*
    We're injecting into all iframes but we should only run if the frame is the same size
    as the main window.  
  */

  function runLogic() {
    let logicCanRun = false;
    // are we in the top frame?
    if (window.self === window.top) {
      debug('Running in main window, no iframe size check needed.');
      // we're good
      logicCanRun = true;
    } else {
      // can we run inside this iframe?
      debug('We are inside an iframe.');
      // this is in a try/catch block because looking at the parent window's size may trigger a cross-origin frame access warning
      try {
        if (
          window.top.innerHeight === window.self.innerHeight &&
          window.top.innerWidth === window.self.innerWidth
        ) {
          debug('This iframe is the same size as the top window; allowing the extension to run.');
          logicCanRun = true;
        } else {
          debug(
            "This frame's dimensions: " + window.self.innerHeight + 'x' + window.self.innerWidth,
          );
          debug('Top window dimensions: ' + window.top.innerHeight + 'x' + window.top.innerWidth);
        }
      } catch (err) {
        debug(
          "This error message can be safely ignored. It was caught so it doesn't clutter up the console.",
        );
        debug(err);
      }
    }
    return logicCanRun;
  }

  /* 
    tag document.body if we're on a Pinterest domain
    if our main logic is allowed to run on this page, ask the background page to inject it
  */

  function init() {
    // do we need to tag the page?
    if (document.body) {
      // do we have an URL that matches a known Pinterest domain?
      if ((document.URL || '').match(config.pinterestTagPattern)) {
        // tag so Pinterest knows the extension is installed
        debug('Setting tag on Pinterest domain.');
        document.body.setAttribute('data-pinterest-extension-installed', global.xv);
      } else {
        debug('Not on Pinterest; no tag set.');
      }
      // we're injecting content.js into all iframes because the bookmarklet grid comes up inside one and we need to tag it if it's a Pinterest domain
      // but: we don't want to execute logic.js inside most iframes, because there are potentially millions of them on a page
      if (runLogic()) {
        browser.runtime.sendMessage({
          to: 'background',
          act: 'injectLogic',
        });
      }
    } else {
      debug('document.body not found; n');
    }
  }

  /* 
    load contents of localStorage and then initialize
    if the first param is null, get everything
  */

  browser.storage.local.get(config.localValuesNeeded || null, (me) => {
    // anything in local storage is now available in global
    for (let i in me) {
      global[i] = me[i];
    }
    if (global.msg) {
      // promote only the right subset of messages
      global.msg = global.msg[config.me];
    }
    // fire it off
    init();
  });
})();
