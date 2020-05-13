document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Selection-Screen/Selection-Screen.html";
  });
  document.getElementById("select-button").addEventListener("click", function(){
    window.location.href = "../Upgrade-Screen/Upgrade-Screen.html";
  });

  //Get the chosen ship and game data from the session storage.
  let chosen_ship = sessionStorage.getItem("chosenShip");//[shipName, faction]
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  console.log(chosen_ship);
  var display_pilots = [];

//Get the each pilot of the chosen ship.
game_data.all_pilots.forEach(pilot => {
      console.log("Comparing: ");
      if(pilot.ship_name.ship_name == chosen_ship[0]
         && pilot.faction.toLowerCase() == chosen_ship[1].toLowerCase())
      {
        display_pilots.push(pilot);
      }

});
console.log(display_pilots);

