angular.module('MyApp')
  .controller('LoginController', LoginController);

function LoginController(){
  var self = this;
  self.message = 'connected';
}
