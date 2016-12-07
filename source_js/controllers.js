//sessionStorage.setItem('login', '6');

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
      console.log(data);
    }).error( function(data) {
      console.log("search request failed");
      // TODO handle error
    });
  };

  $scope.feed = function() {
    $scope.feed_data = null;
    $scope.update($scope.feed_data);
    return;
  };

  $scope.update = function(data) {

    $scope.ui_data = data;

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
    $scope.neeeeee = "";
    $scope.logon = function(){
        $window.sessionStorage.login = true;
        console.log($scope.returnEmail,$scope.returnPassword);
        return;
        $scope.neeeeee = "yyy";
        if($scope.newEmail==""|| $scope.newEmail==undefined||$scope.newName==""|| $scope.newName==undefined||
            $scope.newPassword==""|| $scope.newPassword==undefined) {
            console.log("empty");
            return;
        }
        User.addUser(new_user)(return_user).success( function(data) {
            console.log(data);
        }).error( function(data) {
            console.log("search request failed");
        });

    };
    $scope.createNew = function(){

        console.log($scope.newEmail,$scope.newName);
        return;
        if($scope.returnEmail==""|| $scope.returnEmail==undefined||$scope.returnName==""|| $scope.returnName==undefined) {
            console.log("empty");
            return;
        }
        var return_user={};
        return_user.email = $scope.returnEmail;
        return_user.password = $scope.returnPassword;
        User.getUser(return_user).success( function(data) {
            console.log(data);
        }).error( function(data) {
            console.log("search request failed");
        });

    };
}]);

ourControllers.controller('MapController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


  $scope.draw = function() {
    init_canvas();
  };

  $scope.draw();

}]);
