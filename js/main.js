(function(){
  var draftApp = angular.module('draftApp', []);

  draftApp.controller('PlayerListController', function PlayerListController($scope, $http){
    $http.get('../lib/fantasypros.json')
      .then(function(data){
        $scope.players = data.data;
      });
  });
}());
