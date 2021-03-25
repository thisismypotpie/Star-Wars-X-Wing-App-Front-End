function retreat()
{
    var combat_report;
    combat_report.victor = "";//Find whoever's turn it is not and add them here.
    combat_report.team_names = sessionStorage.getItem("all_teams_names");
    sessionStorage.removeItem("all_teams_names");
    sessionStorage.removeItem("team_index");
    sessionStorage.removeItem("selected_ship_index");
    sessionStorage.removeItem("all_target_locks");
    sessionStorage.setItem("combat_report",JSON.stringify(combat_report));
}