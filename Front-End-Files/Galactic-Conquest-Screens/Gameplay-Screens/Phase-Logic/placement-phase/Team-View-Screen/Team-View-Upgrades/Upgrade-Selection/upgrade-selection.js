  //Get data to show correct cards.
  var upgrade_type = sessionStorage.getItem("upgrade-type-chosen");
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  let selected_upgrades = [];
  var grid_container = document.getElementById("grid-container");
  var chosen_team_indicies = get_team_indecies_based_on_name();
  var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));

  //Get data objects needed for this page.
  let ship_in_progress = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[parseInt(sessionStorage.getItem("team_ship_index"),10)];

  //Set "all_teams" in session storage since it is used in the filter upgrade functions.
  var all_teams = [];
  all_factions.forEach(faction=>{
    faction.navy.forEach(ship_body=>{
       all_teams.push(ship_body.team);
    })
  })
  sessionStorage.setItem("all_teams",JSON.stringify(all_teams));

  //Filter out upgrades the current ship cannot have or use.
  selected_upgrades = masterUpgradeFilter(ship_in_progress,upgrade_type);
  //Filter out the dead of those who have fallen in battle.
  selected_upgrades = gc_filter_out_the_dead(selected_upgrades);

 
  //Make a div for each upgrade.
 selected_upgrades.forEach(upgrade =>
 {
    let new_upgrade_slot = document.createElement("div");
    new_upgrade_slot.className = "grid-item";
    new_upgrade_slot.id = upgrade.name;
    new_upgrade_slot.addEventListener("click",function(){
      upgrade_item_click(new_upgrade_slot.id);
    })
    //This if statement is to deal with upgrades that are dual sided.
    if(upgrade.is_dual_sided == true)
    {
      //Add style and append the first side of the dual upgrade.
      let image_paths = upgrade.image_path.split('\n');
      new_upgrade_slot.style.border = "3px solid red";
      new_upgrade_slot.style.backgroundImage="url("+image_paths[0]+")";
      grid_container.appendChild(new_upgrade_slot);

      //Add style and append the reverse side of the dual upgrade.
      let reverse_side = document.createElement("div");
      reverse_side.className = "grid-item";
      reverse_side.id = upgrade.name;
      reverse_side.style.border = "3px solid red";
      reverse_side.style.backgroundImage="url("+image_paths[1]+")";
      reverse_side.addEventListener("click",function(){
        upgrade_item_click(reverse_side.id);
      })
      grid_container.appendChild(reverse_side);
    }
    else
    {
      new_upgrade_slot.style.backgroundImage= "url("+upgrade.image_path+")";
      grid_container.appendChild(new_upgrade_slot);
    }
 });

 //Add back button
    let back_button = document.createElement("button");
    back_button.innerHTML = "Back";
    back_button.className = "grid-item button back";
    back_button.style.border = "none";
    back_button.addEventListener("click", function(){
    sessionStorage.removeItem("upgrade-type-chosen");
    sessionStorage.removeItem("all_teams");//remove all teams since we only made all teams to make sure upgrade filters work.
    window.location.href = "../Upgrade-Type-Selection/upgrade-type.html";
    });
    grid_container.appendChild(back_button);


  //I made a function here because the same click code is being used twice when a dual upgrade is being displayed. I wanted to make sure I did not copy the code twice.
  function upgrade_item_click(id)
  {
      //Loop through selected upgrades and find the one with the right name, then push that to the ship in progress upgrades.
      console.log(id);
      selected_upgrades.forEach(upgrade =>{
        if(upgrade.name == id)
        {
          ship_in_progress.upgrades.push(new in_game_upgrade(upgrade));
        }
      })
      var chosen_team_indicies = get_team_indecies_based_on_name();
      all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[parseInt(sessionStorage.getItem("team_ship_index"),10)] = ship_in_progress;
      sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
      window.location.href = "../upgrade-screen.html";
  }