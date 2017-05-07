


var request = new XMLHttpRequest();
request.open("GET", "../lib/fantasypros-std-8-28-2016.json", false);
request.send(null)
var players = JSON.parse(request.responseText);
//console.log(players);


var table = document.getElementById('full-player-list');
var tbody = table.getElementsByTagName('tbody');
//console.log(tbody);

players.forEach(function(player){
  var tr = document.createElement('tr');
  tbody[0].appendChild(tr);

  for (data in player) {
    //console.log(player[data]);
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(player[data]));
    tr.appendChild(td);
  }
})
