var googleAPIKey = 'AIzaSyDpYKLdWMwpKnVA8JuEStbtD8bCT2AwJx8';
var startLocation = '228 Ashland Avenue Pittsburgh';
var destination = '235 Fort Pitt Blvd Pittsburgh';

// getTraffic(startLocation, destination, googleAPIKey, false, da, false, 0, 23);


function getTraffic(currentLocation, destination, googleAPIKey, message, arrivalTime, departureTime, startTime, endTime) {
    //Adding + signs to location data. This will make it easier to put the address in initially.
    currentLocation = currentLocation.replace(/\ /g, '+');
    destination = destination.replace(/\ /g, '+');

    var trafficData = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + startLocation + '&destination=' + destination + '&departure_time=' + departureTime + '&traffic_model=best_guess&key=' + googleAPIKey;

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
    console.log(trafficData);
     var request = $.ajax({
      url: trafficData,
      method: "POST",
      dataType: "JSON"
    });


    request.done(function( msg ) {
      console.log(msg);
      document.getElementById('travel-time').innerHTML = message + msg.routes[0].legs[0].duration_in_traffic.text;
    
    });

  }else{
    //console.log('travel time from ' + currentLocation + ' to ' + destination + 'is not currently active');
  }

}