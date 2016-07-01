var draftApp = angular.module('draftApp', []);

draftApp.controller('PlayerListController', function PlayerListController($scope, $http){
  $http.get('../lib/fantasypros.json')
    .then(function(data){
      $scope.players = data.data;
    });

  $scope.sortType     = 'rank';
  $scope.sortReverse  = false;

  $scope.greaterThan = function(prop, val){
    return function(item){
      return item[prop] > val;
    }
  }
})
