// FULL LIST

draftApp.controller('PlayerListController', [ '$scope', 'playersFactory', 'draftedFactory', 'tagFactory', function($scope, playersFactory, draftedFactory, tagFactory){

  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
        // if tag cook is set do crap
        // or else
        angular.forEach($scope.players, function(value, key){
          $scope.players[key].tag = 0;
        });
      })
      .then( function(){
        if ( localStorage.getItem("DraftBabyDraftedList") ) {
          var draftHist = JSON.parse(localStorage.getItem("DraftBabyDraftedList"));
          angular.forEach($scope.players, function(value, key){
            var match  = draftHist.filter( function(x){ return value.name == x.name; });
            for (var prop in match ) {
              $scope.players[key].drafted = match[prop];
            }
          });
        }
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

  tagFactory($scope);
}]);

// CUSTOM

draftApp.controller('CustomListController', [ '$scope', 'playersFactory', 'draftedFactory', 'tagFactory', 'orderByFilter', function($scope, playersFactory, draftedFactory, tagFactory, orderBy){
  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
        // if tag cookie is set
        // or else
        angular.forEach($scope.players, function(value, key){
          $scope.players[key].tag = 0;
        });
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
      })
      .then( function(){
        if ( localStorage.getItem("DraftBabyDraftedList") ) {
          var draftHist = JSON.parse(localStorage.getItem("DraftBabyDraftedList"));
          angular.forEach($scope.players, function(value, key){
            var match  = draftHist.filter( function(x){ return value.name == x.name; });
            for (var prop in match ) {
              $scope.players[key].drafted = match[prop];
            }
          });
        }
      });
  }

  tagFactory($scope);

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

draftApp.controller('PositionsListController', [ '$scope', 'playersFactory', 'draftedFactory', 'tagFactory', 'orderByFilter', function($scope, playersFactory, draftedFactory, tagFactory, orderBy){
  getPlayers();

  function getPlayers(){
    playersFactory.getRankings()
      .then(function(response){
        $scope.players = response.data;
        // if tag cookie is set
        // or else
        angular.forEach($scope.players, function(value, key){
          $scope.players[key].tag = 0;
        });
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
      })
      .then( function(){
        if ( localStorage.getItem("DraftBabyDraftedList") ) {
          var draftHist = JSON.parse(localStorage.getItem("DraftBabyDraftedList"));
          angular.forEach($scope.players, function(value, key){
            var match  = draftHist.filter( function(x){ return value.name == x.name; });
            for (var prop in match ) {
              $scope.players[key].drafted = match[prop];
            }
          });
        }
      });
  }

  $scope.espnurl = "http://games.espn.go.com/ffl/tools/projections?display=alt&avail=-1&search=";

  draftedFactory($scope);

  tagFactory($scope);
}]);
