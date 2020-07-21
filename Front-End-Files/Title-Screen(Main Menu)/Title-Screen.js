document.getElementById("new-game-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });


//If game data is already populated, then you do not need to call to the back end to get it again.
if(JSON.parse(sessionStorage.getItem("game_data")!= null && JSON.parse(sessionStorage.getItem("game_data")!= undefined)))
{
  document.getElementById("overlay").style.pointerEvents = "none";
  document.getElementById("overlay").style.opacity = 0;
  document.getElementById("loading-container").style.visibility = "hidden";
}
else //Make a call to the back end and get game data.
{
//Load the game data and store it in session Storage.
var url = "http://localhost:3000/get_data";//"https://star-wars-x-wing-back-end.herokuapp.com/"; //"http://localhost:3000/";
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


function load_game()
{
  let overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;
  overlay.style.pointerEvents = "all";
  document.getElementById('loading-game-input-popup').style.visibility = "visible";
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
    var game_names = [];
    var input = document.getElementById('load-name-input').value;
    input = input.replace(/\s+/g, '');
    input = input.toLowerCase();
    if(input.length == 0)
    {
       alert("No name was input, please input game name.");
       document.getElementById('load-name-input').value = "";
       document.getElementById('load-name-input').focus();
       return;
    }
    var url = "http://localhost:3000/get_game_names";
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
           alert("Found a match: "+game_names[i]);
           var url = "http://localhost:3000/load_game";
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
  }
  else if(phase == "squad-building")
  {
    //go to the team screen.
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
    if(raw_data.team_data.HasInitiative == 1)
    {
       all_teams[i].has_initiative_token = true;
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
        if(raw_ship.ChosenManeuver)
        {
            ship_in_progress.chosen_maneuver = game_data.all_maneuvers[maneuver_map.indexOf(raw_ship.ChosenManeuver)];
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
        ship_in_progress.upgrades = get_upgrades_for_ship(ship_in_progress);
        ship_in_progress.conditions = get_conditions_for_ship(ship_in_progress);
        ship_in_progress.critical_hit_cards = get_crit_hit_cards_for_ship(ship_in_progress);
        //Add ship to correct team.
        all_teams[all_teams_map.indexOf(ship_in_progress.team_name)].ship_list.push(ship_in_progress);
        
    })
    return all_teams;
}

function add_target_locks_to_game(raw_data)
{

}

function determine_turn_info(raw_data)
{

}

function get_upgrades_for_ship(ship)
{
  var upgrades = [];
  return upgrades;
}

function get_conditions_for_ship(ship)
{
  var conditions = [];
  return conditions;
}

function get_crit_hit_cards_for_ship(ship)
{
  var critical_hit_cards = [];
  return critical_hit_cards;
}