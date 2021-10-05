function get_load_data()
{
    var error_occured = false;
    close_load_game_pop_up();
    open_load_info_screen();
    var input = document.getElementById('load-name-input').value;
    var game_names = [];
    var raw_data = undefined;
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
error_occured = true;
})
.then(response =>response.json())
.then(data=>{game_names = data;})
.then(()=>{
if(error_occured == false)
{
      if(game_names.gc_game_names.includes(input) &&
         game_names.reg_game_names.includes(input))//Load gc game.
      {
        document.getElementById('loading-container-header').textContent = "Game Found!  Game loading, please wait ....";
        var url ="http://localhost:3000/load_game_gc";//"https://star-wars-x-wing-back-end.herokuapp.com/load_game_gc"
        fetch(url,{
          method: 'POST',
          body:JSON.stringify(game_names.gc_game_names[game_names.gc_game_names.indexOf(input)])
          })
         .then(response =>response.json())
         .then(data=>{parse_load_data_gc(data)} )
      }
      else if(!game_names.gc_game_names.includes(input) &&
              game_names.reg_game_names.includes(input))//load regular game.
      {
        document.getElementById('loading-container-header').textContent = "Game Found!  Game loading, please wait ....";
        var url ="http://localhost:3000/load_game";//"https://star-wars-x-wing-back-end.herokuapp.com/load_game"
        fetch(url,{
         method: 'POST',
         body:JSON.stringify(game_names.reg_game_names[game_names.reg_game_names.indexOf(input)])
         })
        .then(response =>response.json())
        .then(data=>{parse_load_data(data)})
      }
      else
      {
        alert("There were no game names that matched: "+document.getElementById('load-name-input').value);
        close_load_info_screen();
      }
    }
})
}
function parse_load_data_gc(raw_data)
{
  //Set up turn info.
  sessionStorage.setItem("gc_whos_turn",raw_data.turn_data.WhosTurn);
  sessionStorage.setItem("gc_phase",raw_data.turn_data.Phase);
  if(sessionStorage.getItem("gc_phase") == "placement")
   {
    sessionStorage.setItem("gc_first_or_second_half_of_round",raw_data.turn_data.PlacementRoundHalf)
   }

   //Set up the set up info.
   var unsorted_planets = add_planet_data_gc(raw_data.planet_data);
   var pirate_quantities = {
    Aggressor: raw_data.pirate_ship_quantities.Aggressor,
    C_ROC_Cruiser: raw_data.pirate_ship_quantities.CROCCruiser,
    Firespray_31: raw_data.pirate_ship_quantities.Firespray31,
    G_1A_Starfighter: raw_data.pirate_ship_quantities.G1AStarfighter,
    HWK_290: raw_data.pirate_ship_quantities.HWK290,
    Hounds_Tooth: raw_data.pirate_ship_quantities.HoundsTooth,
    Jump_Master_5000: raw_data.pirate_ship_quantities.JumpMaster5000,
    Kihraxz_Fighter: raw_data.pirate_ship_quantities.KihraxzFighter,
    Lancer_Class_Pusuit_Craft: raw_data.pirate_ship_quantities.LancerClassPursuitCraft,
    M3_A_Interceptor: raw_data.pirate_ship_quantities.M3AInterceptor,
    M12_L_Kimongila_Fighter: raw_data.pirate_ship_quantities.M12LKimongilaFighter,
    Protectorate_Starfighter: raw_data.pirate_ship_quantities.ProtectorateStarfighter,
    Quadjumper: raw_data.pirate_ship_quantities.Quadjumper,
    Scurrg_H_6_Bomber: raw_data.pirate_ship_quantities.ScurrgH6Bomber,
    StarViper: raw_data.pirate_ship_quantities.StarViper,
    YT_1300: raw_data.pirate_ship_quantities.YT1300,
    Y_Wing: raw_data.pirate_ship_quantities.YWing,
    Z_95_Headhunter: raw_data.pirate_ship_quantities.Z95Headhunter,
    list_of_the_dead: get_list_of_the_dead("Scum",raw_data),
    roster_numbers: raw_data.pirate_roster_numbers,
    total_ships: "gc_setup_data.pirate_options.HWK_290+gc_setup_data.pirate_options.Kihraxz_Fighter+gc_setup_data.pirate_options.M3_A_Interceptor+gc_setup_data.pirate_options.M12_L_Kimongila_Fighter+gc_setup_data.pirate_options.G_1A_Starfighter+gc_setup_data.pirate_options.Protectorate_Starfighter+gc_setup_data.pirate_options.Quadjumper+gc_setup_data.pirate_options.Scurrg_H_6_Bomber+gc_setup_data.pirate_options.StarViper+gc_setup_data.pirate_options.Y_Wing+gc_setup_data.pirate_options.Z_95_Headhunter+gc_setup_data.pirate_options.Firespray_31+gc_setup_data.pirate_options.Hounds_Tooth+gc_setup_data.pirate_options.Aggressor+gc_setup_data.pirate_options.Jump_Master_5000+gc_setup_data.pirate_options.Lancer_Class_Pusuit_Craft+gc_setup_data.pirate_options.YT_1300+gc_setup_data.pirate_options.C_ROC_Cruiser;"
   };
   if(raw_data.set_up_data.PirateFaction == "on")
   {
     console.log("Pirate faction turned on.");
   }
   else
   {
     console.log("Pirate faction turned off.");
   }
   var set_up_data = {
     active_planets: unsorted_planets[0],
     converted_planets:unsorted_planets[1],
     faction_chosen: raw_data.set_up_data.FactionChosen,
     location: raw_data.set_up_data.Location,
     pirate_faction: raw_data.set_up_data.PirateFaction,
     pirate_options: pirate_quantities,
     planet_assignment: raw_data.set_up_data.PlanetAssignment,
     planet_count: raw_data.set_up_data.PlanetCount,
     resources_chosen: raw_data.set_up_data.ResourcesChosen
   };
   sessionStorage.setItem("gc_setup_data",JSON.stringify(set_up_data));

   //Set Up the Faction Info
   var faction_data = [];
   var all_teams_across_all_factions = create_gc_navy(raw_data)
   for(var i=0; i < raw_data.faction_data.length;i++)// 0= rebels 1=imperial
   {
     var faction_image = undefined;
      if(i==0)
      {
        faction_image = "https://i.imgur.com/mO0iijb.png";
      }
      else if(i==1)
      {
        faction_image = "https://i.imgur.com/XgIWtvd.png";
      }
      else
      {
        alert("ERROR: Could not determine faction when loading faction data.")
      }
      var faction_info = {
          currency: raw_data.faction_data[i].Currency,
          durasteel: raw_data.faction_data[i].Durasteel,
          electronics: raw_data.faction_data[i].Electronics,
          faction: raw_data.faction_data[i].Faction,
          fuel: raw_data.faction_data[i].Fuel,
          highest_armada_number: raw_data.faction_data[i].HighestArmadaNumber,
          highest_fleet_number: raw_data.faction_data[i].HighestFleetNumber,
          highest_squad_number: raw_data.faction_data[i].HighestSquadNumber,
          image: faction_image,
          list_of_the_fallen: get_list_of_the_dead(raw_data.faction_data[i].Faction,raw_data),
          navy: [],
          parts: raw_data.faction_data[i].Parts,
          tibanna: raw_data.faction_data[i].Tibanna
      }
      all_teams_across_all_factions.forEach(team=>{
         if((faction_info.faction.includes("Rebel") && team.group_name.includes("Rebel")) || 
            (faction_info.faction.includes("Imperial") && team.group_name.includes("Imperial")))
         {
           faction_info.navy.push(team);
         }
      })
      faction_data.push(faction_info);
   }
   sessionStorage.setItem("gc_factions",JSON.stringify(faction_data));

   //If the game is saved on a combat screen, then load that data.
   if(raw_data.ship_and_combat_data.team_data && raw_data.ship_and_combat_data.team_data.length > 0)
   {
     determine_turn_info(raw_data.ship_and_combat_data);
     add_target_locks_to_game(raw_data.ship_and_combat_data);
     add_reminders_to_game(raw_data.ship_and_combat_data);
     var combat_team_set = [];
     raw_data.ship_and_combat_data.team_data.forEach(team_name=>{
       var new_team = new team(team_name.TeamName);
       if(team_name.HasInitiative == 1)
       {
          new_team.has_initiative_token = true;
       }
       for(var i=0; i < all_teams_across_all_factions.length;i++)
       {
          if(all_teams_across_all_factions[i].group_name == team_name.TeamName)
          {
            new_team.ship_list = all_teams_across_all_factions[i].team.ship_list;
            break;
          }
       }
       if(new_team.ship_list.length == 0)
       {
        alert("ERROR: Could not load team: "+team_name.TeamName);
        return;
       }
       else
       {
        combat_team_set.push(new_team);
       }
     })
     sessionStorage.setItem("all_teams",JSON.stringify(combat_team_set));
     close_load_info_screen();//close loading screen.
     //go to maneuver selection screen
     window.location.href ="../Gameplay-Screens/Maneuver-Selection-Screen/Maneuver-Selection-Screen.html";
   }
   else
   {
    window.location.href ="../Galactic-Conquest-Screens/Gameplay-Screens/gameplay-screen.html";
   }
}


//takes load data and makes team and ship an sets up the game.
function parse_load_data(raw_data)
{
  sessionStorage.setItem("all_teams",JSON.stringify(create_teams_for_game(raw_data)));
  var phase = raw_data.turn_data[0].Phase;
  
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

function create_gc_navy(raw_data)
{
   var complete_navy = [];
   var all_teams = [];
   raw_data.navies.forEach(navy=>{
        var moved = true;
        if(navy.HasMoved == 0)
        {
          moved = false;
        }
        if(navy.GroupFaction == "Rebels")
        {
          faction_image = "https://i.imgur.com/mO0iijb.png";
        }
        else if(navy.GroupFaction == "Imperial")
        {
          faction_image = "https://i.imgur.com/XgIWtvd.png";
        }
        else
        {
          alert("ERROR: Could not determine faction when loading faction navy data.")
        }
        var ship_body = {
          border: get_correct_border(navy.GroupName.split(" ")[2],navy.GroupFaction),
          faction: navy.GroupFaction,
          group_name: navy.GroupName,
          has_moved: moved,
          image: faction_image,
          location: navy.GroupLocation,
          team: {
                  has_initiative_token: false,
                  ship_list: [],//need to find out how to populate this.
                  team_name: navy.GroupName
                } 
        };
        all_teams.push(ship_body.team);//The function that builds teams from raw data needs to have the skeleton of all teams. 
        complete_navy.push(ship_body);
   });
   all_teams = add_ships_to_team(raw_data.ship_and_combat_data, all_teams)//Attempt to use regular game loading function to load ships for gc. Overwrite the all teams with complete list of teams.
   return complete_navy;
}

function get_list_of_the_dead(faction, raw_data)
{
  var dead_list = [];
  raw_data.list_of_the_dead.forEach(dead_person=>{
      if(dead_person.Faction == faction)
      {
        dead_list.push(dead_person.Name);
      }
  });
  return dead_list;
}

function add_planet_data_gc(planet_data)
{
  var error_count = 0;
  var active_planets = [];
  var converted_planets = [];
  planet_data.forEach(planet_from_data=>{
     if(planet_from_data.PlanetStatus == "Active")//Active planets
     {
        var current_planet = {
          controlling_faction: planet_from_data.ControllingFaction,
          planet: JSON.parse(sessionStorage.getItem("game_data")).all_planets[planet_from_data.PlanetID-1],
          resource: {image_path: planet_from_data.ResourceImagePath, 
                      name: planet_from_data.ResourceName, 
                      quantity: planet_from_data.ResourceQuantity, 
                      spawn_chance: planet_from_data.ResourceSpawnChance}
        }
        active_planets.push(current_planet);
     }
     else if(planet_from_data.PlanetStatus == "Converted") //Converted planets
     {
       var current_planet = JSON.parse(sessionStorage.getItem("game_data")).all_planets[planet_from_data.PlanetID-1]
       converted_planets.push(current_planet);     
     }
     else
     {
       error_count++;
     }
  })
  if(error_count > 0)
  {
    alert("ERROR: Unable to load "+error_count+" planets.")
  }
  return [active_planets,converted_planets];
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
  var phase = raw_data.turn_data[0].Phase;
  if(phase == "maneuver-selection")
  {
    sessionStorage.setItem('team_index',raw_data.turn_data[0].TeamIndex);
    sessionStorage.setItem('selected_ship_index',raw_data.turn_data[0].ShipIndex);
  }
  else if(phase == "attack" || phase == "movement")
  {
          sessionStorage.setItem('phase',phase); 
         sessionStorage.setItem('movement_attack_index',raw_data.turn_data[0].MovementAttackIndex);
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