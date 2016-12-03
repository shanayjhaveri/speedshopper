var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/main', {
    templateUrl: 'partials/main.html',
    controller: 'SettingsController'
  }).
  when('/landing', {
    templateUrl: 'partials/landing.html',
    controller: 'SettingsController'
  }).
  otherwise({
    redirectTo: '/main'
  });
}]);
