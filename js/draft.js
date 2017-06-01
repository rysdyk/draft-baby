// draft
var drafted;

if (localStorage.drafted) {
  drafted = JSON.parse(localStorage.drafted)
} else {
  drafted = [];
}

catchUp();

var nodeRows = document.querySelector('tbody').childNodes;
var rows = Array.prototype.slice.call(nodeRows);

rows.forEach(function(row){
  row.addEventListener('click', function(){
    this.style.display = 'none';
    drafted.push(this.children[1].innerText);
    showDrafted(this);
    setLocal();
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

  // remove from local storage
  setLocal();
}


function setLocal() {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem('drafted', JSON.stringify(drafted) )
  } else {
    console.log("Sorry, no local storage")
  }
}

function catchUp() {
  var rows = table.querySelector('tbody').childNodes;
  var list = document.getElementById('drafted');

  // speed this up! no loops inside loops
  drafted.forEach(function(name){
    rows.forEach(function(row){
      var data = row.childNodes[1].innerText;
      if (name == data) {
        row.style.display = 'none';
      }
    })
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(name));
    list.appendChild(item);
  })
}
