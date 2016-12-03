var app = angular.module('speedshopper', ['ngRoute', 'ourControllers', 'ourServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/main', {
    templateUrl: 'partials/main.html',
    controller: 'MainController'
  }).
  when('/landing', {
    templateUrl: 'partials/landing.html',
    controller: 'LandingController'
  }).
  when('/logon', {
    templateUrl: 'partials/logon.html',
    controller: 'LogOnController'
  }).
  when('/register', {
    templateUrl: 'partials/register.html',
    controller: 'RegisterController'
  }).
  otherwise({
    redirectTo: '/landing'
  });
}]);
