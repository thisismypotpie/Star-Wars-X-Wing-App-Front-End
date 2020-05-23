//This is the section for adding buttton functionality.
function back_button(){
    sessionStorage.removeItem("chose_team_name");
    window.location.href="../../Team-Screen.html";
}

function next_button()
{
    selection_index++;
    if(selection_index >= chosen_team.ship_list.length)
    {
        selection_index = 0;
    }
    set_all_items();
}

function previous_button()
{
    selection_index--;
    if(selection_index < 0)
    {
        selection_index = chosen_team.ship_list.length-1;
    }
    set_all_items();
}

function change_upgrades_button()
{

}
//end button functionality section.

//This will be the section for getting vari that we will manipulate.
let pilot_picture = document.getElementById("pilot-card");
let game_data = JSON.parse(sessionStorage.getItem("game_data"));
let maneuver_box = document.getElementById("maneuver-box");
let pilot_skill = document.getElementById("pilot-skill-stat");
let attack = document.getElementById("attack-stat");
let agility = document.getElementById("agility-stat");
let hull = document.getElementById("hull-stat");
let shields = document.getElementById("shields-stat");
let energy = document.getElementById("energy-stat");
let chosen_team = get_team();
let selection_index = 0;
//end global variable set up section

//This section will be for setting up each element with proper pictures.
set_all_items();

//End picture set_up section.

//This section is for functions called throughout this file.

//This function takes in the chosen team name and returns the team.
function get_team()
{
    let team_name = sessionStorage.getItem("chosen_team_name");
    let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    var chosen_team = undefined;
    all_teams.forEach(team =>{
        if (team.team_name == team_name)
        {
            chosen_team = team;
        }
    })
    return chosen_team;
}

//This will set all of the items for this page when the page first loads or if the next/previous buttons are pressed.
function set_all_items()
{
    pilot_picture.style.backgroundImage = "url('"+chosen_team.ship_list[selection_index].chosen_pilot.image_path+"')";
    maneuver_box.style.backgroundImage = "url('"+chosen_team.ship_list[selection_index].chosen_pilot.ship_name.card+"')";
    pilot_skill.textContent = " : "+chosen_team.ship_list[selection_index].current_pilot_skill;
    attack.textContent = " : "+chosen_team.ship_list[selection_index].current_attack;
    agility.textContent = " : "+chosen_team.ship_list[selection_index].current_agility;
    hull.textContent = " : "+chosen_team.ship_list[selection_index].current_hull;
    shields.textContent = " : "+chosen_team.ship_list[selection_index].current_sheilds;
}