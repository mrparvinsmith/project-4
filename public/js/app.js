angular.module('MyApp', ['ui.router'])
  .config(configuration);

function configuration($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
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
