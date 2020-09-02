var flipped = false;//keeps track if front or back or large ship is showing.


  //Get data objects needed for this page.
  let ship_in_progress = JSON.parse(sessionStorage.getItem("ship_in_progress"));
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  var dual_card_back_showing = false; //This is used for if the flip button shows up, if false showing front, if true, showing back
  console.log(ship_in_progress);
//Set pilot image of chosen pilot.
document.getElementById("pilot-picture").style.backgroundImage = "url('"+ship_in_progress.chosen_pilot.image_path+"')";


//I will be making a loop that will paste all of the upgrades a ship into the next available picture and then set the next empty to next selection.
let grid_items = document.getElementsByClassName("grid-item");
document.getElementById("next-selection").id = "empty";
ship_in_progress.upgrades.forEach(upgrade =>{
   let element = document.getElementById("empty");
   if(upgrade.is_dual_sided == true)//If it is a dual upgrade, show the first side of that upgrade.
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
      if(upgrade.is_dual_sided == true)//If a dual sided upgrade is being deleted, split path to get only first side of upgrade.
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+upgrade.image_path.split("\n")[0]+"')";
        document.getElementById("upgrade-photo").style.border = "3px solid red";
        document.getElementById("flip-button").style.visibility = "visible";
      }
      else
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+upgrade.image_path+"')";
        document.getElementById("upgrade-photo").style.border = "1px solid white";
      }
      document.getElementById("upgrade-photo").setAttribute('name', upgrade.name);//This is so when a user presses yes to delete, we can get the name of the upgrade.
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
document.getElementById("no-button").addEventListener("click",function(){
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
  document.getElementById("flip-button").style.visibility = "hidden";
})
//If you press the yes button when asked if you want to delete an upgrade.
document.getElementById("yes-button").addEventListener("click",function(){
  let overlay = document.getElementById("overlay");
  let upgrade_removal_box = document.getElementById("upgrade-removal-box");
  overlay.style.opacity = 0;
  upgrade_removal_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
  document.getElementById("flip-button").style.visibility = "hidden";
  //get the name of the upgrade, remove it from the ship's list of upgrades, then reload the page.
  let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
  for(var i =0; i < ship_in_progress.upgrades.length;i++)
  {
    if(ship_in_progress.upgrades[i].name == upgrade_name)
    {
     ship_in_progress.upgrades.splice(i,1);
     break;
    }
  }
    sessionStorage.setItem("ship_in_progress",JSON.stringify(ship_in_progress));
window.location.reload();
})
//Check if flip button is visible or not.
if(ship_in_progress.chosen_pilot.ship_name.ship_type == "largeTwoCard")
{
  document.getElementById('main-flip-button').style.visibility = "visible";
}

function flip_button_click()
{
  if(dual_card_back_showing == false)
  {
    let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
    for(var i =0; i < ship_in_progress.upgrades.length;i++)
    {
      if(ship_in_progress.upgrades[i].name == upgrade_name)
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+ship_in_progress.upgrades[i].image_path.split("\n")[1]+"')";
        dual_card_back_showing = true;
       break;
      }
    }
  }
  else
  {
    let upgrade_name = document.getElementById("upgrade-photo").getAttribute("name");
    for(var i =0; i < ship_in_progress.upgrades.length;i++)
    {
      if(ship_in_progress.upgrades[i].name == upgrade_name)
      {
        document.getElementById("upgrade-photo").style.backgroundImage = "url('"+ship_in_progress.upgrades[i].image_path.split("\n")[0]+"')";
        dual_card_back_showing = false;
       break;
      }
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
  sessionStorage.removeItem("ship_in_progress");
  window.location.href = "../Pilot-Screen/Pilot-Screen.html";
}

function done_button_push()
{
  let overlay = document.getElementById("overlay");
  let roster_number_box = document.getElementById("roster-number-box");
  overlay.style.opacity = 1;
  roster_number_box.style.visibility = "visible";
  overlay.style.pointerEvents = "all";
  document.getElementById("roster-number-input").focus();
}

function ok_button_push()
{
    //Add roster number to ship and add new team to all teams.
      //Validate input and then add roster number to ship in progress.
      if(!/^[0-9]+$/.test(document.getElementById("roster-number-input").value))
      {
         alert("Please only input positive numbers. No other input will be accepted.");
         document.getElementById("roster-number-input").value = "";
         return;
      }
      else
      {
         ship_in_progress.roster_number = parseInt(document.getElementById("roster-number-input").value,10);
      }
      // Add ship to the new team, then add the new team to all teams.
      let new_team = JSON.parse(sessionStorage.getItem("new_team"));
      new_team.ship_list.push(ship_in_progress);
      let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
      all_teams.push(new_team);
      console.log(all_teams);
      sessionStorage.setItem("all_teams", JSON.stringify(all_teams));

      //remove all items that are no longer being used.
      sessionStorage.removeItem("chosenShip");
      sessionStorage.removeItem("new_team");
      sessionStorage.removeItem("ship_in_progress");
      window.location.href = "../Team-Screen/Team-Screen.html";

      var dual_card_back_showing = false; //This is used for if the flip button shows up, if false showing front, if true, showing back
}

function close_button_push()//close the roster number pop-up.
{
  let overlay = document.getElementById("overlay");
  let roster_number_box = document.getElementById("roster-number-box");
  document.getElementById("roster-number-input").value = "";
  overlay.style.opacity = 0;
  roster_number_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";

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

