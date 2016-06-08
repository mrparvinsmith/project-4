angular.module('MyApp')
  .controller('WelcomeController', WelcomeController);

WelcomeController.$inject = ['$http', '$location'];

function WelcomeController($http, $location){
  var self = this;
  self.message = 'connected';
  self.seeList = seeList;
  self.login = login;
  self.logout = logout;
  self.addUser = addUser;

  function seeList(){
    var token = JSON.parse(localStorage.getItem('token')).token;
    console.log(token);
    var config = {headers: {
      'Authorization': 'Bearer ' + token
    }};
    $http.get('/api/users', config)
      .then(function(response){
        console.log(response);
      });
  }

  function login(){
    $http.post('/login', self.newSession)
      .then(function(response){
        console.log(response.data);
        localStorage.setItem('token', JSON.stringify(response.data));
        self.loggedIn = true;
        self.username = self.newSession.username;
        self.newSession = {};
        $location.path('welcome');
      });
  }

  function logout(){
    localStorage.clear();
    self.loggedIn = false;
    self.username = '';
  }

  function addUser(){
    self.error = '';
    $http.post('/api/users', self.new)
      .then(function(response){
        if(response.data.error){
          self.error = response.data.error;
        } else {
          $http.post('/login', self.new)
            .then(function(response){
              localStorage.setItem('token', JSON.stringify(response.data));
              self.loggedIn = true;
              self.username = self.new.username;
              self.new = {};
            });
        }
      });
  }
}
