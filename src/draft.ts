(function(){
  var draftBaby: any = {

    init: function(){
      this.cacheDom();
			this.setNodeRows();
      this.setDrafted();
      this.catchUp();
      this.addClick();
      this.setLocal();
    },

    cacheDom: function() {
      this.drafted = [];
      this.tbodies = document.querySelectorAll('tbody');
			this.nodeRows = []
      this.list = document.getElementById('drafted');
    },

		setNodeRows: function() {
			this.tbodies.forEach(function(tbody: any){
				tbody.childNodes.forEach(function(row: any){
				  draftBaby.nodeRows.push(row);
				});
			});
		},

    setDrafted: function(){
      if (localStorage.drafted) {
        this.drafted = JSON.parse(localStorage.drafted);
      } else {
        this.drafted = [];
      }
    },

    catchUp: function() {
      var drafted = this.drafted;
      var list = this.list;
      this.nodeRows.forEach(function(row: any){
        var data = row.childNodes[1].innerText;
        if (drafted.includes(data)) {
          row.style.display = 'none';
          var item = document.createElement('li');
          item.appendChild(document.createTextNode(data));
          list.appendChild(item);
        }
      });
    },

    addClick: function() {
      var drafted = this.drafted;
      var showDrafted = this.showDrafted;
      var setLocal = this.setLocal;
      var undo = document.getElementById('undo-draft');
      var undoDraft = this.undoDraft;
			var clear = document.getElementById('clear-draft');

      this.nodeRows.forEach(function(row: any){
        row.addEventListener('click', function(){
          this.style.display = 'none';
          drafted.push(this.children[1].innerText);
          showDrafted(this);
          setLocal();
        });
      });

      undo.addEventListener('click', function(e){
        undoDraft(e);
      });

			// clear.addEventListener('click', function(e){
			// 	localStorage.clear();
			// 	this.drafted = [];
			// })
    },

    showDrafted: function(player: any) {
      var list = document.getElementById('drafted');
      var item = document.createElement('li');
      item.appendChild(document.createTextNode(player.children[1].innerText));
      list.appendChild(item);
    },

    setLocal: function() {
      var drafted = draftBaby.drafted;
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem('drafted', JSON.stringify(drafted) );
      } else {
        console.log("Sorry, no local storage");
      }
    },

    undoDraft: function(e: any) {
      e.preventDefault();
      var drafted = draftBaby.drafted;
      var list = draftBaby.list;
      var nodeRows = draftBaby.nodeRows;
      var setLocal = draftBaby.setLocal;
      var name = drafted.pop();
      list.removeChild(list.lastChild);
      nodeRows.forEach(function(row: any){
        var data = row.childNodes[1].innerText;
        if (name == data) {
          row.style.display = '';
        }
      });
      // remove from local storage
      setLocal();
    }
  };

  draftBaby.init();

})();