//Get data from session storage.
var buckets = JSON.parse(sessionStorage.getItem("buckets"));//List of all buckets.
var indecies = JSON.parse(sessionStorage.getItem("indecies"));//List of indecies in buckets that have been sorted.
var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
var unsorted_ship_box = document.getElementById("unsorted-ship-box");
var selected_index = 0;

//Start indecies as an empty array if indecies is null or undefined.
if(indecies == null || indecies == undefined)
{
    console.log("created new indecies array.");
    indecies = [];
}
else if(indecies.length > 0)//Set selected index to start at the last bucket that needed to be sorted.
{
    selected_index = indecies[indecies.length-1];
    console.log("Selected index is now: "+selected_index);
}

//Go through each bucket and make a selection for the next bucket that needs to be sorted.
for(var i = selected_index; i < buckets.length;i++)
{
    if(buckets[i].roster_numbers.length > 1 && !indecies.includes(i))
    {
        console.log("Index :"+ i +" is being pushed.");
        indecies.push(i);
        selected_index= i;
        document.getElementById("team-name-label").textContent = "Team: "+buckets[i].name;
        document.getElementById("pilot-skill-label").textContent= "Skill Level: "+buckets[i].skill;
        break;
    }
    if(i >= buckets.length-1)
    {
        alert("all done sorting");
    }
}

//This function will make all of the pilot images appear in the unordered list box "unsorted pilots".
buckets[selected_index].roster_numbers.forEach(roster_num=>{//Go through each roster number of the selected bucket.
   all_teams.forEach(team=>{
      if(buckets[selected_index].name == team.team_name)//Make sure we are working with ships on the same team.
      {
         let ship = team.ship_list[team.ship_list.map(function(e){return e.roster_number}).indexOf(roster_num)];
         console.log(ship);
         var ship_image = document.createElement("div");
         ship_image.style.backgroundImage = "url('"+ship.chosen_pilot.image_path+"')";
         ship_image.style.border = "1px solid white";
         ship_image.style.backgroundRepeat = "no-repeat";
         ship_image.style.backgroundSize = "100% 100%";
         ship_image.style.width = "50%";
         ship_image.style.height = "50vh";
         ship_image.style.display = "block";
         unsorted_ship_box.appendChild(ship_image);
      }
   })
})



//This will refresh the page so that the next bucket can be examined.
function done_button_click()
{
        sessionStorage.setItem("buckets",JSON.stringify(buckets));
        sessionStorage.setItem("indecies",JSON.stringify(indecies));
        location.reload();
}

//Remove the most previous entry in indecies and go back to most previous bucket.
function back_button_click()
{
        if(indecies.length <= 1)
        {
            window.location.href ='../../Team-Screen/Team-Screen.html';
            sessionStorage.removeItem("buckets");
            sessionStorage.removeItem("indecies");
        }
        else
        {
            indecies.pop();
            indecies.pop();
            sessionStorage.setItem("indecies",JSON.stringify(indecies));
            location.reload();
        }

}