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
            card_list.appendChild(crit_hit_div);
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
            card_list.appendChild(condition_div);
        })
    }
    else if(card_type_label.innerText == "Conditions")
    {
        card_type_label.textContent = "Upgrades";
        all_teams[team_index].ship_list[selected_ship_index].upgrades.forEach(upgrade=>{
            var upgrade_div = document.createElement("div");
            upgrade_div.className = "card-type-image";
            upgrade_div.style.backgroundImage = "url('"+upgrade.image_path.split("\n")[0]+"')";
            if(upgrade.characteristics != null && upgrade.characteristics.split("*").includes("Dual"))
            {
                upgrade_div.style.border = "3px solid red";
            }
            else
            {
                upgrade_div.style.border = "1px solid white";
            }
            upgrade_div.style.backgroundRepeat = "no-repeat";
            upgrade_div.style.backgroundSize = "100% 100%";
            upgrade_div.style.margin = "3%";
            upgrade_div.style.height = "75%";
            upgrade_div.style.flex = "0 0 90%";//Width is here.
            card_list.appendChild(upgrade_div);
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

//Assignes selected condtion to ship, saves all teams, then shows all teams.
function assign_condition()
{
    all_teams[team_index].ship_list[selected_ship_index].conditions.push(JSON.parse(JSON.stringify(game_data.all_conditions[condition_index])));//Used parse and stringify because these are used to deep copy and object so there is a seperate instance besides the one in game data.
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));//save to all teams.
    card_type_label.innerText = "Critical Hit Cards";
    cycle_button_click();
    hide_pop_up("condition-pop-up");
}