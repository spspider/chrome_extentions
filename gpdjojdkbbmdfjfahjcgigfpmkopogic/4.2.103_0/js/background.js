'use strict';

/*
  Context logging types and constants
*/

const ctrl = {
  clientId: 1447278,
  canHaz: {
    saveAsDataURI: true,
    localImagePicker: true,
  },
  endpoint: {
    grid: {
      pinCreate: 'https://www.pinterest.com/pin/create/extension/',
      rePinCreate: 'https://www.pinterest.com/pin/%s/repin/x/',
    },
  },
  path: {
    welcome: '/_/_/about/browser-button/install/',
  },
  // should we show the update page on update?
  updatePage: {
    // what version should we look for?
    version: '4.1.111',
    // should we show the update page?
    show: false,
    // if we should show the update page, should we steal focus?
    focus: false,
    // redirect path to update page
    path: '/_/_/about/browser-button/update/',
  },
  ctx: {
    flushTypes: {
      // pin create
      1: true,
      // board create
      20: true,
      // install
      8219: true,
    },
    flushConstants: {
      timeoutNanoseconds: 300000000000,
      numEvents: 20,
    },
    EventTypes: {
      PIN_CREATE: 1,
      VIEW: 13,
      BOARD_CREATE: 20,
      USER_FOLLOW: 45,
      CLICK: 101,
      SAVE_BROWSER_PIN_IMAGES_FOUND: 2900,
      SAVE_BROWSER_PIN_IMAGES_NOT_FOUND: 2901,
      PIN_CREATE_FAILURE: 7564,
      USER_ACTIVE: 7137,
      INSTALL: 8219,
      BROWSER_SESSION: 8221,
      BROWSER_EXTENSION_BOOKMARKS_FOUND: 9001,
      BROWSER_EXTENSION_BOOKMARKS_CREATE_SUCCESS: 9002,
    },
    ViewTypes: {
      BOARD_PICKER: 21,
      VISUAL_SEARCH: 43,
      BROWSER_EXTENSION_DAU: 192,
      IMAGE_PICKER: 268,
      CREATE_BOARD: 269,
      PIN_CREATE_SUCCESS: 270,
      FOLLOW_FROM_SAVE: 271,
      FOLLOW_FROM_SAVE_SUCCESS: 272,
      BOARD_SECTION_CREATE: 274,
      BOARD_SECTION_PICKER: 275,
      BROWSER_EXTENSION_OPTIONS: 276,
      HOVER_BOARD_OPENER: 277,
      HOVER_BOARD_PICKER: 278,
      VISUAL_SEARCH_RESULTS: 279,
    },
    ElementTypes: {
      BOARD_COVER: 36,
      CREATE_BUTTON: 44,
      PIN_SAVE_BUTTON: 48,
      SECTION_COVER: 11854,
      VISIT_BUTTON: 12796,
    },
    AppTypes: {
      BROWSER_EXTENSION: 8,
    },
    BrowserTypes: {
      OTHER: 0,
      CHROME: 1,
      SAFARI: 2,
      IE: 3,
      FIREFOX: 4,
      OPERA: 5,
      EDGE: 7,
    },
  },
  server: {
    domain: '.pinterest.com',
    api: 'api',
    www: 'www',
    trk: 'trk',
  },
  // important URL patterns
  pattern: {
    api: /^https?:\/\/api\.pinterest\.com\//,
    trk: /^https?:\/\/trk\.pinterest\.com\//,
    pinmarklet: /^https?:\/\/assets\.pinterest\.com\/js\/pinmarklet\.js/,
    // pinterestDomain needs prettier-ignore or VSCode will insist on breaking it and then arc diff will insist on patching it right back together
    // prettier-ignore
    pinterestDomain: /^https?:\/\/(([a-z]{1,3}|latest)\.|)pinterest\.(at|(c(a|h|l|o(\.(kr|uk)|m(|\.(au|mx)))))|d(e|k)|es|fr|i(e|t)|jp|nz|p(h|t)|se|ru)\//,
    alwaysConvertToData: [/\.cdninstagram\.com/],
  },
};

/*
   Strings to grab from /_locales on startup, with their default English translation 
*/

const translateThese = {
  choosePinMultiSelectHeader: 'Save an idea to Pinterest',
  choosePinSelectAllSubHeader: 'Select up to twenty images',
  nextAction: 'Next',
  selectAll: 'Select all',
  noPinDomain:
    'Sorry, pinning is not allowed from this domain. Please contact the site operator if you have any questions.',
  boardPickerOpenerLabel: 'Save to board',
  boardPickerSuccessLabel: 'Saved to',
  visitButton: 'Visit',
  help: 'Help',
  // error header
  msgOops: 'Oops!',
  // pin create fail
  msgPinFail: 'Could not save this page',
  // main header in Save form
  chooseBoard: 'Choose board',
  // save a new Pin
  saveAction: 'Save',
  // interstitial header in board list
  topChoices: 'Top choices',
  // interstitial header in board list
  allBoards: 'All boards',
  // header in Create form
  createBoard: 'Create board',
  // label over secret/not-secret switch
  addFormSecretLabel: 'Secret',
  // label for board sections
  chooseSection: 'Choose section',
  // label to add section
  addSection: 'Add Section',
  // switch option yes
  optYes: 'Yes',
  // switch option no
  optNo: 'No',
  // cancel create
  closeAddForm: 'Cancel',
  // create new board
  submitAddForm: 'Create',
  // board create fail
  msgBoardFail: 'Could not create new board',
  // error when we try do something that requires a login and we can't find it
  // most likely this will happen when someone has the image picker up in one tab and
  // signs out, clears cookies, or changes accounts in another tab without reloading
  msgLoginFail:
    "Sorry, something's not quite right here. Please check that you are logged into Pinterest and try again.",
  // get help button
  msgHelp: 'Get Help',
  // for help signing in
  authHelpHead: 'Psst!',
  authHelpBody: "Looks like you're not signed in to Pinterest. Let's fix that!",
  signIn: 'Sign in',
};

/*
  Set some globally-available namespaces
*/

// Settings that should never change
const config = {
  debug: false,
  // Where will we find our control file and hashList.json when we're not debugging?
  remoteAssetPath: 'https://assets.pinterest.com/ext/',
  me: 'background',
  forbiddenQueryKey: [/password/gi],
  browserTest: [
    {
      k: 'ff',
      r: / Firefox\//,
    },
    {
      k: 'op',
      r: / OPR\//,
    },
    {
      k: 'ms',
      r: / Edg\//,
    },
    {
      k: 'cr',
      r: / Chrome\//,
    },
  ],
  // refresh these items if they are older than some number of milliseconds
  ttl: {
    // 10 minutes for user info (includes privacy settings)
    userInfo: 10 * 60 * 1000,
  },
  // we will add this plus the version to user-agent string when querying our own API
  ua: 'Pinterest for BrowserExtension',
  // a short list of legacy hashes no longer being maintained in managed lists
  theOtherList: [
    '05ae1d0135c1',
    '0c4e6e46540b',
    '129e2089d8b8',
    '15c442d8f57b',
    '1b551d2f2233',
    '3bb3293aa4f9',
    '592bd1529ad2',
    '5cd69c1c51a8',
    '67fa18caa358',
    '6c62158de5d4',
    '7da2f8f258db',
    '9af245e8c2d5',
    '9d5cb16066e3',
    'a20c46b653b0',
    'b7c70898d90f',
    'd095fd7b7ac1',
    'd2944127ec33',
    'e42128ea2bf8',
    'e43ff7b11415',
    'efa3a2deb839',
    'faf820a6e7ba',
    'ff33e73a21b1',
  ],
  limit: {
    dataUrlWidth: 1000,
  },
  inject: {
    logic: 'js/logic.js',
    pinmarklet: 'js/pinmarklet.js',
  },
  digits: '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ_abcdefghijkmnopqrstuvwxyz',
  ctrl,
  translateThese,
};

// We'll fill and change these later
const global = {
  boards: {},
  endpoint: {},
  // keeps track of experiments that have been activated
  experimentGroup: {},
  enabledExperimentGroups: {},
  hashList: [],
  puid: '',
  context: {
    eventBatch: [], // an array of objects each containing app, browser, eventType, time, and anything else (like userId) we want to send
    user: {},
    userId: '',
    unauthId: '',
  },
  sessionStart: Date.now(),
  userInfo: {},
  // various freshness trackers will go here
  timestamp: {
    boardsAndSections: 0,
    experiments: 0,
  },
};

// check for Chrome first, then "browser," which is the Web standards version
const browser = chrome || browser;

/*
  Before we do anything else, start listening for the onInstalled event
*/

function captureInstallEvent() {
  config.installObj = {};
  // contrary to what we do in the other browser check we're going to look for Chrome first here
  if ((chrome || {}).runtime) {
    // check for Chrome-specific event first
    chrome.runtime.onInstalled.addListener((me) => {
      config.installObj = me;
    });
  } else {
    // check other WebExtensions-compatible browsers
    if ((browser || {}).runtime) {
      browser.runtime.onInstalled.addListener((me) => {
        config.installObj = me;
      });
    }
  }
}

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
  async/await XHR loader
  me: {
    responseType: [string, default "json"],
    method: [string, default "GET"],
    url: [remote URL to load],
    auth: [bool],
    xRequestForgeryToken: [string],
    key: [string, to be used as a key in global during init],
    formData: [formData object for POST]
  }
  TODO: consider using fetch API?
*/

async function load(me) {
  const req = new XMLHttpRequest();
  function xhr() {
    // resolve and reject are local names for the promises that will be passed back to whoever called us
    return new Promise((resolve, reject) => {
      // response is expected to be JSON unless specified
      req.responseType = me.responseType || 'json';
      // method = get except if specified
      req.open(me.method || 'GET', me.url, true);
      // ask for results in our language
      req.setRequestHeader('Accept-Language', window.navigator.language);
      // send detailed app type 8, meaning "browser extension"
      req.setRequestHeader('X-Pinterest-App-Type-Detailed', '8');
      // set charset
      req.setRequestHeader('charset', 'UTF-8');
      // set client ID in header - hopefully used by SRE/API team to distinguish browser extension from
      // web app traffic
      // thank you: Oliver Steele ("Cheap Monads")
      if ((global.ctrl || {}).clientId) {
        req.setRequestHeader('X-Client-ID', global.ctrl.clientId);
      }
      // are we signed in?
      if (me.auth && me.xRequestForgeryToken) {
        debug('Setting X-Request-Forgery-Token to ' + me.xRequestForgeryToken);
        req.setRequestHeader('X-Request-Forgery-Token', me.xRequestForgeryToken);
      }
      // resolve
      req.onload = () => {
        if (req.status === 200) {
          const out = { response: req.response };
          // pass along keys like ctrl and hashList
          if (me.key) {
            out.key = me.key;
          }
          resolve(out);
        } else {
          resolve({ response: { status: 'fail', error: 'API Error' } });
        }
      };
      // reject
      req.onerror = () => {
        reject({ status: 'fail', error: 'Network Error' });
      };
      // add formData to request if sent
      if (me.formData) {
        req.send(me.formData);
      } else {
        req.send();
      }
    });
  }
  // run it and return a promise
  try {
    const result = await xhr(req);
    if (me.url.match('api.')) {
      debug('An API request has loaded', 1);
      debug(me.url, 1);
      debug(result, 1);
    }
    // resolves will be returned
    return result;
  } catch (result) {
    // rejects will be caught and returned as errors
    return result;
  }
}

/*
  do the results of an API call show failure?
  me: {
    status: ["success" || anything else]
  }
*/

function didCallFail(me) {
  if ((me.response || {}).status === 'success') {
    return false;
  } else {
    return true;
  }
}

/*
  save an object to local storage
  me: {
    key: value
    callback [optional function]
  }
*/

function setLocal(me, callback) {
  if (!callback) {
    callback = () => {};
  }
  browser.storage.local.set(me, callback);
  debug('Local storage was updated');
  debug(me);
}

/*
  get all our boards and sections, and save them in local storage
  me: {
    authState: [object]
  }
*/

function getBoardsAndSections(me) {
  // bump this to config if we decide it's going to remain
  const boardPageSize = 250;
  // temporary bucket for boards
  const boardArray = [];

  /* 
    Get sections for a board
    me: {
      board: number
      xRequestForgeryToken: string
    }
  */
  function getSections(me) {
    load({
      auth: true,
      xRequestForgeryToken: me.xRequestForgeryToken,
      url: `${global.endpoint.api}board/${me.board}/sections/all/`,
    }).then((reply) => {
      if (!didCallFail(reply)) {
        // alphabetize by title
        reply.response.data.sort((a, b) => (a.title > b.title ? 1 : -1));
        // we're good; add sections to the right board
        boardArray.filter((it) => {
          if (it.id === me.board) {
            // attach to correct board
            it.sections = reply.response.data;
          }
        });
        setLocal({ boards: boardArray });
      }
    });
  }
  /*
    Get a page of boards
    me: {
      xRequestForgeryToken: string,
      bookmark: string (optional)
    }
  */
  function getBoards(me) {
    // set bookmark if we have it
    let bookmarkParam = '';
    if (me.bookmark) {
      bookmarkParam = `&bookmark=${me.bookmark}`;
    }
    load({
      auth: true,
      xRequestForgeryToken: me.xRequestForgeryToken,
      url: `${global.endpoint.api}users/me/boards/feed/?page_size=${boardPageSize}${bookmarkParam}&filter=all&sort=last_pinned_to&add_fields=board.image_cover_url,board.privacy,board.collaborated_by_me,board.section_count`,
    }).then((reply) => {
      if (!didCallFail(reply)) {
        if (reply.response.data) {
          reply.response.data.filter((it) => {
            boardArray.push({
              id: it.id,
              image_cover_url: it.image_cover_url || it.image_thumbnail_url,
              name: it.name,
              privacy: it.privacy,
              is_collaborative: it.is_collaborative,
              section_count: it.section_count,
            });
            if (it.section_count) {
              getSections({ ...me, board: it.id });
            }
          });
          // update local storage
          setLocal({ boards: boardArray });
        }
        if (reply.response.bookmark) {
          debug('Getting next page of boards');
          getBoards({ ...me, bookmark: reply.response.bookmark });
        } else {
          // so we can tell if boards and sections are stale in later authChecks
          global.timestamp.boardsAndSections = Date.now();
          debug('Done loading boards; sections may still be coming.');
          debug(boardArray);
        }
      }
    });
  }
  // we should only be called when authCheck discovers that a Pinner has changed auth state and is signed in
  if (me.xRequestForgeryToken) {
    getBoards({
      xRequestForgeryToken: me.xRequestForgeryToken,
    });
  }
}

/*
  Return a promise containing the result of authentication attempt
  me: {
    xRequestForgeryToken: [string]
  }
*/

function getUserInfo(me) {
  return new Promise((resolve) => {
    // get our user data, including measurement flags (both of which must be true)
    // TODO: set these field names from global config
    const addFields = [
      'user.ads_customize_from_conversion',
      'user.country',
      'user.last_pin_save_time',
      'user.personalize_from_offsite_browsing',
    ];
    load({
      url: `${global.endpoint.api}users/me/?add_fields=${addFields.join(',')}`,
    }).then((output) => {
      // process and save my data
      const reply = output?.response?.data;
      if (reply) {
        // save for internal use throughout background.js; do after global.experimentGroup has been determined
        global.userInfo = {
          id: reply.id,
          // we'll set this later
          canHazMeasurement: false,
          lastPinSaveTime: Date.parse(reply.last_pin_save_time || 0),
        };
        // set timestamp
        global.timestamp.userInfo = Date.now();

        // fill global.experimentGroup -- todo: maybe add this as a key to userInfo?
        global.experimentGroup = {};
        Object.keys(reply.gatekeeper_experiments)
          // only look at our experiments
          .filter((key) => key.startsWith('browser_extension'))
          // save as browser_extension_foo: { group: "bar", activated: false}
          .forEach((key) => {
            global.experimentGroup[key] = {
              group: reply.gatekeeper_experiments[key].group,
              activated: false,
            };
          });

        // decider: browser_extension_measurement_decider
        // should we assist this user in conversion tracking?
        const measurementDecider = 'browser_extension_measurement_decider';
        const measurementGroup = global.experimentGroup[measurementDecider]?.group;
        const forbiddenCountries =
          'AT BE BG CY CZ DE DK EE ES FI FR GB GR HR HU IE IS IT LI LT LU lV MT NL NO PL PT RO SE SI SK UK';
        if (
          // are we in a group that qualifies for measurement?
          (measurementGroup === 'enabled' || measurementGroup === 'employees') &&
          // not in a forbidden country
          !forbiddenCountries.match(reply.country) &&
          // have we checked "Use sites you visit to improve which recommendations and ads you see?"
          (reply.ads_customize_from_conversion || false) &&
          // have we checked "Use information from our partners to improve which recommendations and ads you see?"
          (reply.personalize_from_offsite_browsing || false)
        ) {
          global.userInfo.canHazMeasurement = true;
        }
        debug(`Okay to assist with conversion tracking? ${global.userInfo.canHazMeasurement}`);

        // save for use on overlays
        setLocal({
          userInfo: global.userInfo,
        });
        // save experiment groups
        setLocal({
          experimentGroup: global.experimentGroup,
        });
        // fetch boards and sections
        getBoardsAndSections({
          xRequestForgeryToken: me.xRequestForgeryToken,
        });
        resolve(true);
      }
    });
  });
}

/*
  return a digest for a string
  expects:
    method: something subtle.crypto understands like "SHA-1" or "SHA-512"
    str: the string we are hashing
  returns:
    digest: the hash (in hexadecimal)
    input: the original input string
*/

function hash(input) {
  // pad each item in a buffer with up to eight leading zeroes
  const hex = (b) => {
    let i,
      d = new DataView(b),
      a = [];
    for (i = 0; i < d.byteLength; i = i + 4) {
      a.push(('00000000' + d.getUint32(i).toString(16)).slice(-8));
    }
    return a.join('');
  };
  // make a new utf-8 string
  let b = new TextEncoder('utf-8').encode(input.str);
  // get the digest as a buffer; return it as hex with input string
  return crypto.subtle.digest(input.method, b).then((buffer) => {
    return { digest: hex(buffer), input: input.str };
  });
}

/*
  remove an object from local storage
  me: [string]
*/

function removeLocal(me) {
  browser.storage.local.remove(me);
  debug('Local storage was updated');
  debug(me);
}

/*
  Return a promise containing authentication
  authCheck().then(
    result => {
      doStuffWith(result);
    }
  )
*/

function authCheck() {
  // make our X-Request-Forgery-Token if we are authed; otherwise
  // just return what we sent to our promise resolver
  const makeToken = (me, resolveWith) => {
    // are we authed under a session?
    if (me.auth && me.sess) {
      // hash our session cookie
      debug('Hashing _pinterest_sess for xRequestForgeryToken');
      hash({
        // remove double-quotes for all non-Chrome browsers
        str: me.sess.replace(/(^")|("$)/g, ''),
        method: 'SHA-512',
      }).then((result) => {
        // set our new token
        debug('xRequestForgeryToken is:\n' + result.digest);
        // send a flag back to the caller indicating they should run users/me/
        me.change = false;
        // did the user change?
        if (result.digest !== global.lastToken) {
          me.change = true;
          debug('User change detected, zeroing out some globals');
          // zero out user info timestamp
          global.timestamp.userInfo = 0;
          // set the new token
          global.lastToken = result.digest;
          getUserInfo({ xRequestForgeryToken: result.digest }).then((uip) => {
            debug('New user info');
            debug(global.userInfo);
          });
        } else {
          // check to see if userInfo is older than its TTL
          if (Date.now() - (global.timestamp.userInfo || 0) > config.ttl.userInfo) {
            debug('User info is stale');
            getUserInfo({ xRequestForgeryToken: result.digest }).then((uip) => {
              debug('Refreshed user info');
              debug(global.userInfo);
            });
          }
        }
        // don't send our session cookie back
        delete me.sess;
        // do send our token back
        me.xRequestForgeryToken = result.digest;
        /* at this point, me looks like this:
        me: {
          change: [bool],
          xRequestForgeryToken: [string]
        }
        */
        // run our handoff callback
        resolveWith(me);
      });
    } else {
      // if we have no token the user is not authenticated, so we should clear some things
      debug('User is not authenticated');
      // zero the token hash, so we can detect the next change
      global.lastToken = '';
      // remove user info
      global.userInfo = {};
      removeLocal('userInfo');
      // remove experiments
      global.experimentGroup = {};
      removeLocal('experimentGroup');
      // remove boards
      removeLocal('boards');
      // run our handoff callback
      resolveWith(me);
    }
  };
  // analyze and return information about cookies
  const processCookies = (cookies) => {
    const result = {
      auth: false,
      // init timeCheck to 0 in case we have completely lost our _auth cookie while create.js is up
      // TODO: remove all reference to timeCheck when we remove create, grid, and search overlays
      timeCheck: 0,
    };
    // check for presence of _auth cookie, not its value
    if (cookies['_auth']) {
      // set timeCheck to help determine if login has changed while create.js is up
      result.timeCheck = cookies['_auth'].expirationDate || 0;
      // are we signed in to Pinterest?
      if (
        // check that _auth cookie (which we know exists already) is "1"
        cookies['_auth'].value === '1' &&
        // check _pinterest_sess exists AND has a value
        (cookies['_pinterest_sess'] || {}).value
      ) {
        // we are signed in
        result.auth = true;
        // we're going to hash this to get X-Request-Forgery-Token
        // and remove it before we return
        result.sess = cookies['_pinterest_sess'].value;
      }
    }
    return result;
  };
  // return only the cookies we want
  return new Promise((resolve) => {
    browser.cookies.getAll(
      {
        // this will match api.pinterest.com and www.pinterest.com
        domain: `${global.ctrl.server.domain}`,
      },
      (r) => {
        // these are here and not config to make ctrl.json the sole source of truth about cookie domains
        const importantCookies = {
          _auth: {
            domain: `${global.ctrl.server.domain}`,
            value: null,
          },
          _pinterest_sess: {
            domain: `${global.ctrl.server.domain}`,
            value: null,
          },
        };
        // return a copy of importantCookies with values and expiration dates
        const getThese = Object.assign({}, importantCookies);
        for (let item of r) {
          if (getThese[item.name]) {
            if (item.domain === getThese[item.name].domain) {
              getThese[item.name].value = item.value;
              getThese[item.name].expirationDate = item.expirationDate;
            }
          }
        }
        // make a token from the right cookies and then send them to the next step in the promise chain
        makeToken(processCookies(getThese), (data) => {
          resolve(data);
        });
      },
    );
  });
}

/*
  get the active tab and run a callback
  me: {
    callback: [function]
  }
*/

function getTab(me) {
  if (me.callback) {
    browser.tabs.query({ active: true, currentWindow: true }, (tab) => {
      // attempt to mitigate https://bugs.chromium.org/p/chromium/issues/detail?id=1213925
      let err = (browser.runtime.lastError || {}).message || '';
      if (err.match('Tabs cannot be queried right now')) {
        debug('Tab query error encountered; trying again in just a moment.');
        window.setTimeout(() => getTab(me), 100);
      } else {
        debug('Tab query success.');
        // do we have an array of tabs, is there at least one tab, does it have an URL?
        if (((tab || {})[0] || {}).url) {
          me.callback(tab[0]);
        } else {
          /*
            Something else failed higher up, leaving us without an array of tabs to check.
            Do nothing; next tab refresh will hopefully sort things out.
          */
          debug(
            "Tab or window switch detected but no tabs came back from query; this tab may contain an URL that won't run our logic.",
          );
        }
      }
    });
  }
}

/*
  send something to a content script (logic or overlay)
  caution: don't confuse this with @util.send, which is for them to send back to us
  me: [object to be sent]
*/

function sendOut(me) {
  debug('Request to send message to logic script received.');
  debug(me);
  me.experimentGroup = global.experimentGroup;
  // send to the active tab
  getTab({
    callback: (tab) => {
      // avoid sending to non-http tabs like about:blank
      if (tab.url.match(/^https?:\/\//)) {
        debug('Active tab has a valid URL: ' + tab.url);
        browser.tabs.sendMessage(tab.id, me);
      } else {
        debug('Could not send message to active tab; we need http protocol.');
        debug(tab.url);
      }
    },
  });
}

/*
  are we signed in?
*/

function login() {
  authCheck().then((authState) => {
    // if we're debugging, update to show auth state
    if (global.debug) {
      // check for the existence of setBadgeBackgroundColor (older versions of Firefox for Android don't have it)
      if (authState.auth) {
        browser.browserAction.setBadgeBackgroundColor({ color: 'red' });
      } else {
        browser.browserAction.setBadgeBackgroundColor({ color: 'black' });
      }
    }
    // let our content script know what's up
    sendOut({
      to: 'logic',
      act: 'pongLogin',
      data: {
        auth: authState.auth,
      },
    });
  });
}

/*
  Send all events accumulated in global.context.eventBatch
*/

function sendContextEvents() {
  // Do nothing if the global.context.eventBatch of events is empty
  if (!global.context.eventBatch.length) {
    return;
  }
  // Add to form
  const query = {
    url: `${global.endpoint.trk}callback/event/`,
    formData: new FormData(),
    method: 'POST',
  };
  query.formData.append('isJSONData', true);
  query.formData.append(
    'event_batch_json',
    JSON.stringify({
      // reportTime must be made in nanoseconds
      reportTime: Date.now() * 1000000,
      // again, not to belabor the point, but: events requires an array!
      events: global.context.eventBatch,
    }),
  );
  debug('Preparing to sending context log global.context.eventBatch.');
  debug(query);
  /*
    Remove events once they are appended to the query object.  Yes, this seems clunky, but: we can't remove events
    after load because it's an async function, and other events may have been added during load.
  */
  global.context.eventBatch = [];
  load(query);
}

/*
  determine if the current batch should be flushed
  TODO: maybe convert ctrl.ctx.flushTypes to an array and use Array.includes()?
*/

function flushContextEvents() {
  let myBatch = global.context.eventBatch,
    myBatchLength = myBatch.length,
    flushTypes = global.ctrl.ctx.flushTypes,
    flushMax = global.ctrl.ctx.flushConstants.numEvents,
    flushMe = false;
  // do we have events in the batch?
  if (myBatchLength) {
    // do we have enough events waiting to trigger a flush?
    if (myBatchLength > flushMax) {
      flushMe = true;
    }
    // is the oldest event old enough to trigger a flush?
    if (
      Date.now() * 1000000 - myBatch[myBatchLength - 1].time >
      global.ctrl.ctx.flushConstants.timeoutNanoseconds
    ) {
      flushMe = true;
    }
    // is the event or view type of the most recent evebnt important enough to trigger an immediate flush?
    if (
      // eventTypes and viewTypes are numbers, so they need to be coerced to strings
      flushTypes['' + myBatch[0].eventType] ||
      flushTypes['' + (myBatch[0].context || {}).viewType]
    ) {
      flushMe = true;
    }
  }
  return flushMe;
}

/*
  return the hexadecimal reprentation of an RFC4122-compliant UUID
*/

function makeUUID() {
  return [1e7, 1e3, 4e3, 8e3, 1e11]
    .join('')
    .replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
    );
}

/*
  add an event to the batch
  event: [object],
  flush: [bool]
*/

function queueContextEvent(event) {
  let discard = false,
    flush = false;
  // CONG-424: avoid sending more than one HOVER_BOARD_OPENER event per page
  if (
    event.eventType === global.ctrl.ctx.EventTypes['VIEW'] &&
    (event.context || {}).viewType === global.ctrl.ctx.ViewTypes['HOVER_BOARD_OPENER'] &&
    typeof (event.auxData || {}).url === 'string'
  ) {
    // check to see if we have it in queue already
    global.context.eventBatch.filter((it) => {
      // we know we have event.auxData.url but auxData may not be present on some existing events
      if ((it.auxData || {}).url === event.auxData.url) {
        // we already have this URL in queue from HOVER_BOARD_OPENER so drop it on the floor
        discard = true;
      }
    });
  }
  // should we discard this event?
  if (discard) {
    debug('Discarding a duplicate event');
  } else {
    // add it to the beginning of the queue array so most recent event is sent first
    global.context.eventBatch.unshift(event);
    // if login state has changed, flush the event queue
    if (global.context.lastKnownUserId) {
      // we have a last-known userid to compare
      if (event.userId) {
        if (event.userId !== global.context.lastKnownUserId) {
          // user has changed since most recent event was recorded
          global.context.lastKnownUserId = event.userId;
          flush = true;
        }
      } else {
        // user has logged out since most recent event was recorded
        global.context.lastKnownUserId = '';
        flush = true;
      }
    } else {
      // has someone logged in?
      if (event.userId) {
        // set last-known userid so we can flush again later if needed
        global.context.lastKnownUserId = event.userId;
        // make a different UUID for next unauthed session
        global.context.unauthId = makeUUID();
        flush = true;
      }
    }
    // local flush check flush is set above
    // flushContextEvents looks in global.ctx.flushTypes to see if it's one we always need to flush, and
    // also checks to see if any event is old enough or the queue is long enough to trigger a flush
    if (flush || flushContextEvents()) {
      debug(`Flushing event queue.  Batch size: ${global.context.eventBatch.length}`);
      sendContextEvents();
    } else {
      // no flush needed
      debug(`Adding event to batch. New length:  ${global.context.eventBatch.length}`);
    }
    debug(global.context.eventBatch);
  }
}

/*
  create a context logging event
  me: {
    eventType: [string matching member of ctrl.ctx.EventTypes, translated to a number],
    viewType: [string matching member of ctrl.ctx.ViewTypes, translated to a number],
    element: [string matching member of ctrl.ctx.ElementTypes, translated to a number],
    objectIdStr: [string],
    auxData: [object],
  }
*/

function createContextEvent(me) {
  debug('A context log event has been requested.');
  debug(me);

  // Short-circuit if eventType doesn't exist
  if (me.eventType === undefined) {
    debug('Context logging requires an eventType');
    return false;
  }

  // look up our event type values (these will be numbers)
  const myEventType = global.ctrl.ctx.EventTypes[me.eventType],
    myViewType = global.ctrl.ctx.ViewTypes[me.viewType],
    myElement = global.ctrl.ctx.ElementTypes[me.element];

  // do we have an event type?
  if (!myEventType) {
    debug('Context logging requires an eventType listed in ctrl.ctx.EventTypes');
    debug(me);
    return false;
  }

  // if we're viewing, do we have a valid view type?
  if (me.eventType === 'VIEW') {
    if (!myViewType) {
      debug('A view requires a viewType listed in ctrl.ctx.ViewTypes');
      debug(me);
      return false;
    }
  }

  // if we're clicking, do we have a valid element?
  if (me.eventType === 'CLICK') {
    if (!myElement) {
      debug('A click requires an element listed in ctrl.ctx.ElementTypes');
      debug(me);
      return false;
    }
  }

  // create an empty object for this event
  const myEvent = {
    eventType: myEventType,
    time: Date.now() * 1000000,
    app: global.ctrl.ctx.AppTypes.BROWSER_EXTENSION,
    appVersion: global.xv,
    browser: global.browserType,
  };

  // wrap myViewType and myElement into a context object
  if (myViewType || myElement) {
    const context = {};
    Object.assign(
      context,
      !!myViewType && { viewType: myViewType },
      !!myElement && { element: myElement },
    );
    myEvent.context = context;
  }

  // If this event creates an object, attach the id string to the event
  if (me.objectIdStr) {
    myEvent.objectIdStr = me.objectIdStr;
  }

  // check that auxData has been sent as an object and not an array
  if (me.auxData && me.auxData.constructor === Object) {
    myEvent.auxData = me.auxData;
  }

  // be sure we have an unauthId
  if (!global.context.unauthId) {
    debug(`No unauthId found; creating one. ${global.context.unauthId}`);
    global.context.unauthId = makeUUID();
  }

  // Check for auth; add myEvent.userId if authed, myEvent.unauthId if not
  authCheck().then((authState) => {
    if (!authState.auth) {
      myEvent.unauthId = global.context.unauthId;
    } else {
      myEvent.userId = global.userInfo.id;
    }
    queueContextEvent(myEvent);
  });
}

/*
  Show new user page and note that we have shown it
*/

function welcome() {
  // create a note
  debug('Creating welcome note');
  // open education page
  browser.tabs.create({
    url: `https://${global.ctrl.server.www}${global.ctrl.server.domain}${global.ctrl.path.welcome}?xv=${global.xv}`,
  });
  // save timestamp in beenWelcomed
  setLocal({ beenWelcomed: global.sessionStart });
}

/*
  Do we need to welcome a new user?
*/

function checkInstallObj() {
  // don't do anything unless we have a reason
  if ((config.installObj || {}).reason) {
    switch (config.installObj.reason) {
      // if this is an install, show the welcome page
      case 'install':
        createContextEvent({
          eventType: 'INSTALL',
        });
        welcome();
        break;
      // if this is an update, show the update page
      case 'update':
        // we're being called from housekeep after global.xv is set but this makes sure
        if (global.xv) {
          if (browser.runtime.getManifest().version === global.ctrl.updatePage.version) {
            // only show the update page if there is something important about this release
            if (global.ctrl.updatePage.show) {
              // show the update window
              browser.tabs.create({
                url: `https://${global.ctrl.server.www}${global.ctrl.server.domain}${global.ctrl.updatePage.path}?xv=${global.xv}`,
                // only take focus if absolutely necessary
                active: global.ctrl.updatePage.focus,
              });
            }
          }
        }
        break;
    }
  }
}

/*
  disable browser button or context menus
  me: {
    menus: [bool],
    button: [bool]
  }
*/

function disableFeatures(me) {
  // do we need to remove all context menus?
  if (me.menus) {
    browser.contextMenus.removeAll();
  }
  // do we need to show the grayed-out browser button?
  if (me.button) {
    browser.browserAction.setIcon({
      path: 'img/disabled/icon_toolbar.png',
    });
  }
}

/*
  any time we switch tabs or windows, check to see if we should show browser button or context menus
*/

function tabSwitch() {
  debug('Tab switch detected.');
  // get the active tab
  getTab({
    callback: (tab) => {
      // can we save from this URL?
      if (tab.url.match(/^https?:\/\//)) {
        // are we on a known Pinterest app domain?
        if (tab.url.match(global.ctrl.pattern.pinterestDomain)) {
          /*
            if we're on a Pinterest domain we may not have had time to run our logic, so:
            - disable browser button
            - disable context menus
          */
          debug(
            'On a known Pinterest app domain; no need to refresh context; disabling pinning features.',
          );
          disableFeatures({ menus: true, button: true });
        } else {
          /*
            We might be able to save from this URL, so:
            - ask the focused tab to please tell us whether it found any nopins
            - we'll refresh context menus and browser button when we get the callback to refreshContextMenus
          */
          browser.tabs.sendMessage(tab.id, {
            to: 'logic',
            act: 'refreshContext',
          });
        }
      } else {
        /*
          We can't save from non-browser windows or URLs that start with something funky like chrome:, file:, or about:
          so we're going to pre-emptively disable pinning features
        */
        debug('Focus changed to a non-http tab or non-browser window; disabling pinning features.');
        disableFeatures({ menus: true, button: true });
      }
    },
  });
}

/*
  attempt to activate an experiment by name
  me: [string, an experiment name]
*/

async function expActivate(me) {
  debug(`Attempting to activate ${me}`);
  const authState = await authCheck();
  if (!authState.auth && !authState.xRequestForgeryToken) {
    return false;
  }
  const formData = new FormData();
  formData.append('experiment_data', JSON.stringify({ key: me }));
  const activateResponse = await load({
    auth: true,
    formData,
    method: 'PUT',
    url: `${global.endpoint.api}gatekeeper/activate/`,
    xRequestForgeryToken: authState.xRequestForgeryToken,
  });
  // did we get a good response?
  if (didCallFail(activateResponse)) {
    debug(`Activation check for ${me} failed!`);
    return false;
  } else {
    debug(`Experiment Activation response for ${me}`);
    debug(activateResponse);
    return activateResponse;
  }
}

/*
  Return activated experimental group for experiment name, attempting to activate if necessary
  me: [string, an experiment name]
*/

async function expGroup(me) {
  // Check global.experimentGroup for our experiment.
  // If we can't find the name at all or we do find it but
  // it has not been activated, attempt to activate it.
  if (!(me in global.experimentGroup) || !global.experimentGroup[me].activated) {
    // attempt to activate the experiment name
    const activated = await expActivate(me);
    // get our group
    const expGroup = (((activated || {}).response || {}).data || {}).group;
    debug(`Activated experimental group ${expGroup} for experiment ${me}`);
    // update global.experimentGroup with expGroup and
    // set activated to true so we don't send a redundant request in the future
    global.experimentGroup[me] = {
      group: expGroup,
      activated: true,
    };
  }
  // have we overridden?
  const overrideGroup = (((global.override || {}).exp || {})[me] || {}).group;
  return overrideGroup || global.experimentGroup[me].group;
}

/*
  content.js wants us to inject logic.js
  me: {
    tabId: [number]
  }
*/

function injectLogic(me) {
  /*
    since all messages are filtered for tab ID, using
    executeScript will prevent situations where someone starts
    loading a slow page, switches to a different tab, and we
    try to inject logic into the current (wrong) tab.
  */
  debug('Injecting logic into tab ' + me.tabId);
  browser.tabs.executeScript(me.tabId, {
    file: config.inject.logic,
  });
}

/*
  Grid has asked us to close it
*/

function closeGrid() {
  // actually close the grid
  sendOut({ to: 'logic', act: 'closeGrid' });
}

/*
  convert an image URL into a data:URI
  (used for image search AND pinning-without-crawling)
  me: {
    url: [string],
    amSearching: [bool],
    maxWidth: [number]
  }
  TODO: can we tell the difference between an animated vs static GIF by looking in header?
*/

function getImageData(me) {
  return new Promise((resolve) => {
    // Are we making an imageless pin?
    if (!me.url) {
      debug('No image URL specified; assuming this is an imageless pin.');
      resolve({
        status: 'no_image_url',
      });
      return;
    }
    // default format to JPEG so visual search will be happy
    me.format = 'image/jpeg';
    // set format and other constraints depending on search status
    if (!me.amSearching) {
      // visual search will not take a PNG but save endpoints will
      me.format = 'image/png';
      // Only convert to data if our control file says it's okay to do so.
      if (!global.ctrl.canHaz.saveAsDataURI) {
        debug('Saving as data URIs not allowed by ctrl.json');
        resolve({
          status: 'disallowed',
          url: me.url,
        });
        return;
      }
      // Don't try to convert any GIFs, which may be animated and will only show the first frame.
      if (me.url.match(/\.gif/)) {
        debug(me.url + ' is a GIF; do not convert to data blob for saving.');
        resolve({
          status: 'gif',
          url: me.url,
        });
        return;
      }
      // Don't try to convert data URIs, which are already data
      if (me.url.match(/^data/)) {
        debug('Original URL is already data; no need to convert for saving.');
        resolve({
          status: 'data',
        });
        return;
      }
    }
    // start working here
    const img = document.createElement('IMG');
    img.onload = function () {
      // for manifest V3: plan on using offscreenCanvas
      const canvas = document.createElement('CANVAS');
      /*
        Other things we could do here:
        - Make a set of images in the sizes of our choice.
        - Compute an image signature or dominant color.
        - Make a low-resolution placeholder on the fly.
      */
      // config.limit.dataUrlWidth is for downsizing images converted to data before saving as new pins
      // test for me.maxWidth first, which is a much smaller number sent by visual search
      if (this.naturalWidth > (me.maxWidth || config.limit.dataUrlWidth)) {
        // set canvas dimensions to a target width by proportional height
        canvas.width = me.maxWidth || config.limit.dataUrlWidth;
        canvas.height =
          ((me.maxWidth || config.limit.dataUrlWidth) / this.naturalWidth) * this.naturalHeight;
      } else {
        // we're already under minimum width, so set canvas dimensions to the image's real dimensions
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        // since we are making a pixel-to-pixel copy, don't allow the browser to try to smooth the image
        canvas.imageSmoothingEnabled = false;
      }
      // start our output object
      const output = {
        status: 'ok',
        url: me.url,
        height: this.naturalHeight,
        width: this.naturalWidth,
      };
      // draw and convert to data
      try {
        canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);
        output.height = canvas.height;
        output.width = canvas.width;
        // me.format can be image/jpeg (search) or image/png (save)
        output.dataURI = canvas.toDataURL(me.format);
        debug('Image conversion to URL succeeded.');
      } catch (error) {
        debug('Image conversion to URL failed.');
        debug(error);
      }
      // resolve whatever we have
      resolve(output);
    };
    // this should never happen, since the image has already rendered to the browser
    img.onerror = function () {
      debug('Image conversion to URL failed.');
      resolve({ status: 'error', url: me.url });
    };
    // is this image from a source we need to fetch and convert to a data URI before sourcing?
    if (global.ctrl.pattern.alwaysConvertToData.some((pattern) => pattern.test(me.url))) {
      // this fetch will come from disk cache so it will be very fast
      fetch(me.url)
        .then(function (response) {
          return response.blob();
        })
        .then(function (blob) {
          // read raw data from blob
          const reader = new FileReader();
          // start reading
          reader.readAsDataURL(blob);
          // this will trigger on success or failure so we should not lose any threads
          reader.onloadend = function () {
            // do we have an error?
            if (reader.error) {
              resolve({ status: 'error', url: me.url });
            } else {
              // we're still going to conver this image through a canvas so we can resize
              img.src = reader.result;
            }
          };
        });
    } else {
      img.src = me.url;
    }
  });
}

/*
  send pinmarklet data to the grid
  me: {
    data: [object retured from pinmarklet]
  }
  TODO: check on data.hideSearch; if we are no longer searching from the grid we won't need it
*/

function populateGrid(me) {
  authCheck().then((authState) => {
    // whether or not we are authed, we're going to open the grid
    me.data.auth = authState.auth;
    // send along the global flag to hide search affordance if the user has turned it off
    me.data.hideSearch = global.hideSearch;
    // The funnel_uuid and funnel_url are used to indicate the uniqueness of one funnel,
    // since a user can pin multiple images from one domain
    me.data.funnel_uuid = makeUUID();
    me.data.funnel_url = me.data.url;
    // Log that we have received images from pinmarklet
    createContextEvent({
      eventType: 'SAVE_BROWSER_PIN_IMAGES_FOUND',
      auxData: {
        url: me.data.funnel_url,
        funnel_uuid: me.data.funnel_uuid,
      },
    });
    // image conversion counter
    let toConvert = 0;
    // start checking all images we found
    me.data.thumb.filter((thumb) => {
      // is this image from a source we need to fetch and convert to a data URI before sourcing?
      if (global.ctrl.pattern.alwaysConvertToData.some((pattern) => pattern.test(thumb.media))) {
        // add another to our to-be-done counter
        toConvert++;
        getImageData({ url: thumb.media }).then((it) => {
          if (it.dataURI) {
            thumb.dataURI = it.dataURI;
          }
          toConvert--;
        });
      }
    });
    /*
      There are several asynchronous operations happening during conversion,
      so we either need a fancy asyc/await + promises wrapper around array.filter or
      we can keep it ugly but functional
    */
    function checkDoneConverting() {
      // are we all done converting?
      if (!toConvert) {
        // add authState so Save overlay knows whether to try to save inline or pop the unauthed board picker
        me.data.auth = authState.auth;
        sendOut({
          to: 'save',
          act: 'renderPinmarkletData',
          data: me.data,
        });
      } else {
        // check again
        window.setTimeout(checkDoneConverting, 10);
      }
    }
    // give the converter a head start before checking
    window.setTimeout(checkDoneConverting, 10);
  });
}

/*
  Should we no-pin or no-hover a domain?
  me: {
    domain: [string, like "foo.bar.com"]
  }
  TODO: stop checking hashList.theOtherList; use config.theOtherList instead
*/

function checkFeatureBlock(me) {
  // hash all varations of the domain to catch cases where
  // we are visiting foo.bar.com but bar.com is on the list
  const status = {
      nohover: false,
      nopin: false,
    },
    parts = me.domain.split('.').reverse();
  // start with the tld
  let domainToCheck = parts[0];
  for (let i = 1; i < parts.length; i = i + 1) {
    // add the next path level
    domainToCheck = parts[i] + '.' + domainToCheck;
    // hash it and then check the digest against items loaded from hashList.json on session start
    hash({ str: domainToCheck, method: 'SHA-1' }).then((result) => {
      // check if our digest is on theOtherList, which contains domains that should never be saved
      config.theOtherList.filter((item) => {
        if (result.digest.match(item)) {
          debug('No-pin list match on ' + domainToCheck + '; pin and hover disabled');
          status.nopin = status.nohover = true;
        }
      });
      // check if our digest is on theList, which contains domains that should not show hovering Save buttons
      global.hashList.filter((item) => {
        if (result.digest.match(item)) {
          debug('No-hover list match on ' + domainToCheck + '; hover disabled');
          status.nohover = true;
        }
      });
    });
  }
  // send back the results
  sendOut({
    to: 'logic',
    act: 'renderFeatureBlock',
    data: status,
  });
}

/*
  show or hide context menus, and other important stuff
  me: {
    data: {
      nopin: [bool]
    }
  }
  TODO: remove logic gating search on login
*/

function refreshContextMenus(me) {
  // flush events if needed
  if (flushContextEvents()) {
    sendContextEvents();
  }
  // always kill context menus; we will re-enable them if needed
  disableFeatures({ menus: true });
  // have we found a reason to disable pinning?
  if (me.data.nopin) {
    // set disabled icon for the browser button
    disableFeatures({ button: true });
    // context menus have already been removed
    debug('data.nopin encountered; no context menus for you!');
  } else {
    // we did not find a reason to disable pinning, so make your context menus
    debug('no data.nopin encountered; making context menus');
    // set enabled icon for the browser button
    browser.browserAction.setIcon({ path: 'img/icon_toolbar.png' });
    // save
    try {
      browser.contextMenus.create({
        id: 'rightClickToPin',
        title: browser.i18n.getMessage('saveAction'),
        // only fire for images
        contexts: ['image'],
        onclick: () => {
          sendOut({ to: 'logic', act: 'contextSave' });
        },
      });
      if (!global.hideSearch) {
        debug('You get the Search context menu.');
        browser.contextMenus.create({
          id: 'search',
          title: browser.i18n.getMessage('searchAction'),
          contexts: ['page', 'frame', 'selection', 'editable', 'video', 'audio'],
          onclick: () => {
            browser.tabs.captureVisibleTab((uri) => {
              debug('screen captured');
              sendOut({
                to: 'logic',
                act: 'openSearch',
                data: { method: 'r', searchMe: uri },
              });
            });
          },
        });
      } else {
        debug('Login NOT found; no Search menu for you.');
      }
      debug('context menu create success.');
    } catch (err) {
      debug('context menu create FAIL.');
      debug(err);
    }
  }
}

/*
  Use executeScript to run pinmarklet on current page
  me: [number, a tab ID]
*/

function injectPinmarklet(me) {
  debug('Injecting pinmarklet into tab ' + me.tabId);
  browser.tabs.executeScript(me.tabId, {
    file: config.inject.pinmarklet,
  });
}

/*
  ask the content script to close the inline Save overlay
*/

function closeSave() {
  sendOut({ to: 'logic', act: 'closeSave' });
}

/*
  Close the Save overlay and then open the login page on pinterest.com
*/

function getAuthHelp() {
  // close the Save overlay
  sendOut({ to: 'logic', act: 'closeSave' });
  // launch Pinterest in a new tab, ready to sign in
  browser.tabs.create({
    url: `https://${global.ctrl.server.www}${global.ctrl.server.domain}/login/`,
  });
}

/*
  Create has asked us to make a new board
  me: {
    data: {
      name: [string (required)],
      secret: [bool (optional)],
    },
    replyTo: [string, (required, should always be "save" post 4.2)],
  }
*/

function newBoard(me) {
  authCheck().then((authState) => {
    if (authState.auth && authState.xRequestForgeryToken) {
      const query = {
        auth: true,
        xRequestForgeryToken: authState.xRequestForgeryToken,
        method: 'PUT',
        url: global.endpoint.api + 'boards/?',
      };
      if (me.data.name) {
        // new boards are PUTs, so we need all parameters in the URL
        query.url = query.url + 'name=' + encodeURIComponent(me.data.name);
        if (me.data.secret) {
          query.url = query.url + '&privacy=secret';
        }
        load(query).then((reply) => {
          debug('Board create results');
          debug(reply);
          if ((reply.response || {}).status === 'success') {
            const it = reply.response.data;
            sendOut({
              to: me.replyTo,
              act: 'newBoardWin',
              data: it,
            });
            createContextEvent({
              objectIdStr: it.id,
              eventType: 'BOARD_CREATE',
            });
            browser.storage.local.get('boards', (reply) => {
              // unshift our new board onto the stack and stash
              reply.boards.unshift({
                id: it.id,
                image_cover_url: it.image_cover_url || it.image_thumbnail_url,
                name: it.name,
                privacy: it.privacy,
                is_collaborative: false,
                section_count: 0,
                orderModified: Date.now(),
              });
              // save so overlays can load quickly on render
              setLocal({ boards: reply.boards });
            });
          } else {
            sendOut({
              to: me.replyTo,
              act: 'newBoardFail',
              data: reply.response,
            });
          }
        });
      }
    } else {
      // lost auth before board create attempt
      sendOut({
        to: me.replyTo,
        act: 'newBoardFail',
        data: {
          message: global.msg.msgOops,
          message_detail: global.msg.msgLoginFail,
        },
      });
    }
  });
}

/*
  Create has asked us to make a new section
  me: {
    data: {
      title: [string],
      board: [number],
    },
    replyTo: [string, (required, should always be "save" post 4.2)],
  }
  // TODO: audit timeCheck
*/

function newSection(me) {
  authCheck().then((authState) => {
    if (authState.auth && authState.xRequestForgeryToken) {
      const query = {
        auth: true,
        xRequestForgeryToken: authState.xRequestForgeryToken,
        method: 'PUT',
        url: `${global.endpoint.api}board/${me.data.board}/sections/?`,
      };
      if (me.data.title && me.data.board) {
        // new sections are PUTs, so we need all parameters in the URL
        query.url = query.url + 'title=' + encodeURIComponent(me.data.title);
        load(query).then((reply) => {
          debug('Section create results');
          debug(reply);
          if ((reply.response || {}).status === 'success') {
            sendOut({
              to: me.replyTo,
              act: 'newSectionWin',
              data: reply.response.data,
            });
            browser.storage.local.get('boards', (localReply) => {
              // see if we can find the right board for our new section
              let found = false;
              localReply.boards.filter((yeBoard) => {
                if (yeBoard.id === me.data.board) {
                  found = true;
                  // add new sections array if needed
                  if (!yeBoard.sections) {
                    yeBoard.sections = [];
                  }
                  // add new section
                  yeBoard.sections.push({ id: reply.response.data.id, title: me.data.title });
                  // sort by title
                  yeBoard.sections.sort((a, b) => (a.title > b.title ? 1 : -1));
                  // refresh orderModified so this board shows on top
                  yeBoard.orderModified = 0;
                }
              });
              // did we find the right board to modify
              if (found) {
                // save so overlays can load quickly on render
                setLocal({ boards: localReply.boards });
              }
            });
          } else {
            // create needs to do something with this error
            sendOut({
              to: me.replyTo,
              act: 'newSectionFail',
              data: reply.response,
            });
          }
        });
      }
    } else {
      // lost auth before section create attempt
      sendOut({
        to: me.replyTo,
        act: 'newSectionFail',
        data: {
          message: global.msg.msgOops,
          message_detail: global.msg.msgLoginFail,
        },
      });
    }
  });
}

/*
  open the inline Save overlay
  me: {
    boards: [array]
  }
*/

function openSave(me) {
  // if we have at least one board
  if (me.boards && me.boards.length > 0) {
    sendOut({
      to: 'logic',
      act: 'openSave',
      data: me,
    });
  }
}

/*
  data is ready for Save overlay
  me: {
    data: {object}
  }
*/

function populateSave(me) {
  window.setTimeout(function () {
    sendOut({
      to: 'save',
      act: 'renderStructure',
      data: me.data,
    });
  }, 10);
}

/*
  data is ready for Save overlay
  me: {
    data: {object}
  }
*/

function populateSearch(me) {
  // todo: change function name to populateSearch after this experiment closes
  sendOut({
    to: 'save',
    act: 'renderSearch',
    data: me.data,
  });
}

/*
  convert base64/URLEncoded data component to raw binary data
  expects a data: URI
*/

function makeBlob(dataURI) {
  let bytes;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    bytes = atob(dataURI.split(',')[1]);
  } else {
    bytes = unescape(dataURI.split(',')[1]);
  }
  // separate out the mime component
  const mimeType = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // create a fixed-length typed array
  const blobArray = new Uint8Array(bytes.length);
  // fill the array
  for (let i = 0; i < bytes.length; i++) {
    blobArray[i] = bytes.charCodeAt(i);
  }
  return new Blob([blobArray], { type: mimeType });
}

/*
  Search needs results
  me: {
    data {
      x: [number between 0 and 1],
      y: [number between 0 and 1],
      h: [number between 0 and 1],
      w: [number between 0 and 1],
      u: [string (URL of image to be loaded, optional)],
      img: [raw image data],
    }
  }
*/

function runSearch(me) {
  const sendTo = 'save';
  // search API expects raw data, not an image URL
  const searchFor = (it) => {
    const query = {
      method: 'PUT',
      url: `${global.endpoint.api}visual_search/extension/image/`,
      formData: new FormData(),
    };
    // start coordinates
    query.formData.append('x', it.data.x || 0);
    query.formData.append('y', it.data.y || 0);
    query.formData.append('h', it.data.h || 1);
    query.formData.append('w', it.data.w || 1);
    query.formData.append('client_id=', global.ctrl.clientId);
    query.formData.append('base_scheme', 'https');
    query.formData.append(
      'add_fields',
      'pin.pinner(),pin.rich_summary,pin.dominant_color,pin.board()',
    );
    query.formData.append('image', makeBlob(it.data.img));
    if (global.puid) {
      query.formData.append('viewing_user_id', global.puid);
    }
    // run the API call
    load(query).then((reply) => {
      if ((reply.response || {}).status) {
        debug('Search API call succeeded.');
        if (
          // do we have response data with more than zero things in it?
          ((reply.response || {}).data || {}).length
        ) {
          // add auth flag if found so we know whether to pop pin builder for Save button
          if ((global.userInfo || {}).id) {
            reply.response.auth = true;
          }
          sendOut({
            to: sendTo,
            act: 'showResults',
            data: reply.response,
          });
        } else {
          sendOut({
            to: sendTo,
            act: 'searchFail',
            data: 'Search API call had no results.',
          });
          debug('Search API call had no results.');
        }
      } else {
        sendOut({
          to: sendTo,
          act: 'searchFail',
          data: 'Search API call failed.',
        });
        debug('Search API call failed.');
      }
    });
  };
  // do we have a preloaded image or an URL to load?
  if (me.data.img || me.data.u) {
    if (me.data.img && !me.data.u) {
      // we already have raw data in me.data.img
      searchFor(me);
    } else {
      // we will need to convert a web URL to a data URI
      getImageData({
        url: me.data.u,
        amSearching: true,
        // downsample to this size so we're not clogging the network
        maxWidth: 256,
      }).then((imgData) => {
        me.data.img = imgData.dataURI;
        searchFor(me);
      });
    }
  } else {
    debug('runSearch was called without an image or URL, quietly failing');
  }
}

/*
  make a new pin or repin
  me: {
    data: {
      pins: [array of {
        id: [number, means trigger a repin],
        url: [string],
        media: [url or raw data],
        image_url: [string],
        color: [string],
        meta: [object],
      }],
      board: [string (required)],
      section: [string],
    },
    replyTo: [string, (required, should always be "save" post 4.2)],
  }
  TODO: move experimental code
  TODO: audit and better document all params we are passing in pins object
*/

function save(me) {
  authCheck().then((authState) => {
    if (authState.auth && authState.xRequestForgeryToken) {
      // me.data.pins is converted into an array in populateCreate
      // here we make a separate call for each pin/repin
      for (let pin of me.data.pins) {
        // always attempt to convert data; sending the empty string will get us a quick empty reply
        getImageData({ url: pin.media || '' }).then((converted) => {
          // required: board ID, URL, and either a remote or data URL OR color for imageless pin
          // optional: description
          const query = {
            auth: true,
            xRequestForgeryToken: authState.xRequestForgeryToken,
            url: `${global.endpoint.api}pins/`,
            formData: new FormData(),
            method: 'PUT',
          };
          // start loading up formData
          query.formData.append('method', 'extension');
          query.formData.append('add_fields', 'user.is_partner');
          query.formData.append(
            'description',
            // if the pin description is falsy, substitute an empty string so repins don't fail.
            (pin.description || '').substr(0, 500),
          );
          query.formData.append('board_id', me.data.board);
          if (me.data.section) {
            // are we pinning to a section?
            query.formData.append('section', me.data.section);
          }
          if (pin.meta && typeof pin.meta == 'object') {
            query.formData.append('found_metadata', JSON.stringify(pin.meta));
          }
          // are we making a repin?
          if (pin.id) {
            query.url = query.url + `${pin.id}/repin/`;
            query.method = 'POST';
          } else {
            // add the page URL
            query.formData.append('source_url', pin.url);
            // do we have an image?
            if (pin.media) {
              // did we successfully convert the image to a data URI?
              if (converted.dataURI) {
                // be ready to send this as image_url
                pin.convertedFromUrl = pin.media;
                // be ready to send this as image_base64
                pin.media = converted.dataURI;
              }
              // are we saving a data:URI?
              if (pin.media.match(/^data/)) {
                // send it as image_base64
                query.formData.append('image_base64', pin.media);
                // did we convert it from an URL?
                if (pin.convertedFromUrl) {
                  query.formData.append('image_url', pin.convertedFromUrl);
                }
              } else {
                // the image URL was not successfully converted so let's try to crawl it from the back end
                query.formData.append('image_url', pin.media);
              }
            } else {
              // there was no media so we are making a text-only pin
              query.formData.append('isGeneratedTextImage', 'true');
              // do we have a background color?
              if (pin.color) {
                query.formData.append('color', pin.color);
              }
            }
          }
          const auxData = {
            funnel_uuid: pin.funnel_uuid,
            // we won't have pin.funnel_url for errors
            domain_url: pin.funnel_url || pin.url,
          };
          // domain_url won't exist for repins
          if (auxData.domain_url) {
            if (!auxData.domain_url.match(/^https?:\/\//)) {
              // fix malformed or data URLs
              delete auxData.domain_url;
            } else {
              // this will be zero or more characters
              auxData.domain_url = auxData.domain_url.split('/')[2];
            }
          }
          debug('Save Object');
          debug(query);
          load(query).then((reply) => {
            debug('Save results');
            debug(reply);
            if ((reply.response || {}).status === 'success') {
              debug('Pin saved.');
              // re-order boards so the next time we save the most current one is on top
              browser.storage.local.get('boards', (my) => {
                let index = 0;
                // can we find the index of board we just saved by ID?
                debug(`Looking for board id ${me.data.board}`);
                my.boards.filter((it, at) => {
                  if (it.id === me.data.board) {
                    index = at;
                  }
                  debug('Found saved board index');
                });
                // did we find the board we want to move to top at a position other than zero?
                if (index) {
                  debug(
                    'Saved board index is greater than zero, shifting and saving boards back to local storage',
                  );
                  // move it to first position
                  my.boards.unshift(my.boards.splice(index, 1)[0]);
                  // save re-ordered board list
                  setLocal({
                    boards: my.boards,
                  });
                }
              });
              // update last pin save time for celebration in grid.html
              global.userInfo.lastPinSaveTime = Date.now();

              // update in localStorage so next overlay open will have current info
              setLocal({
                userInfo: global.userInfo,
              });
              reply.response.data.title = me.data.sectionName;
              // report this user as a daily average user
              createContextEvent({
                eventType: 'USER_ACTIVE',
                viewType: 'BROWSER_EXTENSION_DAU',
              });
              // log pin create success event
              createContextEvent({
                objectIdStr: reply.response.data.id,
                eventType: 'PIN_CREATE',
                auxData,
              });
              // send word to the right overlay that it worked
              sendOut({
                to: me.replyTo,
                act: 'newPinWin',
                data: reply.response.data,
                pin: pin,
                total: me.data.pins.length,
              });
            } else {
              // to test query fail, set query.method to GET before calling load()
              debug('Pin failed.');
              createContextEvent({
                eventType: 'PIN_CREATE_FAILURE',
                auxData,
              });
              // we are signed in but the pin failed
              sendOut({
                to: me.replyTo,
                act: 'newPinFail',
                data: reply.response,
              });
            }
          });
        });
      }
    } else {
      // lost auth before pin create attempt
      sendOut({
        to: me.replyTo,
        act: 'newPinFail',
        data: {
          msg: global.msg.msgOops,
          message_detail: global.msg.msgLoginFail,
        },
      });
    }
  });
}

/*
  Activate an experiment by name and returns a message to caller, triggering callback with group and data (if sent)
  me: {
    experimentName: [string, required],
    via: [string, (an overlay like save or create)],
    callback: [string (an act in an overlay)]
    data: [object, optional],
  }
  TODO: audit experiment.getGroupForExperiment; are we dropping errors on the floor if group comes back null?
*/

function activate(me) {
  debug(`Attempting to activate an experiment`);
  debug(me);
  // Do we have an experiment to check?
  if (me.experimentName) {
    // go get groups, activating if necessary, and then...
    expGroup(me.experimentName).then((group) => {
      debug(`Found group ${group} for experiment ${me.experimentName}.`);
      // Do we know what they want us to do with results when we get them back?
      if (me.callback) {
        debug(`returning to ${me.callback} in ${me.via}.`);
        // build a return message
        const msg = {
          // which overlay should receive our output?
          to: me.via,
          // what function should we call when we get there?
          act: me.callback,
          // which group are we in?
          group,
        };
        // do we have a data object we need to pass back with the group?
        if (me.data) {
          // add it to the return message
          msg.data = me.data;
        }
        // send it back
        sendOut(msg);
      } else {
        debug('Activation attempted without callback');
      }
    });
  } else {
    debug('Could not activate; need experiment name');
    debug(me);
  }
}

/*
  an overlay has asked us to add a context log event
*/

function contextLog(me) {
  createContextEvent(me.data);
}

/*
  functions listed under act are called remotely from content script or overlays
*/

const act = {
  // content
  injectLogic,

  // grid
  closeGrid,
  populateGrid,

  //logic
  checkFeatureBlock,
  injectPinmarklet,
  refreshContextMenus,

  // save
  closeSave,
  getAuthHelp,
  newBoard,
  newSection,
  openSave,
  populateSave,
  populateSearch,
  runSearch,
  save,

  // util
  activate,
  contextLog,
  login,
};

/* 
  listen for messages from outside our process
  { 
    to: [should match config.me],
    act: [may match something we're watching for in our act object],
    request: [pass to act[me.act]]
  }
*/

function handleRemoteActions() {
  browser.runtime.onMessage.addListener((request, sender) => {
    // is it for us?
    if (request.to === config.me) {
      debug('Message received');
      debug(request);
      // do we have a handler?
      if (request.act && typeof act[request.act] === 'function') {
        // see if we can tell what tab the message came from
        if (((sender || {}).tab || {}).id) {
          // add the tabId to the request so we can specify it if needed
          request.tabId = sender.tab.id;
        }
        // run it, passing the entire object in
        act[request.act](request);
      } else {
        // someone is sending us a message asking for a handler that doesn't exist
        debug('No handler found for ' + request.act, 1);
      }
    }
  });
}

/*
  housekeeeping functions
  run as a callback after we know our control values
  TODO: add BrowserTypes to config.browserTest.filter?
  TODO: When/if Safari supports the extension, add it to the cases with keyphrase 'sa'
*/

function housekeep() {
  // for logging and setting data-pinterest-extension-installed
  let userAgentFound = false;
  // start with xx and OTHER; if we find a match we will change
  global.xv = 'xx' + browser.runtime.getManifest().version;
  global.browserType = global.ctrl.ctx.BrowserTypes.OTHER;
  // search for matches
  config.browserTest.filter((it) => {
    if (!userAgentFound && window.navigator.userAgent.match(it.r)) {
      global.xv = it.k + browser.runtime.getManifest().version;
      // so we don't keep searching after we find a match
      userAgentFound = true;
      switch (it.k) {
        case 'ff':
          global.browserType = global.ctrl.ctx.BrowserTypes.FIREFOX;
          break;
        case 'ms':
          global.browserType = global.ctrl.ctx.BrowserTypes.EDGE;
          break;
        case 'op':
          global.browserType = global.ctrl.ctx.BrowserTypes.OPERA;
          break;
        // important: check Chrome last so we don't miss Edge
        case 'cr':
          global.browserType = global.ctrl.ctx.BrowserTypes.CHROME;
          break;
      }
    }
  });
  // always overwrite the version on session start
  setLocal({ xv: global.xv });
  // create API endpoint
  global.endpoint.api = `https://${global.ctrl.server.api}${global.ctrl.server.domain}/v3/`;
  // create trk endpoint for context logging
  global.endpoint.trk = `https://${global.ctrl.server.trk}${global.ctrl.server.domain}/v3/`;
  // set these in local storage so support files know if we're debugging and business logic file locations
  setLocal({ debug: config.debug });
  // check if our onInstalled listener caught anything
  // Caution: checkInstallObj will fail if it's called before global.xv is set!
  checkInstallObj();
  // build an URL that will load the page that logs the current version on uninstall
  const uninstallUrl = `https://${global.ctrl.server.www}${global.ctrl.server.domain}/_/_/about/browser-button/uninstall/?xv=${global.xv}`;
  browser.runtime.setUninstallURL(uninstallUrl);
  debug('setting uninstall URL to ' + uninstallUrl);
  // start listening for remote actions
  handleRemoteActions();
  // someone has clicked our browser button
  browser.browserAction.onClicked.addListener(() => {
    // open the image picker
    sendOut({ to: 'logic', act: 'openImagePicker' });
  });
  // if we're debugging, show our version number on the badge
  if (global.debug) {
    browser.browserAction.setBadgeText({
      text: browser.runtime.getManifest().version.replace(/\./g, ''),
    });
  }
  // listen for tab change so we can refresh context menus
  browser.tabs.onActivated.addListener(() => {
    tabSwitch();
  });
  // listen for window focus change
  browser.windows.onFocusChanged.addListener(() => {
    tabSwitch();
  });
  // modify user-agent when we are talking to our own API
  browser.webRequest.onBeforeSendHeaders.addListener(
    function (e) {
      // are we talking to our own API?
      if (e.url.match(global.ctrl.pattern.api) || e.url.match(global.ctrl.pattern.trk)) {
        e.requestHeaders.filter((header) => {
          // append " Pinterest for BrowserExtension/4.1.104" or similar to the user-agent string
          if (header.name === 'User-Agent') {
            header.value += ` ${config.ua}/${browser.runtime.getManifest().version}`;
          }
        });
        return { requestHeaders: e.requestHeaders };
      }
    },
    { urls: [`${global.endpoint.api}*`] },
    ['blocking', 'requestHeaders'],
  );
  // block requests to certain Pinterest URLs
  browser.webRequest.onBeforeRequest.addListener(
    (e) => {
      // can we try to block pinmarklet?
      if (global.ctrl.canHaz.localImagePicker) {
        // are we trying to run pinmarklet?
        if (e.url.match(global.ctrl.pattern.pinmarklet)) {
          global.guid = '';
          // are we inside another page rather than trying to load pinmarklet itself in a new tab?
          // e.initiator = Chrome; e.originUrl = Firefox
          if (e.initiator || e.originUrl) {
            // open the image picker, which will run our onboard copy of pinmarklet
            sendOut({ to: 'logic', act: 'openImagePicker' });
            // cancel the request to pinmarklet.js
            return {
              cancel: true,
            };
          }
        }
      }
    },
    {
      urls: ['*://*.pinterest.com/*'],
    },
    ['blocking'],
  );
  // add browser extension user ID parameter if we qualify for conversion measurement
  browser.webRequest.onBeforeRequest.addListener(
    (e) => {
      // are we signed in? have we granted permission for measurement?
      if (global.userInfo.id && global.userInfo.canHazMeasurement) {
        if (!e.url.includes('beuid')) {
          e.url = e.url + '&beuid=' + global.userInfo.id;
          // decider: browser_extension_measurement_decider
          // internal expGroup calls are being made inside an await so if we don't give it a global flag we will
          // activate more than once if the first page we're on has more than one tracking pixel
          if (!global.userInfo.hazActivatedMeasurement) {
            global.userInfo.hazActivatedMeasurement = true;
            expGroup('browser_extension_measurement_decider');
          }
          return { redirectUrl: e.url };
        }
      }
    },
    {
      // only do this for the conversion tracker domain
      urls: ['*://ct.pinterest.com/v3*'],
    },
    ['blocking'],
  );
  // check for auth, which will get user info, experiments, and boards
  login();
  // load the feature block list
  load({ url: browser.runtime.getURL('./data/hashList.json') }).then((result) => {
    // Manifest V3 TODO: keep in local storage with a last-loaded timestamp, othewise we will reload every time the service worker restarts
    global.hashList = result.response;
    debug(`hashList loaded; ${global.hashList.length} items found`);
    // uncomment to test kentbrew.neocities.org
    // global.hashList.push('499813a2f012');
  });
}

/*
  start a session
*/

function init() {
  // this grabs all possible messages one time and
  // holds them in localStorage instead of using
  // the i18n API every time, which is slow/blockish
  global.msg = {};
  for (const string in config.translateThese) {
    global.msg[string] = browser.i18n.getMessage(string);
  }
  debug('Messages retrieved from i18n:');
  debug(global.msg);
  setLocal({ msg: global.msg });
  // share some configs to local global, and save them to localStorage so overlays can access
  global.debug = config.debug;
  setLocal({ debug: config.debug });
  global.ctrl = config.ctrl;
  setLocal({ ctrl: config.ctrl });
  housekeep();
}

// do this first
captureInstallEvent();

browser.storage.local.get(null, (me) => {
  // anything in local storage under a key we specified is now available in global
  for (let i in me) {
    global[i] = me[i];
  }
  // promote the right subset of messages
  if (global.msg) {
    global.msg = global.msg[config.me];
  }
  if (global.override) {
    console.log(
      `You have global overrides set thusly:\n\n${JSON.stringify(
        global.override,
        null,
        2,
      )}\n\nRun this:\n\nchrome.storage.local.remove("override");\n\n... to remove.`,
    );
  }
  // fire it off
  init();
});
