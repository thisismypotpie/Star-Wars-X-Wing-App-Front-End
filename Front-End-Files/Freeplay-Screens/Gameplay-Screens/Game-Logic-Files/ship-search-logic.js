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
    if(team_index == target_lock_and_search_index && selected_ship_index == ship_index)//Makes it so you cannot search for yourself.
    {
        alert("You cannot search for yourself.");
        document.getElementById('roster-number-input-search').value = "";
        document.getElementById('roster-number-input-search').focus();
        return;
    }
    
    sessionStorage.setItem("saved_team_index",team_index);
    sessionStorage.setItem("saved_ship_index",selected_ship_index);
    sessionStorage.setItem("team_index",target_lock_and_search_index);
    sessionStorage.setItem("selected_ship_index",ship_index);
    sessionStorage.setItem("searching","");
    location.reload();
}

//Used when the return button is pressed to go out of a search back to the current player's screen.
function return_to_main_screen()
{
    sessionStorage.setItem("team_index",sessionStorage.getItem("saved_team_index"));
    sessionStorage.setItem("selected_ship_index",sessionStorage.getItem("saved_ship_index"));
    sessionStorage.removeItem("saved_team_index");
    sessionStorage.removeItem("saved_ship_index");
    sessionStorage.removeItem("searching");
    location.reload();
}


function reveal_button_click()
{
    var team_index = sessionStorage.getItem("team_index");
    var ship_index = sessionStorage.getItem("selected_ship_index");
    var chosen_ship = all_teams[team_index].ship_list[ship_index];
    if(document.getElementById("reveal-button").textContent == "Reveal Maneuver")
    {
        if(chosen_ship.chosen_maneuver != null)
        {
            document.getElementById("maneuver-type").style.visibility = "visible";
            document.getElementById("maneuver-type").style.backgroundImage = "url("+chosen_ship.chosen_pilot.ship_name.maneuvers[chosen_ship.chosen_maneuver].maneuver_symbol_path+")";
            document.getElementById("maneuver-range").style.visibility = "visible";
            document.getElementById("maneuver-range").style.backgroundImage = "url("+chosen_ship.chosen_pilot.ship_name.maneuvers[chosen_ship.chosen_maneuver].range_symbol_path+")";
            document.getElementById("reveal-button").textContent = "Reveal Chart"
            document.getElementById("maneuver-card-display").style.visibility = "hidden";
            if(chosen_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard"||
            chosen_ship.chosen_pilot.ship_name.ship_type == "largeOneCard")
            {
                document.getElementById("maneuver-energy").style.visibility = "visible";
                document.getElementById("maneuver-energy").style.backgroundImage = "url("+chosen_ship.chosen_pilot.ship_name.maneuvers[chosen_ship.chosen_maneuver].energy_symbol_path+")";
            }
        }
        else
        {
            document.getElementById('notification-pop-up-title').textContent = "This ship has no chosen maneuver.";
            show_pop_up("Notification-pop-up");
        }

    }
    else
    {
        document.getElementById("reveal-button").textContent = "Reveal Maneuver"
        document.getElementById("maneuver-card-display").style.visibility = "visible";
        document.getElementById("maneuver-type").style.visibility = "hidden";
        document.getElementById("maneuver-range").style.visibility = "hidden";
        document.getElementById("maneuver-energy").style.visibility = "hidden";

    }
}