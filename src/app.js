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
    getCurrentWeather('Pittsburgh', 'imperial');

    document.getElementById('date').innerHTML = theDate();
   
 
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

function getForecast(city, units){
    var weatherForecast = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&units='+units+'&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9';
     var request = $.ajax({
      url: weatherForecast,
      method: "POST",
      dataType: "JSON"
    });
     
    request.done(function( msg ) {
      console.log( msg );
    });
}

function getCurrentWeather(city, units){
    var unit;
    switch(units){
    	case 'metric':
    		unit = 'C';
    	break;
    	case 'imperial':
    		unit = 'F';
    	break;
    }
    var weatherForecast = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',us&units='+units+'&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9';
     var request = $.ajax({
      url: weatherForecast,
      method: "POST",
      dataType: "JSON"
    });
     
    request.done(function( msg ) {
      console.log( msg );
      console.log(msg.weather[0].id)
      //alert(msg.main.temp);
      document.getElementById('temp').innerHTML = Math.floor(msg.main.temp) + '&deg;';
      document.getElementById('weather-icon').innerHTML = '<i class="wi wi-owm-' + msg.weather[0].id + '"></i>';
    });
}

function theDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}