//Get data from session storage.
var buckets = JSON.parse(sessionStorage.getItem("buckets"));//List of all buckets.
var indecies = JSON.parse(sessionStorage.getItem("indecies"));//List of indecies in buckets that have been sorted.
var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
var unsorted_ship_box = document.getElementById("unsorted-ship-box");
var sorted_ship_box = document.getElementById("sorted-ship-box");
var selected_index = 0;
var bucket_order_roster_list = [];

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
        move_translate_vectors_for_confirmation_pop_up(75,-750);
        show_confirmation_pop_up("Sorting Complete. Would you like to begin the game?");
        //Set up confirmation yes button to see if the user wants to move to maneuver selection.
        document.getElementById("confirmation-yes-button").onclick = ()=>{
            close_confirmation_pop_up();
            sort_pilots_by_skill_and_overwrite_all_teams(buckets);
            all_teams = JSON.parse(sessionStorage.getItem("all_teams"));//This is to set all teams to the version manipulated by the function on the previous line.
            sessionStorage.removeItem("buckets");
            sessionStorage.removeItem("indecies");
            var initiative_assignment = undefined;
            if(JSON.parse(sessionStorage.getItem("gc_setup_data"))!= null)//If the player is doing galactic conquest, the attacker will always get first initiative.
            {
                initiative_assignment = 0;// 0 is always the index for the attacking team in galactic conquest.
            }
            else
            {
                initiative_assignment = Math.floor(Math.random() * all_teams.length);
            }

            all_teams[initiative_assignment].has_initiative_token = true;

            //Notify the user that the game has begun.
            move_translate_vectors_for_notification_pop_up(-55,-60);
            show_notification_pop_up("The Game Begins! "+all_teams[initiative_assignment].team_name + " has been given first initiative!");
              document.getElementById("notification-ok-button").onclick = function(){
              close_notification_pop_up();
              window.location.href = "../Maneuver-Selection-Screen/Maneuver-Selection-Screen.html";
            }
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
        }
        //Set up confirmation no button.
        document.getElementById("confirmation-no-button").onclick = ()=>{
            close_confirmation_pop_up();
        }
    }
}



//This function will make all of the pilot images appear in the unordered list box "unsorted pilots".
buckets[selected_index].roster_numbers.forEach(roster_num=>{//Go through each roster number of the selected bucket.
   all_teams.forEach(team=>{
      if(buckets[selected_index].name == team.team_name)//Make sure we are working with ships on the same team.
      {
         let isMobile = window.matchMedia("(max-width: 414px)").matches;
         let ship = team.ship_list[team.ship_list.map(function(e){return e.roster_number}).indexOf(roster_num)];
         console.log(ship);
         var ship_image = document.createElement("div");
         ship_image.className = "unsorted-ship-image";
         ship_image.style.backgroundImage = "url('"+ship.chosen_pilot.image_path+"')";
         ship_image.style.border = "1px solid white";
         ship_image.style.backgroundRepeat = "no-repeat";
         ship_image.style.backgroundSize = "100% 100%";
         ship_image.style.height = "65vh"
         isMobile ? ship_image.style.flex = "0 0 55%" : ship_image.style.flex = "0 0 35%"; //Width is here.
         ship_image.style.display = "block";

         ship_image.style.marginLeft = "3%";
         ship_image.style.marginRight = "3%";
         ship_image.style.display = "grid";
         ship_image.style.gridTemplateColumns = "repeat(12,calc(100%/12))";
         ship_image.style.gridTemplateRows = "repeat(12,calc(100%/12))";
         ship_image.setAttribute("roster-number",ship.roster_number);
         ship_image.onclick = function(){unsorted_image_click(ship_image)};

         //Add div that is the roster number of each ship to their card.
         var roster_display = document.createElement("div");
         roster_display.id = "roster-display";
         roster_display.style.fontSize = "4vw";
         roster_display.style.fontFamily = "Impact, Charcoal, sans-serif";
         roster_display.innerHTML = "# "+ship.roster_number;
         roster_display.style.color = "red";
         roster_display.style.gridRow = "1/4";
         roster_display.style.gridColumn = "10/13";
         roster_display.style.textAlign = "center";
         ship_image.appendChild(roster_display);
         unsorted_ship_box.appendChild(ship_image);
      }
   })
})



//This will refresh the page so that the next bucket can be examined.
function done_button_click()
{
    if(document.getElementsByClassName("unsorted-ship-image").length > 0)
    {
        //Notify the user that the game has begun.
        move_translate_vectors_for_notification_pop_up(75,-800);
        show_notification_pop_up("Please sort all ships before continuing.");
        document.getElementById("notification-ok-button").onclick = function(){
            close_notification_pop_up();
          }
        //alert("Please sort all ships before continuing.");
    }
    else
    {
        buckets[selected_index].roster_numbers = bucket_order_roster_list;
        sessionStorage.setItem("buckets",JSON.stringify(buckets));
        sessionStorage.setItem("indecies",JSON.stringify(indecies));
        location.reload();
    }
}

//Remove the most previous entry in indecies and go back to most previous bucket.
function back_button_click()
{
        if(sessionStorage.getItem("gc_setup_data") != null)//go back to galactic conquest if 
        {
            window.location.href = "../../Galactic-Conquest-Screens/Gameplay-Screens/gameplay-screen.html";
        }
        else if(indecies.length <= 1)
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

//Take image off of unsorted image list and put it in the sorted list.
function unsorted_image_click(clicked_element)
{
    clicked_element.className = "sorted-ship-image";
    clicked_element.onclick = function(){sorted_image_click(clicked_element)};
    sorted_ship_box.appendChild(clicked_element);
    bucket_order_roster_list.push(parseInt(clicked_element.getAttribute("roster-number"),10));
}

//Take image off sorted image list and put it in the unsorted list.
function sorted_image_click(clicked_element)
{
    clicked_element.className = "unsorted-ship-image";
    clicked_element.onclick = function(){unsorted_image_click(clicked_element)};
    unsorted_ship_box.appendChild(clicked_element);
    bucket_order_roster_list.splice(bucket_order_roster_list.indexOf(parseInt(clicked_element.getAttribute("roster-number"),10)),1);
}

//When you press the view button you  will get the ships in a bucket showing up in a stripped down version of team view.
function go_to_bucket_view()
{
    sessionStorage.setItem("display_index",selected_index);
    window.location.href='./Skill-Bucket-View-Screens/Skill-Bucket-View.html'
}
