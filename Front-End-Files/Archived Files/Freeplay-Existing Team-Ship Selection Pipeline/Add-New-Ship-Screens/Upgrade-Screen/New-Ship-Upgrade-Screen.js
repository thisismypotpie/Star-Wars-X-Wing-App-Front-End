var flipped = false;//check flip button orientation.

//Back to previous form.
document.getElementById("back-button").addEventListener("click", function(){
    sessionStorage.removeItem("ship_in_progress");
    window.location.href = "../Pilot-Screen/New-Ship-Pilot-Screen.html";
  });
  //Make roster number form show up.
  document.getElementById("done-button").addEventListener("click", function(){
    let overlay = document.getElementById("overlay");
    let roster_number_box = document.getElementById("roster-number-box");
    overlay.style.opacity = 1;
    roster_number_box.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    document.getElementById("roster-number-input").focus();
  });
  //Add roster number to ship and add new team to all teams.
  document.getElementById("ok-button").addEventListener("click", function(){
       //Validate input and then add roster number to ship in progress.
       if(!/^[0-9]+$/.test(document.getElementById("roster-number-input").value))
       {
          alert("Please only input positive numbers. No other input will be accepted.");
          document.getElementById("roster-number-input").value = "";
          return;
       }
       //Validate that the roster number is not already taken.
       else if(is_roster_number_taken(parseInt(document.getElementById("roster-number-input").value,10)) == true)
       {
          alert("That number is already taken, please enter a roster number that is not taken on your team.");
          document.getElementById("roster-number-input").value = "";
          document.getElementById("roster-number-input").focus();
          return;
       }
       else
       {
          ship_in_progress.roster_number = parseInt(document.getElementById("roster-number-input").value,10);
       }
       let team_name = sessionStorage.getItem("chosen_team_name");
       let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
       //Find the correct team and push the new ship to that team, then save all teams into sessionstorage.
       var pushed = false;//This is here to ensure that even if there are somehow two teams with the same name, the ship in only pushed once.
       all_teams.forEach(team => {
         if(team_name == team.team_name && pushed == false)
         {
              team.ship_list.push(ship_in_progress);
              pushed = true;
         }
       })
       sessionStorage.setItem("all_teams", JSON.stringify(all_teams));

       //remove all items that are no longer being used.
       sessionStorage.removeItem("chosenShip");
       sessionStorage.removeItem("chosen_team_name");
       sessionStorage.removeItem("ship_in_progress");
       window.location.href = "../../Team-Screen/Team-Screen.html";

  });
//close the roster number pop up.
function close_button_push()
{
  let overlay = document.getElementById("overlay");
  let roster_number_box = document.getElementById("roster-number-box");
  document.getElementById("roster-number-input").value = "";
  overlay.style.opacity = 0;
  roster_number_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
}


  //Get data objects needed for this page.
  let ship_in_progress = JSON.parse(sessionStorage.getItem("ship_in_progress"));
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  console.log(ship_in_progress);
//Set pilot image of chosen pilot.
document.getElementById("pilot-picture").style.backgroundImage = "url('"+ship_in_progress.chosen_pilot.image_path+"')";
//Check if flip button is visible or not.
if(ship_in_progress.chosen_pilot.ship_name.ship_type == "largeTwoCard")
{
  document.getElementById('main-flip-button').style.visibility = "visible";
}


//I will be making a loop that will paste all of the upgrades a ship into the next available picture and then set the next empty to next selection.
let grid_items = document.getElementsByClassName("grid-item");
document.getElementById("next-selection").id = "empty";
ship_in_progress.upgrades.forEach(upgrade =>{
   let element = document.getElementById("empty");
   if(upgrade.upgrade.is_dual_sided == true)//If it is a dual upgrade, show the first side of that upgrade.
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

   element.addEventListener("click",function(){ //When you click each taken upgrade, you will be asked if you want to delete the upgrade.
      let overlay = document.getElementById("overlay");
      let upgrade_removal_box = document.getElementById("upgrade-removal-box");
      overlay.style.opacity = 1;
      upgrade_removal_box.style.visibility = "visible";
      overlay.style.pointerEvents = "all";
      if(upgrade.upgrade.is_dual_sided == true)//If a dual sided upgrade is being deleted, split path to get only first side of upgrade.
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

      document.getElementById("upgrade-photo").setAttribute('name', upgrade.upgrade.name);//This is so when a user presses yes to delete, we can get the name of the upgrade.
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
  window.location.href = "./Upgrade-Type-Selection-Screen/upgrade-type-selection-screen.html";
})


//If you press the no button when asked if you want to delete an upgrade.
function close_remove_upgrade_pop_up()
{
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
  document.getElementById("flip-button").style.visibility = "hidden";
  document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
  document.getElementById("energy-allocation-container").style.visibility = "hidden";
  sessionStorage.setItem("ship_in_progress",JSON.stringify(ship_in_progress));
  location.reload();
}

function remove_upgrade()
{
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  document.getElementById("flip-button").style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
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
    sessionStorage.setItem("ship_in_progress",JSON.stringify(ship_in_progress));
    document.getElementById("energy-allocation-container").style.visibility = "hidden";
    document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
    window.location.reload();
}


//Check validation of current team to see if a roster number is already taken
function is_roster_number_taken(input_number)
{
      var found_roster = false;
      //All teams and chosen team name were undefined within this function so I am grabbing it again.
      var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
      let team_name = sessionStorage.getItem("chosen_team_name");

  all_teams.forEach(team =>{
    if(team.team_name == team_name)
    {
      team.ship_list.forEach(ship => {
        if(ship.roster_number == input_number)
        {
          found_roster = true;
        }
      })
    }
  })
  return found_roster;
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
          document.getElementById("upgrade-photo").style.backgroundImage = "url('"+ship_in_progress.upgrades[i].upgrade.image_path.split("\n")[1]+"')";
          ship_in_progress.upgrades[i].orientation = "back";
        }
        else
        {
          document.getElementById("upgrade-photo").style.backgroundImage = "url('"+ship_in_progress.upgrades[i].upgrade.image_path.split("\n")[0]+"')";
          ship_in_progress.upgrades[i].orientation = "front"
        }
       break;
      }
    }
}


//Flips the ship in the pilot picture.
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
