// draft
var drafted = [];

var nodeRows = document.querySelector('tbody').childNodes;
var rows = Array.prototype.slice.call(nodeRows);
rows.forEach(function(row){
  row.addEventListener('click', function(){
    this.style.display = 'none';
    drafted.push(this.children[1].innerText);
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
  var name = drafted.pop();
  var list = document.getElementById('drafted');
  list.removeChild(list.lastChild);
  console.log(name);
  var rows = table.querySelector('tbody').childNodes;
  rows.forEach(function(row){
    var data = row.childNodes[1].innerText;
    if (name == data) {
      row.style.display = 'table-row';
    }
  })
}
