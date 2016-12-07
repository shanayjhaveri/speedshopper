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

    console.log($scope.ui_data);
    $scope.$apply();
    $scope.user;
    if($window.sessionStorage.login==1){
        $scope.loggedin = true;
        $scope.user=$window.sessionStorage.username;
    }
  $scope.search = function() {
    if($scope.text === '' || $scope.text === undefined) return;
    document.getElementById("searchwalmart").className = "button request disabled";
    Walmart.searchItem($scope.text).success( function(data) {
      $scope.ui_data = data.items;
      for(var t in $scope.ui_data.items) {
        //if($scope.ui_data.items[t].name.length > 16) $scope.ui_data.items[t].name = $scope.ui_data.items[t].name.substring(0,18);
      }
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
      if(thing.name.length > 16) thing.name = thing.name.substring(0,24) + '...';
      $scope.cart.push(thing);
    }
    $scope.update_total();
    $window.sessionStorage.cart = JSON.stringify($scope.cart);

    return;
  };

  $scope.remove_from_cart = function(idx) {
    if($scope.cart[idx].quantity === 1) $scope.cart.splice(idx, 1);
    else $scope.cart[idx].quantity--;
    $window.sessionStorage.cart = JSON.stringify($scope.cart);
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
    $location.path("map");
  };

  //$scope.feed();

  if($window.sessionStorage.cart !== '') $scope.cart = JSON.parse($window.sessionStorage.cart);
  else $scope.total = 0;

  $scope.update_total();

  $scope.delay = function() {
    setTimeout(function(){ console.log('did it');$scope.ui_data = loaded_data; $scope.$apply();}, 1000);

  }
  $scope.delay();


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
          $window.sessionStorage.fulluser = JSON.stringify(data);
            console.log(data);
        }).error( function(data) {
            console.log("search request failed");
        });

    };
}]);

ourControllers.controller('MapController', ['User', '$scope', '$http', '$window', '$location', function(User, $scope, $http, $window, $location) {

  $scope.loggedin = false;
  $scope.user;
  if($window.sessionStorage.login==1){
      $scope.loggedin = true;
      $scope.user=$window.sessionStorage.username;
  }
  if($window.sessionStorage.login==1){
      $scope.show = false;
  }

  $scope.update_total = function() {
    $scope.total = 0;
    for(var t in $scope.cart) $scope.total += $scope.cart[t].salePrice * $scope.cart[t].quantity;
    $scope.total *= 100;
    $scope.total = Math.round($scope.total);
    $scope.total /= 100;
    if($scope.cart.length === 0) document.getElementById('savelist').className = "button save disabled";
    else document.getElementById('savelist').className = "button save";
  };

  $scope.init = function() {
    $scope.cart = JSON.parse($window.sessionStorage.cart);
  };

  $scope.remove_from_cart = function(idx) {
    if($scope.cart[idx].quantity === 1) $scope.cart.splice(idx, 1);
    else $scope.cart[idx].quantity--;
    $window.sessionStorage.cart = JSON.stringify($scope.cart);
    $scope.update_total();
  };

  $scope.back = function() {
    $location.path("main");
  };

  $scope.draw = function() {
    init_canvas();
  };

  $scope.init();
  $scope.update_total();
  $scope.draw();

  $scope.save_list = function() {
    var the_user = JSON.parse($window.sessionStorage.fulluser);
    var the_cart = {};
    the_cart.listName = [];
    the_cart.itemIDs = [];
    the_cart.prices = [];
    the_cart.imgs = [];
    the_cart.itemNames = [];
    the_cart.quantities = [];

    for(var t in $scope.cart) {
      the_cart.listName.push($scope.cart[t].name);
      the_cart.itemIds.push($scope.cart[t].itemId);
      the_cart.prices.push($scope.cart[t].salePrice);
      the_cart.imgs.push($scope.cart[t].thumbnailImage);
      the_cart.quantities.push($scope.cart[t].quantity);
    }

    var pass = {user: the_user, list: the_list};

    User.saveItems(pass).success( function(data) {
      console.log(data);
    });

    the_user.lists.push(the_list);
    console.log(the_user);
    $window.sessionStorage.fulluser = JSON.stringify(the_user);

  };

  $scope.draw_path = function() {
    // init dots on map
    ascii_map[13][6] = 'S';
    for(var t in $scope.cart) {
      var temp = $scope.cart[t].categoryPath.split('/');
      for(var x in categories) {
        if(temp[0] === categories[x]) {
          last_min.push(x);
          var xpos = position[places[x]][0];
          var ypos = position[places[x]][1];
          ascii_map[ypos][xpos] = '.';
          break;
        }
      }
      ascii_map[13][15] = 'E';
    }

    var starty = 13;
    var startx = 6;
    var q = [];

    var start = [startx, starty];
    //have remaining dots array and once no more remaining dots, go to checkout from last dot
    //maybe keep a path array to track locations of current path and then reset after reaching a destination

    var num_dots = 0;

    var temp_map = [];

    for(var a in ascii_map) {
      temp_map[a] = [];
      for(var b in ascii_map[a]) {
        if(ascii_map[a][b] === '.') num_dots++;
        temp_map[a][b] = ascii_map[a][b];
      }
    }
    //return;

    console.log("num of dots " + num_dots);
    var doodle= [];

    var dfs = function() {
      //console.log(0);
      var stop = q.pop();
      //console.log(stop);
      var char = temp_map2[stop[1]][stop[0]];
      //console.log(char);


      if(char === '.') {
        temp_map2[stop[1]][stop[0]] = 'r';
        console.log(stop);
        doodle[0] = stop[0];
        doodle[1] = stop[1];
        return 1;
      } else if(char === 'E' || char === '#' || char === 'r') {
        return 0;
      } else if(char === ' ' || char === 'S') {
        //console.log('here');
        temp_map2[stop[1]][stop[0]] = 'r';
        q.push([stop[0], stop[1] + 1]);
        if(dfs()) {
          start[0] = stop[0];
          start[1] = stop[1];
          return 1;
        }
        q.push([stop[0], stop[1] - 1]);
        if(dfs()) {
          start[0] = stop[0];
          start[1] = stop[1];
          return 1;
        }
        q.push([stop[0] + 1, stop[1]]);
        if(dfs()) {
          start[0] = stop[0];
          start[1] = stop[1];
          return 1;
        }
        q.push([stop[0] - 1, stop[1]]);
        if(dfs()) {
          start[0] = stop[0];
          start[1] = stop[1];
          return 1;
        }
        temp_map2[stop[1]][stop[0]] = 'x';
        return 0;
      }

    }

    //console.log(num_dots);

    while(num_dots > 0) {

      var temp_map2 = [];

      for(var a in ascii_map) {
        temp_map2[a] = [];
        for(var b in ascii_map[a]) {
          temp_map2[a][b] = temp_map[a][b];
        }
      }

      q.push(start);
      var path = [];
      temp_map[start[1]][start[0]] = ' ';
      dfs();
      console.log(doodle);
      temp_map[doodle[1]][doodle[0]] = 'S';
      start[0] = doodle[0];
      start[1] = doodle[1];

      num_dots--;

      for(var a in temp_map2) {
        for(var b in temp_map2[a]) {
          if(temp_map2[a][b] === 'r') ascii_map[a][b] = '.';
        }
      }

    }

    //console.log("DONE");

    var canvas = document.getElementById("map");
    canvas.height = canvas.width /2;
    var brush;

    init_canvas();




  };

  $scope.draw_path();

}]);
