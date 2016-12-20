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

    var googleAPIKey = 'AIzaSyAhCLSHKTqG9rN9TWyK7RJopJoAQRO7yH0';
    var startLocation = '233 N Craig Street Pittsburgh';
    var destination = '235 Fort Pitt Blvd Pittsburgh';

    getForecast('Detroit');
    
    getTraffic(startLocation, destination, googleAPIKey, false, 0, 9);

    setInterval(function(){ getTraffic(startLocation, destination, googleAPIKey, false, 0, 9); }, 60000);
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
    if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
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
      console.log(msg.weather[0].id);
      //alert(msg.main.temp);
      document.getElementById('temp').innerHTML = Math.floor(msg.main.temp) + '&deg;';
      document.getElementById('weather-icon').innerHTML = '<i class="wi wi-owm-' + msg.weather[0].id + '"></i>';
    });
}



function getTraffic(currentLocation, destination, googleAPIKey, message, startTime, endTime) {
    
    //Checking if this info is time related. For example if this is being used to get travel time to work in the morning.
    if(!startTime){
      startTime = 0;
    }else{
      startTime = startTime;
    }

    if(!endTime){
      endTime = 23;
    }else{
      endTime = endTime;
    }

    var currentHour = (new Date()).getHours();
    if (currentHour >= startTime && currentHour <= endTime){

    if(!message){
      message = 'Current travel time: ';
    }else{
      message = message;
    }

    //Adding + signs to location data. This will make it easier to put the address in initially.
    
    currentLocation = currentLocation.replace(" ", "+");
    destination = destination.replace(" ", "+");


    var trafficData = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ currentLocation + '&destinations='+ destination + '&key=' + googleAPIKey;
     var request = $.ajax({
      url: trafficData,
      method: "POST",
      dataType: "JSON"
    });


    request.done(function( msg ) {
      document.getElementById('travel-time').innerHTML = message + msg.rows[0].elements[0].duration.text;
      
      console.log('travel time updated');
    });


  }else{
    console.log('travel time from ' + currentLocation + ' to ' + destination + 'is not currently active');
  }

}

function theDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd;
	} 

	if(mm<10) {
	    mm='0'+mm;
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}

}());
//# sourceMappingURL=app.js.map