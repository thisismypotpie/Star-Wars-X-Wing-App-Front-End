//This if statement is here so that all teams is not overwritten with null as soon as you come back to this form from the upgrade form.
if(sessionStorage.getItem("all_teams") == null)
{
  sessionStorage.setItem("all_teams",JSON.stringify([]));
}
else//populate the board with the name of each team, the size and total cost.
{

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
  
