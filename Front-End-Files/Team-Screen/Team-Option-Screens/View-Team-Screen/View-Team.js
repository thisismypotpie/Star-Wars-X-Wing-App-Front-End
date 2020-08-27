//This is the section for adding buttton functionality.
function back_button(){
    sessionStorage.removeItem("chosen_team_name");
    window.location.href="../../Team-Screen.html";
}
//Go to next ship in the roster.
function next_button()
{
    selection_index++;
    if(selection_index >= all_teams[chosen_team_index].ship_list.length)
    {
        selection_index = 0;
    }
    set_all_items();
}
//Go to previous ship in the roster.
function previous_button()
{
    selection_index--;
    if(selection_index < 0)
    {
        selection_index = all_teams[chosen_team_index].ship_list.length-1;
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
let energy = document.getElementById("energy-stat");
let energy_icon = document.getElementById("energy");
let roster_number = document.getElementById("roster-number-stat");
let flip_button = document.getElementById("flip-button");
let chosen_team_index = get_team_index();
let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
let selection_index = 0;
var aft_image_showing = false; //This is a bool for the flip button to see if the front or back image is showing. 
//end global variable set up section

//This section will be for setting up each element with proper pictures.
set_all_items();

//End picture set_up section.

//This section is for functions called throughout this file.

//This function takes in the chosen team name and returns the team.
function get_team_index()
{
    let team_name = sessionStorage.getItem("chosen_team_name");
    let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    var chosen_team = undefined;
    for(var i =0; i < all_teams.length;i++)
    {
        if (all_teams[i].team_name == team_name)
        {
            chosen_team = i;
            break;
        }
    }
    return chosen_team;
}

//This will set all of the items for this page when the page first loads or if the next/previous buttons are pressed.
function set_all_items()
{
    pilot_picture.style.backgroundImage = "url('"+all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.image_path+"')";
    maneuver_box.style.backgroundImage = "url('"+all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.ship_name.card+"')";

    roster_number.textContent= " : "+all_teams[chosen_team_index].ship_list[selection_index].roster_number;
    pilot_skill.textContent = " : "+all_teams[chosen_team_index].ship_list[selection_index].current_pilot_skill;
    attack.textContent = " : "+all_teams[chosen_team_index].ship_list[selection_index].current_attack;
    agility.textContent = " : "+all_teams[chosen_team_index].ship_list[selection_index].current_agility;
    hull.textContent = " : "+all_teams[chosen_team_index].ship_list[selection_index].current_hull;
    shields.textContent = " : "+all_teams[chosen_team_index].ship_list[selection_index].current_sheilds;

    //If dealing with a large ship, then make energy and possibly flip button visible.
    if(all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeOneCard" ||
       all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        energy_icon.style.visibility = "visible";
        energy.style.visibility = "visible";
        energy.textContent=" : "+all_teams[chosen_team_index].ship_list[selection_index].current_energy;
        if(all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
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
    all_teams[chosen_team_index].ship_list[selection_index].upgrades.forEach(upgrade=>{
        console.log(upgrade);
        console.log("path: "+upgrade.image_path);
        var upgrade_image = document.createElement("div");
        if(upgrade.is_dual_sided == true)
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
    sessionStorage.setItem("Chosen_Team_Ship",JSON.stringify(all_teams[chosen_team_index].ship_list[selection_index]));
    window.location.href ="../View-Team-Upgrade-Screen/Team-View-Upgrade-Screen.html";
}

//This is a function that will flip any large ship being seen on the screen.
function flip_button_click()
{
    if(aft_image_showing == false)
    {
        pilot_picture.style.backgroundImage = "url('"+all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.aft_card_path+"')";
        aft_image_showing = true;
        agility.textContent=" : "+ all_teams[chosen_team_index].ship_list[selection_index].current_aft_agility;
        hull.textContent=" : "+ all_teams[chosen_team_index].ship_list[selection_index].current_aft_hull;
        shields.textContent=" : "+ all_teams[chosen_team_index].ship_list[selection_index].current_aft_shields;
    }
    else
    {
        pilot_picture.style.backgroundImage = "url('"+all_teams[chosen_team_index].ship_list[selection_index].chosen_pilot.image_path+"')";
        aft_image_showing = false;
        agility.textContent=" : "+ all_teams[chosen_team_index].ship_list[selection_index].current_agility;
        hull.textContent= " : "+ all_teams[chosen_team_index].ship_list[selection_index].current_hull;
        shields.textContent=" : "+ all_teams[chosen_team_index].ship_list[selection_index].current_sheilds;
    }
}
//This is the function for when you click the change roster number button.
function change_roster_number()
{
    let overlay = document.getElementById("overlay");
    let roster_number_box = document.getElementById("roster-number-box");
    overlay.style.opacity = 1;
    roster_number_box.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    document.getElementById("roster-number-input").focus();
}
//This is the function when you you close the roster number screen.
function close_button_click()
{
    let overlay = document.getElementById("overlay");
    let roster_number_box = document.getElementById("roster-number-box");
    let input = document.getElementById("roster-number-input");
    overlay.style.opacity = 0;
    roster_number_box.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
    input.value="";
}
//This is the function for changing your roster number.
function ok_button_click() 
{
    let potential_roster_number = parseInt(document.getElementById("roster-number-input").value,10);
    //If the program is unable to convert to int, run this errors procedure.
    if(isNaN(potential_roster_number))
    {
        alert("Error: What you have input is not a number.");
        document.getElementById("roster-number-input").value = "";
    }
    else
    {
        //Go through each member of a team and determine if the potential roster number is already in use.
        for(let member of all_teams[chosen_team_index].ship_list)
        {
            if(member.roster_number == potential_roster_number)
            {
                alert("This roster number has already been chosen, please choose another.");
                document.getElementById("roster-number-input").value = "";
                return;
            }
            all_teams[chosen_team_index].ship_list[selection_index].roster_number = potential_roster_number;
            sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
            set_all_items();
            close_button_click();
        }

    }
}

function augment_stat_quantity(token_type,parent_image,parent_html_id)
{
    if(aft_image_showing == true && (
        token_type == "current_agility" || token_type == "current_hull"||token_type=="current_sheilds"))// add aft to some of the stats if the back is showing.
    {
        if(token_type == "current_sheilds")
        {
            token_type = "current_aft_shields";
        }
        else if(token_type == "current_hull")
        {
            token_type = "current_aft_hull";
        }
        else if(token_type == "current_agility")
        {
            token_type = "current_aft_agility";
        }
        else
        {
            alert("ERROR: Could not determine token type.");
        }
    }
    var img = document.getElementById(parent_image),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bg_image_url = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    document.getElementById('token-image').style.backgroundImage = "url('"+bg_image_url+"')";
    let eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[chosen_team_index].ship_list[selection_index]."+token_type;
    eval(eval_string);
    let overlay = document.getElementById("overlay");
    let stat_box = document.getElementById("token-quantity-pop-up");
    overlay.style.opacity = 1;
    stat_box.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
    document.getElementById("plus-button").onclick = function(){plus_button_click(token_type,parent_html_id)};
    document.getElementById("minus-button").onclick = function(){minus_button_click(token_type,parent_html_id)};
}

function plus_button_click(token_type,parent_html_id)
{
    let parent_element = document.getElementById(parent_html_id);
    var stat_quantity =0;
    var eval_string = "all_teams[chosen_team_index].ship_list[selection_index]."+token_type+"++; stat_quantity = all_teams[chosen_team_index].ship_list[selection_index]."+token_type+";";//Increase the token type by one.
    eval(eval_string);
    if(token_type == "current_pilot_skill" && stat_quantity > 12)
    {
        all_teams[chosen_team_index].ship_list[selection_index].current_pilot_skill = 12;
        alert("Cannot have a pilot skill of more than twelve!");
    }
    eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[chosen_team_index].ship_list[selection_index]."+token_type;//Update pop up with the correct number of this token.
    eval(eval_string);
    eval_string = "parent_element.textContent =' : '+all_teams[chosen_team_index].ship_list[selection_index]."+token_type;//Update token box element.
    eval(eval_string);
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

function minus_button_click(token_type,parent_html_id)
{
    let parent_element = document.getElementById(parent_html_id);
    var stat_quantity =0;
    var eval_string = "if(all_teams[chosen_team_index].ship_list[selection_index]."+token_type+" >0){all_teams[chosen_team_index].ship_list[selection_index]."+token_type+"--;}stat_quantity = all_teams[chosen_team_index].ship_list[selection_index]."+token_type+";";
    eval(eval_string);
    if(token_type == "current_hull" && stat_quantity <= 0)
    {
        alert("You cannot have hull less than one before the game starts.");
        all_teams[chosen_team_index].ship_list[selection_index].current_hull = 1;
    }
    else
    {
        eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[chosen_team_index].ship_list[selection_index]."+token_type;
        eval(eval_string);
        eval_string = "parent_element.textContent =' : '+all_teams[chosen_team_index].ship_list[selection_index]."+token_type;//Update token box element.
        eval(eval_string);
    }
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

function close_stat_popup()
{
    let overlay = document.getElementById("overlay");
    let roster_number_box = document.getElementById("token-quantity-pop-up");
    overlay.style.opacity = 0;
    roster_number_box.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
}