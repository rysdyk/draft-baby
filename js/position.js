var request = new XMLHttpRequest();
request.open("GET", "../lib/fantasypros-std-8-28-2016.json", false);
request.send(null)
var players = JSON.parse(request.responseText);
//console.log(players);

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

    for (data in player) {
      if (data == 'rank' || data == 'name' || data == 'team' || data == 'bye_week') {
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
getPosition('dst');
getPosition('k');


// // qb
// var qb = players.filter( function(player){
//   return player.position.includes('QB');
// });

// var qbtable = document.getElementById('qb-list');
// var qbtbody = qbtable.getElementsByTagName('tbody');

// qb.forEach(function(player){
//   var tr = document.createElement('tr');
//   qbtbody[0].appendChild(tr);

//   for (data in player) {
//     if (data == 'rank' || data == 'name' || data == 'team' || data == 'bye_week') {
//       var td = document.createElement('td');
//       td.appendChild(document.createTextNode(player[data]));
//       tr.appendChild(td);
//     }
//   }
// })


// // rb
// var rb = players.filter( function(player){
//   return player.position.includes('RB');
// });

// var rbtable = document.getElementById('rb-list');
// var rbtbody = rbtable.getElementsByTagName('tbody');

// rb.forEach(function(player){
//   var tr = document.createElement('tr');
//   rbtbody[0].appendChild(tr);

//   for (data in player) {
//     if (data == 'rank' || data == 'name' || data == 'team' || data == 'bye_week') {
//       var td = document.createElement('td');
//       td.appendChild(document.createTextNode(player[data]));
//       tr.appendChild(td);
//     }
//   }
// })
