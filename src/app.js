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
    // Weather API key aa14eefdadb34bb7a3e2600bfdcb7af9
    // Example Call api.openweathermap.org/data/2.5/forecast?q=Pittsburgh,us&mode=xml&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9
    // http://openweathermap.org/current
    getForecast('Detroit');
    getCurrentWeather('Pittsburgh');
    getTrafficData();
   
 
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
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
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

var trafficAPIKey = "qZNBAv9T6YRwxGYOIaX8MrG6poPRsuTI";
var homeAddress = "228+Ashland+Avenue+Pittsburgh+PA";
var workAddress = "235+Fort+Pitt+Boulevard+Pittsburgh+PA";

function getTrafficData() {
  var trafficInfo = 'https://www.mapquestapi.com/directions/v2/route?key=' + trafficAPIKey + '&from=' + homeAddress + '&to=' + workAddress + '&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false';
  var request = $.ajax({
    url: trafficInfo,
    method: "POST",
    dataType: "JSON"
  });

  request.done(function( msg ) {
    console.log( msg );
  });
}


















