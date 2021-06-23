//Freeplay button
function freeplay_button_click()
{
  window.location.href = "../Team-Screen/Team-Screen.html";
}
//galactic conquest button
function galactic_conquest_click()
{
  window.location.href =  "../Galactic-Conquest-Screens/Setup-Screen/Setup-Screen.html";
}
//back button
function back_button_click()
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("choosing-game-type-popup").style.visibility = "hidden";
}
//New game button
function new_game_button_click()
{
  document.getElementById("overlay").style.pointerEvents = "all";
  document.getElementById("overlay").style.opacity = 1;
  document.getElementById("choosing-game-type-popup").style.visibility = "visible";
}


//If game data is already populated, then you do not need to call to the back end to get it again.
if(JSON.parse(sessionStorage.getItem("game_data")!= null && JSON.parse(sessionStorage.getItem("game_data")!= undefined)))
{
  //Clear all session storage items except for game data.
  var temp_data = JSON.parse(sessionStorage.getItem("game_data"));
  sessionStorage.clear();
  sessionStorage.setItem("game_data",JSON.stringify(temp_data));
  //Remove overlay. It is on by default.
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
}
else //Make a call to the back end and get game data.
{
//Load the game data and store it in session Storage.
var url = "http://localhost:3000/get_data";//"https://star-wars-x-wing-back-end.herokuapp.com/get_data";
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

function open_load_info_screen()
{
  document.getElementById("overlay").style.pointerEvents = "all";
  document.getElementById("overlay").style.opacity = 1;
  document.getElementById("loading-container").style.visibility = "visible";
  document.getElementById('loading-container-header').textContent = "Searching for game name, please wait ....";
}

function close_load_info_screen()
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
  document.getElementById('loading-container-header').textContent = "Game Data is Loading, Please Wait...";
}

function load_game()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;
  overlay.style.pointerEvents = "all";
  document.getElementById('loading-game-input-popup').style.visibility = "visible";
  document.getElementById('load-name-input').value = "";
  document.getElementById('load-name-input').focus();
}

function close_load_game_pop_up()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
  document.getElementById('loading-game-input-popup').style.visibility = "hidden";
}