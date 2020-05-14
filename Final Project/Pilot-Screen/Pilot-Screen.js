document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Selection-Screen/Selection-Screen.html";
  });
  document.getElementById("select-button").addEventListener("click", function(){
    window.location.href = "../Upgrade-Screen/Upgrade-Screen.html";
  });

  //Get the chosen ship and game data from the session storage.
  let chosen_ship = sessionStorage.getItem("chosenShip").split(',');//[shipName, faction]
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
  if(selection_index <= 0)
  {
    selection_index = display_pilots.length-1;
  }
  document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
});