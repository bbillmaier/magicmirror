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
    // Weather API key aa14eefdadb34bb7a3e2600bfdcb7af9
    // Example Call api.openweathermap.org/data/2.5/forecast?q=Pittsburgh,us&mode=xml&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9
    // http://openweathermap.org/current
    getForecast('Detroit');
    getCurrentWeather('Pittsburgh');
    getTraffic();
   
 
});

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
    return i;
}

function getForecast(city){
    var weatherForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&units=imperial&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9';
     var request = $.ajax({
      url: weatherForecast,
      method: "POST",
      dataType: "JSON"
    });
     
    request.done(function( msg ) {
      console.log( msg );
    });
}

function getCurrentWeather(city){
    var weatherForecast = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',us&units=imperial&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9';
     var request = $.ajax({
      url: weatherForecast,
      method: "POST",
      dataType: "JSON"
    });
     
    request.done(function( msg ) {
      console.log( msg );
      //alert(msg.main.temp);
      document.getElementById('temp').innerHTML = msg.main.temp;
    });
}

var googleAPIKey = 'AIzaSyCBEKrd0BHOUMmH05UBgID6EUjSXUGsAbQ';
var homeAddress = '228+Ashland+Avenue+Pittsburgh';
var workAddress = '235+Fort+Pitt+Blvd+Pittsburgh';

function getTraffic() {

    var trafficData = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ homeAddress + '&destinations='+ workAddress + '&key=' + googleAPIKey;
     var request = $.ajax({
      url: trafficData,
      method: "POST",
      dataType: "JSON"
    });


    request.done(function( msg ) {
      document.getElementById('travel-time').innerHTML = 'Current travel time: ' + msg.rows[0].elements[0].duration.text;
    });

}

}());
//# sourceMappingURL=app.js.map