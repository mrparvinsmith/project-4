angular.module('Map')
  .controller('MapController', MapController);

MapController.$inject = ['$http'];

function MapController($http){
  var self = this;

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

  // setting up interval
  // self.interval = interval
  // function interval(){}
  // self.interval()
}
