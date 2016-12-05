var ourControllers = angular.module('ourControllers', []);

/* TASKS */

ourControllers.controller('LandingController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $("#scroll").on('click',function(){
        event.preventDefault();
        console.log("hehe");
        $('html, body').animate({
            scrollTop: $( '#intro' ).offset().top
        }, 500);
        //

    });
}]);

ourControllers.controller('MainController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

}]);

ourControllers.controller('LogOnController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

}]);

ourControllers.controller('RegisterController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

}]);

ourControllers.controller('MapController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


  $scope.draw = function() {
    var canvas = document.getElementById("map");
    canvas.height = canvas.width /2;

    var top = 20;
    var left = 20;
    var height = 35;
    var width = 400;

    for(var aisle = 0 ; aisle < 14 ; aisle++) {
      var rect = canvas.getContext("2d");
      rect.rect(left, top, width, height);
      rect.stroke();
      top += height + 20;
    }

  };

  $scope.draw();

}]);
