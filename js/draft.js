// draft
var drafted;
var nodeRows = document.querySelector('tbody').childNodes;
var list = document.getElementById('drafted');

if (localStorage.drafted) {
  drafted = JSON.parse(localStorage.drafted)
} else {
  drafted = [];
}

catchUp();

nodeRows.forEach(function(row){
  row.addEventListener('click', function(){
    this.style.display = 'none';
    drafted.push(this.children[1].innerText);
    showDrafted(this);
    setLocal();
  })
})

function showDrafted(player) {
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(player.children[1].innerText));
  list.appendChild(item);
}

// undo draft
function undoDraft(e) {
  e.preventDefault();
  var name = drafted.pop();
  list.removeChild(list.lastChild);
  nodeRows.forEach(function(row){
    var data = row.childNodes[1].innerText;
    if (name == data) {
      row.style.display = '';
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
  nodeRows.forEach(function(row){
    var data = row.childNodes[1].innerText;
    if (drafted.includes(data)) {
      row.style.display = 'none';
      var item = document.createElement('li');
      item.appendChild(document.createTextNode(data));
      list.appendChild(item);
    }
  })
}
