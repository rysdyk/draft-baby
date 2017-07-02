var request = new XMLHttpRequest();
request.open("GET", "lib/ffc_2017_6_23.json", false);
request.send(null);
var players = JSON.parse(request.responseText);

function getPosition(position) {
  var posPlayers = players.filter( function(player){
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
}

getPosition('qb');
getPosition('rb');
getPosition('wr');
getPosition('te');
getPosition('def');
getPosition('k');
