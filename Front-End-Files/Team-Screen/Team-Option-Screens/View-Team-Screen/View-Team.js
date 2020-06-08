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
let upgrade_box = document.getElementById("upgrade-box");
let maneuver_box = document.getElementById("maneuver-box");
let pilot_skill = document.getElementById("pilot-skill-stat");
let attack = document.getElementById("attack-stat");
let agility = document.getElementById("agility-stat");
let hull = document.getElementById("hull-stat");
let shields = document.getElementById("shields-stat");
let energy = document.getElementById("energy-stat");
let energy_icon = document.getElementById("energy");
let roster_number = document.getElementById("roster-number-stat");
let flip_button = document.getElementById("flip-button");
let chosen_team = get_team();
let selection_index = 0;
var aft_image_showing = false; //This is a bool for the flip button to see if the front or back image is showing. 
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

    roster_number.textContent= ":"+chosen_team.ship_list[selection_index].roster_number;
    pilot_skill.textContent = " : "+chosen_team.ship_list[selection_index].current_pilot_skill;
    attack.textContent = " : "+chosen_team.ship_list[selection_index].current_attack;
    agility.textContent = " : "+chosen_team.ship_list[selection_index].current_agility;
    hull.textContent = " : "+chosen_team.ship_list[selection_index].current_hull;
    shields.textContent = " : "+chosen_team.ship_list[selection_index].current_sheilds;

    //If dealing with a large ship, then make energy and possibly flip button visible.
    if(chosen_team.ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeOneCard" ||
       chosen_team.ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        energy_icon.style.visibility = "visible";
        energy.style.visibility = "visible";
        energy.textContent=" : "+chosen_team.ship_list[selection_index].current_energy;
        if(chosen_team.ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
        {
            flip_button.style.visibility = "visible";
        }
    }
    else
    {
        flip_button.style.visibility = "hidden";
        energy_icon.style.visibility = "hidden";
        energy.style.visibility = "hidden";
    }

    //Set the upgrade images of each upgrade.
    upgrade_box.innerHTML="";
    chosen_team.ship_list[selection_index].upgrades.forEach(upgrade=>{
        console.log(upgrade);
        console.log("path: "+upgrade.image_path);
        var upgrade_image = document.createElement("div");
        if(upgrade.characteristics!= null && upgrade.characteristics.includes("Dual"))
        {
            upgrade_image.style.backgroundImage = "url('"+upgrade.image_path.split("\n")[0]+"')";       
            upgrade_image.style.border = "3px solid red";    
        }
        else
        {
            upgrade_image.style.backgroundImage = "url('"+upgrade.image_path+"')";
            upgrade_image.style.border = "1px solid white";
        }
        upgrade_image.style.width = "95%";
        upgrade_image.style.height = "45vh";
        upgrade_image.style.margin = "3%";
        upgrade_image.style.backgroundRepeat = "no-repeat";
        upgrade_image.style.backgroundSize = "100% 100%";
        upgrade_box.appendChild(upgrade_image);

    })
}

//This function will take you to the upgrade screen to add/remove upgrades. 
function change_upgrades_button()
{
    sessionStorage.setItem("Chosen_Team_Ship",JSON.stringify(chosen_team.ship_list[selection_index]));
    window.location.href ="../View-Team-Upgrade-Screen/Team-View-Upgrade-Screen.html";
}

//This is a function that will flip any large ship being seen on the screen.
function flip_button_click()
{
    if(aft_image_showing == false)
    {
        pilot_picture.style.backgroundImage = "url('"+chosen_team.ship_list[selection_index].chosen_pilot.aft_card_path+"')";
        aft_image_showing = true;
    }
    else
    {
        pilot_picture.style.backgroundImage = "url('"+chosen_team.ship_list[selection_index].chosen_pilot.image_path+"')";
        aft_image_showing = false;
    }
}