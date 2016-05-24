angular.module('MyApp')
  .controller('WelcomeController', WelcomeController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController);

WelcomeController.$inject = ['$http'];
SignupController.$inject = ['$http'];
LoginController.$inject = ['$http'];

function WelcomeController($http){
  var self = this;
  self.message = 'bienvenue';
  self.notLoggedIn = true;
  self.seeList = seeList;

  function seeList(){
    var token = JSON.parse(localStorage.getItem('token')).data.token;
    console.log(token);
    var config = {headers: {
      'Authorization': 'Bearer ' + token
    }};
    $http.get('/api/users', config)
      .then(function(response){
        console.log(response);
      });
  }
}

function LoginController($http){
  var self = this;
  self.message = 'connected';
  self.login = login;

  function login(){
    console.log(self.newSession);
    $http.post('/login', self.newSession)
      .then(function(response){
        localStorage.setItem('token', JSON.stringify(response));
        console.log(localStorage.getItem('token'));
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
