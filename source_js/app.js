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
  otherwise({
    redirectTo: '/main'
  });
}]);
