var draftApp = angular.module('draftApp', ['ngRoute', 'ui.sortable']);

draftApp.controller('PlayerListController', [ '$scope', 'playersFactory', function($scope, playersFactory){

  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
      })
      .then( function(){
        playersFactory.getProfiles()
        .then(function(response){
          $scope.profiles = response.data;
        })
      .then( function(){
        playersFactory.getPassing()
        .then(function(response){
          $scope.passing = response.data;
        });
        // .then( function(){
        //   angular.forEach($scope.players, function(value, key){
        //     var match  = $scope.profiles.filter( function(x){ return value.name == x.name; });
        //     match = match[0];
        //     for (var prop in match ) {
        //       $scope.players[key][prop] = match[prop];
        //     }
        //     var pass_match = $scope.passing.filter( function(x){ return value.name == x.Name; });
        //     pass_match = pass_match[0];
        //     for (var prp in pass_match ) {
        //       $scope.players[key][prp] = pass_match[prp];
        //     }
        //   });
        // });
      });
    });
  }

  $scope.selected = [];

  $scope.draftPlayer = function(player){
    player.drafted = true;
    $scope.selected.push(player);
  };

  $scope.undraftPlayers = function(){
    angular.forEach($scope.players, function(value, key){
      value.drafted = false;
    });
    $scope.selected = [];
  };

  $scope.undraftLastPlayer = function(){
    var last = $scope.selected.pop();
    last.drafted = false;
  };

  $scope.propertyName = 'rank';
  $scope.sortReverse  = false;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    };
  };
}]);

draftApp.controller('CustomListController', [ '$scope', 'playersFactory', 'orderByFilter', function($scope, playersFactory, orderBy){
  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
      })
      .then( function(){
        if ( localStorage.getItem("customRank") ) {
          var customRank = JSON.parse(localStorage.getItem("customRank"));
          angular.forEach($scope.players, function(value, key){
            var match  = customRank.filter( function(x){ return value.name == x[0]; });
            match = match[0];
            for (var prop in match ) {
              $scope.players[key].customrank = match[prop];
            }
          });
        }
      })
      .then( function(){
        if ( localStorage.getItem("customRank") ) {
          $scope.players = orderBy($scope.players, 'customrank');
        }
      });
  }

  var customList = [];

  $scope.sortableOptions = {
    stop: function(e, ui) {
      // this callback will update the order for the players
      customList = [];
      angular.forEach( $scope.players, function(value, key){
        var newRank = [value.name, key];
        customList.push( newRank );
      });
      localStorage.setItem("customRank", JSON.stringify(customList) );
    }
  };

  $scope.selected = [];

  $scope.draftPlayer = function(player){
    player.drafted = true;
    $scope.selected.push(player);
  };

  $scope.undraftPlayers = function(){
    angular.forEach($scope.players, function(value, key){
      value.drafted = false;
    });
    $scope.selected = [];
  };

  $scope.undraftLastPlayer = function(){
    var last = $scope.selected.pop();
    last.drafted = false;
  };
}]);

draftApp.factory('playersFactory', ['$http', function($http){
  var playersFactory = {};

  playersFactory.getRankings = function(){
    return $http.get('../lib/fantasypros.json');
  };

  playersFactory.getProfiles = function(){
    return $http.get('../lib/profiles.json');
  };

  playersFactory.getPassing = function(){
    return $http.get('../lib/2015/passing.json');
  };

  return playersFactory;
}]);

draftApp.filter('ageFilter', function() {
   function calculateAge(birthday) { // birthday is a date
       var ageDifMs = Date.now() - Date.parse(birthday);
       var ageDate = new Date(ageDifMs); // miliseconds from epoch
       return Math.abs(ageDate.getUTCFullYear() - 1970);
   }

   return function(birthdate) {
         return calculateAge(birthdate);
   };
});

draftApp.filter('reverse', function(){
  return function(items){
    return items.slice().reverse();
  };
});

draftApp.filter('lastNameUrl', function(){
  return function(name){
    var splitName = name.split(" ");
    splitName.shift();
    var lastName = splitName.join("%20");
    return lastName;
  };
});

draftApp.config(['$routeProvider', function config($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'partials/full_list.html',
    }).
    when('/position', {
      templateUrl: 'partials/by_position.html'
    }).
    when('/custom', {
      templateUrl: 'partials/custom.html'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
