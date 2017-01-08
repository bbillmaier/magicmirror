// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';

console.log('Loaded environment variables:', env);

var app = remote.app;
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



