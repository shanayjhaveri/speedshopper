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
String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};