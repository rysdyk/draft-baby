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
request.open("GET", "../lib/fantasypros-std-8-28-2016.json", false);
request.send(null);
var players = JSON.parse(request.responseText);



var table = document.getElementById('draftable-player-list');
var tbody = table.getElementsByTagName('tbody');

players.forEach(function(player){
  var tr = document.createElement('tr');
  tbody[0].appendChild(tr);

  for (var data in player) {
    if (data == 'name' || data == 'position' || data == 'team' || data == 'bye_week' ) {
			var td = document.createElement('td');
      td.appendChild(document.createTextNode(player[data]));
			tr.appendChild(td);
    }
  }
});




// add sorted_pos to players
players.forEach(function(player, index){
	var startPos = players.indexOf(player);
	var max = startPos * 1.5 + 4;
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

function startDraft() {
	computerPicks();
}

function computerPicks() {
	var selected = players.shift();
	console.log(selected);
	run = setTimeout( function(){ computerPicks()}, 500);
	count++
	if (count % 10 == 0 ) userDraft();
}

function userDraft(){
	clearTimeout(run);
	// user draft
	// get click
	// pop it
}





// click event to start draft
// grays out draft settings
// starts popping off sorted players