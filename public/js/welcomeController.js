angular.module('MyApp')
  .controller('WelcomeController', WelcomeController);

WelcomeController.$inject = ['$http'];

function WelcomeController($http){
  var self = this;
  self.message = 'connected';
  self.seeList = seeList;
  self.login = login;
  self.logout = logout;
  self.addUser = addUser;

  if(JSON.parse(localStorage.getItem('token'))){
    self.loggedIn = true;
  } else {
    self.loggedIn = false;
  }

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
        self.newSession = {};
      });
  }

  function logout(){
    localStorage.clear();
    self.loggedIn = false;
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
              self.new = {};
            });
        }
      });
  }
}
