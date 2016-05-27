angular.module('MyApp')
  .controller('MapController', MapController);

MapController.$inject = ['$http', 'GMapFactory'];

function MapController($http, GMapFactory){
  var self = this;
  self.map = GMapFactory;
  self.location = '';
  self.coordinates = {};
  self.garages = [];
  self.metroStations = [];
  self.changeLocation = changeLocation;
  self.getLocation = getLocation;
  self.searchGarages = searchGarages;
  self.searchMetro = searchMetro;

  function getLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var location = position.coords.latitude + ', '  + position.coords.longitude;
        self.location = location;
        self.coordinates = {lat: position.coords.latitude, lng: position.coords.longitude};
        console.log(self.location);
        self.map.refresh(self.coordinates, self.garages, self.metroStations);
      });
    } else {
      self.positionUnknown = true;
    }
  }
  getLocation();

  function searchGarages(){
    self.garages = [];
    var garageAcceptHeader = {headers: {'Accept': 'application/json'}};
    $http.get('https://parking.api.smgov.net/lots')
      .then(function(response){
        response.data.forEach(function(garage){
          self.garages.push(garage);
        });
        console.log(self.garages);
        self.map.refresh(self.coordinates, self.garages, self.metroStations);
      });
  }

  function searchMetro(){
    self.metroStations = [];
    $http.get('/api/stations')
      .then(function(response){
        console.log(response);
        var distance = function(originLat, originLon, endLat, endLon){
          var legA = Math.abs(originLat - endLat);
          var legB = Math.abs(originLon - endLon);
          return Math.sqrt((legA * legA) + (legB * legB));
        };
        response.data.forEach(function(station){
          if(distance(self.coordinates.lat, self.coordinates.lng, station.stop_lat, station.stop_lon) < (1/120)){
            self.metroStations.push(station);
          }
        });
        console.log(self.metroStations);
        self.map.refresh(self.coordinates, self.garages, self.metroStations);
      });
  }

  // setting up interval
  // self.interval = interval
  // function interval(){}
  // self.interval()

  function changeLocation(){
    self.location = self.newLocation;
    self.newLocation = '';
    var geocoder = new google.maps.Geocoder();
    console.log(self.location);
    var input = {'address': self.location};
    geocoder.geocode(input, function(results){
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      self.coordinates = {lat: lat, lng: lng};
      console.log(self.coordinates);
      self.map.refresh(self.coordinates, self.garages, self.metroStations);
    });
  }

}
