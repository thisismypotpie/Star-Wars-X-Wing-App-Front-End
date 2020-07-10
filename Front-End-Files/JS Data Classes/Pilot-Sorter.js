//This file will be for sorting all ships into pilot skilled order.

//This function will take eac bucket from each team and overwrite the entire team ship list with the updated ship order.
function sort_pilots_by_skill_and_overwrite_all_teams(team_buckets)
{
    let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    all_teams.forEach(team => {//Go through each team.
        var organized_ship_list= [];
        team_buckets.forEach(bucket =>{//Go through each bucket.
            bucket.roster_numbers.forEach(roster_number=>{//go through each roster number of each bucket.
                if(bucket.name == team.team_name)//Make sure buckets that are not on the same team are not stored in the ship list.
                {
                    organized_ship_list.push(team.ship_list[team.ship_list.map(function(e){return e.roster_number}).indexOf(roster_number)]);//Create an array map of all roster number and then match that number to the current roster number in tthe bucket. Finally push the ship indexed there into the organized ship array.
                }
            })
        }) 
        team.ship_list = organized_ship_list;
    });
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

//This function will seperate all ships of all teams into buckets and bring back an object full of sorting conflicts for the skill sorting screen to pan out.
function bucket_sort_pilots_by_skill(all_teams)
{
    var sorted_buckets = [];
    var sorting_needed = false;
    all_teams.forEach(team=>{ //go through each team
      var team_buckets = [];
      for(var i =0; i < 12;i++)//push a struct with name, skill, and rosters from all skills. Making all of these at the beginning will make the algorithm more effective because we will only have to go through each time's list once.
       {
        team_buckets.push({name: team.team_name, skill:i, roster_numbers:[]});
       }
       team.ship_list.forEach(ship=>{//Goes through each ship and then puts the ship in the corresponding bucket according to ites pilot skill.
          
        team_buckets[ship.current_pilot_skill].roster_numbers.push(ship.roster_number); 
       })
       sorted_buckets.push.apply(sorted_buckets,team_buckets);
    })
    console.log(sorted_buckets);
    for(bucket of sorted_buckets)
    {
      if(bucket.roster_numbers.length>1)
      {
        sorting_needed = true;
        break;
      }
    }
    return {sorted_buckets:sorted_buckets,sorting_needed:sorting_needed};//Retrun a struct with sorted buckets and whether or not sorting is needed.
}

//This function will line up all of the ships in order for the movement and attack phase and then return the team index and selected ship index of who's turn it is.
function get_pilot_whos_turn_it_is(index,all_teams)
{
    //This function will re-create the line of ships every time in order to reflect changes made each time instead of being out of sync with all teams.
    var initiative_index = 0;
    var ordered_all_teams = [];
    var ordered_ships = [];
    for(var i =0; i < all_teams.length;i++)//Find out which team has initiative.
    {
        if(all_teams[i].has_initiative_token == true)
        {
            initiative_index = i;
            break;
        }
    }
    for(var i = initiative_index; i<all_teams.length;i++)//Move the team with initiative and each team after it to the front of the ordered team list.
    {
        ordered_all_teams.push(all_teams[i]);
    }
    for(var i = 0; i<initiative_index;i++)//Move the team each team before team with initiative before team with initiative.
    {
        ordered_all_teams.push(all_teams[i]);
    }
    var current_pilot_skill_adding = 0;
    var team_out_of_ships = 0;
    while(team_out_of_ships < ordered_all_teams.length)//Sort pilots into the sorted order.
    {
        team_out_of_ships = 0;
        for(var i = 0; i<ordered_all_teams.length;i++)//Sort by pilot skill.
        {
            if(ordered_all_teams[i].ship_list.length == 0)//Add to ships that are out of team.
            {
                team_out_of_ships++;
            }
            else
            {
                for(var j =0; j < ordered_all_teams[i].ship_list.length;i++)//take all ships that are in the current pilot skill away and add them to the ordered ships.
                {
                    if(ordered_all_teams[i].ship_list[j].current_pilot_skill == current_pilot_skill_adding)
                    {
                        ordered_ships.push(ordered_all_teams[i].ship_list[j]);
                        ordered_all_teams[i].ship_list.splice(j,1);
                    }
                }
    
            }
        }
        current_pilot_skill_adding++
    }
    var team_index_to_return = 0;
    var ship_index_to_return = 0;
    for(var i =0; i < all_teams.length;i++)//Find the team index and ship index for who's turn it is.
    {
        if(all_teams[i].team_name == ordered_ships[index].team_name)
        {
            team_index_to_return = i;
            for(var j = 0; j< all_teams[i].ship_list;j++)
            {
                if(ordered_ships[index].roster_number == all_teams[i].ship_list[j].roster_number)
                {
                    ship_index_to_return = j;
                    break;
                }
            }
            break;
        }
        else if(i == (all_teams.length -1))
        {
            alert("ERROR: Not abel to find team of selected ship in ship sorter.");
        }
    }
    return[team_index_to_return,ship_index_to_return];
}