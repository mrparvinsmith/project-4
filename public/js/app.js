angular.module('MyApp', ['ui.router'])
  .config(configuration);

function configuration($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state('welcome', {
      url:'/welcome',
      templateUrl: 'partials/welcome.html',
    })
    .state('login', {
      url:'/login',
      templateUrl: 'partials/login.html',
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
    })
    .state('map', {
      url: '/map',
      templateUrl: 'partials/map-partial.html',
      controller: 'MapController as mapCtrl'
    });
}
