//Sends an error letting the user know if game data is empty.
if(JSON.parse(sessionStorage.getItem("game_data"))==null || JSON.parse(sessionStorage.getItem("game_data"))== undefined)
{
    alert("Game data not loaded, back end may be down.");
    //throw "Game data now loaded error";
}

//This global variable is to get the name of a team you want to edit when that team has already been established.
var selected_team_edit_name = undefined;

//This if statement is here so that all teams is not overwritten with null as soon as you come back to this form from the upgrade form.
if(sessionStorage.getItem("all_teams") == null)
{
  sessionStorage.setItem("all_teams",JSON.stringify([]));
}
else//populate the board with the name of each team, the size and total cost.
{
   let teams = JSON.parse(sessionStorage.getItem("all_teams"));
     //set all initiative to false for all teams in case someone back clicks to here.
      teams.forEach(team=>{
  team.has_initiative_token = false;  
      })
      sessionStorage.setItem("all_teams",JSON.stringify(teams));

      //Remove everything from session storage except for game data and all teams. This is for when you use the back button in maneuver selection screen.
    let game_data = JSON.parse(sessionStorage.getItem("game_data"));
    sessionStorage.clear();
    sessionStorage.setItem("all_teams",JSON.stringify(teams));
    sessionStorage.setItem("game_data",JSON.stringify(game_data));

   //I need to use a traditional loop since a collection has no "foreach" method.
   for(var i=0; i < teams.length;i++)
   {
     //Make container to put team stats in.
     var team_container = document.createElement('div');
     team_container.length = "100%";
     team_container.style.borderBottom = "3px solid white";
     team_container.className = "team-summary "+ teams[i].team_name;
     team_container.id = "team-summary";
     team_container.style.display = "flex";
     //Set item for the team name
      var new_team_name_item = document.createElement('div');
      new_team_name_item.id = teams[i].team_name;
      new_team_name_item.className = "list-box-item "+teams[i].team_name;
      new_team_name_item.textContent = teams[i].team_name;
      new_team_name_item.style.textAlign = "center";
      team_container.appendChild(new_team_name_item);
      //Set item for number of ships.
      var new_ship_number_item = document.createElement('li');
      new_ship_number_item.id = teams[i].team_name + "-size";
      new_ship_number_item.className = "list-box-item "+teams[i].team_name;
      new_ship_number_item.style.textAlign = "center";
      new_ship_number_item.textContent = teams[i].ship_list.length;
      team_container.appendChild(new_ship_number_item);
      //Set item for the cost box.
      var new_cost_item = document.createElement('li');
      new_cost_item.id = teams[i].team_name + "-cost";
      new_cost_item.className = "list-box-item "+teams[i].team_name;
      new_cost_item.textContent = Calculate_cost_of_team(teams[i]);
      new_cost_item.style.textAlign = "center";
      team_container.appendChild(new_cost_item);

      document.getElementById('list-box-team-names').appendChild(team_container);
      
   }
}
//Sets the overlay and have the team name pop-up appear.
document.getElementById("new-team-button").addEventListener("click", function(){
    let overlay = document.getElementById("overlay");
    let team_name_box = document.getElementById("team-name-box");
    overlay.style.opacity = 1;
    team_name_box.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    document.getElementById("team-name-input").focus();
    
  });

  //Click event to make sure all of the correct items are highlighted.
  let box_items = document.getElementsByClassName("list-box-item");
  console.log("List box items: "+box_items.length);
  //Need to use tradictional loop since this is technically not an array.
  for(var i =0; i < box_items.length;i++)
  {
     box_items[i].addEventListener("click",function(){
       uniform_highlight(this.id.split('-')[0], box_items);
     })
     box_items[i].addEventListener("mouseout",function(){
      uniform_unhilight(this.id.split('-')[0], box_items);
    })
  }

  //This function will taken in an id and highlight each li item that has the same team name. This is done to uniform hight a teams name, size, and cost.
  function uniform_highlight(name, items)
  {
    //Must use tradiational for loop becase items is a collection instead of an array.
    for(var i =0; i < items.length;i++)
    {
       if(items[i].id.split('-')[0] == (name))
       {
         //Set background and color and then open the team options.
         items[i].style.backgroundColor = "blue";
         items[i].style.border = "1px solid white";
         //Open the options menu
         let overlay = document.getElementById("overlay");
         let team_options_box = document.getElementById("team-options-box");
         overlay.style.opacity = 1;
         team_options_box.style.visibility = "visible";
         overlay.style.pointerEvents = "all";
       }
    }
    document.getElementById("team-options-header").textContent = name + " Options";
    selected_team_edit_name = name;
    sessionStorage.setItem("chosen_team_name",selected_team_edit_name);
  }
  //When you click away from an element, remove the background from all of the highlighted elements.
  function uniform_unhilight(name, items)
  {
          //Must use tradiational for loop becase items is a collection instead of an array.
    for(var i =0; i < items.length;i++)
    {
       console.log("name: "+name);
       if(items[i].id.includes(name))
       {
         items[i].style.backgroundColor = "";
         items[i].style.border = "none";
       }
    }
  }

  //When the player enters a new name, this function will check to makes sure that the name has not already been taken.
  function name_exists_check(input)
  {
    let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    var name_available = true;
    all_teams.forEach(team=>{
        if(team.team_name == input)
        {
          name_available = false;
        }
    })
    return name_available;
  }

  //This is a function to create a test team.
  function create_test_team()
  {
    let teams = JSON.parse(sessionStorage.getItem("all_teams"));
      var game_data = JSON.parse(sessionStorage.getItem("game_data"));
      var chosen_roster_numbers = [];
      var team_name = "Test Team";
      let new_team = undefined;// new team(team_name);
      let team_size = Math.floor(Math.random())+3;
      var current_ship = undefined;
      var team_number = 1;//I will Add this to the team name and chose the first unused number as the team name.
      var team_name_formulated = false;
      //Get Team name
      while(team_name_formulated == false)//look for a team name that has not been taken yet.
      {
         let name_found = false;
         let potential_name = team_name+" "+team_number.toString();
         teams.forEach(team=>{
            if(team.team_name == potential_name)
            {
              name_found = true;
            }
         })
         if(name_found == false)
         {
           team_name = team_name+" "+team_number.toString();
           team_name_formulated = true;
         }
         team_number++;
      }
      new_team = new team(team_name);
      for(var i =0; i < team_size;i++)
      {
        var pilot_index = Math.floor(Math.random() * game_data.all_pilots.length);
        //Create a new ship
        if(game_data.all_pilots[pilot_index].ship_name.ship_type == "largeTwoCard")//large ship two cards.
        {
          current_ship = new large_two_card_in_game_ship_status(game_data.all_pilots[pilot_index],new_team.team_name);
        }
        else if(game_data.all_pilots[pilot_index].ship_name.ship_type == "largeOneCard")//large ship one card
        {
          current_ship = new large_one_card_in_game_ship_status(game_data.all_pilots[pilot_index],new_team.team_name);
        }
        else//regular ship
        {
          current_ship = new in_game_ship_status(game_data.all_pilots[pilot_index],new_team.team_name);
        }
        //Add random upgrades to new ship.
        var number_of_upgrades = Math.floor(Math.random() * 12);
        for(var j =0; j < number_of_upgrades;j++)
        {
          var upgrade_index = Math.floor(Math.random()*game_data.all_upgrades.length);
          var upgrade_to_add = new in_game_upgrade(game_data.all_upgrades[upgrade_index])
          current_ship.upgrades.push(upgrade_to_add);
        }
        //Add unique roster number to ship.
        var random_roster_number = Math.ceil(Math.random()*200);
        while(chosen_roster_numbers.includes(random_roster_number))
        {
          random_roster_number = Math.ceil(Math.random()*200);
        }
        chosen_roster_numbers.push(random_roster_number);
        current_ship.roster_number = random_roster_number;
        new_team.ship_list.push(current_ship);
      }
      teams.push(new_team);
      sessionStorage.setItem("all_teams",JSON.stringify(teams));
      window.location.reload();
  }


  /*
  Buttons functions for the team options screen.
  */

function closeOption()
{
  let overlay = document.getElementById("overlay");
  let team_options_box = document.getElementById("team-options-box");
  overlay.style.opacity = 0;
  team_options_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
}

function addNewShip()
{
  sessionStorage.setItem("Ship-Page-Path","Freeplay-Existing Team");
  window.location.href ='../../Ship-Selection-Interface/Selection-Screen/Selection-Screen.html';
}

//Removes an entire team from the list of teams.
function removeTeam()
{
  var results = confirm("Remove ENTIRE team from the team list?");
  if(results == true)
  {
     let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
     //I need to use a traditional for loop as it is the easier way to remove elements from an array.
       for(var i =0; i < all_teams.length;i++){
       if(all_teams[i].team_name == selected_team_edit_name)
       {
          all_teams.splice(i,1);
       }
     }  
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
    window.location.reload(); 
  }
  
}

function ViewStatistics()
{
  sessionStorage.setItem("chosen_team_name",selected_team_edit_name);
  window.location.href = "./Team-Option-Screens/View-Team-Stats-Screen/Stats-Screen.html";
}

function removeShipScreen()
{
  var teams = JSON.parse(sessionStorage.getItem("all_teams"));
  var team_index = 0;
  for (var i=0; i < teams.length;i++)
  {
    if(teams[i].team_name == selected_team_edit_name)
    {
      team_index = i;
      break;
    }
  }
  if(teams[i].ship_list.length == 0)
  {
    alert("You cannot view a team with no ships.");
  }
  else
  {
    sessionStorage.setItem("chosen_team_name",selected_team_edit_name);
    window.location.href = "./Team-Option-Screens/View-Team-Remove-Ship-Screen/Remove-Ship.html";
  }
}


function start_game_button_click()
{
  let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
  if(all_teams.length == 0)
  {
    alert("You must have at least one team created before starting the game.");
  }
  else
  {
    var buckets = bucket_sort_pilots_by_skill(all_teams);
    sort_pilots_by_skill_and_overwrite_all_teams(buckets.sorted_buckets);
    all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    if(buckets.sorting_needed == true)
    {
      sessionStorage.setItem("buckets",JSON.stringify(buckets.sorted_buckets));
      window.location.href = "../Gameplay-Screens/Pilot-Skill-Sorting-Screen/Pilot-Skill-Sorting-Screen.html";
    }
    else
    {
      sort_pilots_by_skill_and_overwrite_all_teams(buckets.sorted_buckets);
      all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
      var initiative_assignment = Math.floor(Math.random() * all_teams.length);
      all_teams[initiative_assignment].has_initiative_token = true;
      sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
      move_translate_vectors_for_notification_pop_up(-60,-60);
      show_notification_pop_up("The Game Begins! "+all_teams[initiative_assignment].team_name + " has been given first initiative!");

      //Close the notification with this line of code.
        document.getElementById("notification-ok-button").onclick = function(){
        close_notification_pop_up();
        window.location.href = "../Gameplay-Screens/Maneuver-Selection-Screen/Maneuver-Selection-Screen.html";
      }
    }
  }
}

function go_to_team_view()
{
  var team_index = 0;
  var teams = JSON.parse(sessionStorage.getItem("all_teams"));
  for (var i=0; i < teams.length;i++)
  {
    if(teams[i].team_name == selected_team_edit_name)
    {
      team_index = i;
      break;
    }
  }
  if(teams[i].ship_list.length == 0)
  {
    alert("You cannot view a team with no ships.");
  }
  else
  {
    window.location.href = './Team-Option-Screens/View-Team-Screen/View-Team.html';
  }
}

function close_team_name_pop_up()
{
  let overlay = document.getElementById("overlay");
  let team_name_box = document.getElementById("team-name-box");
  document.getElementById("team-name-input").value = "";
  overlay.style.opacity = 0;
  team_name_box.style.visibility = "hidden";
  overlay.style.pointerEvents = "none";
}

function go_to_ship_selection()
{
  let input = document.getElementById("team-name-input").value;
  if(!input.replace(/\s/g, '').length)//team name only contains white space.
  {
    alert("team name cannot be only whitespace.");
    document.getElementById("team-name-input").value = "";
    return;
  }
  else if(input.length == 0)//team name has no length.
  {
    alert("team name is empty.");
    return;
  }
  else if(name_exists_check(input) == false)
  {
    alert("That name is already taken, please choose another name.");
    document.getElementById("team-name-input").value = "";
    return;
  }
  sessionStorage.setItem("new_team",JSON.stringify(new team(input)));
  sessionStorage.setItem("Ship-Page-Path","Freeplay-New Team");
  window.location.href = "../../Ship-Selection-Interface/Selection-Screen/Selection-Screen.html";
}

function go_back_to_main_menu()
{
      let game_data = JSON.parse(sessionStorage.getItem("game_data"));
      sessionStorage.clear();
      sessionStorage.setItem("game_data",JSON.stringify(game_data));
      window.location.href = "../../Title-Screen(Main Menu)/index.html";
}

//Key bindings for this screen.
document.onkeyup = function(e) {

//team options key bindings.
  if(document.getElementById("team-options-box").style.visibility == "visible")
{
  if(e.keyCode ==49 || e.keyCode == 97)//one key s
  {
    addNewShip();
  }
  else if(e.keyCode == 50 || e.keyCode == 98)//two keys
  {
    removeShipScreen();
  }
  else if(e.keyCode == 51 || e.keyCode == 99)//three keys
  {
    go_to_team_view();
  }
  else if(e.keyCode == 52 || e.keyCode == 100)//four keys
  {
    ViewStatistics();
  }
  else if(e.keyCode == 53 || e.keyCode == 101)//five keys
  {
    removeTeam();
  }
  else if(e.keyCode == 102 || e.keyCode== 54)//escape or 6 keys.
  {
    closeOption();
  }
}
// Team name pop-up key bindings.
else if(document.getElementById("team-name-box").style.visibility == "visible")
{
  if(e.keyCode == 27 )//escape key
  {
    close_team_name_pop_up();
  }
  else if(e.keyCode == 13)//enter key.
  {
    go_to_ship_selection();
  }
}
//Go back to main menu using the escape key.
else if(e.keyCode == 27)
{
  go_back_to_main_menu();
}
}
  
