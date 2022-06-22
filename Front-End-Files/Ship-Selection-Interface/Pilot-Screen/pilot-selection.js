/**
 Ship Selection Interface
 This file will act as an interface when any of the following scenarios are triggered.
 1. Adding a new team to freeplay.---------------------------------------------------------------------<- Done.
 2. Adding a ship to an existing team in freeplay.-----------------------------------------------------<- Done.
 3. Adding a new team to GC.---------------------------------------------------------------------------<- In Progress .........
 4. Adding a ship to an existing team in GC.-----------------------------------------------------------<- Not Started
 5. Adding a ship to an existing team while in game for freeplay.--------------------------------------<- Done.
 6. Adding a s hip to an existing team while in game for GC.-------------------------------------------<- Will add after pipeline Complete.
 7. Adding upgrades to ship of an existing team in freeplay.(upgrade screens only).--------------------<- Not Started (Not Relevent)
 8. Adding upgrades to ship of an existing team in GC.(upgrade screens only).--------------------------<- Not Started (Not Relevent)
 9. Adding upgrades to ship of an existing team while in game for freeplay. (upgrade screens only).----<- Not Started (Not Relevent)
10. Adding upgrades to ship of an existing team while in game for GC. (upgrade screens only).----------<- Not STarted (Not Relevent)
 */


/**
 This section will be for universal variables that are used no matter which path is being invoked.
 */

 //Freeplay-only variables.
let chosen_ship = undefined;

//GC-only variables.
let chosen_ship_id = undefined;
let whos_turn = undefined;
var team_name = undefined;

//Pre-Defined Global Variables.
var display_pilots = undefined;

if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team" ||
   sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team" ||
   sessionStorage.getItem("Ship-Page-Path") =="Freeplay-In Game")
{
  chosen_ship = sessionStorage.getItem("chosenShip").split(',');//[ship id, faction].
  display_pilots = get_pilots_by_id(chosen_ship);
}
else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
        sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
{
  chosen_ship_id = sessionStorage.getItem("chosenShip");//ship_id.
  whos_turn = sessionStorage.getItem("gc_whos_turn");
  display_pilots = get_pilots_by_id(chosen_ship_id);//This is an experimental variables brought over from GC.
}
else
{
  alert("ERROR: Unable to determine ship selection pipeline path.");
}


//Globals Variables used by both paths.
var aft_showing = false;//This is a boolean for large ships if the aft is showing or not, to flip the image when the flip button is pressed.
var game_data= JSON.parse(sessionStorage.getItem("game_data"));
let selection_index = 0;//This will be the index that will determine which pilot is chosen.
//var display_pilots = sort_pilots_for_viewing(chosen_ship[0],chosen_ship[1]); //Removing this, as it is the old way of getting pilots, will restore if GC method of pilot gettng is not universal.

/**
 This section will be for the use of functions utilized by one or more of any of the interface paths.
 */

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
  var all_teams = undefined; 

  if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team" ||
     sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team" ||
     sessionStorage.getItem("Ship-Page-Path") =="Freeplay-In Game")
  {
    all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
  }
  else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
          sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
  {
    all_teams = whos_turn.navy.map(function(group){return group.team});
  }
  else
  {
    alert("ERROR: Cannot determine pipeline path.");
  }

  //Automatically return true if there are no established teams.
  if(all_factions == null || all_factions == undefined || all_teams.length == 0)
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
    if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
    sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
    {
      //Check if pilot is dead.
      for(var i=0; i < whos_turn.list_of_the_fallen.length;i++)
      {
         if(display_pilots[selection_index].pilot_name == whos_turn.list_of_the_fallen[i])
        {
          pilot_stats.pilot_available = false;
          pilot_stats.team_that_has_pilot = "dead";
          break;
        }
      }
    }
    return pilot_stats;
  }

}

//This will change the image of the pilot to display that the pilot is not available and who has that pilot. Also make select button invisible.
function update_image_unavailable(pilot_details)
{
  if((sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
      sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team") &&
      pilot_details.team_that_has_pilot == "dead")
{
  document.getElementById("select-button").style.visibility = "hidden";
  document.getElementById("pilot-image").style.backgroundImage = "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("+ display_pilots[selection_index].image_path+")";
  document.getElementById("assigned_to").textContent = "This pilot is KIA/MIA.";
  document.getElementById("team_name_assigned").textContent = "";
  document.getElementById("roster_number_assigned").textContent = "";
  
  document.getElementById("unavailable").style.visibility = "visible";
  document.getElementById("assigned_to").style.visibility = "visible";
  document.getElementById("team_name_assigned").style.visibility = "visible";
  document.getElementById("roster_number_assigned").style.visibility = "visible";
}
else
{
  document.getElementById("select-button").style.visibility = "hidden";
  document.getElementById("pilot-image").style.backgroundImage = "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("+ display_pilots[selection_index].image_path+")";
  
  document.getElementById("assigned_to").textContent = "assigned to";
  document.getElementById("team_name_assigned").textContent = pilot_details.team_that_has_pilot;
  document.getElementById("roster_number_assigned").textContent = "ROSTER NUMBER: "+pilot_details.roster_number;
  
  document.getElementById("unavailable").style.visibility = "visible";
  document.getElementById("assigned_to").style.visibility = "visible";
  document.getElementById("team_name_assigned").style.visibility = "visible";
  document.getElementById("roster_number_assigned").style.visibility = "visible";
}
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
  if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
     sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
  {
    set_ship_prices();
  }
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
if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
   sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
{
  set_ship_prices();
}
}

function back_button_click()
{
sessionStorage.removeItem("chosenShip");

if(sessionStorage.getItem("new_team_name"))
{
  sessionStorage.removeItem("new_team_name");
}
if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
  sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
{
  remove_newly_created_team_name(team_name,whos_turn.faction=="Rebels"? 0:1);
  window.location.href = "../Selection-Screen/GC-Selection-Screen/Ship-selection-GC.html";
}
else if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team" ||
sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team" ||
sessionStorage.getItem("Ship-Page-Path") =="Freeplay-In Game")
{
  window.location.href = "../Selection-Screen/Selection-Screen.html";
}
else
{
  alert("ERROR: Could not determine which path to take to go back to the ship selection screen.");
}
}

function select_button_click()
{

    //Create a new ship in game dependent on the size of the ship to determine what kind of in-game-ship needs to be delcared.
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
    window.location.href = "../Upgrade-Screens/main-upgrade-screen.html";
    
}

//Get all pilots of a ship based on id and then sort them.
function get_pilots_by_id(id)
{
    var return_pilots = [];

    if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team" ||
       sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team" ||
       sessionStorage.getItem("Ship-Page-Path") =="Freeplay-In Game")
    {
      //Get all of the pilots.
      game_data.all_pilots.forEach(pilot=>{
        if(pilot.ship_name.id == parseInt(id[0]) &&
           pilot.faction.toLowerCase() == id[1].toLowerCase())
        {
          return_pilots.push(pilot);
        }
      })
    }
    else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team" ||
            sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
    {
      //Get all of the pilots.
      game_data.all_pilots.forEach(pilot=>{
        if(pilot.ship_name.id == id &&
           pilot.faction == sessionStorage.getItem("gc_whos_turn"))
        {
          return_pilots.push(pilot);
        }
      })
    }
    else
    {
      return;
    }


    //Sort all pilots by pilot skill.
    let finished = false;
    let pass = 1;
    while(finished == false && return_pilots.length > 1)
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

function set_ship_prices()
{
  //Set resource quantities.
  document.getElementById("curreny-quantity").textContent = whos_turn.currency;
  document.getElementById("parts-quantity").textContent = whos_turn.parts;
  document.getElementById("electronics-quantity").textContent = whos_turn.electronics;
  document.getElementById("fuel-quantity").textContent = whos_turn.fuel;
  document.getElementById("tibanna-quantity").textContent = whos_turn.tibanna;
  document.getElementById("durasteel-quantity").textContent = whos_turn.durasteel;
  //Set cost of ship.
  if(display_pilots[selection_index].ship_name.ship_type == "largeTwoCard")
  {
      document.getElementById("cost-fuel-quantity").textContent = "4";

      document.getElementById("cost-curreny-quantity").textContent = Math.ceil(display_pilots[selection_index].cost/5);
      document.getElementById("cost-parts-quantity").textContent = display_pilots[selection_index].ship_name.agility + display_pilots[selection_index].ship_name.aft_agility + display_pilots[selection_index].ship_name.energy;
      document.getElementById("cost-electronics-quantity").textContent = display_pilots[selection_index].ship_name.shields + display_pilots[selection_index].ship_name.aft_shields;
      document.getElementById("cost-tibanna-quantity").textContent = display_pilots[selection_index].ship_name.attack;
      document.getElementById("cost-durasteel-quantity").textContent = display_pilots[selection_index].ship_name.hull + display_pilots[selection_index].ship_name.aft_hull;
      document.getElementById("alternate-cost-curreny-quantity").textContent = display_pilots[selection_index].cost;
  }
  else
  {
      document.getElementById("cost-curreny-quantity").textContent = Math.ceil(display_pilots[selection_index].cost/5);
      document.getElementById("cost-parts-quantity").textContent = display_pilots[selection_index].ship_name.agility;
      document.getElementById("cost-electronics-quantity").textContent = display_pilots[selection_index].ship_name.shields;
      document.getElementById("cost-tibanna-quantity").textContent = display_pilots[selection_index].ship_name.attack;
      document.getElementById("cost-durasteel-quantity").textContent = display_pilots[selection_index].ship_name.hull;
      document.getElementById("alternate-cost-curreny-quantity").textContent = display_pilots[selection_index].cost;

      if(display_pilots[selection_index].ship_name.ship_type == "small")
    {
      document.getElementById("cost-fuel-quantity").textContent = "1";
    }
    else if(display_pilots[selection_index].ship_name.ship_type == "medium")
    {
      document.getElementById("cost-fuel-quantity").textContent = "2";
    }
    else if(display_pilots[selection_index].ship_name.ship_type == "largeOneCard")
    {
      document.getElementById("cost-fuel-quantity").textContent = "3";
      document.getElementById("cost-parts-quantity").textContent = display_pilots[selection_index].ship_name.agility+display_pilots[selection_index].ship_name.energy;
    }
    else
    {
      alert("Unknown Ship Size!");
    }
  }
}



/**
 This section will be for each instance that uses the upgrade screen and configure it according to which page is using it.
 */

 if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team" ||
    sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team"||
    sessionStorage.getItem("Ship-Page-Path") =="Freeplay-In Game")
 {
  //display maneuvers and pilot card
  document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
  document.getElementById("maneuver-image").style.backgroundImage = "url('"+display_pilots[selection_index].ship_name.card+"')";
  update_pilot_image();//Updates the image to see if the pilot is available or not.
 }
 else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team")
 {
  if(sessionStorage.getItem("new_team_name")== null)
  {
    team_name = create_GC_team_name(display_pilots[selection_index].ship_name,whos_turn=="Rebels"? 0:1);//Create a team named based on what ship was chosen.
    sessionStorage.setItem("new_team_name",team_name);
  }
  else
  {
    team_name = sessionStorage.getItem("new_team_name");
  }
  var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
  
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
  set_ship_prices();
  //display maneuvers and pilot card
  document.getElementById("pilot-image").style.backgroundImage = "url('"+display_pilots[selection_index].image_path+"')";
  document.getElementById("maneuver-image").style.backgroundImage = "url('"+display_pilots[selection_index].ship_name.card+"')";
  update_pilot_image();//Updates the image to see if the pilot is available or not.
  
  //create functionality for the flip button
  if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largetwocard")
  {
    document.getElementById("flip-button").style.visibility = "visible";
  }
 }
 else if(sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
 {

 }
 else //An error in case we cannot identify which path is being used.
 {
 
 }
//create functionality for the flip button
if(display_pilots[selection_index].ship_name.ship_type.toLowerCase() == "largetwocard")
{
  document.getElementById("flip-button").style.visibility = "visible";
}


  /**
  This section is for key bindings for this page.
  */
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