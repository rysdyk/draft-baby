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
    };
  };
});

function draftPick(t, p){
  var teams = t;
  var pick = p;
  var snakePick = teams * 2 - pick + 1;
  var pickSpread = teams * 2;

  for(i=pick; i<330; i+= pickSpread ) {
    console.log(i);
    $("tr:eq(" + i + ")").addClass("draftpick");
  }

  for(i=snakePick; i<330; i+= pickSpread ) {
    console.log(i);
    $("tr:eq(" + i + ")").addClass("draftpick");
  }
}
function draftPosClear(){
  $("tr").removeClass("draftpick");
}

$('#draftPosEst').click( function(){
  draftPosClear();
  var teams = parseInt($('#draftPosTeams').val());
  var pick = parseInt($('#draftPos').val());
  draftPick(teams, pick);
});

$('#draftPosClear').click( function(){
  draftPosClear();
});
