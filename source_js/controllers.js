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
    if($scope.text === '' || $scope.text === undefined) return;
    document.getElementById("searchwalmart").className = "button request disabled";
    Walmart.searchItem($scope.text).success( function(data) {
      $scope.ui_data = data;
      $scope.$apply();
      document.getElementById("searchwalmart").className = "button request";
      console.log(data);
    });
  };

  $scope.feed = function() {
    Walmart.trendingProducts($scope.text).success( function(data) {

      console.log(data);
    });
  };

  $scope.cart = [];

  $scope.add_to_cart = function(thing) {
    var unique = true;;
    for(var t in $scope.cart) {
      if($scope.cart[t].itemId === thing.itemId) {
        $scope.cart[t].quantity++;
        unique = false;
        console.log("wwoooo");
        break;
      }
    }
    if(unique) {
      thing.quantity = 1;
      $scope.cart.push(thing);
    }
    $scope.update_total();

    return;
  };

  $scope.remove_from_cart = function(idx) {
    if($scope.cart[idx].quantity === 1) $scope.cart.splice(idx, 1);
    else $scope.cart[idx].quantity--;
    $scope.update_total();
  }

  $scope.update_total = function() {
    $scope.total = 0;
    for(var t in $scope.cart) $scope.total += $scope.cart[t].salePrice * $scope.cart[t].quantity;
    $scope.total *= 100;
    $scope.total = Math.round($scope.total);
    $scope.total /= 100;
    if($scope.cart.length === 0) document.getElementById('mapbutton').className = "button checkout disabled";
    else document.getElementById('mapbutton').className = "button checkout";
  };

  $scope.go_to_map = function() {
    if($scope.cart.length === 0 ) return;
    else $location.path("map");
  };

  $scope.feed();

  $scope.update_total();

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
