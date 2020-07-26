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
        var crit_hit_array = all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crit_hit_cards_fore;
        var crit_hit_assign_index = Math.floor(Math.random() *crit_hit_array.length)+crit_hit_array[0];
        var chosen_index = game_data.all_large_crit_hit_cards.map(function(e){return e.id}).indexOf(crit_hit_assign_index);
        all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.push(JSON.parse(JSON.stringify( game_data.all_large_crit_hit_cards[chosen_index])));
    }
    else if(section == "aft")
    {
        var crit_hit_array = all_teams[team_index].ship_list[selected_ship_index].chosen_pilot.ship_name.crit_hit_cards_aft;
        var crit_hit_assign_index = Math.floor(Math.random() *crit_hit_array.length)+crit_hit_array[0];
        var chosen_index = game_data.all_large_crit_hit_cards.map(function(e){return e.id}).indexOf(crit_hit_assign_index);
        all_teams[team_index].ship_list[selected_ship_index].critical_hit_cards.push(JSON.parse(JSON.stringify( game_data.all_large_crit_hit_cards[chosen_index])));
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

//Assigns selected condtion to ship, saves all teams, then shows all teams.
function assign_condition()
{
    all_teams[team_index].ship_list[selected_ship_index].conditions.push(JSON.parse(JSON.stringify(game_data.all_conditions[condition_index])));//Used parse and stringify because these are used to deep copy and object so there is a seperate instance besides the one in game data.
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));//save to all teams.
    card_type_label.innerText = "Critical Hit Cards";
    cycle_button_click();
    hide_pop_up("condition-pop-up");
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

//This is to disinguish a screen that assigns a random card vs choosing a random card between fore and aft.
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