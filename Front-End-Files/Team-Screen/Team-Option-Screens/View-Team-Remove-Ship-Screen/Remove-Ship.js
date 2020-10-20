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
let energy_icon = document.getElementById("energy");
let energy = document.getElementById("energy-stat");
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
   
    if(chosen_team.ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeOneCard" ||
    chosen_team.ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
 {
     energy_icon.style.visibility = "visible";
     energy.style.visibility = "visible";
     energy.textContent=" : "+chosen_team.ship_list[selection_index].current_energy;
     if(chosen_team.ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
     {

         flip_button.style.visibility = "visible";
         let hull_num = (parseInt(chosen_team.ship_list[selection_index].current_hull)  + parseInt(chosen_team.ship_list[selection_index].current_aft_hull));
         let shields_num = (parseInt(chosen_team.ship_list[selection_index].current_sheilds) + parseInt(chosen_team.ship_list[selection_index].current_aft_shields));
         hull.textContent = " : " + hull_num; 
         shields.textContent = " : "+ shields_num;
     }
 }
 else
 {
     flip_button.style.visibility = "hidden";
     energy_icon.style.visibility = "hidden";
     energy.style.visibility = "hidden";
 }
 upgrade_box.innerHTML="";
 chosen_team.ship_list[selection_index].upgrades.forEach(upgrade=>{
     console.log(upgrade);
     console.log("path: "+upgrade.upgrade.image_path);
     var upgrade_image = document.createElement("div");
     if(upgrade.upgrade.is_dual_sided == true)
     {
         upgrade_image.style.backgroundImage = "url('"+upgrade.upgrade.image_path.split("\n")[0]+"')";       
         upgrade_image.style.border = "3px solid red";    
     }
     else
     {
         upgrade_image.style.backgroundImage = "url('"+upgrade.upgrade.image_path+"')";
         upgrade_image.style.border = "1px solid white";
     }
     upgrade_image.style.width = "95%";
     upgrade_image.style.height = "45vh";
     upgrade_image.style.margin = "3%";
     upgrade_image.style.backgroundRepeat = "no-repeat";
     upgrade_image.style.backgroundSize = "100% 100%";
     upgrade_image.style.display = "grid";
     upgrade_image.style.gridTemplateColumns = "repeat(2,calc(100%/2))";
     upgrade_image.style.gridTemplateRows = "repeat(3,calc(100%/3))";

        //Add ordnance tokens if they have any.
        if(upgrade.ordnance_tokens > 0)
        {
            var ordnance_token_quantity = document.createElement("div");
            ordnance_token_quantity.style.gridRow = "1";
            ordnance_token_quantity.style.gridColumn = "2";
            ordnance_token_quantity.style.backgroundImage = "url('https://i.imgur.com/DztMvcD.png')";
            ordnance_token_quantity.style.backgroundRepeat = "no-repeat";
            ordnance_token_quantity.style.backgroundSize = "100% 100%";
            ordnance_token_quantity.textContent = "X"+upgrade.ordnance_tokens;
            ordnance_token_quantity.style.fontSize = "xx-large";
            ordnance_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
            ordnance_token_quantity.style.textAlign = "right"
            ordnance_token_quantity.style.color = "white";
            upgrade_image.appendChild(ordnance_token_quantity);
        }

     upgrade_box.appendChild(upgrade_image);

 })
}

function remove_ship_button()
{
    let answer = confirm("Are you sure you want to remove this ship from the team?");
    if(answer == true)
    {
        var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
        chosen_team.ship_list.splice(selection_index,1);
        for(var i=0;i<all_teams.length;i++)
        {
            if(chosen_team.team_name == all_teams[i].team_name)
            {
                all_teams[i] = chosen_team;
            }
        }
        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
        if(chosen_team.ship_list.length == 0)//go back to the team screen if this is the last ship to be removed.
        {
            window.location.href = "../../Team-Screen.html";
        }
        else
        {
            window.location.reload();
        }
    }
    else
    {
        window.location.reload();
    }
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

//Key bindings for this screen.
document.onkeyup = function(e) {
    if(e.keyCode == 39)//next key.
    {
        next_button();
    }
    else if(e.keyCode == 37)//previous key.
    {
        previous_button();
    }
    else if(e.keyCode == 27)//escape key.
    {
        back_button();
    }
}