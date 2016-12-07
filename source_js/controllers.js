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
    $scope.returnName="";
    $scope.newPassword="";
    $scope.newEmail="";
    $scope.newName="";
    $scope.createNew = function(){
        window.location = "#/main";
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


  $scope.draw = function() {
    init_canvas();
  };

  $scope.draw();

}]);
