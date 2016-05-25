angular.module('Map')
  .controller('MapController', MapController);

MapController.$inject = ['$http'];

function MapController($http){
  var self = this;
  self.location = '';
  self.garages = [];
  self.metroStations = [];
  self.changeLocation = changeLocation;
  self.getLocation = getLocation;
  self.searchGarages = searchGarages;
  self.searchMetro = searchMetro;

  if(JSON.parse(localStorage.getItem('token'))){
    self.loggedIn = true;
    var username = JSON.parse(localStorage.getItem('token')).username;
    var token = JSON.parse(localStorage.getItem('token')).token;
    var config = {
      headers: {'Authorization': 'Bearer ' + token}
    };
    $http.get('/api/users/' + username, config)
      .then(function(response){
        self.user = response.data;
      });
  } else {
    self.loggedIn = false;
  }

  function getLocation(){
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var location = position.coords.latitude + ', '  + position.coords.longitude;
        self.location = location;
        console.log(self.location);
        return self.location;
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
      });
  }

  function searchMetro(){
    self.metro = [];
  }

  // setting up interval
  // self.interval = interval
  // function interval(){}
  // self.interval()

  function changeLocation(){
    self.location = self.newLocation;
    self.newLocation = '';
    console.log(self.location);
  }

}
