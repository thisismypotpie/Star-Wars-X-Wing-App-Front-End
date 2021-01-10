var aft_showing = false;//This is a boolean for large ships if the aft is showing or not, to flip the image when the flip button is pressed.

//Get the chosen ship and game data from the session storage.
let chosen_ship_id = sessionStorage.getItem("chosenShip");//ship_id.
var game_data= JSON.parse(sessionStorage.getItem("game_data"));
var display_pilots = get_pilots_by_id(chosen_ship_id);
let selection_index = 0;//This will be the index that will determine which pilot is chosen.
let whos_turn = sessionStorage.getItem("gc_whos_turn");
var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire.

if(whos_turn == "Rebels")
{
  whos_turn = all_factions[0];
}
else if(whos_turn == "Imperial")
{
  whos_turn = all_factions[1];
}
else
{
  alert("Unkown who's turn it is.")
}

//Set resource quantities.
document.getElementById("curreny-quantity").textContent = whos_turn.currency;
document.getElementById("parts-quantity").textContent = whos_turn.parts;
document.getElementById("electronics-quantity").textContent = whos_turn.electronics;
document.getElementById("fuel-quantity").textContent = whos_turn.fuel;
document.getElementById("tibanna-quantity").textContent = whos_turn.tibanna;
document.getElementById("durasteel-quantity").textContent = whos_turn.durasteel;


//display maneuvers and pilot card
document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
document.getElementById("maneuver-image").style.backgroundImage = "url('"+display_pilots[selection_index].ship_name.card+"')";
update_pilot_image();//Updates the image to see if the pilot is available or not.

//create functionality for the flip button
if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largetwocard")
{
  document.getElementById("flip-button").style.visibility = "visible";
}

function flip_button_click()
{
  if(aft_showing == false)
  {
    document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].aft_card_path+"')";
    aft_showing = true;
  }
  else
  {
    document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
    aft_showing = false;
  }
}

//This function is a cluster of functions that will update the pilot image if that pilot is unique and is already taken. It will be triggered each time a pilot image appears or is changed on this screen.
function update_pilot_image()
{
 var pilot_stats = is_pilot_available();
 if(pilot_stats.pilot_available == false)
 {
   update_image_unavailable(pilot_stats);
 }
 else
 {
   update_image_available();
 }
}


//This function will test to see if any other team has a unique pilot and will return false if the pilot is not available.
function is_pilot_available()
{
  var pilot_stats = {
    pilot_available:true,
    team_that_has_pilot: undefined,
    roster_number: undefined
  };
  var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
  //Automatically return true if there are no established teams.
  if(all_teams == null || all_teams == undefined || all_teams.length == 0)
  {
    return pilot_stats;
  }
  else
  {
    for(const team of all_teams)
    {
      for(const ship of team.ship_list)
      {
        if(ship.chosen_pilot.is_unique == true && 
          ship.chosen_pilot.pilot_name == display_pilots[selection_index].pilot_name &&
          display_pilots[selection_index].is_unique == true)
        {
          pilot_stats.pilot_available = false;
          pilot_stats.team_that_has_pilot = team.team_name;
          pilot_stats.roster_number = ship.roster_number;
           return pilot_stats;
        }
      }
    }
    return pilot_stats;
  }

}

//This will change the image of the pilot to display that the pilot is not available and who has that pilot. Also make select button invisible.
function update_image_unavailable(pilot_details)
{
document.getElementById("select-button").style.visibility = "hidden";
document.getElementById("pilot-image").style.backgroundImage = "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("+ display_pilots[selection_index].image_path+")";

document.getElementById("team_name_assigned").textContent = pilot_details.team_that_has_pilot;
document.getElementById("roster_number_assigned").textContent = "ROSTER NUMBER: "+pilot_details.roster_number;

document.getElementById("unavailable").style.visibility = "visible";
document.getElementById("assigned_to").style.visibility = "visible";
document.getElementById("team_name_assigned").style.visibility = "visible";
document.getElementById("roster_number_assigned").style.visibility = "visible";
}

//This function will update an image if a pilot is available to make sure the unavailable text is not visible. Also make select button visible.
function update_image_available()
{
document.getElementById("select-button").style.visibility = "visible";
document.getElementById("pilot-image").style.opacity = "linear-gradient(rgba(255,255,255,1), rgba(255,255,255,1)), url("+ display_pilots[selection_index].image_path+")";
document.getElementById("unavailable").style.visibility = "hidden";
document.getElementById("assigned_to").style.visibility = "hidden";
document.getElementById("team_name_assigned").style.visibility = "hidden";
document.getElementById("roster_number_assigned").style.visibility = "hidden";

}

function next_button_click()
{
  selection_index ++;
  if(selection_index >= display_pilots.length)
  {
    selection_index = 0;
  }
  document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
  update_pilot_image();//Updates the image to see if the pilot is available or not.
}

function previous_button_click()
{
selection_index --;
if(selection_index < 0)
{
  selection_index = display_pilots.length-1;
}
document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
update_pilot_image();//Updates the image to see if the pilot is available or not.
}

function back_button_click()
{
sessionStorage.removeItem("chosenShip");
window.location.href = "../Ship-Selection/ship-selection.html";
}

function select_button_click()
{
    //Create a new ship in game dependent on the size of the ship to determine what kind of in-game-ship needs to be delcared.
    let team_name = JSON.parse(sessionStorage.getItem("new_team")).team_name;
    if(!display_pilots[selection_index].ship_name.ship_type.toLowerCase().includes("large"))
    {
      sessionStorage.setItem("ship_in_progress",JSON.stringify(new in_game_ship_status(display_pilots[selection_index],team_name)));
    }
    else// if the ship is large, delacre the correct type of large in-game ship.
    {
      if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largeonecard")//large ship one card.
      {
        sessionStorage.setItem("ship_in_progress",JSON.stringify(new large_one_card_in_game_ship_status(display_pilots[selection_index],team_name)));
      }
      else if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largetwocard")//large ship two card.
      {
        sessionStorage.setItem("ship_in_progress",JSON.stringify(new large_two_card_in_game_ship_status(display_pilots[selection_index],team_name)));
      }
      else
      {
        console.log("ERROR: The ship size of the selected ship is not valid.");
      }
    }
    window.location.href = "../Upgrade-Screen/Upgrade-Screen.html";
}

//Get all pilots of a ship based on id and then sort them.
function get_pilots_by_id(id)
{
    var return_pilots = [];
    //Get all of the pilots.
    game_data.all_pilots.forEach(pilot=>{
       if(pilot.ship_name.id == id &&
          pilot.faction == sessionStorage.getItem("gc_whos_turn"))
       {
         return_pilots.push(pilot);
       }
    })

    //Sort all pilots by pilot skill.
    let finished = false;
    let pass = 1;
    while(finished == false)
    {
      console.log("Pilot sorting pass: "+pass);
       //check pass to see if pilots are sorted.
       for(var i=0; i < return_pilots.length-1;i++)
       {
          if(i == (return_pilots.length-2)&& return_pilots[i].pilot_skill <= return_pilots[i+1].pilot_skill)
          {
              finished = true;
              break; 
          }
          if(return_pilots[i].pilot_skill > return_pilots[i+1].pilot_skill)
          {
              break;
          }
       }

       if(finished == false)
       {
          var place_holder = undefined;
          //Index swapping 
          for(var i=0; i< return_pilots.length-1;i++)
          {
            if(return_pilots[i].pilot_skill > return_pilots[i+1].pilot_skill)
            {
               place_holder = return_pilots[i];
               return_pilots[i] = return_pilots[i+1];
               return_pilots[i+1] = place_holder;
            }
          }
       }
       pass++;
    }
    return return_pilots;
}

//Key bindings for this screen.
document.onkeyup = function(e) {
if(e.keyCode == 13)
{
  select_button_click();
}
else if(e.keyCode == 39)
{
  next_button_click();
}
else if(e.keyCode == 37)
{
  previous_button_click();
}
else if(e.keyCode == 27)
{
  back_button_click();
}
}