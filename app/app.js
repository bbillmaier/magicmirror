(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = require('os');
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

var env = jetpack.cwd(__dirname).read('env.json', 'json');

// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
console.log('Loaded environment variables:', env);

var app = electron.remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('env-name').innerHTML = env.name;
    startTime();

});

$( document ).ready(function() {

    getTraffic(startLocation, destination, googleAPIKey, false, false, Date.now(), 7, 9);
    getCurrentWeather('Ewa Beach', 'imperial');
    document.getElementById('date').innerHTML = theDate();
    getNewsFeed('techcrunch', '050ace9a6f81445a9e0f9d0ee68a7e0b');
    getRedditFeed('worldnews', 'hot', 5);

    setInterval(function(){ getCurrentWeather('Pittsburgh', 'imperial'); }, 600000);
    setInterval(function(){ getTraffic(startLocation, destination, googleAPIKey, false, false, Date.now(), 7, 9); }, 60000);
    setInterval(function(){ getCurrentWeather('Ewa Beach', 'imperial'); }, 600000);
    setInterval(function(){ document.getElementById('date').innerHTML = theDate(); }, 1000);
    setInterval(function(){ getRedditFeed('worldnews', 'hot', 5); }, 60000);
});

}());
//# sourceMappingURL=app.js.map