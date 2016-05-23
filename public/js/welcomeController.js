angular.module('MyApp')
  .controller('WelcomeController', WelcomeController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController);

SignupController.$inject = ['$http'];

function WelcomeController(){
  var self = this;
  self.message = 'bienvenue';
  self.notLoggedIn = true;
}

function LoginController(){
  var self = this;
  self.message = 'connected';
  self.login = login;

  function login(){
    $http.post('/login', self.newSession)
      .then(function(response){
        // something
      });
  }
}

function SignupController($http){
  var self = this;
  self.message = 'present';
  self.addUser = addUser;

  function addUser(){
    $http.post('/api/users', self.new)
      .then(function(response){
        // something
      });
  }
}
