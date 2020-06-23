//This file will be for sorting all ships into pilot skilled order.

function sort_pilots_by_skill_and_overwrite_all_teams(team_buckets)
{
    let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    all_teams.forEach(team => {//Go through each team.
        var organized_ship_list= [];
        team_buckets.forEach(bucket =>{//Go through each bucket.
            //Search for the ship of each corresponding roster number in each bucket.
        })        
    });
}