//This file will be for sorting all ships into pilot skilled order.

function sort_pilots_by_skill_and_overwrite_all_teams(team_buckets)
{
    let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    all_teams.forEach(team => {//Go through each team.
        var organized_ship_list= [];
        team_buckets.forEach(bucket =>{//Go through each bucket.
            bucket.roster_numbers.forEach(roster_number=>{//go through each roster number of each bucket.
                organized_ship_list.push(team.ship_list[team.ship_list.map(function(e){return e.roster_number}).indexOf(roster_number)]);//Create an array map of all roster number and then match that number to the current roster number in tthe bucket. Finally push the ship indexed there into the organized ship array.
            })
        }) 
        team.ship_list = organized_ship_list;
    });
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

