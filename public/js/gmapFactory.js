angular.module('MyApp')
  .factory('GMapFactory', GMapFactory);

function GMapFactory(){
  var mapFactory = {};

  // function to create map points for garages
  var makeGarageMarkers = function(garages){
    var list = [];
    garages.forEach(function(garage){
      var contentString =
        '<p><b>Name</b>: ' + garage.name +
        '<br><b>Address</b>: ' + garage.street_address +
        '<br><b>Available Spaces</b>: ' + garage.available_spaces +
        '</p>';
      list.push({
        latlon: new google.maps.LatLng(garage.latitude, garage.longitude),
        message: new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300
        }),
        name: garage.name,
        address: garage.street_address,
        spacesAvailable: garage.available_spaces
      });
    });
    return list;
  };

  mapFactory.initialize = function(coords){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: coords
    });
    // mark location of search
    var searchLocation = new google.maps.LatLng(coords.lat, coords.lng);
    var marker = new google.maps.Marker({
      position: searchLocation,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
  };

 mapFactory.refresh = function(coords, garages, metroStops){
    // stuff
  };

  return mapFactory;
}
