var ourControllers = angular.module('ourControllers', []);

/* TASKS */

ourControllers.controller('LandingController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $("#scroll").on('click',function(){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( '#intro' ).offset().top
        }, 500);
    });
    $("#scroll_").on('click',function(){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( '#intro' ).offset().top
        }, 500);
    });
}]);

ourControllers.controller('MainController', ['Walmart', '$scope', '$http', '$window', '$location', function(Walmart, $scope, $http, $window, $location) {

  $scope.search = function(str) {
    console.log('searc');
    Walmart.searchItem($scope.text).success( function(data) {
      console.log(data);
    }).error( function(data) {
      console.log("search request failed");
    });
  }

}]);

ourControllers.controller('LogOnController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

}]);

ourControllers.controller('RegisterController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

}]);

ourControllers.controller('MapController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


  $scope.draw = function() {
    init_canvas();
  };

  $scope.draw();

}]);
