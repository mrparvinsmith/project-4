angular.module('MyApp')
  .factory('GMapFactory', GMapFactory);

function GMapFactory(){
  var mapFactory = {};

  // function to create map points for garages
  var makeGarageList = function(garages){
    if(garages[0]){
      var list = [];
      garages.forEach(function(garage){
        var contentString =
          '<p><b>Name</b>: ' + garage.name + '</p>';
        list.push({
          latlon: new google.maps.LatLng(garage.latitude, garage.longitude),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
          }),
          name: garage.name,
          address: garage.street_address,
          spacesAvailable: garage.available_spaces
        });
      });
      return list;
    }
  };

  // function to create map points for metro stops
  var makeMetroList = function(metroStops){
    if(metroStops[0]){
      var list = [];
      metroStops.forEach(function(metroStop){
        var routeString = '';
        metroStop.routes.forEach(function(route){
          routeString += route + ', ';
        });
        var contentString =
          '<p><b>Name</b>: ' + metroStop.stop_name +
          '<p><b>Stop Id</b>: ' + metroStop.stop_id +
          '<br><b>Routes Served</b>: ' + routeString +
          '</p>';
        list.push({
          latlon: new google.maps.LatLng(metroStop.stop_lat, metroStop.stop_lon),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
          }),
          name: metroStop.stop_name,
        });
      });
      return list;
    }
  };

  var initialize = function(coords, garages, metroStops, relay){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: coords
    });
    var currentSelectedMarker ={};
    // mark location of search
    var searchLocation = new google.maps.LatLng(coords.lat, coords.lng);
    var marker = new google.maps.Marker({
      position: searchLocation,
      map: map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    if(garages){
      garages.forEach(function(garage){
        var garageMarker = new google.maps.Marker({
          position: garage.latlon,
          map: map,
          icon: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });

        // add event listener on each marker for clicks to show message
        google.maps.event.addListener(garageMarker, 'click', function(event){
          if(currentSelectedMarker.message){
            currentSelectedMarker.message.close(map);
          }
          currentSelectedMarker = garage;
          console.log(garage);
          relay.getGarageDetails(garage);
          garage.message.open(map, garageMarker);
        });
      });
    }
    if(metroStops){
      metroStops.forEach(function(metroStop){
        var metroStopMarker = new google.maps.Marker({
          position: metroStop.latlon,
          map: map,
          icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        // add event listener on each marker for clicks to show message
        google.maps.event.addListener(metroStopMarker, 'click', function(event){
          if(currentSelectedMarker.message){
            currentSelectedMarker.message.close(map);
          }
          currentSelectedMarker = metroStop;
          metroStop.message.open(map, metroStopMarker);
        });
      });
    }
  };

 mapFactory.refresh = function(coords, garages, metroStops, relay){
    var garageList = makeGarageList(garages);
    var metroList = makeMetroList(metroStops);
    initialize(coords, garageList, metroList, relay);
  };

  return mapFactory;
}
