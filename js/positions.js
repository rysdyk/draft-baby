(function(){
	var draftBaby = {
		init: function() {
      this.allPlayers = [];
      this.positions = ['qb', 'rb', 'wr', 'te', 'k', 'def'];
			this.getPlayers();
			this.renderPlayers();
		},
		
		getPlayers: function() {
      var players = this.allPlayers;
      
      this.positions.forEach( function(position){
  			var request = new XMLHttpRequest();
  			request.open("GET", "lib/2017/" + position + ".json", false);
  			request.send(null);
        var response = JSON.parse(request.responseText)
  			players.push(response);
      });
		},
		
		renderPlayers: function() {
			this.allPlayers.forEach(function(posPlayers, index){
			  
        // var posPlayers = draftBaby.players.filter( function(player){
        //           var pos = position.toUpperCase();
        //           return player.position.includes(pos);
        //         });
				
			  var table = document.getElementById(draftBaby.positions[index] + '-list');
			  var tbody = table.getElementsByTagName('tbody');

			  posPlayers.forEach(function(player, index){
			    var tr = document.createElement('tr');
			    tbody[0].appendChild(tr);
          
          if ( player['tier']) { tr.classList.add( 'tier-' + player['tier']); }
          
	        var td = document.createElement('td');
	        td.appendChild(document.createTextNode(index + 1));
	        tr.appendChild(td);

			    for (var data in player) {
			      if (data == 'name' || data == 'team' || data == 'bye') {
			        var td = document.createElement('td');
			        td.appendChild(document.createTextNode(player[data]));
			        tr.appendChild(td);
			      }
			    }
			  });
			});
		}
	}
	
	draftBaby.init();
})()

// to do next, separate players into tiers