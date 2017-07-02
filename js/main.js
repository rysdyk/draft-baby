var request = new XMLHttpRequest();
request.open("GET", "../lib/ffc_2017_6_23.json", false);
request.send(null);
var players = JSON.parse(request.responseText);

var table = document.getElementById('full-player-list');
var tbody = table.getElementsByTagName('tbody');
var teams = document.getElementById('teams');
var draftPos = document.getElementById('draftPos');

players.forEach(function(player){
  var tr = document.createElement('tr');
  tbody[0].appendChild(tr);

  for (var data in player) {
    var td = document.createElement('td');
    if (data == 'avg_rank' || data == 'std_dev') {
      td.appendChild(document.createTextNode( Math.round( parseFloat(player[data]) * 10 ) / 10));
    } else {
      td.appendChild(document.createTextNode(player[data]));
    }
    tr.appendChild(td);
  }
});

// taken and modified from: http://jsfiddle.net/zscQy/
function sortTable(table, col, reverse) {
  var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
    tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
    i;
  reverse = -((+reverse) || -1);
  tr = tr.sort(function (a, b) { // sort rows with numbers
    var newA = parseFloat(a.cells[col].textContent.trim());
    var newB = parseFloat(b.cells[col].textContent.trim());
    if (newA > newB) {
      return reverse;
    } else {
      return reverse * -1;
    }
  });
  for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

// figure out how to sort by string for name, team, position

function makeSortable(table) {
  var th = table.tHead, i;
  th && (th = th.rows[0]) && (th = th.cells);
  if (th) i = th.length;
  else return; // if no `<thead>` then do nothing
  while (--i >= 0) (function (i) {
    var dir = 1;
    th[i].addEventListener('click', function () {
      sortTable(table, i, (dir = 1 - dir));
      clearEstimate();
    });
  }(i));
}

function makeAllSortable(parent) {
  parent = parent || document.body;
  var t = parent.getElementsByTagName('table'), i = t.length;
  while (--i >= 0) makeSortable(t[i]);
}

window.onload = function () {makeAllSortable();};


// draft estimate
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

function estimate() {
  var rows = table.querySelector('tbody').childNodes;
  rows.forEach(function(row){
    row.classList.remove('estimated');
  });
  var teamsVal = parseInt(teams.value);
  var draftPosVal = parseInt(draftPos.value);

  // odd rounds picks
  for (var i=draftPosVal; i<=players.length; i+=(teamsVal*2)) {
    rows[i - 1].classList.add('estimated');
  }

  // even round picks
  for (var j=(teamsVal*2 - draftPosVal); j<=players.length; j+=(teamsVal*2)) {
    rows[j].classList.add('estimated');
  }
}

function clearEstimate() {
  var rows = table.querySelector('tbody').childNodes;
  for (var i = 0; i < rows.length; i++) {
    rows[i].classList.remove('estimated');
  }
}

function filterPlayers() {
  var input, filter, table, tr, td, i;
  input = document.getElementById('filterInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('full-player-list');
  tr = table.getElementsByTagName('tr');

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1 ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
