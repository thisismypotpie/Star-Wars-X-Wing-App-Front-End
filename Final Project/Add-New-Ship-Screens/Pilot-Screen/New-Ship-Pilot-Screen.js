document.getElementById("back-button").addEventListener("click", function(){
    sessionStorage.removeItem("chosen_ship");
    window.location.href = "../Selection-Screen/New-Ship-Selection-Screen.html";
  });
  document.getElementById("select-button").addEventListener("click", function(){
    //Create a new ship in game dependent on the size of the ship to determine what kind of in-game-ship needs to be delcared.

    if(!display_pilots[selection_index].ship_name.ship_type.toLowerCase().includes("large"))
    {
      sessionStorage.setItem("ship_in_progress",JSON.stringify(new in_game_ship_status(display_pilots[selection_index])));
    }
    else// if the ship is large, delacre the correct type of large in-game ship.
    {
      if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largeonecard")//large ship one card.
      {
        sessionStorage.setItem("ship_in_progress",JSON.stringify(new large_one_card_in_game_ship_status(display_pilots[selection_index])));
      }
      else if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largetwocard")//large ship two card.
      {
        sessionStorage.setItem("ship_in_progress",JSON.stringify(new large_two_card_in_game_ship_status(display_pilots[selection_index])));
      }
      else
      {
        console.log("ERROR: The ship size of the selected ship is not valid.");
      }
    }
    window.location.href = "../Upgrade-Screen/New-Ship-Upgrade-Screen.html";
  });

  //Get the chosen ship and game data from the session storage.
  let chosen_ship = sessionStorage.getItem("chosenShip").split(',');//[shipName, faction, size]
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  console.log(chosen_ship);
  var display_pilots = [];
  let selection_index = 0;//This will be the index that will determine which pilot is chosen.

//Get the each pilot of the chosen ship.
game_data.all_pilots.forEach(pilot => {
      console.log("Comparing: "+pilot.faction+" to "+chosen_ship[1]+" \n and "+
      pilot.ship_name.ship_name+" to "+chosen_ship[0]);
      if(pilot.ship_name.ship_name == chosen_ship[0]
         && pilot.faction.toLowerCase() == chosen_ship[1].toLowerCase())
      {
        display_pilots.push(pilot);
      }

});
console.log(display_pilots);

//display maneuvers and pilot card
//I added this foreach loop to pre-load each picture into the div for pilot card, becasue each card took a while to load the first time.
display_pilots.forEach(element =>{
  document.getElementById("pilot-image").style.backgroundImage = "url('"+element.image_path+"')";
})
document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
document.getElementById("maneuver-image").style.backgroundImage = "url('"+display_pilots[selection_index].ship_name.card+"')";

//Create functionality for the next button.
document.getElementById("next-btn").addEventListener("click", function(){
  selection_index ++;
  if(selection_index >= display_pilots.length)
  {
    selection_index = 0;
  }
  document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
});

//creat functionality for the previous button
document.getElementById("previous-btn").addEventListener("click", function(){
  selection_index --;
  if(selection_index < 0)
  {
    selection_index = display_pilots.length-1;
  }
  document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
});