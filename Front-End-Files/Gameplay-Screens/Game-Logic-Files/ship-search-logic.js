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