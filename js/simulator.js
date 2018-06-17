(function () {
    var draftBaby = {
        init: function () {
            this.cacheDom();
            this.draftSettings();
            this.setVariables();
            this.addClick();
        },
        cacheDom: function () {
            this.tables = document.querySelectorAll('.draftable-player-list');
            this.tbodies = document.getElementsByTagName('tbody'); // make sure we get all 7 lists
            this.team = document.getElementById('team');
            this.teams = document.getElementById('teams');
            this.draftPos = document.getElementById('draftPos');
            this.formats = document.getElementsByName('format');
            this.settings = document.getElementById('draft-settings');
            this.pickNumber = document.getElementById('pick-number');
            this.draftProgress = document.getElementById('draft-progress');
            this.draftedList = document.getElementById('drafted');
            this.start = document.getElementById('startDraftButton');
        },
        getPlayers: function (format, teams) {
            var request = new XMLHttpRequest();
            request.open("GET", "lib/2017/ffc_7_" + format + "_" + teams + ".json", false);
            request.send(null);
            this.players = JSON.parse(request.responseText);
            draftBaby.renderPlayers();
            draftBaby.collectPlayers();
            draftBaby.assignSortedPosition();
            draftBaby.sortPlayers();
        },
        renderPlayers: function () {
            this.players.forEach(function (player, index) {
                var tr = document.createElement('tr');
                draftBaby.tbodies[0].appendChild(tr);
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
        collectPlayers: function () {
            this.rows = document.querySelectorAll('.draftable-player-list tbody tr');
        },
        assignSortedPosition: function () {
            this.players.forEach(function (player, index) {
                var startPos = draftBaby.players.indexOf(player);
                var max, min, sorted_pos;
                if (index < 25) {
                    max = startPos * 1.1 + 3;
                    min = startPos * 0.8 - 3;
                }
                else if (index >= 25 && index < 51) {
                    max = startPos * 1.1;
                    min = startPos * 0.8;
                }
                else if (index >= 51 && index < 100) {
                    max = startPos * 1.05;
                    min = startPos * 0.9;
                }
                else {
                    max = startPos * 1.05;
                    min = startPos * 0.9;
                }
                if (min < 0) {
                    min = 0;
                }
                sorted_pos = Math.random() * (max - min) + min;
                draftBaby.players[index].sorted_pos = sorted_pos;
            });
        },
        sortPlayers: function () {
            this.players.sort(function (a, b) {
                return a.sorted_pos - b.sorted_pos;
            });
        },
        draftSettings: function () {
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
        setVariables: function () {
            this.count = 1;
            this.run = "";
            this.picks = [];
            this.fullDraftedList = [];
        },
        addClick: function () {
            this.start.addEventListener('click', function () {
                draftBaby.startDraft();
            });
        },
        startDraft: function () {
            var chosenTeams = parseInt(this.teams.value);
            var chosenDraftPos = parseInt(this.draftPos.value);
            var format = draftBaby.getFormat();
            draftBaby.getPlayers(format, chosenTeams);
            draftBaby.fadeOut(this.settings);
            draftBaby.setPicks(chosenTeams, chosenDraftPos);
            draftBaby.computerPicks();
        },
        getFormat: function () {
            for (var i = 0; i < this.formats.length; i++) {
                if (draftBaby.formats[i].checked) {
                    return draftBaby.formats[i].value;
                }
            }
        },
        setPicks: function (teams, draftPos) {
            // odd round picks
            for (var i = draftPos; i <= this.players.length; i += (teams * 2)) {
                this.picks.push(i);
            }
            // even round picks
            for (var j = (teams * 2 - draftPos + 1); j <= this.players.length; j += (teams * 2)) {
                this.picks.push(j);
            }
        },
        computerPicks: function () {
            if (this.picks.includes(this.count)) {
                draftBaby.userDraft();
            }
            else {
                var chosen = this.players.shift();
                draftBaby.draftSelected(chosen);
                draftBaby.increaseCount();
                this.run = setTimeout(function () { draftBaby.computerPicks(); }, 750);
            }
        },
        increaseCount: function () {
            this.count++;
            this.pickNumber.innerHTML = this.count;
        },
        userDraft: function () {
            clearTimeout(this.run);
            this.draftProgress.classList.add('eligible');
            for (var i = 0; i < this.tbodies.length; i++) {
                this.tbodies[i].classList.add('active');
            }
            // tbody for each
            //var nodeRows = document.querySelectorAll('tbody.active').childNodes;
            // var nodeRows = []
            //
            // for (var i=0; i<this.tbodies.length; i++) {
            //   if(this.tbodies[i].classList.contains('active')) {
            //     nodeRows.push(this.tbodies[i].childNodes);
            //   }
            // }
            this.rows.forEach(function (row) {
                row.addEventListener('click', function () {
                    if (draftBaby.tbodies[0].classList.contains('active')) {
                        for (var i = 0; i < draftBaby.tbodies.length; i++) {
                            draftBaby.tbodies[i].classList.remove('active');
                        }
                        draftBaby.draftProgress.classList.remove('eligible');
                        for (var i = 0; i < draftBaby.players.length; i++) {
                            if (draftBaby.players[i].name == this.childNodes[1].innerHTML) {
                                var selected = draftBaby.players[i];
                                draftBaby.players.splice(i, 1);
                                draftBaby.draftSelected(selected);
                                draftBaby.increaseCount();
                                var member = document.createElement('li');
                                draftBaby.team.appendChild(document.createTextNode(selected.position + ' ' + selected.name + ' ' + selected.bye));
                                draftBaby.team.appendChild(member);
                                setTimeout(function () { draftBaby.computerPicks(); }, 750);
                                break;
                            }
                        }
                    }
                });
            });
        },
        draftSelected: function (selected) {
            //console.log(selected);
            this.fullDraftedList.push(selected);
            // hide selected
            var nodeRows = [];
            for (var i = 0; i < this.tbodies.length; i++) {
                nodeRows.push(this.tbodies[i].childNodes);
            }
            this.rows.forEach(function (row) {
                var data = row.childNodes[1].innerText;
                if (selected.name == data) {
                    draftBaby.fadeOut(row);
                }
            });
            // add to drafted list
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(this.count + ". " + selected.name));
            this.draftedList.prepend(item);
        },
        fadeOut: function (el) {
            el.classList.add('fadeOut');
            setTimeout(function () { el.classList.add('hidden'); }, 500);
        }
    };
    draftBaby.init();
})();
// things to add next:
// add pick #, round, overall numbers to player
// add round markers to total drafted list
// choose different league formats
// improve picking algorithm to pick according to team needs
