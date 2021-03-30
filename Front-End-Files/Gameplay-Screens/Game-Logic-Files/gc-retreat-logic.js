function retreat()
{
    var all_teams = sessionStorage.getItem("all_teams");
    var team_index = sessionStorage.getItem("team_index");
    var combat_report = [];
    if(surrender_team(team_index))
    {
        if(sessionStorage.getItem("combat_report") == null)
        {
            sessionStorage.setItem("combat_report",JSON.stringify([]));
        }
        else
        {   
            combat_report = JSON.parse(sessionStorage.getItem("combat_report"));
        }

        combat_report.push(
            {team_name: all_teams[team_index].team_name,
            team_remnant: all_teams[team_index].ship_list,
            outcome:"Retreat"
        })
        sessionStorage.setItem("combat_report",JSON.stringify(combat_report));
    }
}