document.getElementById("new-game-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });

  
//Load the game data and store it in session Storage.
var url = "http://localhost:3000/";
var game_data = undefined;
fetch(url)
.then(response =>response.json())
//.then(data=>console.log(data));
.then(data => game_data = data)
.then(() => sessionStorage.setItem("game_data",JSON.stringify(game_data)));
