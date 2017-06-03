var request = new XMLHttpRequest();
request.open("GET", "../lib/fantasypros-std-8-28-2016.json", false);
request.send(null);
var players = JSON.parse(request.responseText);

var table = document.getElementById('full-player-list');
var tbody = table.getElementsByTagName('tbody');

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

function estimate() {
  var rows = table.querySelector('tbody').childNodes;
  rows.forEach(function(row){
    row.classList.remove('estimated');
  })
  var teams = parseInt(document.getElementById('teams').value);
  var draftPos = parseInt(document.getElementById('draftPos').value);

  if (draftPos > teams) {
    alert("Please select valid draft position")
  } else {
    // odd rounds picks
    for (var i=draftPos; i<=players.length; i+=(teams*2)) {
      console.log(i);
      rows[i - 1].classList.add('estimated')
    }

    // even round picks
    for (var i=(teams*2 - draftPos); i<=players.length; i+=(teams*2)) {
      console.log(i);
      rows[i].classList.add('estimated')
    }
  }
}

function clearEstimate() {
  var rows = table.querySelector('tbody').childNodes;
  for (var i = 0; i < rows.length; i++) {
    rows[i].classList.remove('estimated')
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
