// get player data
var request = new XMLHttpRequest();
request.open("GET", "lib/ffc_2017_6_23.json", false);
request.send(null);
var players = JSON.parse(request.responseText);

// set global ui variables
var table = document.getElementById('draftable-player-list');
var tbody = table.getElementsByTagName('tbody');
var teams = document.getElementById('teams');
var draftPos = document.getElementById('draftPos');

players.forEach(function(player){
  var tr = document.createElement('tr');
  tbody[0].appendChild(tr);

  for (var data in player) {
    if (data == 'name' || data == 'position' || data == 'team' || data == 'bye' ) {
			var td = document.createElement('td');
      td.appendChild(document.createTextNode(player[data]));
			tr.appendChild(td);
    }
  }
});

// add sorted_pos to players
players.forEach(function(player, index){
	var startPos = players.indexOf(player);
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
	players[index].sorted_pos = sorted_pos;
});

players.sort(function(a, b) {
  return a.sorted_pos - b.sorted_pos;
});

teams.addEventListener('change', function() {
	var totalTeams = parseInt(teams.value);
	draftPos.innerHTML = '';
	for (var i=1; i<=totalTeams; i++) {
		var option = document.createElement('option');
		option.text = i;
		option.value = i;
		draftPos.add(option);
	}
});

var count = 1;
var run;
var picks = [];
var teams;
var draftPos;

function startDraft() {
	// fade out settings
	var settings = document.getElementById('draft-settings');
	var chosenTeams = parseInt(teams.value);
	var chosenDraftPos = parseInt(draftPos.value);
	fadeOut(settings);
	setPicks(chosenTeams, chosenDraftPos);
	computerPicks(players);
}

function setPicks(teams, draftPos) {
	// odd round picks
  for (var i=draftPos; i<=players.length; i+=(teams*2)) {
    picks.push(i);
  }
  // even round picks
  for (var j=(teams*2 - draftPos + 1); j<=players.length; j+=(teams*2)) {
    picks.push(j);
  }
}

function computerPicks() {
	if ( picks.includes(count) ) {
  	userDraft();	
	} else {
		var chosen = players.shift();
		draftSelected(chosen);
		increaseCount();
		run = setTimeout( function(){ computerPicks(); }, 750);
	}
}

function increaseCount() {
	count++;
	document.getElementById('pick-number').innerHTML = count;
}

function userDraft(){
	clearTimeout(run);
	document.getElementById('draft-progress').classList.add('eligible')
	tbody[0].classList.add('active');
	
	var nodeRows = document.querySelector('tbody.active').childNodes;
	
  nodeRows.forEach(function(row){
    row.addEventListener('click', function(){
			if (tbody[0].classList.contains('active')) {
				tbody[0].classList.remove('active');
				document.getElementById('draft-progress').classList.remove('eligible');
				for (var i=0; i<players.length; i++) {
					if (players[i].name == this.childNodes[0].innerHTML) {
						var selected = players[i];
						players.splice(i, 1);
						draftSelected(selected);
						increaseCount();
					  var team = document.getElementById('team');
					  var member = document.createElement('li');
					  team.appendChild(document.createTextNode(selected.position + ' ' + selected.name + ' ' + selected.bye));
					  team.appendChild(member);
						setTimeout( function(){ computerPicks(); }, 750);
						break;
					}
				}	
			}
    });
  });
}

var fullDraftedList = [];

function draftSelected(selected) {
	fullDraftedList.push(selected);
	// hide selected
	var nodeRows = document.querySelector('tbody').childNodes;
  nodeRows.forEach(function(row){
    var data = row.childNodes[0].innerText;
    if (selected.name == data) {
			fadeOut(row)
    }
  });
	// add to draftted list
  var list = document.getElementById('drafted');
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(count + ". " + selected.name ));
  list.prepend(item);
}

function fadeOut(el) {
	el.classList.add('fadeOut');
	setTimeout( function(){ el.classList.add('hidden'); }, 500);
}

// things to add next:
// adjust settings so that draft position can't exceed number of teams
// add pick #, round, overall numbers to player
// add round markers to total drafted list
// choose different league formats
// improve picking algorithm to pick according to team needs

