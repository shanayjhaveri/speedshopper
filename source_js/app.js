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
  when('/map', {
    templateUrl: 'partials/map.html',
    controller: 'MapController'
  }).
  otherwise({
    redirectTo: '/landing'
  });
}]);

// http://jsfiddle.net/lsconyer/bktpzgre/1/

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
