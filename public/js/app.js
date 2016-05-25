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
    });
}
