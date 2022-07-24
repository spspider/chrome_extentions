(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

chrome.app.runtime.onLaunched.addListener(function (launchData) {
    chrome.app.window.create('../index.html', {
        singleton: true,
        id: 'MQTTBox',
        'bounds': {
            'width': Math.round(window.screen.availWidth),
            'height': Math.round(window.screen.availHeight)
        }
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwL3BsYXRmb3JtL2JhY2tncm91bmRfY2hyb21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxPQUFPLEdBQVAsQ0FBVyxPQUFYLENBQW1CLFVBQW5CLENBQThCLFdBQTlCLENBQTBDLFVBQVMsVUFBVCxFQUFxQjtBQUMzRCxXQUFPLEdBQVAsQ0FBVyxNQUFYLENBQWtCLE1BQWxCLENBQXlCLGVBQXpCLEVBQTBDO0FBQ3RDLG1CQUFXLElBRDJCO0FBRXRDLFlBQUksU0FGa0M7QUFHdEMsa0JBQVU7QUFDTixxQkFBUyxLQUFLLEtBQUwsQ0FBVyxPQUFPLE1BQVAsQ0FBYyxVQUF6QixDQURIO0FBRU4sc0JBQVUsS0FBSyxLQUFMLENBQVcsT0FBTyxNQUFQLENBQWMsV0FBekI7QUFGSjtBQUg0QixLQUExQztBQVFILENBVEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2hyb21lLmFwcC5ydW50aW1lLm9uTGF1bmNoZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24obGF1bmNoRGF0YSkge1xuICAgIGNocm9tZS5hcHAud2luZG93LmNyZWF0ZSgnLi4vaW5kZXguaHRtbCcsIHtcbiAgICAgICAgc2luZ2xldG9uOiB0cnVlLFxuICAgICAgICBpZDogJ01RVFRCb3gnLFxuICAgICAgICAnYm91bmRzJzoge1xuICAgICAgICAgICAgJ3dpZHRoJzogTWF0aC5yb3VuZCh3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGgpLFxuICAgICAgICAgICAgJ2hlaWdodCc6IE1hdGgucm91bmQod2luZG93LnNjcmVlbi5hdmFpbEhlaWdodClcbiAgICAgICAgfVxuICAgIH0pO1xufSk7Il19
