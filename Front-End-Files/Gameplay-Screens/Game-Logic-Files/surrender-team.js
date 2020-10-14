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
                //Get how many ships are left, then look for the next ship that is not on the team that is surrendering. Set
                //the movement attack index to that ship, then reload the page.
                var surrender_team_name = all_teams[team_index].team_name;
                var movement_attack_index = parseInt(sessionStorage.getItem("movement_attack_index"),10);
                var searching = 0;
                var start_index = get_pilot_whos_turn_it_is(movement_attack_index,all_teams);
                var pilot_in_question = all_teams[start_index[0]].ship_list[start_index[1]];
                while(pilot_in_question.team_name == surrender_team_name && (movement_attack_index + searching) < (get_total_ships(all_teams)-1))
                {
                    searching ++;
                    //Get the team index and ship index of the next ship.
                    var team_and_ship_indecies = get_pilot_whos_turn_it_is((movement_attack_index+searching),all_teams);
                    pilot_in_question = all_teams[team_and_ship_indecies[0]].ship_list[team_and_ship_indecies[1]].team_name;
                    //If the ship is not in the same team as the team surrendering, then log it as the ship to go next when we refresh.
                    if(pilot_in_question!= surrender_team_name)
                    {
                        //Replace the name of the team of the ship that is going next with the full ship info.
                        pilot_in_question = all_teams[team_and_ship_indecies[0]].ship_list[team_and_ship_indecies[1]];
                        //Remove the team that surrendered.
                        all_teams.splice(team_index,1);
                        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
                        //Find the ship in question's team and ship index.
                        for(var i=0; i < all_teams.length;i++) 
                        {
                            for(var j=0; j < all_teams[i].ship_list.length;j++)
                            {
                                if(all_teams[i].ship_list[j].team_name == pilot_in_question.team_name &&
                                    all_teams[i].ship_list[j].roster_number == pilot_in_question.roster_number)
                                {
                                    sessionStorage.setItem("movement_attack_index",get_movement_attack_index_of_ship_whos_turn_it_is(i,j));
                                    alert(surrender_team_name+" has surrendered!");
                                    location.reload();
                                    return;
                                }
                            }
                        }
                        alert("ERROR: Next ship was not able to be found!");
                        return;
                    }
                }
                //If we run out of ships, we know that we need to move to the attack phase.
                alert("Going to attack phase!");
                //move the phase to attack.
                sessionStorage.setItem("phase","attack");
                //set up variables for next ship search but in the attack phase.
                var movement_attack_index = (get_total_ships(all_teams)-1);
                var start_index = get_pilot_whos_turn_it_is(movement_attack_index,all_teams);
                var pilot_in_question = all_teams[start_index[0]].ship_list[start_index[1]];

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