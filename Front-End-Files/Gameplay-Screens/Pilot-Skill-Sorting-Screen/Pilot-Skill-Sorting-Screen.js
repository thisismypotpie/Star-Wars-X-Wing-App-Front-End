//Get data from session storage.
var buckets = JSON.parse(sessionStorage.getItem("buckets"));
var indecies = JSON.parse(sessionStorage.getItem("indecies"));//This will give an index of all of the previous and current buckets in case the user wants to re-sort some ships.
var current_index = -1;//This will be the index we are currently focusing on.
var all_done = false;//Determines when there are no more buckets to sort.


//If indecies has not been established yet, make it an empty array.
if(indecies == null || indecies == undefined)
{
    indecies = [];
}

//Set current index to zero if this is the first bucket we are dealing with, otherwise set it to the most recent entry in indecies.
if(indecies.length > 0)
{
    current_index = indecies[indecies.length -1];
}

//Go through each bucket and find the next bucket with at least two entries in it.
for(var i = current_index+1;i<buckets.length;i++)
{
    if(buckets[i].roster_numbers.length > 1) //If we find a bucket to work on, set the index, set the labels, then load the ships.
    {
        indecies.push(i);
        current_index = i;
        document.getElementById("team-name-label").textContent = "Team: "+buckets[i].name;
        document.getElementById("pilot-skill-label").textContent= "Skill Level: "+buckets[i].skill;
        break;
    }
    else if(i == buckets.length-1)
    {
        all_done = true;
    }
}

//This will refresh the page so that the next index can be examined.
function done_button_click()
{
    if(all_done == true)
    {
        //do popup to see if the user is completely finished with sorting.
        sort_pilots_by_skill_and_overwrite_all_teams(buckets);
        //go to maneuver screen.
        alert("ALL DONE!");
    }
    else
    {
        sessionStorage.setItem("buckets",JSON.stringify(buckets));
        sessionStorage.setItem("indecies",JSON.stringify(indecies));
        location.reload();
    }
}

//Remove the most previous entry in indecies and go back one set of ships.
function back_button_click()
{
    if(indecies.length <= 1)//If there is nothing to go back to, then go back to the team screen.
    {
        window.location.href ='../../Team-Screen/Team-Screen.html';
        sessionStorage.removeItem("buckets");
        sessionStorage.removeItem("indecies");
    }
    else
    {
        sessionStorage.setItem("buckets",JSON.stringify(buckets));
        sessionStorage.setItem("indecies",JSON.stringify(indecies.pop()));
        location.reload();      
    }
}