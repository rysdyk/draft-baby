var draftApp = angular.module('draftApp', ['ngRoute']);

draftApp.controller('PlayerListController', function PlayerListController($scope, $http){
  $http.get('../lib/fantasypros.json')
    .then(function(data){
      $scope.players = data.data;
    }).then( function(){
      $http.get('../lib/profiles.json')
        .then(function(data){
          $scope.profiles = data.data;
        }).then( function(){
          $http.get('../lib/2015-results/passing.json')
          .then(function(data){
            $scope.passing = data.data;
            //console.log($scope.passing);
          }).then( function(){

            angular.forEach($scope.players, function(value, key){
              //var match  = $.grep($scope.profiles, function(e){ console.log(e.name == value.name) });
              var match  = $scope.profiles.filter( function(x){ return value.name == x.name; });
              match = match[0];
              for (var prop in match ) {
                $scope.players[key][prop] = match[prop];
              }
              var pass_match  = $scope.passing.filter( function(x){ return value.name == x.Name; });
              pass_match = pass_match[0];
              for (var prp in pass_match ) {
                $scope.players[key][prp] = pass_match[prp];
              }
            });
          });
        });
      });

  $scope.propertyName = 'rank';
  $scope.sortReverse  = false;

  $scope.sortBy = function(propertyName) {
    console.log("Hello");
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    };
  };
});

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

draftApp.config(['$routeProvider', function config($routeProvider){
  $routeProvider.
    when('/', {
      templateUrl: 'partials/full_list.html',
    }).
    when('/position', {
      templateUrl: 'partials/by_position.html'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);



// $('.drafted').change(function(){
//   var current_player = $(this).data("check");
//   $("[data-player='" + current_player + "']").addClass('fade-out');
// });
