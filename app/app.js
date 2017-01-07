(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = require('os');
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
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


    setInterval(function(){ 
      getCurrentWeather('Pittsburgh', 'imperial'); 
      console.log('weather updated');
    }, 600000);
    


    var googleAPIKey = 'AIzaSyAhCLSHKTqG9rN9TWyK7RJopJoAQRO7yH0';
    var startLocation = '233 N Craig Street Pittsburgh';
    var destination = '235 Fort Pitt Blvd Pittsburgh';

    getTraffic(startLocation, destination, googleAPIKey, false, 0, 23);
    setInterval(function(){ getTraffic(startLocation, destination, googleAPIKey, false, 0, 23); }, 6000);
    
    getCurrentWeather('Ewa Beach', 'imperial');
    setInterval(function(){ 
      getCurrentWeather('Ewa Beach', 'imperial'); 
      //console.log('weather updated');
    }, 600000);


    document.getElementById('date').innerHTML = theDate();
    setInterval(function(){ 
      document.getElementById('date').innerHTML = theDate();
      //console.log('date updated');
    }, 1000);
    
    getNewsFeed('techcrunch', '050ace9a6f81445a9e0f9d0ee68a7e0b');
    
    getRedditFeed('worldnews', 'hot', 5);
    setInterval(function(){ getRedditFeed('worldnews', 'hot', 5); }, 60000);
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

function getNewsFeed(source, APIkey){
  var newsQuery = 'https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + APIkey;
  var newsRequest = $.ajax({
      url: newsQuery,
      method: "GET",
    });


    newsRequest.done(function( msg ) {
      console.log('News: ');
      console.log(msg);

      var i = 0;
      msg.articles.forEach(function(){
        var thisArticle = msg.articles[i];
        $("#news-container").append('<div class="news-single"> <h2 class="headline">' + thisArticle.title + '</h2> <div class="by-line"><span class="source">' + source + '</span> - <span class="author">' + thisArticle.author + '</span></div> </div>');
        console.log(thisArticle.title);
        i++;
      });
    });
}

function getRedditFeed(subreddit, sort, count){
  $('#subreddit').html('');
  $('#subreddit').append(subreddit);
  if(sort){
    //Do Nothing
  }else{
    sort = 'hot';
  }
  
  if(count){
    //Do Nothing
  }else{
    count = 20;
  }
  console.log('Reddit Count is ' + count);
  var redditQuery = 'https://www.reddit.com/r/' + subreddit + '/' + sort + '/.json?count=' + count;
  console.log(redditQuery);
  var redditRequest = $.ajax({
      url: redditQuery,
      method: "GET",
    });
  
    redditRequest.done(function( msg ) {
      $("#reddit-container").html('');
      console.log('Reddit: ');
      //console.log(msg.data.children);
      var r = 0;
      
      while(r < count){
        console.log(msg.data.children[r]);
        var thisPost = msg.data.children[r].data;

        $("#reddit-container").append('<div class="reddit-single"><div class="title">' + thisPost.title + '</div><div class="domain">' + thisPost.domain + '</div><div class="author">u/' + thisPost.author + '</div></div>');        
        r++;
      }

    });
}

}());
//# sourceMappingURL=app.js.map