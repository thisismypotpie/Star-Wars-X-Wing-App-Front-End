
/**
 * Section for setting up global variables and form elements.
 */
let chosen_ship = JSON.parse(sessionStorage.getItem("Chosen_Team_Ship"));
let game_data= JSON.parse(sessionStorage.getItem("game_data"));
console.log(chosen_ship);
document.getElementById("pilot-picture").style.backgroundImage = "url('"+chosen_ship.chosen_pilot.image_path+"')";
set_upgrade_images();//Need to set upgrade images before accessing id's associated with that function so in order to keep this document clear, I made a function that will do all of that up here.
/**
 * End Section for setting up global variables and form elements.
 */



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
document.getElementById("no-button").addEventListener("click",function(){
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
})
//If you press the yes button when asked if you want to delete an upgrade.
document.getElementById("yes-button").addEventListener("click",function(){
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
  //get the name of the upgrade, remove it from the ship's list of upgrades, then reload the page.
  let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
  for(var i =0; i < chosen_ship.upgrades.length;i++)
  {
    if(chosen_ship.upgrades[i].name == upgrade_name)
    {
      console.log("Removing");
     chosen_ship.upgrades.splice(i,1);
    }
  }
    sessionStorage.setItem("Chosen_Team_Ship",JSON.stringify(chosen_ship));
window.location.reload();
})
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
   if(upgrade.characteristics != null && upgrade.characteristics.includes("Dual"))//If it is a dual upgrade, show the first side of that upgrade.
   {
    element.style.backgroundImage = "url('"+upgrade.image_path.split("\n")[0]+"')";
    element.style.border = "3px solid red";
   }
   else
   {
    element.style.backgroundImage = "url('"+upgrade.image_path+"')";
   }
   element.addEventListener("click",function(){ //When you click each taken upgrade, you will be asked if you want to delete the upgrade.
      let overlay = document.getElementById("overlay");
      let upgrade_removal_box = document.getElementById("upgrade-removal-box");
      overlay.style.opacity = 1;
      upgrade_removal_box.style.visibility = "visible";
      overlay.style.pointerEvents = "all";
      if(upgrade.characteristics != null && upgrade.characteristics.includes("Dual"))//If a dual sided upgrade is being deleted, split path to get only first side of upgrade.
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+upgrade.image_path.split("\n")[0]+"')";
        document.getElementById("upgrade-photo").style.border = "3px solid red";
      }
      else
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+upgrade.image_path+"')";
      }
      document.getElementById("upgrade-photo").setAttribute('name', upgrade.name);//This is so when a user presses yes to delete, we can get the name of the upgrade.
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










