var googleAPIKey = 'AIzaSyCBEKrd0BHOUMmH05UBgID6EUjSXUGsAbQ';
var startLocation = '228 Ashland Avenue Pittsburgh';
var destination = '235 Fort Pitt Blvd Pittsburgh';

getTraffic(startLocation, destination, googleAPIKey, false, false, false, 0, 23);
// setInterval(function(){ 
//   getTraffic(startLocation, destination, googleAPIKey, false, false, 1482445255, 0, 23);
// }, 60000);

function getTraffic(currentLocation, destination, googleAPIKey, message, arrivalTime, departureTime, startTime, endTime) {

    //Adding + signs to location data. This will make it easier to put the address in initially.
    currentLocation = currentLocation.replace(/\ /g, '+');
    destination = destination.replace(/\ /g, '+');

    var trafficData = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ currentLocation + '&destinations='+ destination + '&key=' + googleAPIKey;

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

    if(arrivalTime) {
      trafficData = trafficData + '&arrival_time=' + arrivalTime;
    }else if(departureTime) {
      trafficData = trafficData + '&departure_time=' + departureTime;
    }else {
      trafficData = trafficData + '&departure_time=' + Date.now();
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
      document.getElementById('travel-time').innerHTML = message + msg.rows[0].elements[0].duration_in_traffic.text;
      
      console.log(msg);

      console.log('travel time updated');
      console.log(arrivalTime);
    });


  }else{
    //console.log('travel time from ' + currentLocation + ' to ' + destination + 'is not currently active');
  }

}