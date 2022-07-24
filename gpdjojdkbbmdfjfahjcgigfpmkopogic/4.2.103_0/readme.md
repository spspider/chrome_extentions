# Pinterest Browser Extension, v4

## New for Version 4

- load all business logic locally and not from assets.pinterest.com (per Google's latest diktat; this will also allow us entry into addons.mozilla.org)
- new file ctrl.json (local for debug; from assets.pinterest.com in production) dictates things like save-from-iframe and turn-pfob-off-globally
- be able to create pins inside an iframe loaded from pinterest.com

## Features and Goals:

- meta information saved with new pins
- personalization from offsite browsing
- board sections
- hashtags
- visual search
- inline pin, board, and section creation
- hoverbuttons
- right-click-to-pin
- logging for various events
- <del>business logic loaded as needed from assets.pinterest.com</del>
- internationalization ("Save" button and all messaging in all supported languages.)
- option to turn off hoverbuttons
- install education
- uninstall questionnaire
- hidden hoverbuttons for listed domains
- standards-aware code that should run on Chrome, Firefox, Microsoft Edge, Opera, and other Blink/WebExtensions-compatible browsers, with minimal work

## Traffic Direction

#### Background File

`js/background.js`

This is the file that's running when you click "background page" under Inspect Views.

When `DEBUG` is set to `true` in `background.js`, many entries will be written to the JavaScript console, in the background, content, and overlays. **Please be very careful not to ship with the debug flag on!**

`background.js` loads `ctrl.json` locally in debug mode and from `assets.pinterest.com` in production.

#### Control File

Local (debugging only): `ctrl.json`

Remote (production): `https://assets.pinterest.com/ext/ctrl.json`

Answers important questions like "should we use the iframed pin create experience," "should we allow unauthed search," and "should we turn off personalization from offsite browsing?"

Here's an example:

    {
      "ctrlVer": 2019082001,
      "canHaz": {
        "saveAsDataURI": true,
        "localImagePicker": true,
        "pfob": true
      },
      "search": {
        "clientId": 1447278,
        "authRequired": false,
        "unauthPercent": 0
      },
      "endpoint": {
        "about": "https://about.pinterest.com/",
        "log": "https://log.pinterest.com/",
        "grid": {
          "pinCreate": "https://www.pinterest.com/pin/create/extension/",
          "rePinCreate": "https://www.pinterest.com/pin/%s/repin/x/"
        }
      },
      "path": {
        "uninstall": "browser-button/",
        "welcome": "browser-button-confirmation-page/"
      },
      "pattern": {
        "pinmarklet": "^https?:\\/\\/assets\\.pinterest\\.com\\/js\\/pinmarklet\\.js",
        "pinterestDomain": "^https?:\\/\\/((\\w+)\\.|)pinterest\\.(at|(c(a|h|l|o(\\.(kr|uk)|m(|\\.(au|mx)))))|d(e|k)|es|fr|i(e|t)|jp|nz|p(h|t)|se|ru)\\/"
      },
      "ctx": {
        "EventTypes": {
          "BROWSER_EXTENSION_INSTALL": 8219,
          "BROWSER_EXTENSION_SESSION": 8221
        },
        "AppTypes": {
          "BROWSER_EXTENSION": 8
        },
        "BrowserTypes": {
          "OTHER": 0,
          "CHROME": 1,
          "SAFARI": 2,
          "IE": 3,
          "FIREFOX": 4,
          "OPERA": 5,
          "EDGE": 7
        }
      },
      "csrfDomain": "api.pinterest.com",
      "wwwDomain": "www.pinterest.com"
    }

When debugging API calls, set it to `your-api.pinterdev.com`. When debugging WWW calls, you want to set it to `you.pinterdev.com`.

## Iframed Overlays

#### Create Overlay

`html/create.html` calls `js/create.js`

Our pin-creating client.

#### Grid Overlay

`html/grid.html` calls `js/grid.js`

Our pinmarklet-rendering client.

#### Search Overlay

`html/search.html` calls `js/search.js`

Flashlight search for browser extensions.

#### Options

`html/options.html` calls `js/options.js`

## Behavior

#### Content Injector

`js/content.js`

Injects business logic and hash list on page load, and decides whether to run `logic.js`.

#### Business Logic

Local: `js/logic.js`

Runs when `content.js` says it's okay to do so. _When working with this file, be extra careful not to load anything from our domain without user interaction._ If you do the effect will be to track all of the user's traffic.

#### Hash List

Remote: `https://assets.pinterest.com/ext/hashList.json`

Loads once on session start and is injected with business logic on every page load; helps to prevent hoverbuttons from showing on questionable domains.

A more-detailed explainer for this file for team members only may be found at [Things it is Good to Know About hashList.json](https://docs.google.com/document/d/1uEKva3JUMqtigUYTvRCmkj2cIYg2moY0vFITQwgYj-o/).

#### DOM Crawler

Local: `js/pinmarklet.js`

Runs on click to browser button; loads `html/grid.html` when complete.

#### Grid Overlay Behavior

Local: `js/grid.js`

Runs when called by user action on toolbar button. Pinmarklet should collect and forward data through the background process; in cases where there is only one pinnable thing, grid should close and save/create should open.

#### Create Overlay Behavior

Local: `js/create.js`

Renders the onboard saving experience when called by user action from hoverbutton, right-click, or grid save.

#### Search Overlay Behavior

Local: `js/search.js`

Runs when called by user action via right-click, hoverbutton, or click to Search button in grid.

#### Options Behavior

`js/options.js`

Saves user preferences (currently: hide hoverbuttons)

## Support Files

#### Translated Strings

`_locales/*/messages.json`

One file for each supported language. _If you change anything in here, be sure to budget time for translation services!_

Translated messages were removed from business logic with version 4.0.74 and improved with 4.0.75; on session start the background process should load all messages in the correct language using the i18n API and move them into local storage. Business logic reads local storage on load, so messages should be immediately available.

If you add messages that need to show in overlays, you will want to add them to the translateThese object in background.js in the appropriate overlay sub-object.

Pinmarklet is the sole holdout where messages are still in code, because it runs on many clients outside browser extensions.

#### Images

`img/*.png`

`img/disabled/*.png`

Icons and chrome buttons; those in the `disabled` folder are grayed-out versions for the toolbar button.

#### Permission and Resource Catalog

`manifest.json`

Be careful about permissions changes; if you request permissions not already required by the extension, the extension will be disabled until the user grants the new permissions. _For us the scope is already pretty scary; expect users to balk and uninstall rather than update._

Special note about Firefox: it wants the `<all_urls>` permission in order to make screenshots. Chrome should not need this permission.

#### Documentation

`readme.md`

You're reading it now. Please help keep it up to date!
