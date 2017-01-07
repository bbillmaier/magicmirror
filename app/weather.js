// Weather API key aa14eefdadb34bb7a3e2600bfdcb7af9
// Example Call api.openweathermap.org/data/2.5/forecast?q=Pittsburgh,us&mode=xml&APPID=aa14eefdadb34bb7a3e2600bfdcb7af9
// http://openweathermap.org/current

setInterval(function(){ 
	getCurrentWeather('Pittsburgh', 'imperial'); 
	console.log('weather updated');
}, 600000);
    
getCurrentWeather('Pittsburgh', 'imperial');

setInterval(function(){ 
	getCurrentWeather('Pittsburgh', 'imperial'); 
    //console.log('weather updated');
}, 600000);

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

function getWeatherForecast(city, units){
    // This function will get the 5 day forecast
}