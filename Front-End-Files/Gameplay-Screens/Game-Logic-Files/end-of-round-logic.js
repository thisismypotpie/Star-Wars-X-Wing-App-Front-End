function findCommonElements(arr1, arr2) //Compares two arrays and returns true if any indecies match. Used to see if a ship has an upgrade that allows it to keep its focus and evade tokens.
{ 
    return arr1.some(item => arr2.includes(item)) 
} 

function clear_tokens()//Clear evade and focus tokens unless someone has an upgrade saying otherwise.
{
    all_teams.forEach(team=>{
        team.ship_list.forEach(ship=>{
            var upgrade_ids = ship.upgrades.map(function(e){return e.id});
            if(findCommonElements(upgrade_ids,upgrade_ids_for_keeping_focus_tokens_at_end_of_round)==false)//ID of upgrade that allows you to keep focus tokens.
            {
                ship.focus_tokens = 0;
            }
            else
            {
                alert("Number "+ship.roster_number+" on team "+ship.team_name +" gets to keep their focus tokens because they had an upgrade allowing them to do so.");
            }
            if(findCommonElements(upgrade_ids,upgrade_ids_for_keeping_evade_tokens_at_end_of_round)==false)
            {
                ship.evade_tokens = 0;
            }
            else
            {
                alert("Number "+ship.roster_number+" on team "+ship.team_name +" gets to keep their evade tokens because they had an upgrade allowing them to do so.");
            }
            ship.weapons_disabled_tokens = 0;
            ship.ion_tokens = 0;
        })
    })
    alert("Evade, focus, ion, and weapons disabled tokens have been cleared.");
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

function end_of_round_procedures()
{
    clear_tokens();
    assign_new_round_initiative_token();
}

function assign_new_round_initiative_token()
{
    for(var i=0; i < all_teams.length;i++)
    {
        if(all_teams[i].has_initiative_token == true)
        {
            var new_index = -1;
            all_teams[i].has_initiative_token = false;
            if((i+1)>= all_teams.length)
            {
                new_index = 0;
            }
            else
            {
                new_index = i+1;
            }
            all_teams[new_index].has_initiative_token = true;
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
            document.getElementById('notification-pop-up-title').textContent = "ROUND OVER! \r"+all_teams[new_index].team_name+" now has initiative.";
            document.getElementById('notificatin-ok-button').onclick = function(){location.reload()};
            show_pop_up("Notification-pop-up");
            return;
        }
    }
    alert("ERROR: No team was found with the initiative token!");
}