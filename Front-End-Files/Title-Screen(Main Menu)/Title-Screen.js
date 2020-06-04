document.getElementById("new-game-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });



if(JSON.parse(sessionStorage.getItem("game_data")!= null && JSON.parse(sessionStorage.getItem("game_data")!= undefined)))
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
}
else
{
//Load the game data and store it in session Storage.
var url = "https://star-wars-x-wing-back-end.herokuapp.com/";//"http://localhost:3000/";
var game_data = undefined;
fetch(url)
.catch(function(error) {
  console.log(error);
  document.getElementById("loading-container-header").textContent = "ERROR LOADING DATA, PLEASE REFRESH AND TRY AGAIN!"
})
.then(response =>response.json())
.then(data => game_data = data)
.then(() => sessionStorage.setItem("game_data",JSON.stringify(game_data)))
.then(()=>{
    if(JSON.parse(sessionStorage.getItem("game_data") == null || JSON.parse(sessionStorage.getItem("game_data") == undefined)))
    {
      document.getElementById("loading-container-header").textContent = "ERROR LOADING DATA, BACK END MAY BE DONW!"
    }
    else
    {
      document.getElementById("overlay").style.pointerEvents = "none";
      document.getElementById("overlay").style.opacity = 0;
      document.getElementById("loading-container").style.visibility = "hidden";
    }
});
}
