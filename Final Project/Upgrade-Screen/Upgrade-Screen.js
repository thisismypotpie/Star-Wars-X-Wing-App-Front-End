
document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Pilot-Screen/Pilot-Screen.html";
  });
  document.getElementById("done-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });

  //Get data objects needed for this page.
  let name_of_chosen_pilot = sessionStorage.getItem("chosen_pilot");
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  let chosen_ship = sessionStorage.getItem("chosenShip").split(',');//[shipName, faction]
  let chosen_pilot = undefined;
  //Get chosen pilot
  game_data.all_pilots.forEach(pilot => {
    if(pilot.ship_name.ship_name == chosen_ship[0]
       && pilot.faction.toLowerCase() == chosen_ship[1].toLowerCase()&&
       pilot.pilot_name == name_of_chosen_pilot)
    {
       chosen_pilot = pilot;
    }

});
//Set pilot image of chosen pilot.
document.getElementById("pilot-picture").style.backgroundImage = "url('"+chosen_pilot.image_path+"')";

let next_upgrade_slot = document.getElementById("next-selection");
next_upgrade_slot.addEventListener("click",function(){
  window.location.href = "./upgrade-type-selection-screen/upgrade-type-selection-screen.html";
})
