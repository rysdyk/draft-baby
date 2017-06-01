// draft

var drafted;

if (localStorage.drafted) {
  drafted = JSON.parse(localStorage.drafted)
} else {
  drafted = [];
}

var rows = [];
var tbodies = document.querySelectorAll('tbody');

tbodies.forEach(function(tbody){
  nRows = tbody.childNodes
  rows.push(nRows);
});

catchUp();

//var rows = Array.prototype.slice.call(nodeRows);

rows.forEach(function(nodeList){
  nodeList.forEach( function(row){
    row.addEventListener('click', function(){
      this.style.display = 'none';
      drafted.push(this.children[1].innerText);
      showDrafted(this);
      setLocal()
    })
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
  var nodes = document.querySelectorAll('tbody');
  nodes.forEach(function(rows){
    rows.childNodes.forEach(function(row){
      var data = row.childNodes[1].innerText;
      if (name == data) {
        row.style.display = 'table-row';
      }
    })
  })

  // remove from local storage
  setLocal();
}

function setLocal() {
  if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      localStorage.setItem('drafted', JSON.stringify(drafted) )
      //console.log(localStorage.drafted)
  } else {
      // Sorry! No Web Storage support..
  }
}

function catchUp() {
  //var rows = table.querySelector('tbody').childNodes;
  var list = document.getElementById('drafted');

  // speed this up! no loops inside loops
  drafted.forEach(function(name){
    rows.forEach(function(nodeList){
      nodeList.forEach( function(row){
        var data = row.childNodes[1].innerText;
        if (name == data) {
          row.style.display = 'none';
        }
      })
    })
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(name));
    list.appendChild(item);
  })
}
