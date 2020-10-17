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
                    //Check to see if initiative token needs to be moved, it it does, then update all team local variable.
                    if(move_initiative_token_if_needed(team_index) == true)
                    {
                        all_teams = JSON.parse(sessionStorage.getItem("all_teams"))
                    }
                    //Remove surrendering team.
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
                    //Check to see if initiative token needs to be moved, it it does, then update all team local variable.
                    if(move_initiative_token_if_needed(team_index) == true)
                    {
                        all_teams = JSON.parse(sessionStorage.getItem("all_teams"))
                    }
                    //Remove surrendering team.
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
                       //Check to see if initiative token needs to be moved, it it does, then update all team local variable.
                       if(move_initiative_token_if_needed(team_index) == true)
                      {
                          all_teams = JSON.parse(sessionStorage.getItem("all_teams"))
                       }
                        //Remove surrendering team.
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
                                    check_if_game_over();
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
                searching = 0;
                //Go to attack phase and look for each ship in reverse order.
                while(surrender_team_name == pilot_in_question.team_name && (movement_attack_index - searching)>= 0)
                {
                    searching++;
                    //Get the indecies of the next pilot we will be looking at.
                    var team_and_ship_indecies = get_pilot_whos_turn_it_is((movement_attack_index-searching),all_teams);
                    pilot_in_question = all_teams[team_and_ship_indecies[0]].ship_list[team_and_ship_indecies[1]].team_name;
                    //If we find a team that does not equal the surrender team name, then we have our pilot to go to next.
                    if(pilot_in_question != surrender_team_name)
                    {
                        //Replace name of the team with the ship iteself.
                        pilot_in_question = all_teams[team_and_ship_indecies[0]].ship_list[team_and_ship_indecies[1]];
                        //Check to see if initiative token needs to be moved, it it does, then update all team local variable.
                         if(move_initiative_token_if_needed(team_index) == true)
                         {
                             all_teams = JSON.parse(sessionStorage.getItem("all_teams"))
                         }
                           //Remove surrendering team.
                        all_teams.splice(team_index,1);
                        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
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
                                    check_if_game_over();
                                    return;
                                }
                            }
                        }
                        alert("ERROR: Next ship was not able to be found!");
                        return;
                    }
                }
                alert("ERROR: Unable to get next ship, all ships have been searched and there is no possible next ship.");

            }
            //If a team surrenders in the attack phase.
            else if(sessionStorage.getItem("phase") == "attack")//attack phase.
            {
                //set up variables for next ship search but in the attack phase.
                var surrender_team_name = all_teams[team_index].team_name;
                var movement_attack_index = parseInt(sessionStorage.getItem("movement_attack_index"),10);
                var start_index = get_pilot_whos_turn_it_is(movement_attack_index,all_teams);
                var pilot_in_question = all_teams[start_index[0]].ship_list[start_index[1]];
                searching = 0;
                while(surrender_team_name == pilot_in_question.team_name && (movement_attack_index - searching)>= 1)
                {
                    searching++;
                    //Get the indecies of the next pilot we will be looking at.
                    var team_and_ship_indecies = get_pilot_whos_turn_it_is((movement_attack_index-searching),all_teams);
                    pilot_in_question = all_teams[team_and_ship_indecies[0]].ship_list[team_and_ship_indecies[1]].team_name;
                    //If we find a team that does not equal the surrender team name, then we have our pilot to go to next.
                    if(pilot_in_question != surrender_team_name)
                    {
                        //Replace name of the team with the ship iteself.
                        pilot_in_question = all_teams[team_and_ship_indecies[0]].ship_list[team_and_ship_indecies[1]];
                        //Remove the team that surrendered.
                        move_initiative_token_if_needed(team_index);
                        //Check to see if initiative token needs to be moved, it it does, then update all team local variable.
                        if(move_initiative_token_if_needed(team_index) == true)
                        {
                           all_teams = JSON.parse(sessionStorage.getItem("all_teams"))
                        }
                    //Remove surrendering team.
                        all_teams.splice(team_index,1);
                        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
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
                                    check_if_game_over();
                                    return;
                                }
                            }
                        }
                        alert("ERROR: Next ship was not able to be found!");
                        return;
                    }
                }
                if(move_initiative_token_if_needed(team_index) == true)
                {
                   all_teams = JSON.parse(sessionStorage.getItem("all_teams"))
                }
                all_teams.splice(team_index,1);
                sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
                alert(surrender_team_name+" has surrendered!");
                //Do end of round stuff.
                sessionStorage.removeItem("phase");//Phase is used to determine when phase we are in, if there is no phase in sessionstorage, then we are in maneuver selection.
                sessionStorage.removeItem("movement_attack_index");
                sessionStorage.removeItem("team_index");
                sessionStorage.removeItem("selected_ship_index");
                end_of_round_procedures();
                location.reload();
            }
            else//throw error.
            {
                alert("Unregistered phase: "+sessionStorage.getItem("phase"));
                return;
            }
        }
    }
}


function check_if_game_over()
{
    var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    if(all_teams.length == 1)
    {
        alert("winner!")
    }
    else if(all_teams.length == 0)
    {
        alert("No teams, remain. Game over.")
    }
}

function move_initiative_token_if_needed(team_index)
{
    var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    var current_index = team_index;
    if(all_teams[team_index].has_initiative_token == true)
    {
        current_index++;
        if(current_index >= all_teams.length)
        {
           current_index = 0; 
        }
        if(team_index == current_index)
        {
            check_if_game_over();
            alert("Potential error: There is only one team left according to movin initiative token.")
            return false;
        }
        else
        {
            all_teams[current_index].has_initiative_token = true;
            all_teams[team_index].has_initiative_token = false;
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
            alert(all_teams[current_index].team_name+" now has initiative.");
            return true;
        }
    }
        return false;
}
