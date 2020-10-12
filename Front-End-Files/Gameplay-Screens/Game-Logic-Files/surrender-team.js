function confirm_surrender()
{
    return true;
}

function surrender_team(team_index)
{
    alert("team_index: "+team_index)
    var confrim = confirm("Are you sure you wish to surrender?");
    if(confrim == true)
    {
        var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
        all_teams = all_teams.splice(team_index,1);
    }
}