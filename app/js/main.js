var draftApp = angular.module('draftApp', []);

draftApp.controller('PlayerListController', function PlayerListController($scope, $http){
  $http.get('../lib/fantasypros.json')
    .then(function(data){
      $scope.players = data.data;
    }).then( function(){
      $http.get('../lib/profiles.json')
        .then(function(data){
          $scope.profiles = data.data;
        }).then( function(){
          angular.forEach($scope.players, function(value, key){
            angular.forEach($scope.profiles, function(v, k){
              if ( value.name == v.name ) {
                for (var prop in v ) {
                  $scope.players[key][prop] = v[prop];
                }
              }
            })
          })
        })
      })

  $scope.sortType     = 'rank';
  $scope.sortReverse  = false;

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

// $('.drafted').change(function(){
//   var current_player = $(this).data("check");
//   $("[data-player='" + current_player + "']").addClass('fade-out');
// });
