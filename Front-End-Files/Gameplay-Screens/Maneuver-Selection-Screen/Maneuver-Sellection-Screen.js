//Get data needed for this page.
var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
var game_data = JSON.parse(sessionStorage.getItem("game_data"));

//Get/set indecies.
var selected_ship_index = sessionStorage.getItem("selected_ship_index");//Used to determine which ship is being displayed.
var maneuver_index = 0;//Used to determine what maneuver is being displayed.
var team_index = sessionStorage.getItem("team_index");//Used to determine what team is being examined.
var condition_index = 0;//Used when selecting a conditions to add to a ship.
var target_lock_and_search_index = 0;//Used when the target lock pop up is used to show which team is being displayed.

//If there is no team index or selected ship index, then create them with a value of zero.
if(selected_ship_index == null || selected_ship_index == undefined)
{
    selected_ship_index = 0;
    sessionStorage.setItem("selected_ship_index",selected_ship_index);
}
if(team_index == null || selected_ship_index == undefined)
{
    team_index = 0;
    sessionStorage.setItem("team_index",team_index);
}
//Set initiative token to be visible or not.
if(all_teams[team_index].has_initiative_token == true)
{
    document.getElementById('initiative-label').style.visibility = "visible";
}
else
{
    document.getElementById('initiative-label').style.visibility = "hidden";
}
//Check if the back button should be visible or not.
if(team_index == 0 && selected_ship_index == 0 &&(sessionStorage.getItem("phase") == null  || sessionStorage.getItem("phase") == undefined))
{
    document.getElementById('back-button').style.visibility = "hidden";
}

//Check to see if we are in a search or the actual bunch of ships. We do this by seeing if there is a saved team and ship saved for when we return from a search.
if(sessionStorage.getItem("saved_team_index") != null &&
sessionStorage.getItem("saved_ship_index")!=null &&
sessionStorage.getItem("saved_team_index") != undefined &&
sessionStorage.getItem("saved_ship_index")!=undefined)
{
    document.getElementById('back-button').style.visibility = "hidden";
    document.getElementById('return-button').style.visibility = "visible";
    document.getElementById('select-button').style.visibility = "hidden";
    document.getElementById('next-maneuver-button').style.visibility = "hidden";
    document.getElementById('previous-maneuver-button').style.visibility = "hidden";
    document.getElementById('search-button').style.visibility = "hidden";
    document.getElementById('team-mate-maneuvers').style.visibility = "hidden";
    document.getElementById('team-mate-maneuvers-label').style.visibility = "hidden";
    document.getElementById('maneuver-type').style.visibility = "hidden";
    document.getElementById('maneuver-range').style.visibility = "hidden";
}



//Set up target lock in session storage.
var target_locks = JSON.parse(sessionStorage.getItem("all_target_locks"));
if(target_locks == null || target_locks == undefined)
{
    target_locks = [];
    sessionStorage.setItem("all_target_locks",JSON.stringify(target_locks));
}

//Grab element needed to manipulate.
var pilot_image = document.getElementById("pilot-image");
var roster_number_label = document.getElementById("roster-text");
var pilot_skill_label = document.getElementById("pilot-skill-text");
var attack_label = document.getElementById("attack-text");
var agility_label = document.getElementById("agility-text");
var hull_label = document.getElementById("hull-text");
var shield_label = document.getElementById("shield-text");
var energy_label = document.getElementById("energy-text");
var maneuver_range_label = document.getElementById("maneuver-range");
var maneuver_type_label = document.getElementById("maneuver-type");
var energy_gained_label = document.getElementById("maneuver-energy");
var card_type_label = document.getElementById("card-type-label");
var card_list = document.getElementById("card-box");
var team_name_label = document.getElementById("team-name-label");
var target_lock_box = document.getElementById("target-lock-box");
var main_title = document.getElementById('main-title');
var team_mate_maneuvers = document.getElementById('team-mate-maneuvers');

//call the function that sets up the screen.
make_phase_changes();//Check to see what phase we are in and makes appropriate changes as needed to match the phase.
set_up_maneuver_screen();
set_up_team_mate_maneuvers();
check_for_death();//This is to make sure that if a large ship has a crippled aft/fore, it will show up immediately.

function set_up_maneuver_screen()
{
//Set the first pilot to select maneuver of  the first team.
pilot_image.style.backgroundImage = "url("+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.image_path+")";
roster_number_label.innerText = all_teams[team_index].ship_list[selected_ship_index].roster_number;
pilot_skill_label.innerText = all_teams[team_index].ship_list[selected_ship_index].current_pilot_skill;
attack_label.innerText = all_teams[team_index].ship_list[selected_ship_index].current_attack;
agility_label.innerText = all_teams[team_index].ship_list[selected_ship_index].current_agility;
hull_label.innerText = all_teams[team_index].ship_list[selected_ship_index].current_hull;
shield_label.innerText = all_teams[team_index].ship_list[selected_ship_index].current_sheilds;
energy_label.innerText = all_teams[team_index].ship_list[selected_ship_index].current_energy;
maneuver_range_label.style.backgroundImage = "url("+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].range_symbol_path+")";
maneuver_type_label.style.backgroundImage = "url("+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].maneuver_symbol_path+")";


//This section will help to set up the card screen by setting the name to conditions, and pressing the button so all of the upgrades show up.
card_type_label.textContent = "Conditions";
team_name_label.innerText = all_teams[team_index].team_name;
cycle_button_click();

//This section will help to set up the token box.
document.getElementById("focus-token").textContent = all_teams[team_index].ship_list[selected_ship_index].focus_tokens;
document.getElementById("evade-token").textContent = all_teams[team_index].ship_list[selected_ship_index].evade_tokens;
document.getElementById("stress-token").textContent = all_teams[team_index].ship_list[selected_ship_index].stress_tokens;
document.getElementById("ion-token").textContent = all_teams[team_index].ship_list[selected_ship_index].ion_tokens;
document.getElementById("jam-token").textContent = all_teams[team_index].ship_list[selected_ship_index].jam_tokens;
document.getElementById("weapons-disabled-token").textContent = all_teams[team_index].ship_list[selected_ship_index].weapons_disabled_tokens;
document.getElementById("cloak-token").textContent = all_teams[team_index].ship_list[selected_ship_index].cloak_tokens;
document.getElementById("reinforce-token").textContent = all_teams[team_index].ship_list[selected_ship_index].reinforce_tokens;
document.getElementById("tractor-beam-token").textContent = all_teams[team_index].ship_list[selected_ship_index].tractor_beam_tokens;
Array.from(document.getElementsByClassName(" numerable-token")).forEach(token=>{
    if(token.textContent != "0")
    {
        token.style.opacity = 1;
    }
    else
    {
        token.style.opacity = 0.25;
    }
})

set_up_target_lock_list();

//Check if the flip button should be visible or not as well as if the ship is crippled or not. This will also determine if the ship will have the crippled card showing or not.
if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
  all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeOneCard")
{
    if(sessionStorage.getItem("phase") == "attack")
    {
        energy_gained_label.style.visibility = "hidden";
    }
    energy_gained_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].energy_symbol_path+"')";
    document.getElementById('energy-image').style.visibility = "visible";
    document.getElementById('energy-text').style.visibility = "visible";
    if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        document.getElementById('flip-button').style.visibility = "visible";
        if(all_teams[team_index].ship_list[selected_ship_index].current_hull <= 0)
        {
            document.getElementById('pilot-image').style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.fore_crippled_path+"')";
        }
    }
}
else
{
    document.getElementById('energy-image').style.visibility = "hidden";
    document.getElementById('energy-text').style.visibility = "hidden";
    document.getElementById('flip-button').style.visibility = "hidden";
    energy_gained_label.style.visibility = "hidden";
}

}

function set_up_team_mate_maneuvers()
{
    for(var i =0; i < selected_ship_index;i++)
    {
        //Create container for the stored maneuvers.
        var team_mate_maneuver_container = document.createElement("div");
        team_mate_maneuver_container.className = "maneuver-roster-"+all_teams[team_index].ship_list[i].roster_number;
        team_mate_maneuver_container.style.border = "1px solid white";
        team_mate_maneuver_container.style.width  = "100%";
        team_mate_maneuver_container.style.height = "5%";
        team_mate_maneuver_container.style.display = "flex";
        team_mate_maneuvers.style.flexDirection = "row";
        team_mate_maneuver_container.style.marginBottom="2%";

            //Add range image to the container.
            var range_div = document.createElement("div");
            range_div.className = "maneuver-roster-"+all_teams[team_index].ship_list[i].roster_number+"-range";
            range_div.style.backgroundRepeat = "no-repeat";
            range_div.style.backgroundSize = "100% 100%";
            range_div.style.width = "30%";
            range_div.style.height = "100%";
            range_div.style.marginRight = "5%";
            range_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[i].chosen_maneuver.range_symbol_path+"')";
            if(all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
            all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeOneCard")
            {
                range_div.style.width = "25%";
                range_div.style.marginRight = "0%";    
            }
            team_mate_maneuver_container.appendChild(range_div);

            //Add maneuver image to the container.
            var maneuver_div = document.createElement("div");
            maneuver_div.className = "maneuver-roster-"+all_teams[team_index].ship_list[i].roster_number+"-maneuver";
            maneuver_div.style.backgroundRepeat = "no-repeat";
            maneuver_div.style.backgroundSize = "100% 100%";
            maneuver_div.style.width = "30%";
            maneuver_div.style.height = "100%";
            maneuver_div.style.marginRight = "5%";
            maneuver_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[i].chosen_maneuver.maneuver_symbol_path+"')";
            if(all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
            all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeOneCard")
            {
                maneuver_div.style.width = "25%";
                maneuver_div.style.marginRight = "0%";    
            }
            team_mate_maneuver_container.appendChild(maneuver_div);

            //potentially add energy image to container.
            if(all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
            all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeOneCard")
            {
                var energy_div = document.createElement("div");
                energy_div.className = "maneuver-roster-"+all_teams[team_index].ship_list[i].roster_number+"-energy";
                energy_div.style.backgroundRepeat = "no-repeat";
                energy_div.style.backgroundSize = "100% 100%";
                energy_div.style.width = "25%";
                energy_div.style.height = "100%";
                energy_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[i].chosen_maneuver.energy_symbol_path+"')"; 
                team_mate_maneuver_container.appendChild(energy_div);
            }

            //Add roster number to container.
            var roster_div = document.createElement("div");
            roster_div.className = "maneuver-roster-"+all_teams[team_index].ship_list[i].roster_number+"-maneuver";
            roster_div.style.backgroundRepeat = "no-repeat";
            roster_div.style.backgroundSize = "100% 100%";
            roster_div.style.width = "30%";
            roster_div.style.height = "100%";
            roster_div.style.marginRight = "5%";
            roster_div.style.backgroundColor = "rgb(75,75,75)";
            roster_div.style.color = "White";
            roster_div.style.fontFamily = "Impact, Charcoal, sans-serif";
            roster_div.style.borderLeft = "2px solid rgb(156,156,156)";
            roster_div.style.borderRight = "2px solid rgb(156,156,156)";
            roster_div.style.fontSize = "auto";
            roster_div.style.textAlign = "Center";
            roster_div.textContent = all_teams[team_index].ship_list[i].roster_number;
            if(all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
            all_teams[team_index].ship_list[i].chosen_pilot.ship_name.ship_type == "largeOneCard")
            {
                roster_div.style.width = "25%";
                roster_div.style.marginRight = "0%";    
            }
            team_mate_maneuver_container.appendChild(roster_div);
        team_mate_maneuvers.appendChild(team_mate_maneuver_container);

    }
}

function set_up_target_lock_list()
{
    //Remove all locks from the list.
    Array.from(document.getElementsByClassName("target-lock-list-item")).forEach(element=>{
        target_lock_box.removeChild(element);
   })
        target_locks.forEach(target_lock=>{
            if(target_lock.targetting_team == all_teams[team_index].team_name &&
                all_teams[team_index].ship_list[selected_ship_index].roster_number == target_lock.targetting_roster )//Potentially create a blue target lock.
            {
                    var blue_target_div = document.createElement("div");
                    blue_target_div.className = "target-lock-list-item";
                    blue_target_div.style.border = "1px solid white";
                    blue_target_div.style.backgroundRepeat = "no-repeat";
                    blue_target_div.style.backgroundSize = "100% 100%";
                    blue_target_div.style.backgroundImage = "url('https://i.imgur.com/ES0f0Qq.png')";
                    blue_target_div.textContent = target_lock.assignment_number;
                    blue_target_div.style.fontFamily = "Impact, Charcoal, sans-serif";
                    blue_target_div.style.height = "50%";
                    blue_target_div.style.border = "none";
                    blue_target_div.style.color = "white";
                    blue_target_div.style.display = "flex";
                    blue_target_div.style.alignItems = "center";
                    blue_target_div.style.justifyContent = "center";
                    blue_target_div.onclick = function(){populate_target_lock_view_popup(target_lock.assignment_number);show_pop_up('target-lock-view-pop-up');};
                    blue_target_div.style.fontSize = "x-large";
                    target_lock_box.appendChild(blue_target_div);
            }
            if(target_lock.targetted_team == all_teams[team_index].team_name &&
                all_teams[team_index].ship_list[selected_ship_index].roster_number == target_lock.targetted_roster)//Potentially create a red target lock.
            {
                    var red_target_div = document.createElement("div");
                    red_target_div.className = "target-lock-list-item";
                    red_target_div.style.border = "1px solid white";
                    red_target_div.style.backgroundRepeat = "no-repeat";
                    red_target_div.style.backgroundSize = "100% 100%";
                    red_target_div.style.backgroundImage = "url('https://i.imgur.com/V4DYCY4.png')";
                    red_target_div.textContent = target_lock.assignment_number;
                    red_target_div.style.fontFamily = "Impact, Charcoal, sans-serif";
                    red_target_div.style.height = "50%";
                    red_target_div.style.border = "none";
                    red_target_div.style.color = "white";
                    red_target_div.style.display = "flex";
                    red_target_div.style.alignItems = "center";
                    red_target_div.style.justifyContent = "center";
                    red_target_div.style.fontSize = "x-large";
                    red_target_div.onclick = function(){populate_target_lock_view_popup(target_lock.assignment_number);show_pop_up('target-lock-view-pop-up')};
                    target_lock_box.appendChild(red_target_div);
            }
        })
}

//This function will populate the information of the target lock view before showing it. IT will get picutes and stats.
function populate_target_lock_view_popup(passed_assignment_number)
{
    var target_index = target_locks.map(function(e){return e.assignment_number}).indexOf(passed_assignment_number);
    var attacking_team = all_teams.find(team => team.team_name == target_locks[target_index].targetting_team);
    var defending_team = all_teams.find(team => team.team_name == target_locks[target_index].targetted_team);
    var attacking_ship = attacking_team.ship_list.find(ship=> ship.roster_number == target_locks[target_index].targetting_roster);
    var defending_ship = defending_team.ship_list.find(ship=> ship.roster_number == target_locks[target_index].targetted_roster);
    document.getElementById('targetter-image').style.backgroundImage = "url('"+attacking_ship.chosen_pilot.image_path+"')";  
    document.getElementById('targetter-image').setAttribute("flipped","false");
    document.getElementById('targetted-image').style.backgroundImage = "url('"+defending_ship.chosen_pilot.image_path+"')"; 
    document.getElementById('targetted-image').setAttribute("flipped","false");
    document.getElementById('roster-tl-attack').textContent = attacking_ship.roster_number; 
    document.getElementById('pilot-skill-tl-attack').textContent = attacking_ship.current_pilot_skill; 
    document.getElementById('attack-tl-attack').textContent = attacking_ship.current_attack; 
    document.getElementById('agility-tl-attack').textContent = attacking_ship.current_agility; 
    document.getElementById('hull-tl-attack').textContent = attacking_ship.current_hull; 
    document.getElementById('shield-tl-attack').textContent = attacking_ship.current_sheilds; 
    document.getElementById('energy-tl-attack').textContent = attacking_ship.current_energy; 
    document.getElementById('roster-tl-defend').textContent = defending_ship.roster_number; 
    document.getElementById('pilot-skill-defend').textContent = defending_ship.current_pilot_skill; 
    document.getElementById('attack-tl-defend').textContent = defending_ship.current_attack; 
    document.getElementById('agility-tl-defend').textContent = defending_ship.current_agility; 
    document.getElementById('hull-tl-defend').textContent = defending_ship.current_hull; 
    document.getElementById('shield-tl-defend').textContent = defending_ship.current_sheilds; 
    document.getElementById('energy-tl-defend').textContent = defending_ship.current_energy; 
    //Add functionality for if a flip button or energy stat is needed.
    if(attacking_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard"||
    attacking_ship.chosen_pilot.ship_name.ship_type == "largeOneCard")
    {
        if(attacking_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
        {
            if(attacking_ship.current_hull <= 0)
            {
                document.getElementById('targetter-image').style.backgroundImage = "url('"+attacking_ship.chosen_pilot.fore_crippled_path+"')";
            }
            //Set flip button
            document.getElementById('target-lock-view-flip-button-attacker').onclick = function(){flip_button_for_target_lock_view("targetter-image",attacking_ship,"agility-tl-attack","hull-tl-attack","shield-tl-attack")};
            document.getElementById('target-lock-view-flip-button-attacker').style.visibility = "visible";
        }
        else
        {
            document.getElementById('target-lock-view-flip-button-attacker').style.visibility = "hidden";
        }
        document.getElementById('energy-image-tl-attacker').style.visibility = "visible";
        document.getElementById('energy-tl-attack').style.visibility = "visible";
    }
    if(defending_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard"||
    defending_ship.chosen_pilot.ship_name.ship_type == "largeOneCard")
    {
        if(defending_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
        {
            if(defending_ship.current_hull <= 0)
            {
                document.getElementById('targetted-image').style.backgroundImage = "url('"+defending_ship.chosen_pilot.fore_crippled_path+"')";
            }
            //Set flip button
            document.getElementById('target-lock-view-flip-button-defender').onclick = function(){flip_button_for_target_lock_view("targetted-image",defending_ship,"agility-tl-defend","hull-tl-defend","shield-tl-defend")};
            document.getElementById('target-lock-view-flip-button-defender').style.visibility = "visible";
        }
        else
        {
            document.getElementById('target-lock-view-flip-button-defender').style.visibility = "hidden";
        }
        document.getElementById('energy-image-tl-defender').style.visibility = "visible";
        document.getElementById('energy-tl-defend').style.visibility = "visible";
    }

    //Set removal button
    document.getElementById('target-lock-remove-button').onclick= function(){target_locks.splice(target_index,1);
                                                                             sessionStorage.setItem("all_target_locks",JSON.stringify(target_locks));
                                                                             hide_pop_up('target-lock-view-pop-up');
                                                                             hide_large_ship_flip_button_and_energy_stat_on_target_lock_view();
                                                                             set_up_target_lock_list();};
}

function hide_large_ship_flip_button_and_energy_stat_on_target_lock_view()
{
    document.getElementById('target-lock-view-flip-button-attacker').style.visibility = "hidden";
    document.getElementById('energy-image-tl-attacker').style.visibility = "hidden";
    document.getElementById('energy-tl-attack').style.visibility = "hidden";
    document.getElementById('target-lock-view-flip-button-defender').style.visibility = "hidden";
    document.getElementById('energy-image-tl-defender').style.visibility = "hidden";
    document.getElementById('energy-tl-defend').style.visibility = "hidden";
}

function flip_button_for_target_lock_view(image_element_id,passed_ship,agility_id,hull_id,shield_id)
{
    var image_element = document.getElementById(image_element_id);
    if(image_element.getAttribute('flipped')=='false')
    {
        if(passed_ship.current_aft_hull <= 0)
        {
            image_element.style.backgroundImage = "url('"+passed_ship.chosen_pilot.aft_crippled_path+"')";
            document.getElementById(agility_id).textContent = passed_ship.current_aft_agility;
            document.getElementById(hull_id).textContent = passed_ship.current_aft_hull;
            document.getElementById(shield_id).textContent = passed_ship.current_aft_shields;
        }
        else
        {
            image_element.style.backgroundImage = "url('"+passed_ship.chosen_pilot.aft_card_path+"')";
            document.getElementById(agility_id).textContent = passed_ship.current_aft_agility;
            document.getElementById(hull_id).textContent = passed_ship.current_aft_hull;
            document.getElementById(shield_id).textContent = passed_ship.current_aft_shields;
        }
        image_element.setAttribute('flipped','true');
    }
    else if(image_element.getAttribute('flipped')=='true')
    {
        if(passed_ship.current_hull <= 0)
        {
            image_element.style.backgroundImage = "url('"+passed_ship.chosen_pilot.fore_crippled_path+"')";
            document.getElementById(agility_id).textContent = passed_ship.current_agility;
            document.getElementById(hull_id).textContent = passed_ship.current_hull;
            document.getElementById(shield_id).textContent = passed_ship.current_shields;
        }
        else
        {
            image_element.style.backgroundImage = "url('"+passed_ship.chosen_pilot.image_path+"')";
            document.getElementById(agility_id).textContent = passed_ship.current_agility;
            document.getElementById(hull_id).textContent = passed_ship.current_hull;
            document.getElementById(shield_id).textContent = passed_ship.current_sheilds;
        }
        image_element.setAttribute('flipped','false');
    }
    else
    {
        document.getElementById('notification-pop-up-title').textContent = "ERROR: Unable to determine if attacker or defender is being flipped to which orientation.";
        show_pop_up("Notification-pop-up");

    }

}

//Thiis function will cycles through types of cards based on what is showing up currently.
function cycle_button_click()
{
    var index_attribute = 0;
    Array.from(document.getElementsByClassName("card-type-image")).forEach(card=>{
         card_list.removeChild(card);
    })
    
    if(card_type_label.innerText == "Upgrades")
    {
        card_type_label.textContent = "Critical Hit Cards";
        all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.forEach(crit_hit=>{
            var crit_hit_div = document.createElement("div");
            crit_hit_div.className = "card-type-image";
            crit_hit_div.style.backgroundImage = "url('"+crit_hit.image_path+"')";
            crit_hit_div.style.border = "1px solid white";
            crit_hit_div.style.backgroundRepeat = "no-repeat";
            crit_hit_div.style.backgroundSize = "100% 100%";
            crit_hit_div.style.margin = "3%";
            crit_hit_div.style.height = "75%";
            crit_hit_div.style.flex = "0 0 90%";//width is here.
            let input_index = index_attribute;//I did that beccase as index attribute changed, it moved all of the previous cards to the same number rather than each card having its own index number.
            crit_hit_div.onclick =function(){show_pop_up_with_card_type_and_index("card-removal-pop-up",input_index,card_type_label.textContent);};
            card_list.appendChild(crit_hit_div);
            index_attribute++;
        })
    }
    else if(card_type_label.innerText == "Critical Hit Cards")
    {
        card_type_label.textContent = "Conditions";
        all_teams[team_index].ship_list[selected_ship_index].conditions.forEach(condition=>{
            var condition_div = document.createElement("div");
            condition_div.className = "card-type-image";
            condition_div.style.backgroundImage = "url('"+condition.image_path+"')";
            condition_div.style.border = "1px solid white";
            condition_div.style.backgroundRepeat = "no-repeat";
            condition_div.style.backgroundSize = "100% 100%";
            condition_div.style.margin = "3%";
            condition_div.style.height = "75%";
            condition_div.style.flex = "0 0 90%";//width is here.
            let input_index = index_attribute;//I did that beccase as index attribute changed, it moved all of the previous cards to the same number rather than each card having its own index number.
            condition_div.onclick =function(){show_pop_up_with_card_type_and_index("card-removal-pop-up",input_index,card_type_label.textContent);};
            condition_div.setAttribute("index",index_attribute);
            card_list.appendChild(condition_div);
            index_attribute++;
        })
    }
    else if(card_type_label.innerText == "Conditions")
    {
        card_type_label.textContent = "Upgrades";
        all_teams[team_index].ship_list[selected_ship_index].upgrades.forEach(upgrade=>{
            var upgrade_div = document.createElement("div");
            upgrade_div.className = "card-type-image";
            if(upgrade.characteristics != null && upgrade.characteristics.split("*").includes("Dual"))
            {
                upgrade_div.style.border = "3px solid red";
                if (upgrade.orientation == "front")
                {
                    upgrade_div.style.backgroundImage = "url('"+upgrade.image_path.split("\n")[0]+"')";
                }
                else if(upgrade.orientation  == "back")
                {
                    upgrade_div.style.backgroundImage = "url('"+upgrade.image_path.split("\n")[1]+"')";
                }
                else
                {
                    document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine orientation type of dual sided upgrade.";
                    show_pop_up("Notification-pop-up");
                }
            }
            else
            {
                upgrade_div.style.backgroundImage = "url('"+upgrade.image_path+"')";
                upgrade_div.style.border = "1px solid white";
            }
            upgrade_div.style.backgroundRepeat = "no-repeat";
            upgrade_div.style.backgroundSize = "100% 100%";
            upgrade_div.style.margin = "3%";
            upgrade_div.style.height = "75%";
            upgrade_div.style.flex = "0 0 90%";//Width is here.
            let input_index = index_attribute;//I did that beccase as index attribute changed, it moved all of the previous cards to the same number rather than each card having its own index number.
            upgrade_div.onclick =function(){show_pop_up_with_card_type_and_index("card-removal-pop-up",input_index,card_type_label.textContent);};
            upgrade_div.setAttribute("index",index_attribute);
            card_list.appendChild(upgrade_div);
            index_attribute++;
        })
    }
    else
    {
        document.getElementById('notification-pop-up-title').textContent = "ERROR: No card type could be determined: "+card_type_label.innerText;
        show_pop_up("Notification-pop-up");
    }
    
}
//This function takes in an id and will make any pop up show up depending on the pop up id.
function show_pop_up(pop_up_id)
{
    let overlay = document.getElementById("overlay");
    let pop_up = document.getElementById(pop_up_id);
    overlay.style.opacity = 1;
    pop_up.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    document.getElementById(pop_up_id).focus();
}
//This function takes in an id and will make any pop up disappear depending on the pop up id.
function hide_pop_up(pop_up_id)
{
    let overlay = document.getElementById("overlay");
    let pop_up = document.getElementById(pop_up_id);
    overlay.style.opacity = 0;
    pop_up.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
}
//This function will make a pop up visible and have the card in question to remove or flip if it is a two sided upgrade.
function show_pop_up_with_card_type_and_index(pop_up_id, index, card_type)
{
    let pop_up = document.getElementById(pop_up_id);
    let overlay = document.getElementById("overlay");
    let removal_image = document.getElementById("removal-image");
    let yes_button = document.getElementById("yes-remove-button");//Used to set the type of card and index of that card if the yes button is pressed.
    if(card_type == "Upgrades")
    {
        if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].characteristics!= null &&
           all_teams[team_index].ship_list[selected_ship_index].upgrades[index].characteristics.includes("Dual"))
        {
            removal_image.style.border = "3px solid red";
            document.getElementById("flip-button-for-removal-pop-up").style.visibility ="Visible";
            document.getElementById("flip-button-for-removal-pop-up").onclick = function(){flip_button_click_for_dual_sided_upgrades('removal-image',index)};
            if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "front")
            {
                removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].image_path.split("\n")[0]+"')";
            }
            else if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "back")
            {
                removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].image_path.split("\n")[1]+"')";
            }
            else
            {
                document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine orientation of an upgrade in the show remove pop up function.";
                show_pop_up("Notification-pop-up");
            }

        }
        else
        {
            removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].image_path+"')";
        }
        yes_button.onclick = function(){remove_card(card_type,index)};
    }
    else if(card_type == "Conditions")
    {
        removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].conditions[index].image_path+"')";
        yes_button.onclick = function(){remove_card(card_type,index)};
    }
    else if(card_type == "Critical Hit Cards")
    {
        removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards[index].image_path+"')";
        yes_button.onclick = function(){remove_card(card_type,index)};
    }
    else
    {
        document.getElementById('notification-pop-up-title').textContent = "ERROR: Cannot determine what kind of card will show up in the removal pop up.";
        show_pop_up("Notification-pop-up");
    }
    overlay.style.opacity = 1;
    pop_up.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    document.getElementById(pop_up_id).focus();
}


/*
These function are for assigning cards to a ship.
*/

//Adds a critical hit card to the current ship and then saves to the all teams data set. It then closes the pop-up.
function assign_critical_hit_card()
{
    var crit_hit_assign_index = Math.floor(Math.random() * game_data.all_crit_cards.length);
    all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.push(JSON.parse(JSON.stringify(game_data.all_crit_cards[crit_hit_assign_index])));//Used parse and stringify because these are used to deep copy and object so there is a seperate instance besides the one in game data.
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));//save to all teams.
    //change card box to critical hit cards.
    card_type_label.innerText = "Upgrades";
    cycle_button_click();
    //end section to change card box
    hide_pop_up("crit-hit-pop-up");
}

//Adds a critical hit card for a large ship.
function assign_large_ship_crit_card(section)
{
    if(section == "fore")
    {
        var crit_hit_assign_index = Math.floor(Math.random() * all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crit_hit_cards_fore.length);
        all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.push(JSON.parse(JSON.stringify( all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crit_hit_cards_fore[crit_hit_assign_index])));
    }
    else if(section == "aft")
    {
        var crit_hit_assign_index = Math.floor(Math.random() * all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crit_hit_cards_aft.length);
        all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.push(JSON.parse(JSON.stringify( all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crit_hit_cards_aft[crit_hit_assign_index])));
    }
    else
    {
        document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine card section for crit hit assignment." ;
        show_pop_up("Notification-pop-up");
        return;
    }
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));//save to all teams.
    //change card box to critical hit cards.
    card_type_label.innerText = "Upgrades";
    cycle_button_click();
    //end section to change card box
    hide_pop_up("crit-hit-pop-up-for-large-ship");
}

//Will cycle image and condition index to previous condition.
function previous_condition()
{
    if(condition_index <= 0)
    {
        condition_index = game_data.all_conditions.length -1;
    }
    else 
    {
        condition_index --;
    }
    document.getElementById("condition-pop-up-image").style.backgroundImage = "url('"+game_data.all_conditions[condition_index].image_path+"')";
}
//Will cycle image and condition index to next condition.
function next_condition()
{
    if(condition_index >= game_data.all_conditions.length-1)
    {
        condition_index = 0;
    }
    else
    {
        condition_index++;
    }
    document.getElementById("condition-pop-up-image").style.backgroundImage = "url('"+game_data.all_conditions[condition_index].image_path+"')";
}

//Assigns selected condtion to ship, saves all teams, then shows all teams.
function assign_condition()
{
    all_teams[team_index].ship_list[selected_ship_index].conditions.push(JSON.parse(JSON.stringify(game_data.all_conditions[condition_index])));//Used parse and stringify because these are used to deep copy and object so there is a seperate instance besides the one in game data.
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));//save to all teams.
    card_type_label.innerText = "Critical Hit Cards";
    cycle_button_click();
    hide_pop_up("condition-pop-up");
}

//changes the maneuver for the ship to select.
function next_maneuver_click()
{
    if(maneuver_index >= all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers.length -1)
    {
        maneuver_index = 0;
    }
    else 
    {
        maneuver_index++;
    }

    if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
    all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeOneCard")
    {
        energy_gained_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].energy_symbol_path+"')";
    }

    console.log("maneuver index: "+maneuver_index);
    maneuver_type_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].maneuver_symbol_path+"')";
    maneuver_range_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].range_symbol_path+"')";
}

//chanes the maneuver for the ship to select.
function previous_maneuver_click()
{
    if(maneuver_index <= 0)
    {
        maneuver_index = all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers.length -1;
    }
    else 
    {
        maneuver_index--;
    }

    if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
    all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeOneCard")
    {
        energy_gained_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].energy_symbol_path+"')";
    }

    console.log("maneuver index: "+maneuver_index);
    maneuver_type_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].maneuver_symbol_path+"')";
    maneuver_range_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].range_symbol_path+"')";
}

function flip_button_click_for_large_ships(element_name)
{
    if(all_teams[team_index].ship_list[selected_ship_index].aft_showing == false)//display aft.
    {
        if(all_teams[team_index].ship_list[selected_ship_index].current_aft_hull <= 0)//show crippled aft.
        {
            document.getElementById(element_name).style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.aft_crippled_path+"')";
        }
        else//show regular aft.
        {
            document.getElementById(element_name).style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.aft_card_path+"')";
        }
        //Change stats and stat onclicks to refelect the aft side of the ship.
        document.getElementById('agility-image').onclick = function(){augment_stat_quantity('current_aft_agility','agility-image','agility-text')};
        document.getElementById('agility-text').onclick = function(){augment_stat_quantity('current_aft_agility','agility-image','agility-text')};
        document.getElementById('hull-image').onclick = function(){augment_stat_quantity('current_aft_hull','hull-image','hull-text')};
        document.getElementById('hull-text').onclick = function(){augment_stat_quantity('current_aft_hull','hull-image','hull-text')};
        document.getElementById('shield-image').onclick = function(){augment_stat_quantity('current_aft_shields','shield-image','shield-text')};
        document.getElementById('shield-text').onclick = function(){augment_stat_quantity('current_aft_shields','shield-image','shield-text')};
        document.getElementById('agility-text').textContent = all_teams[team_index].ship_list[selected_ship_index].current_aft_agility;
        document.getElementById('hull-text').textContent = all_teams[team_index].ship_list[selected_ship_index].current_aft_hull;
        document.getElementById('shield-text').textContent = all_teams[team_index].ship_list[selected_ship_index].current_aft_shields;
        all_teams[team_index].ship_list[selected_ship_index].aft_showing = true;
    }
    else//display fore.
    {
        if(all_teams[team_index].ship_list[selected_ship_index].current_hull <=0)//show crippled fore.
        {
            document.getElementById(element_name).style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.fore_crippled_path+"')";
        }
        else//show regular fore.
        {
            document.getElementById(element_name).style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.image_path+"')";
        }
                //Change stats and stat onclicks to refelect the fore side of the ship.
                document.getElementById('agility-image').onclick = function(){augment_stat_quantity('current_agility','agility-image','agility-text')};
                document.getElementById('agility-text').onclick = function(){augment_stat_quantity('current_agility','agility-image','agility-text')};
                document.getElementById('hull-image').onclick = function(){augment_stat_quantity('current_hull','hull-image','hull-text')};
                document.getElementById('hull-text').onclick = function(){augment_stat_quantity('current_hull','hull-image','hull-text')};
                document.getElementById('shield-image').onclick = function(){augment_stat_quantity('current_sheilds','shield-image','shield-text')};
                document.getElementById('shield-text').onclick = function(){augment_stat_quantity('current_sheilds','shield-image','shield-text')};
                document.getElementById('agility-text').textContent = all_teams[team_index].ship_list[selected_ship_index].current_agility;
                document.getElementById('hull-text').textContent = all_teams[team_index].ship_list[selected_ship_index].current_hull;
                document.getElementById('shield-text').textContent = all_teams[team_index].ship_list[selected_ship_index].current_sheilds;
                all_teams[team_index].ship_list[selected_ship_index].aft_showing = false;
    }
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));//Save aft showing change.
}

//This will flip the card in the remove card pop up but also flip the upgrade in question on the card list permanently.
function flip_button_click_for_dual_sided_upgrades(flip_button_element_name,index)
{
    let image_div = document.getElementById(flip_button_element_name);
    if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "front")
    {
            image_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].image_path.split('\n')[1]+"')";
            all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation = "back";
            card_type_label.textContent = "Conditions";
            cycle_button_click();
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    }
    else if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "back")
    {
        image_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].image_path.split('\n')[0]+"')";
        all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation = "front";
        card_type_label.textContent = "Conditions";
        cycle_button_click();
        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    }
    else
    {
        document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine flip button upgrade orientation type." ;
        show_pop_up("Notification-pop-up");
    }
}

function remove_card(card_type,index)
{
    if(card_type == "Upgrades")
    {
        all_teams[team_index].ship_list[selected_ship_index].upgrades.splice(index,1);
        card_type_label.textContent = "Conditions";
        cycle_button_click();
    }
    else if(card_type == "Conditions")
    {
        all_teams[team_index].ship_list[selected_ship_index].conditions.splice(index,1);
        card_type_label.textContent = "Critical Hit Cards";
        cycle_button_click();
    }
    else if(card_type == "Critical Hit Cards")
    {
        all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.splice(index,1);
        card_type_label.textContent = "Upgrades";
        cycle_button_click();
    }
    else
    {
        document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine card type while trying to remove card." ;
        show_pop_up("Notification-pop-up");
        return;
    }
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    hide_pop_up('card-removal-pop-up');
    document.getElementById('flip-button-for-removal-pop-up').style.visibility ='Hidden';
    document.getElementById('removal-image').style.border = '1px solid white';
}

//This will be to show the pop up for changing the quantity of a token. The tokene type will be used in an eval statement and the parent id will be used to get the background image
function augment_token_quantity(token_type,parent_id)
{
    var img = document.getElementById(parent_id),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bg_image_url = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    document.getElementById('token-image').style.backgroundImage = "url('"+bg_image_url+"')";
    let eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;
    eval(eval_string);
    show_pop_up('token-quantity-pop-up');
    document.getElementById("plus-button").onclick = function(){plus_button_click(token_type,parent_id)};
    document.getElementById("minus-button").onclick = function(){minus_button_click(token_type,parent_id)};

}

function augment_stat_quantity(token_type,parent_image,parent_text)
{
    var img = document.getElementById(parent_image),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bg_image_url = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    document.getElementById('token-image').style.backgroundImage = "url('"+bg_image_url+"')";
    let eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;
    eval(eval_string);
    show_pop_up('token-quantity-pop-up');
    document.getElementById("plus-button").onclick = function(){plus_button_click(token_type,parent_text)};
    document.getElementById("minus-button").onclick = function(){minus_button_click(token_type,parent_text)};
}

//This is what happens when you click the plus button when augmenting your number of tokens.
function plus_button_click(token_type,parent_id)
{
    let parent_element = document.getElementById(parent_id);
    var eval_string = "all_teams[team_index].ship_list[selected_ship_index]."+token_type+"++";//Increase the token type by one.
    eval(eval_string);
    eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;//Update pop up with the correct number of this token.
    eval(eval_string);
    eval_string = "parent_element.textContent = all_teams[team_index].ship_list[selected_ship_index]."+token_type;//Update token box element.
    eval(eval_string);
    parent_element.style.opacity = 1;
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

//This is what happens when you click the minus button when augmenting your number of tokens.
function minus_button_click(token_type,parent_id)
{
    let parent_element = document.getElementById(parent_id);
    var eval_string = "if(all_teams[team_index].ship_list[selected_ship_index]."+token_type+" >0){all_teams[team_index].ship_list[selected_ship_index]."+token_type+"--;}";
    eval(eval_string);
    eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;
    eval(eval_string);
    eval_string = "parent_element.textContent = all_teams[team_index].ship_list[selected_ship_index]."+token_type;//Update token box element.
    eval(eval_string);
    //The following line with remove text fromt the box, set opacity back to 0.25 and reset the token quantity to zero if it somehow got below zero.
    eval_string = "if(all_teams[team_index].ship_list[selected_ship_index]."+token_type+" <=0){ parent_element.style.opacity = 0.25; all_teams[team_index].ship_list[selected_ship_index]."+token_type+"=0}";
    eval(eval_string);
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

//This function will save important indecies and then go to the next screen.
function go_to_upgrade_screen()
{
    sessionStorage.setItem("selected_ship_index",selected_ship_index);
    sessionStorage.setItem("team_index",team_index);
    window.location.href = './Alter-Upgrades-Screen/Alter-Upgrades-Screen.html';
}

//This function will iterate the team index for target lock so that player can target a specific team.
function next_team_button_click(input_element_name)
{
    target_lock_and_search_index++;
    if(target_lock_and_search_index >= all_teams.length)
    {
        target_lock_and_search_index = 0;
    }
    document.getElementById(input_element_name).textContent=all_teams[target_lock_and_search_index].team_name;
}

//This function will deiterate the team index for target lock so that the player can target a specific team.
function previous_team_button_click(input_element_name)
{
    target_lock_and_search_index--;
    if(target_lock_and_search_index < 0)
    {
        target_lock_and_search_index = all_teams.length-1;
    }
    document.getElementById(input_element_name).textContent=all_teams[target_lock_and_search_index].team_name;
}

//This function will verify and check to make sure a valid target lock can be applied.
function add_target_lock()
{
    var target_team = all_teams[target_lock_and_search_index];
    var target_roster = parseInt(document.getElementById('roster-number-input-target-lock').value,10);

    if(target_roster == null || target_roster == undefined || isNaN(target_roster)||target_roster<0)
    {
        alert("The roster 'number' you picked is invalid. Please enter only a positive number.");
        document.getElementById('roster-number-input-target-lock').value = "";
        document.getElementById('roster-number-input-target-lock').focus();
        return;
    }
    let ship = target_team.ship_list[target_team.ship_list.map(function(e){return e.roster_number}).indexOf(target_roster)];
    if(ship == null || ship == undefined)
    {
        alert("The roster number was not found on this team.");
        document.getElementById('roster-number-input-target-lock').value = "";
        document.getElementById('roster-number-input-target-lock').focus();
        return;
    }
    target_locks.push(new target_lock(get_next_available_target_number(target_locks),all_teams[team_index].team_name,all_teams[team_index].ship_list[selected_ship_index].roster_number,target_team.team_name,ship.roster_number));
    sessionStorage.setItem("all_target_locks",JSON.stringify(target_locks));
    document.getElementById('roster-number-input-target-lock').value = "";
    set_up_target_lock_list();
    hide_pop_up('target-lock-pop-up');
    target_lock_and_search_index = 0;//Reset list back to first team for the next time someone pressed the add target lock button.
}

function find_and_display_searching_ship()
{
    var target_team = all_teams[target_lock_and_search_index];
    var target_roster = parseInt(document.getElementById('roster-number-input-search').value,10);

    if(target_roster == null || target_roster == undefined || isNaN(target_roster)||target_roster<0)
    {
        alert("The roster 'number' you picked is invalid. Please enter only a positive number.");
        document.getElementById('roster-number-input-search').value = "";
        document.getElementById('roster-number-input-search').focus();
        return;
    }
    let ship_index= target_team.ship_list.map(function(e){return e.roster_number}).indexOf(target_roster);
    let ship = target_team.ship_list[ship_index];
    if(ship == null || ship == undefined)
    {
        alert("The roster number was not found on this team.");
        document.getElementById('roster-number-input-search').value = "";
        document.getElementById('roster-number-input-search').focus();
        return;
    }

    sessionStorage.setItem("saved_team_index",team_index);
    sessionStorage.setItem("saved_ship_index",selected_ship_index);
    sessionStorage.setItem("team_index",target_lock_and_search_index);
    sessionStorage.setItem("selected_ship_index",ship_index);
    location.reload();
}

//Used when the return button is pressed to go out of a search back to the current player's screen.
function return_to_main_screen()
{
    sessionStorage.setItem("team_index",sessionStorage.getItem("saved_team_index"));
    sessionStorage.setItem("selected_ship_index",sessionStorage.getItem("saved_ship_index"));
    sessionStorage.removeItem("saved_team_index");
    sessionStorage.removeItem("saved_ship_index");
    location.reload();
}

function choose_which_crit_hit_screen_appears()
{
    if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard"||
    all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeOneCard")
    {
        show_pop_up('crit-hit-pop-up-for-large-ship');
    }
    else
    {
        show_pop_up('crit-hit-pop-up');
    }
}

function check_for_death()
{
    if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        var aft_gone = false;
        var fore_gone = false
        if(all_teams[team_index].ship_list[selected_ship_index].current_hull <= 0)
        {
            fore_gone = true;
            all_teams[team_index].ship_list[selected_ship_index].current_attack = all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crippled_attack;
            all_teams[team_index].ship_list[selected_ship_index].current_agility = 0;
            all_teams[team_index].ship_list[selected_ship_index].current_hull = 0;
            all_teams[team_index].ship_list[selected_ship_index].current_sheilds = 0;
            if(all_teams[team_index].ship_list[selected_ship_index].aft_showing == false)
            {
                pilot_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.fore_crippled_path+"')";
            }
        }
        if(all_teams[team_index].ship_list[selected_ship_index].current_aft_hull <= 0)
        {
            aft_gone = true;
            all_teams[team_index].ship_list[selected_ship_index].current_energy = all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crippled_energy;
            all_teams[team_index].ship_list[selected_ship_index].current_aft_agility = 0;
            all_teams[team_index].ship_list[selected_ship_index].current_aft_hull = 0;
            all_teams[team_index].ship_list[selected_ship_index].current_aft_sheilds = 0;
            if(all_teams[team_index].ship_list[selected_ship_index].aft_showing == true)
            {
                pilot_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.aft_crippled_path+"')";
            }
        }
        if(aft_gone == true && fore_gone == true)
        {
            document.getElementById('kaboom-button').style.visibility = 'visible';
            show_pop_up('ship-death-pop-up');
        }
    }
    else
    {
        if(all_teams[team_index].ship_list[selected_ship_index].current_hull <= 0)
        {
            show_pop_up('ship-death-pop-up');
        }
    }
}

function ship_is_dead()
{
    hide_pop_up('ship-death-pop-up');
    all_teams[team_index].ship_list.splice(selected_ship_index,1);
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    var game_over = false; 
    if(all_teams[team_index].ship_list.length == 0)
    {
        //Team is out of the game.
        var team_name = all_teams[team_index].team_name;
        all_teams.splice(team_index,1);
        if(team_index >= all_teams.length)//Just in case the last team in the list is eliminated first.
        {
            team_index = all_teams.length -1;
            sessionStorage.setItem("team_index",team_index);
        }
        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
        document.getElementById('notification-pop-up-title').textContent = team_name+" has been eliminated from the game!";
        document.getElementById('notificatin-ok-button').onclick = function(){location.reload();};
        show_pop_up("Notification-pop-up");
        if(all_teams.length <=1)
        {
            game_over = true;
        }
        else
        {
            return;
        }
    }
    if(all_teams.length == 0 || game_over == true)
    {
        //game over.
        if(all_teams.length == 0)
        {
            document.getElementById('notification-pop-up-title').textContent = "All teams eliminated! \n GAME OVER!";
        }
        else
        {
            document.getElementById('notification-pop-up-title').textContent = all_teams[team_index].team_name+" is victorious! \n GAME OVER!";
        }
        show_pop_up("Notification-pop-up");
        document.getElementById('notificatin-ok-button').onclick = function(){window.location.href = "../../Team-Screen/Team-Screen.html"};
        sessionStorage.clear();
        sessionStorage.setItem("game_data",JSON.stringify(game_data));
        if(all_teams.length > 0)
        {
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
        }
    }
    else
    {
        location.reload();
    }
}

function revive_ship()
{
    all_teams[team_index].ship_list[selected_ship_index].current_hull =1;
    if(all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.ship_type == "largeTwoCard" &&
    all_teams[team_index].ship_list[selected_ship_index].aft_showing == true)//Reset a two sided card back to the front.
    {
        all_teams[team_index].ship_list[selected_ship_index].aft_showing = false;
    }
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams)); 
    location.reload();
}

function play_death_music()
{
    var death_music_chance = Math.floor(Math.random() * 10);
    if(death_music_chance == 10)
    {
        var minion_ship_death = new Audio('https://docs.google.com/uc?export=download&id=1l3iV5tbP4xIg_4Y0q4f7eDGxbGkyv-W1');
        minion_ship_death.play();
    }
    else
    {
        var regular_ship_death =  new Audio('https://docs.google.com/uc?export=download&id=1Id2DleeQ8isNQibcCOsHyvlyO2iIsWDc');
        regular_ship_death.play();       
    }
}

function main_back_button_click()
{

}

function go_to_next_ship_movement_phase()
{
    var maneuver_attack_index =sessionStorage.getItem("movement_attack_index");
    maneuver_attack_index ++;
    var total_ships_left = 0;
    all_teams.forEach(team=>{
        total_ships_left = total_ships_left + team.ship_list.length;
    })
    if(maneuver_attack_index >= total_ships_left)//Go to attack phase.
    {
        sessionStorage.setItem("phase","attack");
        maneuver_attack_index --;
        sessionStorage.setItem("movement_attack_index",maneuver_attack_index);
    }
    else
    {
        sessionStorage.setItem("movement_attack_index",maneuver_attack_index);
    }
    location.reload();
}

function go_to_next_ship_attack_phase()
{
    var maneuver_attack_index =sessionStorage.getItem("movement_attack_index");
    maneuver_attack_index --;
    var total_ships_left = 0;
    if(maneuver_attack_index < 0)//Go to maneuver Selection phase.
    {
        sessionStorage.removeItem("phase");//Phase is used to determine when phase we are in, if there is no phase in sessionstorage, then we are in maneuver selection.
        sessionStorage.removeItem("movement_attack_index");
        sessionStorage.removeItem("team_index");
        sessionStorage.removeItem("selected_ship_index");
        assign_new_round_initiative_token();
    }
    else
    {
        sessionStorage.setItem("movement_attack_index",maneuver_attack_index);
        location.reload();//Moved this to the else segment so a message can appear at the end of the round, when the ok button is clicked, it will reload the page so that it does not happen automatically.
    }
}

function go_to_next_ship_maneuver_selection()
{
    //save maneuver
    all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver = all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index];
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    selected_ship_index++;
    if(selected_ship_index >= all_teams[team_index].ship_list.length)//Move to next team.
    {
        team_index++;
        selected_ship_index = 0;
    }
    if(team_index >= all_teams.length)
    {
        sessionStorage.removeItem("team_index");
        sessionStorage.removeItem("selected_ship_index");
        //move to movement phase.
        sessionStorage.setItem("phase","movement");
        sessionStorage.setItem("movement_attack_index",0);
        location.reload();
    }
    else
    {
        sessionStorage.setItem("team_index",team_index);
        sessionStorage.setItem("selected_ship_index",selected_ship_index);
        location.reload();
    }
}

function make_phase_changes()//Alter the appropriate elements to get to the correct phase.
{
    if(sessionStorage.getItem("phase")!=null && sessionStorage.getItem("phase")!= undefined)//its not the maneuver selection phase if this is true.
    {
        var turn_index = parseInt(sessionStorage.getItem("movement_attack_index"),10);           
        var indecies = get_pilot_whos_turn_it_is(turn_index,all_teams);
        team_index = indecies[0];
        selected_ship_index = indecies[1];
        sessionStorage.setItem("team_index",team_index);
        sessionStorage.setItem("selected_ship_storage",selected_ship_index);
        document.getElementById('previous-maneuver-button').style.visibility = "hidden";
        document.getElementById('next-maneuver-button').style.visibility = "hidden";
        document.getElementById('team-mate-maneuvers').style.visibility = "hidden";
        document.getElementById('team-mate-maneuvers-label').style.visibility = "hidden";
        document.getElementById('maneuver-type').style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver.maneuver_symbol_path+"')";
        document.getElementById('maneuver-range').style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver.range_symbol_path+"')";
        if(sessionStorage.getItem("phase") == "movement")
        {
            //set team index, selected ship index, and all teams. also set holder for normal all teams.
            main_title.textContent = "Movement Phase";
            document.getElementById('select-button').onclick = function(){go_to_next_ship_movement_phase()};
        }
        else if(sessionStorage.getItem("phase") == "attack")
        {
            main_title.textContent = "Attack Phase";
            document.getElementById('select-button').onclick = function(){go_to_next_ship_attack_phase()};
            maneuver_range_label.style.visibility = "hidden";
            maneuver_type_label.style.visibility = "hidden";
            document.getElementById('dice-container').style.visibility = "visible";
            //the energy gained symbol will be hidden by the set up screen function, I was unable to get it to happen here due to to order of events not being able to be changed.
        }
    }
}

function main_back_button_click()
{
    if(sessionStorage.getItem("phase") != null && sessionStorage.getItem("phase") != undefined)//movement or attack phase back button.
    {
        if(sessionStorage.getItem("phase") == "movement")
        {
            var movement_attack_index =  parseInt(sessionStorage.getItem("movement_attack_index"),10);
            if(movement_attack_index > 0)//Going back from movement to maneuver selection.
            {
                sessionStorage.setItem("movement_attack_index",(movement_attack_index-1));
                location.reload();
            }
            else//going back within maneuver selection.
            {
                sessionStorage.removeItem("phase");
                sessionStorage.removeItem("movement_attack_index");
                team_index = all_teams.length -1;
                selected_ship_index = all_teams[all_teams.length-1].ship_list.length -1;
                sessionStorage.setItem("team_index",team_index);
                sessionStorage.setItem("selected_ship_index",selected_ship_index);
                location.reload();
            }
        }
        else if(sessionStorage.getItem("phase") == "attack")
        {
            var movement_attack_index =  parseInt(sessionStorage.getItem("movement_attack_index"),10);
            var total_ships = 0;
            all_teams.forEach(team=>{
                total_ships = total_ships + team.ship_list.length;
            })
            total_ships = total_ships - 1;//This is to change the number into an array index.
            if(total_ships <= movement_attack_index)
            {
                sessionStorage.setItem("phase","movement");
                location.reload();
            }
            else
            {
                sessionStorage.setItem("movement_attack_index",(movement_attack_index+1));
                location.reload();         
            }
        }
        else
        {
            alert("ERROR: back button could not determine which phase the game is in.");
        }
    }
    else// maneuver selection back button if you are going back a team.
    {
        if(selected_ship_index == 0)//go back to previous team
        {
            team_index --;
            selected_ship_index = all_teams[team_index].ship_list.length -1;
            sessionStorage.setItem("team_index",team_index);
            sessionStorage.setItem("selected_ship_index",selected_ship_index);
            location.reload();
        }
        else//maneuver selection going back one ship.
        {
            selected_ship_index --;
            sessionStorage.setItem("selected_ship_index",selected_ship_index);
            location.reload();
        }
    }
}

function assign_new_round_initiative_token()
{
    for(var i=0; i < all_teams.length;i++)
    {
        if(all_teams[i].has_initiative_token == true)
        {
            var new_index = -1;
            all_teams[i].has_initiative_token = false;
            if((i+1)>= all_teams.length)
            {
                new_index = 0;
            }
            else
            {
                new_index = i+1;
            }
            all_teams[new_index].has_initiative_token = true;
            document.getElementById('notification-pop-up-title').textContent = "ROUND OVER! \n"+all_teams[new_index].team_name+" now has initiative.";
            document.getElementById('notificatin-ok-button').onclick = function(){location.reload()};
            show_pop_up("Notification-pop-up");
            return;
        }
    }
    alert("ERROR: No team was found with the initiative token!");
}