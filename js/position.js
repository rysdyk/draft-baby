(function(){
	var draftBaby = {
		init: function() {
			this.getPlayers();
			this.renderPlayers();
		},
		
		getPlayers: function() {
			var request = new XMLHttpRequest();
			request.open("GET", "lib/ffc_2017_6_23.json", false);
			request.send(null);
			this.players = JSON.parse(request.responseText);
		},
		
		renderPlayers: function() {
			var positions = ['qb', 'rb', 'wr', 'te', 'k', 'def'];
			
			positions.forEach(function(position){
			  
				var posPlayers = draftBaby.players.filter( function(player){
			    var pos = position.toUpperCase();
			    return player.position.includes(pos);
			  });
				
			  var table = document.getElementById(position + '-list');
			  var tbody = table.getElementsByTagName('tbody');

			  posPlayers.forEach(function(player){
			    var tr = document.createElement('tr');
			    tbody[0].appendChild(tr);

			    for (var data in player) {
			      if (data == 'rank' || data == 'name' || data == 'team' || data == 'bye') {
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