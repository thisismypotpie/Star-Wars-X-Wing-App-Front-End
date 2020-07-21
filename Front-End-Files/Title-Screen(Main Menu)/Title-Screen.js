document.getElementById("new-game-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });


//If game data is already populated, then you do not need to call to the back end to get it again.
if(JSON.parse(sessionStorage.getItem("game_data")!= null && JSON.parse(sessionStorage.getItem("game_data")!= undefined)))
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
}
else //Make a call to the back end and get game data.
{
//Load the game data and store it in session Storage.
var url = "http://localhost:3000/get_data";//"https://star-wars-x-wing-back-end.herokuapp.com/"; //"http://localhost:3000/";
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


function load_game()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;
  overlay.style.pointerEvents = "all";
  document.getElementById('loading-game-input-popup').style.visibility = "visible";
  document.getElementById('load-name-input').focus();
}

function close_load_game_pop_up()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
  document.getElementById('loading-game-input-popup').style.visibility = "hidden";
}

function get_load_data()
{
    var game_names = [];
    var input = document.getElementById('load-name-input').value;
    input = input.replace(/\s+/g, '');
    input = input.toLowerCase();
    if(input.length == 0)
    {
       alert("No name was input, please input game name.");
       document.getElementById('load-name-input').value = "";
       document.getElementById('load-name-input').focus();
       return;
    }
    var url = "http://localhost:3000/get_game_names";
    fetch(url)
.catch(function(error) {
console.log(error);
alert("Something went wrong trying to get saved game names. "+error)
})
.then(response =>response.json())
.then(data=>{game_names = data;})
.then(()=>{
        var match_found = false;
      for(var i =0; i < game_names.length;i++)
      {
        console.log("comparing: "+input+" and "+game_names[i]);
        if(game_names[i] == input)
        {
          match_found = true;
           alert("Found a match: "+game_names[i]);
           var url = "http://localhost:3000/load_game";
           fetch(url,{
            method: 'POST',
            body:JSON.stringify([game_names[i]])
        })
        .then(response =>response.json())
        .then(data=>{parse_load_data(data)})
        break;
        }
      }
      if(match_found == false)
      {
        alert("There were no game names that matched: "+document.getElementById('load-name-input').value);
      }
})
}

//takes load data and makes team and ship an sets up the game.
function parse_load_data(raw_data)
{
  var phase = raw_data.phase;
  var raw_team_data = raw_data.team_data;
  console.log(raw_data);
  if(phase == "movement")
  {
    
  }
  else if(phase == "attack")
  {

  }
  else if(phase == "maneuver-selection")
  {

  }
  else if(phase == "squad-building")
  {

  }
  else
  {
    alert("ERROR: invalid phase type data on load.")
  }

}