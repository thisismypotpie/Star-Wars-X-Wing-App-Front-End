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
   //I need to use a traditional loop since a collection has no "foreach" method.
   for(var i=0; i < teams.length;i++)
   {
     //Set item for the team name
      var new_team_name_item = document.createElement('li');
      new_team_name_item.id = teams[i].team_name;
      new_team_name_item.className = "list-box-item";
      new_team_name_item.textContent = teams[i].team_name;
      //Set item for the cost box.
      var new_cost_item = document.createElement('li');
      new_cost_item.id = teams[i].team_name + "-cost";
      new_cost_item.className = "list-box-item";
      new_cost_item.textContent = Calculate_cost_of_team(teams[i]);
      //Set item for number of ships.
      var new_ship_number_item = document.createElement('li');
      new_ship_number_item.id = teams[i].team_name + "-size";
      new_ship_number_item.className = "list-box-item";
      new_ship_number_item.textContent = teams[i].ship_list.length;
      
      document.getElementById("list-box-team-names").append(new_team_name_item);
      document.getElementById("list-box-team-cost").append(new_cost_item);
      document.getElementById("list-box-team-size").append(new_ship_number_item);
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
  //go to main screen.
  document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Title-Screen(Main Menu)/index.html";
    sessionStorage.removeItem("all_teams");
  });
  //go to next screen and set the team to be created.
  document.getElementById("ok-button").addEventListener("click", function(){
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
    window.location.href = "../Selection-Screen/Selection-Screen.html";
  });
  //Takes away the team name pop-up.
  document.getElementById("close-button").addEventListener("click", function(){
    let overlay = document.getElementById("overlay");
    let team_name_box = document.getElementById("team-name-box");
    document.getElementById("team-name-input").value = "";
    overlay.style.opacity = 0;
    team_name_box.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
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
         items[i].style.backgroundColor = "purple";
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
      console.log(game_data);
      let new_team = new team("Test Team "+(teams.length+1));
      for(var i =0; i < 10;i++)
      {
        var pilot_index = Math.floor(Math.random() * game_data.all_pilots.length);
        if(pilot_index ==0 || pilot_index == 2)//large ship two cards.
        {
          new_team.ship_list.push(new large_two_card_in_game_ship_status(game_data.all_pilots[pilot_index]));
        }
        else if(pilot_index == 1 || pilot_index == 3 || pilot_index == 4)//large ship one card
        {
          new_team.ship_list.push(new large_one_card_in_game_ship_status(game_data.all_pilots[pilot_index]));
        }
        else//regular ship
        {
          new_team.ship_list.push(new in_game_ship_status(game_data.all_pilots[pilot_index]));
        }
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
  window.location.href ='../Add-New-Ship-Screens/Selection-Screen/New-Ship-Selection-Screen.html';
}

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
  
