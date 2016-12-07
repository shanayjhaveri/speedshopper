//sessionStorage.setItem('login', '6');

var ourControllers = angular.module('ourControllers', []);

/* TASKS */

ourControllers.controller('LandingController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $window.sessionStorage.login=0;
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
    $scope.loggedin = false;
    $scope.user;
    if($window.sessionStorage.login==1){
        $scope.loggedin = true;
        $scope.user=$window.sessionStorage.username;
    }
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
    Walmart.trendingProducts().success( function(data) {
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
        break;
      }
    }
    if(unique) {
      thing.quantity = 1;
      $scope.cart.push(thing);
    }
    $scope.update_total();
    $window.sessionStorage.cart = JSON.stringify($scope.cart);

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
    console.log($scope.cart);
    $location.path("map");
  };

  //$scope.feed();

  if($window.sessionStorage.cart !== '') $scope.cart = JSON.parse($window.sessionStorage.cart);

  $scope.update_total();

  $scope.total = 0;

}]);

ourControllers.controller('LogOnController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.returnPassword="";
    $scope.returnName="";
    $scope.newPassword="";
    $scope.newEmail="";
    $scope.newName="";
    $scope.createNew = function(){
        window.location = "#/main";
        console.log($scope.newEmail);
        return;
        if($scope.newEmail==""|| $scope.newEmail==undefined||$scope.newName==""|| $scope.newName==undefined||
            $scope.newPassword==""|| $scope.newPassword==undefined) {
            console.log("empty");
            return;
        }
        var new_user={};
        new_user.name = $scope.newName;
        new_user.email=$scope.newEmail;
        new_user.password=$scope.newPassword;
        User.addUser(new_user).success( function(data) {
            console.log(data);
        }).error( function(data) {
            console.log("search request failed");
        });

    };

    $scope.logon = function(){


        if($scope.returnName==""|| $scope.returnName==undefined||$scope.returnPassword==""|| $scope.returnPassword==undefined) {
            console.log("empty");
            return;
        }
        $window.sessionStorage.username=$scope.returnName;
        $window.sessionStorage.login=1;
        $window.location = "#/main";
        return;
        var return_user={};
        return_user.email = $scope.returnName;
        return_user.password = $scope.returnPassword;
        User.getUser(return_user).success( function(data) {
            console.log(data);
        }).error( function(data) {
            console.log("search request failed");
        });

    };
}]);

ourControllers.controller('MapController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

  $scope.loggedin = false;
  $scope.user;
  if($window.sessionStorage.login==1){
      $scope.loggedin = true;
      $scope.user=$window.sessionStorage.username;
  }
  if($window.sessionStorage.login==1){
      $scope.show = false;
  }

  $scope.init = function() {
    $scope.cart = JSON.parse($window.sessionStorage.cart);
    console.log($scope.cart);
  };

  $scope.draw = function() {
    init_canvas();
  };

  $scope.init();
  $scope.draw();

}]);
