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
//Check if the back button should be visible or not.
if(team_index == 0 && selected_ship_index == 0 &&(sessionStorage.getItem("phase") == null  || sessionStorage.getItem("phase") == undefined))
{
    document.getElementById('back-button').style.visibility = "hidden";
}



//Check to see if we are in a search or the actual bunch of ships. We do this by seeing if there is a saved team and ship saved for when we return from a search.
if(sessionStorage.getItem("searching") != null &&
sessionStorage.getItem("searching") != undefined)
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
    document.getElementById('maneuver-energy').style.visibility = "hidden";
    document.getElementById('reveal-button').style.visibility = "visible";
    document.getElementById('reveal-button').textContent = "Reveal Maneuver";

        //Update maneuver card.
    document.getElementById('maneuver-card-display').style.backgroundImage = "url("+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.card+")";
    document.getElementById('maneuver-card-display').style.visibility = "visible";
    
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
//Display chosen maneuver if a ship has one. Must be in between these  functions to get data after it has been set but before it isapplied.
if(all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver!= null &&
    all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver!= undefined )
 {
         maneuver_index = all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver;
 }
set_up_maneuver_screen();
set_up_team_mate_maneuvers();
check_for_death();//This is to make sure that if a large ship has a crippled aft/fore, it will show up immediately.
check_for_conditions();//displats conditions first if a ship has them.
check_for_crit_hits();//Displays crit hits first if a ship has them.



//Set initiative token to be visible or not.
if(all_teams[team_index].has_initiative_token == true)
{
    document.getElementById('initiative-label').style.visibility = "visible";
}

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
            if(all_teams[team_index].ship_list[i].chosen_maneuver != null)
            {
                range_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[i].chosen_pilot.ship_name.maneuvers[all_teams[team_index].ship_list[i].chosen_maneuver].range_symbol_path+"')";
            }
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
            if(all_teams[team_index].ship_list[i].chosen_maneuver != null)
            {
                maneuver_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[i].chosen_pilot.ship_name.maneuvers[all_teams[team_index].ship_list[i].chosen_maneuver].maneuver_symbol_path+"')";
            }
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
                if(all_teams[team_index].ship_list[i].chosen_maneuver != null)
                {
                    energy_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[i].chosen_pilot.ship_name.maneuvers[all_teams[team_index].ship_list[i].chosen_maneuver].energy_symbol_path+"')"; 
                }           
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

function hide_large_ship_flip_button_and_energy_stat_on_target_lock_view()
{
    document.getElementById('target-lock-view-flip-button-attacker').style.visibility = "hidden";
    document.getElementById('energy-image-tl-attacker').style.visibility = "hidden";
    document.getElementById('energy-tl-attack').style.visibility = "hidden";
    document.getElementById('target-lock-view-flip-button-defender').style.visibility = "hidden";
    document.getElementById('energy-image-tl-defender').style.visibility = "hidden";
    document.getElementById('energy-tl-defend').style.visibility = "hidden";
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
            if(upgrade.upgrade.is_dual_sided == true)
            {
                upgrade_div.style.border = "3px solid red";
                if (upgrade.orientation == "front")
                {
                    upgrade_div.style.backgroundImage = "url('"+upgrade.upgrade.image_path.split("\n")[0]+"')";
                }
                else if(upgrade.orientation  == "back")
                {
                    upgrade_div.style.backgroundImage = "url('"+upgrade.upgrade.image_path.split("\n")[1]+"')";
                }
                else
                {
                    document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine orientation type of dual sided upgrade.";
                    show_pop_up("Notification-pop-up");
                }
            }
            else
            {
                upgrade_div.style.backgroundImage = "url('"+upgrade.upgrade.image_path+"')";
                upgrade_div.style.border = "1px solid white";
            }
            upgrade_div.style.backgroundRepeat = "no-repeat";
            upgrade_div.style.backgroundSize = "100% 100%";
            upgrade_div.style.margin = "3%";
            upgrade_div.style.height = "75%";
            upgrade_div.style.flex = "0 0 90%";//Width is here.
            upgrade_div.style.display = "grid";
            upgrade_div.style.gridTemplateColumns = "repeat(2,calc(100%/2))";
            upgrade_div.style.gridTemplateRows = "repeat(3,calc(100%/3))";
            let input_index = index_attribute;//I did that beccase as index attribute changed, it moved all of the previous cards to the same number rather than each card having its own index number.
            upgrade_div.onclick =function(){show_pop_up_with_card_type_and_index("card-removal-pop-up",input_index,card_type_label.textContent);};
            upgrade_div.setAttribute("index",index_attribute);
            if(upgrade.ordnance_tokens > 0)
            {
                var ordnance_token_quantity = document.createElement("div");
                ordnance_token_quantity.style.gridRow = "1";
                ordnance_token_quantity.style.gridColumn = "2";
                ordnance_token_quantity.style.backgroundImage = "url('https://i.imgur.com/DztMvcD.png')";
                ordnance_token_quantity.style.backgroundRepeat = "no-repeat";
                ordnance_token_quantity.style.backgroundSize = "100% 100%";
                ordnance_token_quantity.textContent = "X"+upgrade.ordnance_tokens;
                ordnance_token_quantity.style.fontSize = "xx-large";
                ordnance_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
                ordnance_token_quantity.style.textAlign = "right"
                ordnance_token_quantity.style.color = "white";
                upgrade_div.appendChild(ordnance_token_quantity);
            }
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
        if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].upgrade.is_dual_sided == true)
        {
            removal_image.style.border = "3px solid red";
            document.getElementById("flip-button-for-removal-pop-up").style.visibility ="Visible";
            document.getElementById("flip-button-for-removal-pop-up").onclick = function(){flip_button_click_for_dual_sided_upgrades('removal-image',index)};
            if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "front")
            {
                removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].upgrade.image_path.split("\n")[0]+"')";
            }
            else if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "back")
            {
                removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].upgrade.image_path.split("\n")[1]+"')";
            }
            else
            {
                document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine orientation of an upgrade in the show remove pop up function.";
                show_pop_up("Notification-pop-up");
            }

        }
        else
        {
            removal_image.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].upgrade.image_path+"')";
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
            image_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].upgrade.image_path.split('\n')[1]+"')";
            all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation = "back";
            card_type_label.textContent = "Conditions";
            cycle_button_click();
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    }
    else if(all_teams[team_index].ship_list[selected_ship_index].upgrades[index].orientation == "back")
    {
        image_div.style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].upgrades[index].upgrade.image_path.split('\n')[0]+"')";
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


//This function will save important indecies and then go to the next screen.
function go_to_upgrade_screen()
{
    sessionStorage.setItem("selected_ship_index",selected_ship_index);
    sessionStorage.setItem("team_index",team_index);
    window.location.href = './Alter-Upgrades-Screen/Alter-Upgrades-Screen.html';
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
        end_of_round_procedures();
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
    all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver = maneuver_index;
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
    if(sessionStorage.getItem("phase")!=null && 
       sessionStorage.getItem("phase")!= undefined &&
       (sessionStorage.getItem("searching") == null || sessionStorage.getItem("searching")==undefined))//its not the maneuver selection phase if this is true.
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
        //document.getElementById('maneuver-type').style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver].maneuver_symbol_path+"')";
        //document.getElementById('maneuver-range').style.backgroundImage = "url('"+all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[all_teams[team_index].ship_list[selected_ship_index].chosen_maneuver].range_symbol_path+"')";
        if(sessionStorage.getItem("phase") == "movement")
        {
            //set team index, selected ship index, and all teams. also set holder for normal all teams.
            main_title.textContent = "Movement Phase";
            document.getElementById('select-button').onclick = function(){go_to_next_ship_movement_phase()};
            document.getElementById('select-button').textContent = "Next";
        }
        else if(sessionStorage.getItem("phase") == "attack")
        {
            main_title.textContent = "Attack Phase";
            document.getElementById('select-button').onclick = function(){go_to_next_ship_attack_phase()};
            document.getElementById('select-button').textContent = "Next";
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

let isMobile = window.matchMedia("(max-width: 414px)").matches;

if (isMobile) {
    let gridContainer = document.getElementsByClassName('grid-container')[0];
    let teamPopUp = document.getElementById('team-move-pop-up');
    let cardBoxPopUp = document.getElementById('card-box-pop-up');
    let teamVis, cardVis = false;
    let hideElementsIDs = 
    [
        'card-type-label', 
        'team-mate-maneuvers-label',
        'card-box',
        'team-mate-maneuvers',
        'search-button',
        'cycle-button'
    ];

    hideElementsIDs.forEach(element => {
        document.getElementById(element).style.visibility = "hidden";
    });

    function styleButton(button, id, innerText) {
        button.id = id;
        button.innerHTML = innerText;
        button.style.backgroundImage = "url(https://i.imgur.com/RkyE0Xv.png)";
        button.style.webkitBackgroundSize = "100% 100%";
        button.style.backgroundRepeat = "no-repeat";
        button.style.backgroundColor = "transparent";
        button.style.border = "none";
    }

    let cardBoxBtn = document.createElement('button');
    styleButton(cardBoxBtn, 'reveal-upgrades-button', 'Card Box');
    cardBoxBtn.id = "reveal-upgrades-button";
    cardBoxBtn.style.gridRow = "2/4";
    cardBoxBtn.style.gridColumn = "9/12";

    let hideCardBoxBtn = document.createElement('button');
    styleButton(hideCardBoxBtn, 'hide-button', 'Hide');
    hideCardBoxBtn.style.gridRow = "11/13";
    hideCardBoxBtn.style.gridColumn = "11/13";

    hideCardBoxBtn.onclick = () => {
        cardVis = false;
        label.style.visibility = "hidden";
        box.style.visibility = "hidden";
        btn.style.visibility = "hidden";
        hide_pop_up('card-box-pop-up'); 
    }

    let label = document.getElementById('card-type-label');
    let box = document.getElementById('card-box');
    let btn = document.getElementById('cycle-button');
    cardBoxPopUp.appendChild(label);
    cardBoxPopUp.appendChild(box);
    cardBoxPopUp.appendChild(btn);
    cardBoxPopUp.appendChild(hideCardBoxBtn);

    function revealCardBox() {
        if (!cardVis) {
            show_pop_up('card-box-pop-up');
            label.style.visibility = "visible";
            box.style.visibility = "visible";
            btn.style.visibility = "visible";
            cardVis = true;
        } else {
            label.style.visibility = "hidden";
            box.style.visibility = "hidden";
            btn.style.visibility = "hidden";
            hide_pop_up('card-box-pop-up');
            cardVis = false;
        }
    }

    cardBoxBtn.onclick = revealCardBox;

    gridContainer.appendChild(cardBoxBtn);

    let revealTeammateManeuversBtn = document.createElement('button');
    styleButton(revealTeammateManeuversBtn, 'reveal-team-maneuver-button', 'Team Moves');
    revealTeammateManeuversBtn.style.gridRow = "2/4";
    revealTeammateManeuversBtn.style.gridColumn = "13/16";

    let hideTeamMoveBtn = document.createElement('button');
    styleButton(hideTeamMoveBtn, 'hide-button', 'Hide');
    hideTeamMoveBtn.style.gridRow = "11/13";
    hideTeamMoveBtn.style.gridColumn = "11/13";

    hideTeamMoveBtn.onclick = () => {
        teamVis = false;
        team_label.style.visibility = "hidden";
        team_box.style.visibility = "hidden";
        team_btn.style.visibility = "hidden";
        hide_pop_up('team-move-pop-up'); 
    }

    let team_label = document.getElementById('team-mate-maneuvers-label');
    let team_box = document.getElementById('team-mate-maneuvers');
    let team_btn = document.getElementById('search-button');
    teamPopUp.appendChild(team_label);
    teamPopUp.appendChild(team_box);
    teamPopUp.appendChild(team_btn);
    teamPopUp.appendChild(hideTeamMoveBtn);

    function revealTeamManeuvers() {
        if (!teamVis) {
            show_pop_up('team-move-pop-up');
            team_label.style.visibility = "visible";
            team_box.style.visibility = "visible";
            team_btn.style.visibility = "visible";
            teamVis = true;
        } else {
            team_label.style.visibility = "hidden";
            team_box.style.visibility = "hidden";
            team_btn.style.visibility = "hidden";
            hide_pop_up('team-move-pop-up');
            teamVis = false;
        }
    }

    revealTeammateManeuversBtn.onclick = revealTeamManeuvers;
    gridContainer.appendChild(revealTeammateManeuversBtn);
}