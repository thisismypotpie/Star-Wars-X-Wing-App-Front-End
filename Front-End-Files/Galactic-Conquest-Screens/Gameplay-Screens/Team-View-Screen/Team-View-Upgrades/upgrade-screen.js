var flipped = false;//keeps track if front or back or large ship is showing.

//Set Galactic Conquest variables
let whos_turn = sessionStorage.getItem("gc_whos_turn");
var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
var chosen_team_indicies = get_team_indecies_based_on_name();

  //Get data objects needed for this page.
  let ship_in_progress = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[parseInt(sessionStorage.getItem("team_ship_index"),10)];
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  var snapshot_ship = JSON.parse(sessionStorage.getItem("ship_snapshot"));

//Set pilot image of chosen pilot.
document.getElementById("pilot-picture").style.backgroundImage = "url('"+ship_in_progress.chosen_pilot.image_path+"')";

set_ship_prices();

//I will be making a loop that will paste all of the upgrades a ship into the next available picture and then set the next empty to next selection.
let grid_items = document.getElementsByClassName("grid-item");
document.getElementById("next-selection").id = "empty";
ship_in_progress.upgrades.forEach(upgrade =>{
   let element = document.getElementById("empty");
   if(upgrade.upgrade.is_dual_sided == true)//If it is a dual upgrade, show the first side of that upgrade.upgrade.
   {
    element.style.backgroundImage = "url('"+upgrade.upgrade.image_path.split("\n")[0]+"')";
    element.style.border = "3px solid red";
   }
   else
   {
    element.style.backgroundImage = "url('"+upgrade.upgrade.image_path+"')";
   }
   //Add orndance tokens if an upgrade has them.
   if(upgrade.ordnance_tokens > 0)
   {
     var ordnance_token_quantity = document.createElement("div");
     ordnance_token_quantity.id = "ordnance-token-quantity"
     ordnance_token_quantity.style.gridRow = "1";
     ordnance_token_quantity.style.gridColumn = "2";
     ordnance_token_quantity.style.backgroundImage = "url('https://i.imgur.com/DztMvcD.png')";
     ordnance_token_quantity.style.backgroundRepeat = "no-repeat";
     ordnance_token_quantity.style.backgroundSize = "100% 100%";
     ordnance_token_quantity.textContent = "X"+upgrade.ordnance_tokens;
     ordnance_token_quantity.style.fontSize = "xx-large";
     ordnance_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
     ordnance_token_quantity.style.textAlign = "right"
     ordnance_token_quantity.style.color = "white";
     element.appendChild(ordnance_token_quantity);
   }
   //Add energy tokens
   if(upgrade.energy_allocated > 0)
   {
    var energy_token_quantity = document.createElement("div");
    energy_token_quantity.style.gridRow = "1";
    energy_token_quantity.style.gridColumn = "2";
    energy_token_quantity.style.backgroundImage = "url('https://i.imgur.com/21ZF1eI.png')";
    energy_token_quantity.style.backgroundRepeat = "no-repeat";
    energy_token_quantity.style.backgroundSize = "100% 100%";
    energy_token_quantity.textContent = "X"+upgrade.energy_allocated;
    energy_token_quantity.style.fontSize = "xx-large";
    energy_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
    energy_token_quantity.style.textAlign = "right"
    energy_token_quantity.style.color = "white";
    element.appendChild(energy_token_quantity);
   }

   element.addEventListener("click",function(){ //When you click each taken upgrade, you will be asked if you want to delete the upgrade.upgrade.
      show_input_pop_up("upgrade-removal-box");
      if(upgrade.upgrade.is_dual_sided == true)//If a dual sided upgrade is being deleted, split path to get only first side of upgrade.upgrade.
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+upgrade.upgrade.image_path.split("\n")[0]+"')";
        document.getElementById("upgrade-photo").style.border = "3px solid red";
        document.getElementById("flip-button").style.visibility = "visible";
      }
      else
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+upgrade.upgrade.image_path+"')";
        document.getElementById("upgrade-photo").style.border = "1px solid white";
      }
      //Checks to see if the upgrade you are bringing up is in the right category to have ordnance tokens.
      if(upgrade.upgrade.type == "Bombs" || upgrade.upgrade.type == "Torpedoes" || upgrade.upgrade.type == "Missiles")
      {
         document.getElementById("ordnance-upgrade-container").style.visibility = "visible";

         //Set the buttons so the correct upgrade stats are displayed and can be altered.
         document.getElementById("token-quantity").textContent = "X"+upgrade.ordnance_tokens;
         document.getElementById("subtract-ordnance-token").onclick =function(){subract_ordnance_token(upgrade)};
         document.getElementById("add-ordnance-token").onclick =function(){add_ordnance_token(upgrade)};

         //Show number of ordnance tokens on each affected upgrades.
         if(upgrade.ordnance_tokens > 0)
         {
           var ordnance_token_quantity = document.createElement("div");
           ordnance_token_quantity.style.gridRow = "1";
           ordnance_token_quantity.style.gridColumn = "2";
           ordnance_token_quantity.style.backgroundImage = "url('https://i.imgur.com/DztMvcD.png')";
           ordnance_token_quantity.style.backgroundRepeat = "no-repeat";
           ordnance_token_quantity.style.backgroundSize = "100% 100%";
           ordnance_token_quantity.textContent = "X"+upgrade.ordnance_tokens;
           ordnance_token_quantity.style.fontSize = "xx-large";
           ordnance_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
           ordnance_token_quantity.style.textAlign = "right"
           ordnance_token_quantity.style.color = "white";
           element.appendChild(ordnance_token_quantity);
         }
      }
      else if(upgrade.upgrade.type == "Hardpoint" || upgrade.upgrade.id == 47)//Ionization reaction also can store energy.
      {
        document.getElementById("energy-allocation-container").style.visibility = "visible";

        //Set the buttons so the correct upgrade stats are displayed and can be altered.
        document.getElementById("energy-quantity").textContent = "X"+upgrade.energy_allocated;
        document.getElementById("subtract-energy-token").onclick =function(){subract_energy_token(upgrade)};
        document.getElementById("add-energy-token").onclick =function(){add_energy_token(upgrade)};

        //Show number of ordnance tokens on each affected upgrades.
        if(upgrade.energy_allocated > 0)
        {
          var energy_token_quantity = document.createElement("div");
          energy_token_quantity.style.gridRow = "1";
          energy_token_quantity.style.gridColumn = "2";
          energy_token_quantity.style.backgroundImage = "url('https://i.imgur.com/21ZF1eI.png')";
          energy_token_quantity.style.backgroundRepeat = "no-repeat";
          energy_token_quantity.style.backgroundSize = "100% 100%";
          energy_token_quantity.textContent = "X"+upgrade.energy_allocated;
          energy_token_quantity.style.fontSize = "xx-large";
          energy_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
          energy_token_quantity.style.textAlign = "right"
          energy_token_quantity.style.color = "white";
          element.appendChild(energy_token_quantity);
        }
      }
      else
      {
         document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
         document.getElementById("energy-allocation-container").style.visibility = "hidden";
      }
      document.getElementById("upgrade-photo").setAttribute('name', upgrade.upgrade.name);//This is so when a user presses yes to delete, we can get the name of the upgrade.upgrade.
   })
   element.id = "taken";
})
if(ship_in_progress.upgrades.length <=12)
{
  document.getElementById("empty").id = "next-selection";
}

let next_upgrade_slot = document.getElementById("next-selection");
//click event for the next selection for upgrade slot with plus button on it.

next_upgrade_slot.addEventListener("click",function(){
  window.location.href = "Upgrade-Type-Selection/upgrade-type.html";
})

function close_remove_upgrade_pop_up()
{
  hide_input_pop_up("upgrade-removal-box");
  document.getElementById("flip-button").style.visibility = "hidden";
  document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
  document.getElementById("energy-allocation-container").style.visibility = "hidden";
  sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
  location.reload();
}


function remove_upgrade()
{
   hide_input_pop_up("upgrade-removal-box");
   document.getElementById("flip-button").style.visibility = "hidden";
   document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
   document.getElementById("energy-allocation-container").style.visibility = "hidden";
   //get the name of the upgrade, remove it from the ship's list of upgrades, then reload the page.
   let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
   for(var i =0; i < ship_in_progress.upgrades.length;i++)
   {
     if(ship_in_progress.upgrades[i].upgrade.name == upgrade_name)
     {
      ship_in_progress.upgrades.splice(i,1);
      break;
     }
   }
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
   window.location.reload();
}


//Check if flip button is visible or not.
if(ship_in_progress.chosen_pilot.ship_name.ship_type == "largeTwoCard")
{
  document.getElementById('main-flip-button').style.visibility = "visible";
}

function flip_button_click()
{
    let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
    for(var i =0; i < ship_in_progress.upgrades.length;i++)
    {
      if(ship_in_progress.upgrades[i].upgrade.name == upgrade_name)
      {
        if(ship_in_progress.upgrades[i].orientation == "front")
        {
          ship_in_progress.upgrades[i].orientation = "back";
          document.getElementById("upgrade-photo").style.backgroundImage = "url('"+ship_in_progress.upgrades[i].upgrade.image_path.split("\n")[1]+"')";

        }
        else
        {
          ship_in_progress.upgrades[i].orientation = "front";
          document.getElementById("upgrade-photo").style.backgroundImage = "url('"+ship_in_progress.upgrades[i].upgrade.image_path.split("\n")[0]+"')";
        }
        break;
      }
    }
}

function flip_ship(){
  if(flipped == false)
  {
    document.getElementById('pilot-picture').style.backgroundImage = "url('"+ship_in_progress.chosen_pilot.aft_card_path+"')";
    flipped = true;
  }
  else
  {
    document.getElementById('pilot-picture').style.backgroundImage = "url('"+ship_in_progress.chosen_pilot.image_path+"')";
    flipped = false;
  }
}


function back_button_push()
{
  //Replace newer ship with snapshot to remove all new upgrades.
  all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[parseInt(sessionStorage.getItem("team_ship_index"),10)] = snapshot_ship;
  sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
  sessionStorage.removeItem("ship_snapshot");
  sessionStorage.removeItem("team_ship_index");
  window.location.href = "../team-view.html";
}

function hide_input_pop_up(name)
{
  let overlay = document.getElementById("overlay");
  let screen = document.getElementById(name);
  overlay.style.opacity = 0;
  screen.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
}

function show_input_pop_up(name)
{
  let overlay = document.getElementById("overlay");
  let screen = document.getElementById(name);
  overlay.style.opacity = 1;
  screen.style.visibility = "visible";
  overlay.style.pointerEvents = "all";
}


function done_button_click()
{
    var faction_index = undefined;
    if(whos_turn == "Rebels")
    {
       faction_index = 0;
    }
    else if(whos_turn == "Imperial")
    {
      faction_index = 1;
    }
    else
    {
      alert("ERROR: Unable to find who's turn it is.");
    }

      //pay for the new ship.
      //all_factions[faction_index].currency -= Calculate_cost_of_ship(ship_in_progress)-Calculate_cost_of_ship(snapshot_ship);
      all_factions[faction_index].currency -= parseInt( document.getElementById("alternate-cost-curreny-quantity").textContent.split("/")[0],10);
      sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
      
      //remove all items that are no longer being used.
      sessionStorage.removeItem("ship_in_progress");
      sessionStorage.removeItem("ship_snapshot");
      window.location.href = "../team-view.html";//back to team view.

      var dual_card_back_showing = false; //This is used for if the flip button shows up, if false showing front, if true, showing back
}

function close_button_push()//close the roster number pop-up.
{
  hide_input_pop_up("roster-number-box");
  document.getElementById("roster-number-input").value = "";
}

function subract_ordnance_token(upgrade)
{
  if(upgrade.ordnance_tokens > 0)
  {
    upgrade.ordnance_tokens--;

  }
  else
  {
    upgrade.ordnance_tokens = 0;
  }
  document.getElementById("token-quantity").textContent = "X"+upgrade.ordnance_tokens;
}

function add_ordnance_token(upgrade)
{
    upgrade.ordnance_tokens++;
    document.getElementById("token-quantity").textContent = "X"+upgrade.ordnance_tokens;
}

function add_energy_token(upgrade)
{
  upgrade.energy_allocated++;
  document.getElementById("energy-quantity").textContent = "X"+upgrade.energy_allocated;

}

function subract_energy_token(upgrade)
{
  if(upgrade.energy_allocated > 0)
  {
    upgrade.energy_allocated--;

  }
  else
  {
    upgrade.energy_allocated = 0;
  }
  document.getElementById("energy-quantity").textContent = "X"+upgrade.energy_allocated;
}

function set_ship_prices()
{
  var faction_turn = undefined
  if(whos_turn == "Rebels")
  {
    faction_turn = all_factions[0];
  }
  else if(whos_turn == "Imperial")
  {
    faction_turn = all_factions[1];
  }
  else
  {
    alert("ERROR: Cannot determine who's turn it is.")
  }
      let cost = (Calculate_cost_of_ship(ship_in_progress)-Calculate_cost_of_ship(snapshot_ship));
      document.getElementById("alternate-cost-curreny-quantity").textContent =cost+"/"+faction_turn.currency;
      if(cost < 0)//make sure user only gets half the price of upgrades they remove.
      {
        document.getElementById("alternate-cost-curreny-quantity").textContent =Math.floor(cost/2)+"/"+faction_turn.currency;
      }
}


//Key bindings
document.onkeyup = function(e) {
if(document.getElementById("roster-number-box").style.visibility == "visible")
{ 
  if(e.keyCode == 13)//enter
  {
    ok_button_push();
  }
  else if(e.keyCode == 27)//escape key
  {
    close_button_push();
  } 
}
else
{
  if(e.keyCode == 13)//enter
  {
    done_button_push();
  }
  else if(e.keyCode == 27)//escape key
  {
    back_button_push();
  }
}
}

