// players can move up at least 3
// players can move down at least 3
// but never below 0
// position divided by 4 is the range
// use their range to generate random number
// then sort
// results remain hidden
// run sorted players - stop for each player draft pick - pop that player
// three columns. Available / Drafted / Your Team
// toggle whether to hide drafted

var request = new XMLHttpRequest();
request.open("GET", "../lib/ffc_2017_6_23.json", false);
request.send(null);
var players = JSON.parse(request.responseText);

var table = document.getElementById('draftable-player-list');
var tbody = table.getElementsByTagName('tbody');

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
	var max = startPos * 1.3 + 4;
	var min = startPos * .5 - 4;
	if (min < 0) { min = 0; }
	//console.log("start pos: " + startPos + ", Max: " + max + " , Min: " + min);
	sorted_pos = Math.random() * (max - min) + min
	players[index].sorted_pos = sorted_pos
	
})

players.sort(function(a, b) {
  return a.sorted_pos - b.sorted_pos;
});

// players is an array of objects
//console.log(players)

var count = 1;
var run;
var picks = [];
var teams;
var draftPos;

function startDraft() {
	// fade out settings
	teams = parseInt(document.getElementById('teams').value);
	draftPos = parseInt(document.getElementById('draftPos').value);
	setPicks(teams, draftPos);
	computerPicks();
}

function setPicks(teams, draftPos) {
	// odd round picks
  for (var i=draftPos; i<=players.length; i+=(teams*2)) {
    picks.push(i)
  }
  // even round picks
  for (var i=(teams*2 - draftPos); i<=players.length; i+=(teams*2)) {
    picks.push(i)
  }
}

function computerPicks() {
	var selected = players.shift();
	//console.log(selected)
	draftSelected(selected)
	
	run = setTimeout( function(){ computerPicks(teams, draftPos)}, 750);

	if ( picks.includes(count) ) {
	 	//console.log("got here")
  	userDraft();	
		count++
	} else {
		count++
		//console.log(count);
	}
}

function userDraft(){
	clearTimeout(run);
	
	var nodeRows = document.querySelector('tbody').childNodes;
	
  nodeRows.forEach(function(row){
    row.addEventListener('click', function(){
			//console.log(players)
			for (var i=0; i<players.length; i++) {
				if (players[i].name == this.childNodes[0].innerHTML) {
					selected = players[i];
					break;
				}
			}
			// remove selected player from sorted player list. this doesn't work yet.
			var ind = players.indexOf(selected)
			players.slice(ind)
			// add to your team
		  var team = document.getElementById('team');
		  var member = document.createElement('li');
		  team.appendChild(document.createTextNode(selected.name));
		  team.appendChild(member);
			
			// hide from main list and add to drafted
      draftSelected(selected)
			
			// start comptuer picker
			computerPicks()

    })
  });
}

var fullDraftedList = []

function draftSelected(selected) {
	fullDraftedList.push(selected);
	//console.log(selected)
	
	// hide selected
	var nodeRows = document.querySelector('tbody').childNodes;
  nodeRows.forEach(function(row){
    var data = row.childNodes[0].innerText;
    if (selected.name == data) {
      row.classList.add('picked');
    }
  })
	// add to draftted list
  var list = document.getElementById('drafted');
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(selected.name + " " + selected.position + " " + selected.team ));
  list.prepend(item);
}

// click event to start draft
// grays out draft settings
// starts popping off sorted players