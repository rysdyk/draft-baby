(function(){
	var draftBaby = {
		init: function(){
			this.cacheDom();
			this.getPlayers();
			this.renderPlayers();
			this.assignSortedPosition();
			this.sortPlayers();
			this.draftSettings();
			this.setVariables();
      this.addClick();
		},
		
		cacheDom: function() {
			this.table = document.getElementById('draftable-player-list');
			this.tbody = this.table.getElementsByTagName('tbody'); // make sure we get all 7 lists
      this.team = document.getElementById('team');
			this.teams = document.getElementById('teams');
			this.draftPos = document.getElementById('draftPos');
			this.settings = document.getElementById('draft-settings');
			this.pickNumber = document.getElementById('pick-number');
			this.draftProgress = document.getElementById('draft-progress');
      this.draftedList = document.getElementById('drafted');
      this.start = document.getElementById('startDraftButton');
		},
		
		getPlayers: function() {
			var request = new XMLHttpRequest();
			request.open("GET", "lib/2017/ffc_2017_6_23.json", false);
			request.send(null);
			this.players = JSON.parse(request.responseText);
		},
		
		renderPlayers: function() {
			this.players.forEach(function(player, index){
			  var tr = document.createElement('tr');
			  draftBaby.tbody[0].appendChild(tr);
        var td = document.createElement('td');
	      td.appendChild(document.createTextNode(index + 1));
				tr.appendChild(td);

			  for (var data in player) {
			    if (data == 'name' || data == 'position' || data == 'team' || data == 'bye' ) {
						var td = document.createElement('td');
			      td.appendChild(document.createTextNode(player[data]));
						tr.appendChild(td);
			    }
			  }
			});
		},
		
		assignSortedPosition: function() {
			this.players.forEach(function(player, index){
				var startPos = draftBaby.players.indexOf(player);
				var max, min;
	
				if (index < 25) {
					max = startPos * 1.2 + 4;
					min = startPos * 0.7 - 4;
				} else if (index >= 25 && index < 51) {
					max = startPos * 1.1;
					min = startPos * 0.8;
				} else if (index >=51 && index < 100) {
					max = startPos * 1.05;
					min = startPos * 0.9;
				} else {
					max = startPos * 1.05;
					min = startPos * 0.9;
				}
	
				if (min < 0) { 
					min = 0;
				}
				sorted_pos = Math.random() * (max - min) + min;
				draftBaby.players[index].sorted_pos = sorted_pos;
			});
		},
		
		sortPlayers: function() {
			this.players.sort(function(a, b) {
			  return a.sorted_pos - b.sorted_pos;
			});
		},
		
		draftSettings: function() {
			this.teams.addEventListener('change', function() {
				var totalTeams = parseInt(draftBaby.teams.value);
				draftBaby.draftPos.innerHTML = '';
				for (var i=1; i<=totalTeams; i++) {
					var option = document.createElement('option');
					option.text = i;
					option.value = i;
					draftBaby.draftPos.add(option);
				}
			});
		},
		
		setVariables: function() {
			this.count = 1;
			this.run = "";
			this.picks = [];
			this.fullDraftedList = [];
		},
    
    addClick: function() {
      this.start.addEventListener('click', function(){
        draftBaby.startDraft();
      });
    },
    
		startDraft: function() {
			var chosenTeams = parseInt(this.teams.value);
			var chosenDraftPos = parseInt(this.draftPos.value);
			draftBaby.fadeOut(this.settings);
			draftBaby.setPicks(chosenTeams, chosenDraftPos);
			draftBaby.computerPicks();
		},
    
		setPicks: function(teams, draftPos) {
			// odd round picks
		  for (var i=draftPos; i<=this.players.length; i+=(teams*2)) {
		    this.picks.push(i);
		  }
		  // even round picks
		  for (var j=(teams*2 - draftPos + 1); j<=this.players.length; j+=(teams*2)) {
		    this.picks.push(j);
		  }
		},

		computerPicks: function() {
			if ( this.picks.includes(this.count) ) {
		  	draftBaby.userDraft();	
			} else {
				var chosen = this.players.shift();
				draftBaby.draftSelected(chosen);
				draftBaby.increaseCount();
				this.run = setTimeout( function(){ draftBaby.computerPicks(); }, 750);
			}
		},
		
		increaseCount: function() {
			this.count++;
			this.pickNumber.innerHTML = this.count;
		},
		
		userDraft: function(){
			clearTimeout(this.run);
			this.draftProgress.classList.add('eligible')
			this.tbody[0].classList.add('active');
      // tbody for each
	
			var nodeRows = document.querySelector('tbody.active').childNodes;
	
		  nodeRows.forEach(function(row){
		    row.addEventListener('click', function(){
					if (draftBaby.tbody[0].classList.contains('active')) {
						draftBaby.tbody[0].classList.remove('active');
						draftBaby.draftProgress.classList.remove('eligible');
						for (var i=0; i<draftBaby.players.length; i++) {
							if (draftBaby.players[i].name == this.childNodes[0].innerHTML) {
								var selected = draftBaby.players[i];
								draftBaby.players.splice(i, 1);
								draftBaby.draftSelected(selected);
								draftBaby.increaseCount();
							  var member = document.createElement('li');
							  draftBaby.team.appendChild(document.createTextNode(selected.position + ' ' + selected.name + ' ' + selected.bye));
							  draftBaby.team.appendChild(member);
								setTimeout( function(){ draftBaby.computerPicks(); }, 750);
								break;
							}
						}	
					}
		    });
		  });
		},
		
		draftSelected: function(selected) {
			this.fullDraftedList.push(selected);
			
      // hide selected
			var nodeRows = this.tbody[0].childNodes;
		  nodeRows.forEach(function(row){
		    var data = row.childNodes[0].innerText;
		    if (selected.name == data) {
					draftBaby.fadeOut(row)
		    }
		  });
      
			// add to drafted list
		  var item = document.createElement('li');
		  item.appendChild(document.createTextNode(this.count + ". " + selected.name ));
		  this.draftedList.prepend(item);
		},

		fadeOut: function(el) {
			el.classList.add('fadeOut');
			setTimeout( function(){ el.classList.add('hidden'); }, 500);
		}	
	}
	
	draftBaby.init();
})()

// things to add next:
// add pick #, round, overall numbers to player
// add round markers to total drafted list
// choose different league formats
// improve picking algorithm to pick according to team needs

