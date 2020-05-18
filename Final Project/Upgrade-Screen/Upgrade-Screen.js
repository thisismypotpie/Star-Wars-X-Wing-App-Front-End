//Back to previous form.
document.getElementById("back-button").addEventListener("click", function(){
    sessionStorage.removeItem("ship_in_progress");
    window.location.href = "../Pilot-Screen/Pilot-Screen.html";
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
       sessionStorage.removeItem("chosenShip");
       window.location.href = "../Team-Screen/Team-Screen.html";

  });
//close the roster number pop up.
document.getElementById("close-button").addEventListener("click", function(){
    let overlay = document.getElementById("overlay");
    let roster_number_box = document.getElementById("roster-number-box");
    document.getElementById("roster-number-input").value = "";
    overlay.style.opacity = 0;
    roster_number_box.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";

});


  //Get data objects needed for this page.
  let ship_in_progress = JSON.parse(sessionStorage.getItem("ship_in_progress"));
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  console.log(ship_in_progress);
//Set pilot image of chosen pilot.
document.getElementById("pilot-picture").style.backgroundImage = "url('"+ship_in_progress.chosen_pilot.image_path+"')";


//I will be making a loop that will paste all of the upgrades a ship into the next available picture and then set the next empty to next selection.
let grid_items = document.getElementsByClassName("grid-item");
document.getElementById("next-selection").id = "empty";
ship_in_progress.upgrades.forEach(upgrade =>{
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
  window.location.href = "./upgrade-type-selection-screen/upgrade-type-selection-screen.html";
})


//If you press the no button when asked if you want to delete an upgrade.
document.getElementById("no-button").addEventListener("click",function(){

})
//If you press the yes button when asked if you want to delete an upgrade.
document.getElementById("yes-button").addEventListener("click",function(){

})

