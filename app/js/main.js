// init app
var draftApp = angular.module('draftApp', ['ngRoute', 'ui.sortable']);

// factories and services
draftApp.factory('playersFactory', ['$http', function($http){
  var playersFactory = {};

  playersFactory.getRankings = function(){
    return $http.get('../lib/fantasypros-std-7-29-2016.json');
  };

  playersFactory.getProfiles = function(){
    return $http.get('../lib/profiles.json');
  };

  playersFactory.getPassing = function(){
    return $http.get('../lib/2015/passing.json');
  };

  return playersFactory;
}]);

draftApp.factory('draftedFactory', function(){
  return function($scope){
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

  }
});

// filters
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

draftApp.filter('shortPosition', function(){
  return function(position){
    var shortPosition = position.slice(0, 2);
    return shortPosition;
  };
});

// set routes
draftApp.config(['$routeProvider', function config($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'partials/_full_list.html',
    }).
    when('/position', {
      templateUrl: 'partials/_position.html'
    }).
    when('/custom', {
      templateUrl: 'partials/_custom.html'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
