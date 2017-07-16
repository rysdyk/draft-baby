(function(){
	var dbPositions = {
		init: function() {
      this.allPlayers = [];
      this.positions = ['rb', 'wr', 'qb', 'te', 'k', 'def'];
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
				
			  var table = document.getElementById(dbPositions.positions[index] + '-list');
			  var tbody = table.getElementsByTagName('tbody');

			  posPlayers.forEach(function(player, index){
			    var tr = document.createElement('tr');
			    tbody[0].appendChild(tr);
          
          if ( player['tier']) { tr.classList.add( 'tier-' + player['tier']); }
          
	        var td = document.createElement('td');
	        td.appendChild(document.createTextNode(index + 1));
	        tr.appendChild(td);

			    for (var data in player) {
			      if (data == 'name' || data == 'team' || data == 'bye' || data == 'depth') {
			        var td = document.createElement('td');
			        td.appendChild(document.createTextNode(player[data]));
			        tr.appendChild(td);
			      }
			    }
			  });
			});
		}
	}
	
	dbPositions.init();
})()

// to do next, separate players into tiers