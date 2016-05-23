angular.module('MyApp')
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController);

function LoginController(){
  var self = this;
  self.message = 'connected';
}

function SignupController(){
  var self = this;
  self.message = 'present';
}
