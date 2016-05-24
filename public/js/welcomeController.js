angular.module('MyApp')
  .controller('WelcomeController', WelcomeController);

WelcomeController.$inject = ['$http'];

function WelcomeController($http){
  var self = this;
  self.message = 'connected';
  self.notLoggedIn = true;
  self.seeList = seeList;
  self.logout = logout;

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

  function logout(){
    localStorage.clear();
  }

  // from LoginController
  self.login = login;

  function login(){
    $http.post('/login', self.newSession)
      .then(function(response){
        localStorage.setItem('token', JSON.stringify(response.data));
        console.log(localStorage.getItem('token'));
      });
  }

  // from SignupController
  self.addUser = addUser;

  function addUser(){
    $http.post('/api/users', self.new)
      .then(function(response){
        $http.post('/login', self.new)
          .then(function(response){
            localStorage.setItem('token', JSON.stringify(response.data));
            console.log(localStorage.getItem('token'));
          });
      });
  }
}
