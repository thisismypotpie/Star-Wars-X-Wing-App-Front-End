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

//This function will iterate the team index for target lock and searching so that player can target a specific team.
function next_team_button_click(input_element_name)
{
    target_lock_and_search_index++;
    if(target_lock_and_search_index >= all_teams.length)
    {
        target_lock_and_search_index = 0;
    }
    document.getElementById(input_element_name).textContent=all_teams[target_lock_and_search_index].team_name;
    if(input_element_name.includes("search"))
    {
        document.getElementById("roster-number-input-search").focus();
    }
    else
    {
        document.getElementById("roster-number-input-target-lock").focus();
    }
}

//This function will deiterate the team index for target lock  and searching so that the player can target a specific team.
function previous_team_button_click(input_element_name)
{
    target_lock_and_search_index--;
    if(target_lock_and_search_index < 0)
    {
        target_lock_and_search_index = all_teams.length-1;
    }
    document.getElementById(input_element_name).textContent=all_teams[target_lock_and_search_index].team_name;
    if(input_element_name.includes("search"))
    {
        document.getElementById("roster-number-input-search").focus();
    }
    else
    {
        document.getElementById("roster-number-input-target-lock").focus();
    }
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
    determine_flip_button_and_ship_visibility(attacking_ship,"target-lock-view-flip-button-attacker","energy-image-tl-attacker","energy-tl-attack");
    determine_flip_button_and_ship_visibility(defending_ship,"target-lock-view-flip-button-defender","energy-image-tl-defender","energy-tl-defend");

}

function determine_flip_button_and_ship_visibility(passed_ship,flip_id,energy_id,energy_text_id)
{
    if(passed_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard"||
    passed_ship.chosen_pilot.ship_name.ship_type == "largeOneCard")
    {
        document.getElementById(energy_id).style.visibility = "visible";
        document.getElementById(energy_text_id).style.visibility = "visible";
        if(passed_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
        {
            document.getElementById(flip_id).style.visibility = "visible";
        }       
    }
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

//If a ship dies, remove target locks associated with that ship.
function discard_related_target_locks()
{
    var locks = JSON.parse(sessionStorage.getItem("all_target_locks"));
    var dead_ship = all_teams[team_index].ship_list[selected_ship_index];
    if(locks == null || locks == undefined)
    {
        return;
    }

    for(var i=(locks.length-1); i >= 0;i--)
    {
        if((dead_ship.team_name == locks[i].targetting_team && locks[i].targetting_roster == dead_ship.roster_number)||
            (dead_ship.team_name == locks[i].targetted_team && locks[i].targetted_roster == dead_ship.roster_number))
        {
            alert("Removing lock: "+locks[i].assignment_number+" because it is related to the newly dead ship.");
            locks.splice(i,1);
        }
    }
    sessionStorage.setItem("all_target_locks",JSON.stringify(locks));
}