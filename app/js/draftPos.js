function draftPick(t, p){
  var teams = t;
  var pick = p;
  var snakePick = teams * 2 - pick + 1;
  var pickSpread = teams * 2;

  for(i=pick; i<330; i+= pickSpread ) {
    console.log(i);
    $("tr:eq(" + i + ")").addClass("draftpick");
  }

  for(i=snakePick; i<330; i+= pickSpread ) {
    console.log(i);
    $("tr:eq(" + i + ")").addClass("draftpick");
  }
}

function draftPosClear(){
  $("tr").removeClass("draftpick");
}

$('#draftPosEst').click( function(){
  draftPosClear();
  var teams = parseInt($('#draftPosTeams').val());
  var pick = parseInt($('#draftPos').val());
  draftPick(teams, pick);
});

$('#draftPosClear, th').click( function(){
  draftPosClear();
});
