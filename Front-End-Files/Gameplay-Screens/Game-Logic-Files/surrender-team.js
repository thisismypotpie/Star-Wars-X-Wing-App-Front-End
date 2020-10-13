function confirm_surrender()
{
    return true;
}

function surrender_team(team_index)
{
    var confrim = confirm("Are you sure you wish to surrender?");
    if(confrim == true)
    {
        var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));

        //get the next ship to go if there is more than one team.
        if(all_teams.length > 1)//If there is more than one team, find who would be next depending on the phase of the game.
        {   
            if(sessionStorage.getItem("phase") == null)//maneuver selection phase.
            {
                if(team_index >= all_teams.length -1)//Go to movement phase if the last team in the order is surrendering.
                {
                    var name = all_teams[team_index].team_name;
                    all_teams.splice(team_index,1);
                    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
                    sessionStorage.removeItem("team_index");
                    sessionStorage.removeItem("selected_ship_index");
                    //move to movement phase.
                    sessionStorage.setItem("phase","movement");
                    sessionStorage.setItem("movement_attack_index",0);
                    location.reload();
                    alert(name + "has surrendered.");
                }
                else
                {
                    var name = all_teams[team_index].team_name;
                    all_teams.splice(team_index,1);
                    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
                    sessionStorage.setItem("selected_ship_index",0);
                    location.reload();
                    alert(name + "has surrendered.");
                }
            }
            else if(sessionStorage.getItem("phase") == "movement")//movement phase.
            {
                var total_ships_left = 0;
                all_teams.forEach(team=>{
                    total_ships_left = total_ships_left + team.ship_list.length;
                })
                if(1 == 1)//Go to attack phase if the last ship in the movement phase is surrendering.
                {

                }
                else
                {

                }
            }
            else if(sessionStorage.getItem("phase") == "attack")//attack phase.
            {
                if(1==1)//Go to end of round if the last ship in the movement phase is surrrendering.
                {

                }
                else
                {

                }
            }
            else//throw error.
            {
                alert("Unregistered phase: "+sessionStorage.getItem("phase"));
                return;
            }
        }
        if(all_teams.length == 1)
        {
            alert("winner!")
        }
        else if(all_teams.length == 0)
        {
            alert("No teams, remain. Game over.")
        }
    }
}