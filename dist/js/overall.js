(function () {
    var draftBaby = {
        init: function () {
            this.cacheDOM();
            this.getPlayers();
            this.renderPlayers();
            this.addEvents();
            this.getDraftSettings();
        },
        cacheDOM: function () {
            this.table = document.getElementById('full-player-list');
            this.tbody = this.table.getElementsByTagName('tbody');
            this.teams = document.getElementById('teams');
            this.draftPos = document.getElementById('draftPos');
            this.rows = this.tbody[0].childNodes;
            this.filterInput = document.getElementById('filterInput');
            this.draftButton = document.getElementById('estimateDraft');
        },
        getPlayers: function () {
            var request = new XMLHttpRequest();
            request.open("GET", "lib/2017/ffc_2017_6_23.json", false);
            request.send(null);
            this.players = JSON.parse(request.responseText);
        },
        renderPlayers: function () {
            this.players.forEach(function (player, index) {
                var tr = document.createElement('tr');
                draftBaby.tbody[0].appendChild(tr);
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(index + 1));
                tr.appendChild(td);
                for (var data in player) {
                    if (data == 'name' || data == 'position' || data == 'team' || data == 'bye') {
                        var td = document.createElement('td');
                        td.appendChild(document.createTextNode(player[data]));
                        tr.appendChild(td);
                    }
                }
            });
        },
        addEvents: function () {
            var renderDraftEstimate = this.renderDraftEstimate;
            var filterPlayers = this.filterPlayers;
            this.draftButton.addEventListener('click', function () { renderDraftEstimate(); });
            this.filterInput.addEventListener('keyup', function () { filterPlayers(); });
        },
        getDraftSettings: function () {
            this.teams.addEventListener('change', function () {
                var totalTeams = parseInt(draftBaby.teams.value);
                draftBaby.draftPos.innerHTML = '';
                for (var i = 1; i <= totalTeams; i++) {
                    var option = document.createElement('option');
                    option.text = i;
                    option.value = i;
                    draftBaby.draftPos.add(option);
                }
            });
        },
        renderDraftEstimate: function () {
            var rows = draftBaby.rows;
            rows.forEach(function (row) {
                row.classList.remove('estimated');
            });
            var teamsVal = parseInt(this.teams.value);
            var draftPosVal = parseInt(this.draftPos.value);
            // odd rounds picks
            for (var i = draftPosVal; i <= draftBaby.players.length; i += (teamsVal * 2)) {
                rows[i - 1].classList.add('estimated');
            }
            // even round picks
            for (var j = (teamsVal * 2 - draftPosVal); j <= draftBaby.players.length; j += (teamsVal * 2)) {
                rows[j].classList.add('estimated');
            }
        },
        // clearDraftEstimate: function() {
        //   for (var i = 0; i < this.rows.length; i++) {
        //     this.rows[i].classList.remove('estimated');
        //   }
        // },
        filterPlayers: function () {
            var rows = draftBaby.rows;
            var input, filter, tr, td, i;
            filter = this.filterInput.value.toUpperCase();
            //tr = this.table.getElementsByTagName('tr');
            for (i = 0; i < rows.length; i++) {
                td = rows[i].getElementsByTagName('td')[1];
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = "";
                    }
                    else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }
    };
    draftBaby.init();
})();
// // taken and modified from: http://jsfiddle.net/zscQy/
// function sortTable(table, col, reverse) {
//   var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
//     tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
//     i;
//   reverse = -((+reverse) || -1);
//   tr = tr.sort(function (a, b) { // sort rows with numbers
//     var newA = parseFloat(a.cells[col].textContent.trim());
//     var newB = parseFloat(b.cells[col].textContent.trim());
//     if (newA > newB) {
//       return reverse;
//     } else {
//       return reverse * -1;
//     }
//   });
//   for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
// }
//
// // figure out how to sort by string for name, team, position
//
// function makeSortable(table) {
//   var th = table.tHead, i;
//   th && (th = th.rows[0]) && (th = th.cells);
//   if (th) i = th.length;
//   else return; // if no `<thead>` then do nothing
//   while (--i >= 0) (function (i) {
//     var dir = 1;
//     th[i].addEventListener('click', function () {
//       sortTable(table, i, (dir = 1 - dir));
//       clearEstimate();
//     });
//   }(i));
// }
//
// function makeAllSortable(parent) {
//   parent = parent || document.body;
//   var t = parent.getElementsByTagName('table'), i = t.length;
//   while (--i >= 0) makeSortable(t[i]);
// }
//
// window.onload = function () {makeAllSortable();};
