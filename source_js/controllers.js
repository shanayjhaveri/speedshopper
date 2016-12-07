//sessionStorage.setItem('login', '6');

var ourControllers = angular.module('ourControllers', []);

/* TASKS */

ourControllers.controller('LandingController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.value = $window.sessionStorage.login=6;
    console.log($window.sessionStorage.login);
    $("#scroll").on('click',function(){
        session = true;
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( '#intro' ).offset().top
        }, 500);
        $window.sessionStorage.login = 0;
        console.log($window.sessionStorage.login);
    });
    $("#scroll_").on('click',function(){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( '#intro' ).offset().top
        }, 500);
    });

}]);

ourControllers.controller('MainController', ['Walmart', '$scope', '$http', '$window', '$location', function(Walmart, $scope, $http, $window, $location) {
    console.log($window.sessionStorage.login);
  $scope.search = function(str) {
      console.log('searc');
      Walmart.searchItem($scope.text).success(function (data) {
          console.log(data);
      }).error(function (data) {
          console.log("search request failed");
      });
  }
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
