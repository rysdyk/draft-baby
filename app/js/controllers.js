// FULL LIST

draftApp.controller('PlayerListController', [ '$scope', 'playersFactory', 'draftedFactory', function($scope, playersFactory, draftedFactory){

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
      });
    });
  }

  draftedFactory($scope);

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

// CUSTOM

draftApp.controller('CustomListController', [ '$scope', 'playersFactory', 'draftedFactory', 'orderByFilter', function($scope, playersFactory, draftedFactory, orderBy){
  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
      })
      .then( function(){
        if ( localStorage.getItem("DraftBabyCustomRank") ) {
          var customRank = JSON.parse(localStorage.getItem("DraftBabyCustomRank"));
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
        if ( localStorage.getItem("DraftBabyCustomRank") ) {
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
      localStorage.setItem("DraftBabyCustomRank", JSON.stringify(customList) );
    }
  };

  draftedFactory($scope);

  $scope.clearCustomRank = function(){
    localStorage.removeItem("DraftBabyCustomRank");
    $scope.players = orderBy($scope.players, 'rank');
  };
}]);

// POSITION LIST

draftApp.controller('PositionsListController', [ '$scope', 'playersFactory', 'draftedFactory', 'orderByFilter', function($scope, playersFactory, draftedFactory, orderBy){
  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
      })
      .then( function(){
        if ( localStorage.getItem("DraftBabyCustomRank") ) {
          var customRank = JSON.parse(localStorage.getItem("DraftBabyCustomRank"));
          $scope.customRankSet = true;
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
        if ( localStorage.getItem("DraftBabyCustomRank") ) {
          $scope.players = orderBy($scope.players, 'customrank');
        }
      });
  }

  $scope.espnurl = "http://games.espn.go.com/ffl/tools/projections?display=alt&avail=-1&search=";

  draftedFactory($scope);
}]);
