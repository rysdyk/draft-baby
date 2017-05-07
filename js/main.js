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
    th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir)); });
  }(i));
}

function makeAllSortable(parent) {
  parent = parent || document.body;
  var t = parent.getElementsByTagName('table'), i = t.length;
  while (--i >= 0) makeSortable(t[i]);
}

window.onload = function () {makeAllSortable();};


// draft
var drafted = [];

var nodeRows = document.querySelector('tbody').childNodes;
var rows = Array.prototype.slice.call(nodeRows);
rows.forEach(function(row){
  row.addEventListener('click', function(){
    this.style.display = 'none';
    drafted.push(this);
    showDrafted(this);
  })
})


function showDrafted(player) {
  var list = document.getElementById('drafted');
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(player.children[1].innerText));
  list.appendChild(item);
}


// undo draft

function undoDraft(e) {
  e.preventDefault();
  drafted.pop();
  var list = document.getElementById('drafted');
  list.removeChild(list.lastChild);
}

