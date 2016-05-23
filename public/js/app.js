angular.module('MyApp', ['ui.router'])
  .config(configuration);

function configuration($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginController as ctrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      controller: 'SignupController as ctrl'
    });
}
