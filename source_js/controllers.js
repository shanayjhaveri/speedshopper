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

  $scope.search = function() {
    Walmart.searchItem($scope.text).success( function(data) {
      $scope.ui_data = data;
      $scope.$apply();
      console.log(data);
    });
  };

  $scope.feed = function() {
    /*
    Walmart.trendingProducts().success( function(data) {
      $scope.feed_data = data;
      $scope.ui_data = data;
      console.log(data);
    }).error( function(httpReq,status,exception) {
      console.log(status + ' ' + exception);
      // TODO handle error
    });
    */
  };

  $scope.cart = [];

  $scope.add_to_cart = function(thing) {
    $scope.total += thing.salePrice;
    $scope.cart.push(thing);
    document.getElementById("cartlist").innerHTML += "<li>" + thing.name + "</li>";
    return;
  }

  $scope.feed();

  $scope.total = 0;

}]);

ourControllers.controller('LogOnController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.returnPassword="";
    $scope.returnEmail="";
    $scope.newPassword="";
    $scope.newEmail="";
    $scope.newName="";
    $scope.logon = function(){
        console.log($scope.returnEmail,$scope.returnPassword);
    };
    $scope.createNew = function(){
        console.log($scope.newName,$scope.newEmail, $scope.newPassword);
    };
}]);

ourControllers.controller('MapController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


  $scope.draw = function() {
    init_canvas();
  };

  $scope.draw();

}]);
