//Freeplay button
function freeplay_button_click()
{
  window.location.href = "../Team-Screen/Team-Screen.html";
}
//galactic conquest button
function galactic_conquest_click()
{
  window.location.href =  "../Galactic-Conquest-Screens/Setup-Screen/Setup-Screen.html";
}
//back button
function back_button_click()
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("choosing-game-type-popup").style.visibility = "hidden";
}
//New game button
function new_game_button_click()
{
  document.getElementById("overlay").style.pointerEvents = "all";
  document.getElementById("overlay").style.opacity = 1;
  document.getElementById("choosing-game-type-popup").style.visibility = "visible";
}


//If game data is already populated, then you do not need to call to the back end to get it again.
if(JSON.parse(sessionStorage.getItem("game_data")!= null && JSON.parse(sessionStorage.getItem("game_data")!= undefined)))
{
  //Clear all session storage items except for game data.
  var temp_data = JSON.parse(sessionStorage.getItem("game_data"));
  sessionStorage.clear();
  sessionStorage.setItem("game_data",JSON.stringify(temp_data));
  //Remove overlay. It is on by default.
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
}
else //Make a call to the back end and get game data.
{
//Load the game data and store it in session Storage.
var url = "http://localhost:3000/get_data";//"https://star-wars-x-wing-back-end.herokuapp.com/get_data";
var game_data = undefined;
fetch(url)
.catch(function(error) {
  console.log(error);
  document.getElementById("loading-container-header").textContent = "ERROR LOADING DATA, PLEASE REFRESH AND TRY AGAIN!"
})
.then(response =>response.json())
.then(data => game_data = data)
.then(() => sessionStorage.setItem("game_data",JSON.stringify(game_data)))
.then(()=>{
    if(JSON.parse(sessionStorage.getItem("game_data") == null || JSON.parse(sessionStorage.getItem("game_data") == undefined)))
    {
      document.getElementById("loading-container-header").textContent = "ERROR LOADING DATA, BACK END MAY BE DONW!"
    }
    else
    {
      document.getElementById("overlay").style.pointerEvents = "none";
      document.getElementById("overlay").style.opacity = 0;
      document.getElementById("loading-container").style.visibility = "hidden";
    }
});
}

function open_load_info_screen()
{
  document.getElementById("overlay").style.pointerEvents = "all";
  document.getElementById("overlay").style.opacity = 1;
  document.getElementById("loading-container").style.visibility = "visible";
  document.getElementById('loading-container-header').textContent = "Searching for game name, please wait ....";
}

function close_load_info_screen()
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
  document.getElementById('loading-container-header').textContent = "Game Data is Loading, Please Wait...";
}

function load_game()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;
  overlay.style.pointerEvents = "all";
  document.getElementById('loading-game-input-popup').style.visibility = "visible";
  document.getElementById('load-name-input').value = "";
  document.getElementById('load-name-input').focus();
}

function close_load_game_pop_up()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
  document.getElementById('loading-game-input-popup').style.visibility = "hidden";
}

function get_load_data()
{
    close_load_game_pop_up();
    open_load_info_screen();
    var input = document.getElementById('load-name-input').value;
    var game_names = [];
    input = input.replace(/\s+/g, '');
    input = input.toLowerCase();
    if(input.length == 0)
    {
       alert("No name was input, please input game name.");
       document.getElementById('load-name-input').value = "";
       document.getElementById('load-name-input').focus();
       return;
    }
    if(input.includes("\'"))//If this symbol makes it into sql, it messes up the queries.
    {
        alert("Testing aposterphe.")
        input = input.replace(/'/g, '');
        alert("New name: "+input);
    }
    var url = "http://localhost:3000/get_game_names";//"https://star-wars-x-wing-back-end.herokuapp.com/get_game_names";
    fetch(url)
.catch(function(error) {
console.log(error);
alert("Something went wrong trying to get saved game names. "+error)
})
.then(response =>response.json())
.then(data=>{game_names = data;})
.then(()=>{
        var match_found = false;
      for(var i =0; i < game_names.length;i++)
      {
        console.log("comparing: "+input+" and "+game_names[i]);
        if(game_names[i] == input)
        {
          match_found = true;
          document.getElementById('loading-container-header').textContent = "Game Found!  Game loading, please wait ....";
           var url ="http://localhost:3000/load_game";//"https://star-wars-x-wing-back-end.herokuapp.com/load_game"
           fetch(url,{
            method: 'POST',
            body:JSON.stringify([game_names[i]])
        })
        .then(response =>response.json())
        .then(data=>{parse_load_data(data)})
        break;
        }
      }
      if(match_found == false)
      {
        alert("There were no game names that matched: "+document.getElementById('load-name-input').value);
        close_load_info_screen();
      }
})
}

//takes load data and makes team and ship an sets up the game.
function parse_load_data(raw_data)
{
  sessionStorage.setItem("all_teams",JSON.stringify(create_teams_for_game(raw_data)));
  var phase = raw_data.turn_data.Phase;
  
  console.log(raw_data);
  if(phase == "movement" || phase == "attack" || phase == "maneuver-selection")
  {
    determine_turn_info(raw_data);
    add_target_locks_to_game(raw_data);
    add_reminders_to_game(raw_data);
    close_load_info_screen();//close loading screen.
    //go to maneuver selection screen
    window.location.href ="../Gameplay-Screens/Maneuver-Selection-Screen/Maneuver-Selection-Screen.html";
  }
  else if(phase == "squad-building")
  {
    close_load_info_screen();//close loading screen.
    //go to the team screen.
    window.location.href = "../Team-Screen/Team-Screen.html";
  }
  else
  {
    alert("ERROR: invalid phase type data on load.")
  }

}

function create_teams_for_game(raw_data)
{
  var all_teams = [];
  raw_data.team_data.forEach(raw_team => {
    all_teams.push(new team(raw_team.TeamName));
    if(raw_team.HasInitiative == 1)
    {
       all_teams[all_teams.length-1].has_initiative_token = true;
    }
  });
  return add_ships_to_team(raw_data,all_teams);
}

function add_ships_to_team(raw_data,all_teams)
{
  var game_data = JSON.parse(sessionStorage.getItem("game_data"));

  //The map variables are used to get a list of all ID's or team names to help determine indecies when presented with just an ID number.
  var all_teams_map = all_teams.map(function(e){return e.team_name;});;//An array of all team names.
  var pilot_map = game_data.all_pilots.map(function(e){return e.id;});//flatten the pilot id's to find the index of the matching pilot ID.
  var maneuver_map = game_data.all_maneuvers.map(function(e){return e.id;});


  var chosen_pilot = undefined;//Store the pilot of the ship as they are found here. 
  var ship_in_progress = undefined;//Ship as we modify load results.
      //Add ships
      raw_data.ship_data.forEach(raw_ship=>{
        //get chosen pilot. 
        chosen_pilot = game_data.all_pilots[pilot_map.indexOf(raw_ship.ChosenPilot)];
        //Create new in ship game based on ship size.
        if(chosen_pilot.ship_name.ship_type == "largeTwoCard")// add large ship with two cards and its unique parameters.
        {
            ship_in_progress = new large_two_card_in_game_ship_status(chosen_pilot,raw_ship.TeamName);
            //Add energy.
            if(raw_ship.CurrentEnergy!= null)
            {
              ship_in_progress.current_energy = raw_ship.CurrentEnergy;
            }
            else 
            {
              console.log("ERROR: Current energy was null!");
            }
            //Add aft agility.
            if(raw_ship.CurrentAftAgility!= null)
            {
              ship_in_progress.current_aft_agility = raw_ship.CurrentAftAgility
            }
            else
            {
              console.log("ERROR: Current aft agility was null!")
            }
            //Add aft hull.
            if(raw_ship.CurrentAftHull!=null)
            {
              ship_in_progress.current_aft_hull = raw_ship.CurrentAftHull;
            }
            else
            {
              console.log("ERROR: Current aft hull was null!")
            }
            //Add aft shields
            if(raw_ship.CurrentAftShields!=null)
            {
              ship_in_progress.current_aft_shields = raw_ship.CurrentAftShields;
            }
            else
            {
              console.log("ERROR: Current aft shields was null!.")
            }
            //Aft showing
            if(raw_ship.AftShowing != null)
            {
               if(raw_ship.AftShowing == 0)
               {
                  ship_in_progress.aft_showing = false;
               }
               else if(raw_ship.AftShowing == 1)
               {
                  ship_in_progress.aft_showing = true;
               }
               else
               {
                 console.log("ERROR: Aft showing input is invalid!");
               }
            }
            else
            {
              console.log("ERROR: Aft showing was null.");
            }
        }
        else if(chosen_pilot.ship_name.ship_type == "largeOneCard")// Add large ship one card an its unique parameter.
        {
            ship_in_progress  = new large_one_card_in_game_ship_status(chosen_pilot,raw_ship.TeamName);
            //Add energy.
            if(raw_ship.CurrentEnergy!=null)
            {
              ship_in_progress.current_energy = raw_ship.CurrentEnergy;
            }
            else 
            {
              console.log("ERROR: Current energy was null!");
            }
        }
        else //Add regular ship.
        {
            ship_in_progress = new in_game_ship_status(chosen_pilot,raw_ship.TeamName);
        }
        //Set the rest of the parameters
        if(raw_ship.ChosenManeuver != null && raw_ship.ChosenManeuver != undefined)
        {
            ship_in_progress.chosen_maneuver = raw_ship.ChosenManeuver;
        }
        ship_in_progress.cloak_tokens = raw_ship.CloakTokens;
        ship_in_progress.current_agility = raw_ship.CurrentAgility;
        ship_in_progress.current_attack = raw_ship.CurrentAttack;
        ship_in_progress.current_hull = raw_ship.CurrentHull;
        ship_in_progress.current_pilot_skill = raw_ship.CurrentPilotSkill;
        ship_in_progress.current_sheilds = raw_ship.CurrentShields;
        ship_in_progress.evade_tokens = raw_ship.EvadeTokens;
        ship_in_progress.focus_tokens = raw_ship.FocusTokens;
        ship_in_progress.ion_tokens = raw_ship.IonTokens;
        ship_in_progress.jam_tokens = raw_ship.JamTokens;
        ship_in_progress.reinforce_tokens = raw_ship.ReinforceTokens;
        ship_in_progress.roster_number = raw_ship.RosterNumber;
        ship_in_progress.stress_tokens = raw_ship.StressTokens;
        ship_in_progress.tractor_beam_tokens = raw_ship.TractorBeamTokens;
        ship_in_progress.weapons_disabled_tokens = raw_ship.WeaponsDisabledTokens;
        
        //Still need to do upgrades, crit hits, and conditions.
        //ship_in_progress.upgrades = get_upgrades_for_ship(ship_in_progress,raw_ship,raw_data.upgrade_data);
        ship_in_progress.conditions = get_conditions_for_ship(ship_in_progress,raw_ship);
        ship_in_progress.critical_hit_cards = get_crit_hit_cards_for_ship(ship_in_progress,raw_ship);
        //Add ship to correct team.
        all_teams[all_teams_map.indexOf(ship_in_progress.team_name)].ship_list.push(ship_in_progress);
        
    })
    all_teams = get_upgrades_for_all_ships(all_teams,raw_data.upgrade_data);
    return all_teams;
}

function add_target_locks_to_game(raw_data)
{
    var raw_target_locks = raw_data.target_lock_data;
    var target_locks =[];
    if(raw_target_locks != null && raw_target_locks != undefined && raw_target_locks.length >0)
    {
      raw_target_locks.forEach(lock=>{
        target_locks.push(new target_lock(lock.assignmentNumber,lock.targettingTeamName,lock.targettingRoster,lock.targettedTeamName, lock.targettedRoster));
      })
    }
    sessionStorage.setItem("all_target_locks",JSON.stringify(target_locks));
}

function determine_turn_info(raw_data)
{
  var phase = raw_data.turn_data.Phase;
  if(phase == "maneuver-selection")
  {
    sessionStorage.setItem('team_index',raw_data.turn_data.TeamIndex);
    sessionStorage.setItem('selected_ship_index',raw_data.turn_data.ShipIndex);
  }
  else if(phase == "attack" || phase == "movement")
  {
          sessionStorage.setItem('phase',phase); 
         sessionStorage.setItem('movement_attack_index',raw_data.turn_data.MovementAttackIndex);
  }
  else
  {
      alert("ERROR: Unable to determine what phase the game is in.")
  }
}

function add_reminders_to_game(raw_data)
{
  if(raw_data.reminders == null ||
     raw_data.reminders.length == 0)
     {
       return;
     }
   var all_reminders = [];
   var new_reminder = undefined;
   raw_data.reminders.forEach(current_reminder=>{
      new_reminder = new reminder(current_reminder.Team,current_reminder.RosterNumber,current_reminder.Message);
      if(current_reminder.ShipTurnManeuverSelection==1)
      {
        new_reminder.when_ships_turn_maneuver_selection =true;
      }
      if(current_reminder.ShipTurnMovementPhase==1)
      {
        new_reminder.when_ships_turn_movement_phase=true;
      }
      if(current_reminder.ShipTurnAttackPhase==1)
      {
        new_reminder.when_ships_turn_attack_phase=true;
      }
      if(current_reminder.WhenTargeted==1)
      {
        new_reminder.when_targeted=true;
      }
      if(current_reminder.BetweenManeuverAndMovement==1)
      {
        new_reminder.between_select_and_movement_phase=true;
      }
      if(current_reminder.BetweenMovementAndAttack==1)
      {
        new_reminder.between_movement_and_attack_phase=true;
      }
      if(current_reminder.BetweenRounds==1)
      {
        new_reminder.between_rounds=true;
      }
      all_reminders.push(new_reminder);
   })
   sessionStorage.setItem("all_reminders",JSON.stringify(all_reminders));
}

function get_upgrades_for_all_ships(all_teams,upgrade_data)
{
  var all_upgrades = JSON.parse(sessionStorage.getItem("game_data")).all_upgrades;
  var current_upgrade = undefined;
  var current_roster = undefined;
  var current_team_name = undefined;
  upgrade_data.forEach(upgrade=>{
    //Create the current upgrade.
    current_upgrade = new in_game_upgrade(all_upgrades[upgrade.UpgradeID-1]);
    current_upgrade.ordnance_tokens = upgrade.OrdnanceTokens;
    current_upgrade.orientation = upgrade.Orientation;
    current_upgrade.energy_allocated = upgrade.AllocatedEnergy;

    //Find the correct ship to give the upgrade to.
    current_roster = upgrade.RosterNumber;
    current_team_name = upgrade.TeamName;
    for(var i=0; i < all_teams.length;i++)
    {
      if(current_team_name == all_teams[i].team_name)
      {
        for(var j=0;j < all_teams[i].ship_list.length;j++)
        {
           if(all_teams[i].ship_list[j].roster_number == current_roster)
           {
             all_teams[i].ship_list[j].upgrades.push(current_upgrade);
             break;
           }
        }
        break;
      }
    }
  })
  return all_teams;
  /*if(raw_ship.Upgrades == null || raw_ship.Upgrades == undefined || raw_ship.Upgrades.length <= 0)//If there are no upgrades.
  {
    return [];
  }
  var game_data = JSON.parse(sessionStorage.getItem("game_data"));
  var upgrade_ids = raw_ship.Upgrades.toString().split('*');
  for(var i=0; i < upgrade_ids.length;i++)//change all id strings to numbers.
  {
    upgrade_ids[i] = parseInt(upgrade_ids[i],10);
  }
  var upgrades = [];
  var upgrade_map = game_data.all_upgrades.map(function(e){return e.id});
  upgrade_ids.forEach(current_id=>{
    console.log("index is: "+ upgrade_map.indexOf(current_id));
    upgrades.push(game_data.all_upgrades[upgrade_map.indexOf(current_id)]);
  })
  return upgrades;*/
}

function get_conditions_for_ship(ship,raw_ship)
{
  if(raw_ship.Conditions == null || raw_ship.Conditions == undefined || raw_ship.Conditions.length <= 0)//If there are no upgrades.
  {
    return [];
  }
  var game_data = JSON.parse(sessionStorage.getItem("game_data"));
  var conditions_ids = raw_ship.Conditions.toString().split('*');
  for(var i=0; i< conditions_ids.length;i++)
  {
    conditions_ids[i] = parseInt(conditions_ids[i],10);
  }
  var conditions = [];
  var conditions_map = game_data.all_conditions.map(function(e){return e.id});
  conditions_ids.forEach(current_id=>{
    conditions.push(game_data.all_conditions[conditions_map.indexOf(current_id)]);
  })
  return conditions;
}

function get_crit_hit_cards_for_ship(ship,raw_ship)
{
  if(raw_ship.CritHitCards == null || raw_ship.CritHitCards == undefined || raw_ship.CritHitCards.length <= 0)//If there are no upgrades.
  {
    return [];
  }
  var game_data = JSON.parse(sessionStorage.getItem("game_data"));
  var crit_hit_ids = raw_ship.CritHitCards.toString().split('*');
  for(var i=0; i < crit_hit_ids.length;i++)
  {
    if(crit_hit_ids[i].length <= 0)
    {
      crit_hit_ids.splice(i,1);
      continue;
    }
    crit_hit_ids[i] = parseInt(crit_hit_ids[i],10);
  }
  var critical_hit_cards = [];
  var crit_hits_map = game_data.all_crit_cards.map(function(e){return e.id;});
  var large_crit_hits_map = game_data.all_large_crit_hit_cards.map(function(e){return e.id;});
   crit_hit_ids.forEach(current_id=>{
    if(current_id >= 100)
    {
      critical_hit_cards.push(game_data.all_large_crit_hit_cards[large_crit_hits_map.indexOf(current_id)]);
    }
    else
    {
      critical_hit_cards.push(game_data.all_crit_cards[crit_hits_map.indexOf(current_id)]);
    }
  })
  return critical_hit_cards;
}