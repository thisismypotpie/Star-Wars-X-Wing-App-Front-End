//Get data needed for this page.
var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
var game_data = JSON.parse(sessionStorage.getItem("game_data"));
var selected_ship_index = 0;//Used to determine which ship is being displayed.
var maneuver_index = 0;//Used to determine what maneuver is being displayed.
var team_index = 0;//Used to determine what team is being examined.
var condition_index = 0;//Used when selecting a conditions to add to a ship.

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
var card_type_label = document.getElementById("card-type-label");
var card_list = document.getElementById("card-box");
var team_name_label = document.getElementById("team-name-label");

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
card_type_label.textContent = "Conditions";
team_name_label.innerText = all_teams[team_index].team_name;
cycle_button_click();


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
                    alert("ERROR: Could not determine orientation type of dual sided upgrade.");
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
        alert("ERROR: No card type could be determined.");
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
                alert("ERROR: Could not determine orientation of an upgrade in the show remove pop up function.");
            }
        }
        else
        {
            removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].image_path+"')";
        }
    }
    else if(card_type == "Conditions")
    {
        removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].conditions[index].image_path+"')";
    }
    else if(card_type == "Critical Hit Cards")
    {
        removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards[index].image_path+"')";
    }
    else
    {
        alert("ERROR: Cannot determine what kind of card will show up in the removal pop up.");
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
    console.log("maneuver index: "+maneuver_index);
    maneuver_type_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].maneuver_symbol_path+"')";
    maneuver_range_label.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].range_symbol_path+"')";
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
        alert("ERROR: Could not determine flip button upgrade orientation type.");
    }
}

function augment_token_quantity(token_type)
{
    
}