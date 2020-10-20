var flipped = false;//keep track of flip button orientation.
/**
 * Section for setting up global variables and form elements.
 */
var dual_card_back_showing = false; //This is used for if the flip button shows up, if false showing front, if true, showing back
let chosen_ship = JSON.parse(sessionStorage.getItem("Chosen_Team_Ship"));
let game_data= JSON.parse(sessionStorage.getItem("game_data"));
console.log(chosen_ship);
document.getElementById("pilot-picture").style.backgroundImage = "url('"+chosen_ship.chosen_pilot.image_path+"')";
set_upgrade_images();//Need to set upgrade images before accessing id's associated with that function so in order to keep this document clear, I made a function that will do all of that up here.
/**
 * End Section for setting up global variables and form elements.
 */
//Check if flip button is visible or not.
if(chosen_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
{
  document.getElementById('main-flip-button').style.visibility = "visible";
}


 /**
  * Section or Button Functions
  */
//Back to previous form.
function back_button_click()
{
    sessionStorage.removeItem("Chosen_Team_Ship");
    window.location.href = "../View-Team-Screen/View-Team.html";
}
//Get all teams, get the team the ship is on, get the ship of that team, replace it with this updated ship.
function done_button_click()
{
   let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
   let team_name = chosen_ship.team_name;
   var chosen_team = undefined;
   all_teams.forEach(team=>{
      if(team.team_name == team_name)
      {
        chosen_team = team;
      }
   })
   //I'll need to use a traditional for loop here to get the index of the ship I need to replace.
   for(var i=0; i< chosen_team.ship_list.length;i++)
   {
      if(chosen_team.ship_list[i].roster_number == chosen_ship.roster_number)
      {
        console.log("removing");
        chosen_team.ship_list[i] = chosen_ship;
      }
   }
   //Now that the ship has been changed, I need to replace the team wtih the updated one using a traditional forloop.
   for(var i=0;i<all_teams.length;i++)
   {
      if(all_teams[i].team_name == chosen_team.team_name)
      {
        all_teams[i] == chosen_team;
      }
   }
   sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
   window.location.href = "../View-Team-Screen/View-Team.html";
}

//If you press the no button when asked if you want to delete an upgrade.
function close_remove_upgrade_pop_up()
{
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  document.getElementById("flip-button").style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
  document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
  sessionStorage.setItem("Chosen_Team_Ship",JSON.stringify(chosen_ship));
  location.reload();
}

//If you press the yes button when asked if you want to delete an upgrade.
function remove_upgrade()
{
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
  document.getElementById("flip-button").style.visibility = "hidden";
  //get the name of the upgrade, remove it from the ship's list of upgrades, then reload the page.
  let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
  for(var i =0; i < chosen_ship.upgrades.length;i++)
  {
    if(chosen_ship.upgrades[i].upgrade.name == upgrade_name)
    {
      console.log("Removing");
     chosen_ship.upgrades.splice(i,1);
     break;
    }
  }
    sessionStorage.setItem("Chosen_Team_Ship",JSON.stringify(chosen_ship));
window.location.reload();
}

//Chosen_Team_Ship
/**
 * End Section for Button Functions
 */


/**
 * Section for Setting Upgrade Images
 */
function set_upgrade_images()
{
//I will be making a loop that will paste all of the upgrades a ship into the next available picture and then set the next empty to next selection.
let grid_items = document.getElementsByClassName("grid-item");
document.getElementById("next-selection").id = "empty";
chosen_ship.upgrades.forEach(upgrade =>{
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
     if(document.getElementById("ordnance-token-quantity") != null)
     {
       document.getElementById("ordnance-token-quantity");
     }
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
          if(document.getElementById("ordnance-token-quantity") != null)
          {
            document.getElementById("ordnance-token-quantity");
          }
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
      else
      {
         document.getElementById("ordnance-upgrade-container").style.visibility = "hidden";
      }

      document.getElementById("upgrade-photo").setAttribute('name', upgrade.upgrade.name);//This is so when a user presses yes to delete, we can get the name of the upgrade.
   })
   element.id = "taken";
})
if(chosen_ship.upgrades.length <=12)
{
  document.getElementById("empty").id = "next-selection";
}

let next_upgrade_slot = document.getElementById("next-selection");
next_upgrade_slot.addEventListener("click",function(){
  window.location.href = "./View-Team-Upgrade-Type-Selection-Screen/View-Team-upgrade-type-selection-screen.html";
})
}
 /**
  * End Section for Setting Upgrade Images
  */


 function flip_button_click()
 {
    let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
    for(var i =0; i < chosen_ship.upgrades.length;i++)
    {
      if(chosen_ship.upgrades[i].upgrade.name == upgrade_name)
      {
        if(chosen_ship.upgrades[i].upgrade.orientation == "front")
        {
          chosen_ship.upgrades[i].upgrade.orientation = "back";
          document.getElementById("upgrade-photo").style.backgroundImage = "url('"+chosen_ship.upgrades[i].upgrade.image_path.split("\n")[1]+"')";
        }
        else
        {
          chosen_ship.upgrades[i].upgrade.orientation = "front";
          document.getElementById("upgrade-photo").style.backgroundImage = "url('"+chosen_ship.upgrades[i].upgrade.image_path.split("\n")[0]+"')";
        }
        break;
      }
    }
  }

 function flip_ship(){
  if(flipped == false)
  {
    document.getElementById('pilot-picture').style.backgroundImage = "url('"+chosen_ship.chosen_pilot.aft_card_path+"')";
    flipped = true;
  }
  else
  {
    document.getElementById('pilot-picture').style.backgroundImage = "url('"+chosen_ship.chosen_pilot.image_path+"')";
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








