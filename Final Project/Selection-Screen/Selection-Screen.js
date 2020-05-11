document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });

  var game_data= JSON.parse(sessionStorage.getItem("game_data"));

  console.log(game_data.all_crit_cards);