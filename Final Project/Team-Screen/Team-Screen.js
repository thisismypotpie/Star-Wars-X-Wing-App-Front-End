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
  
