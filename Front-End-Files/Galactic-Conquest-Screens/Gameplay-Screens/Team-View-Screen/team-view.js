//This is the section for adding buttton functionality.
function back_button(){
    sessionStorage.removeItem("team_name");
    window.location.href="../gameplay-screen.html";
}
//Go to next ship in the roster.
function next_button()
{
    var current_team = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team;
    selection_index++;
    if(selection_index >= current_team.ship_list.length)
    {
        selection_index = 0;
    }
    set_all_items();
}
//Go to previous ship in the roster.
function previous_button()
{
    var current_team = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team;
    selection_index--;
    if(selection_index < 0)
    {
        selection_index = current_team.ship_list.length-1;
    }
    set_all_items();
}

function open_input_popup(name)
{
    let overlay = document.getElementById("overlay");
    let input_popup = document.getElementById(name);
    overlay.style.opacity = 1;
    input_popup.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
}

function close_input_popup(name)
{
    let overlay = document.getElementById("overlay");
    let input_popup = document.getElementById(name);
    overlay.style.opacity = 0;
    input_popup.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
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
  //factions[0] == rebels.  factions[1] == imperials.
  var all_factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
let chosen_team_indicies = get_team_indecies_based_on_name(); 
var aft_image_showing = false; //This is a bool for the flip button to see if the front or back image is showing. 
var selection_index = undefined;

//Go to ship that we were working on.
if(sessionStorage.getItem("team_ship_index")!=null)
{
    selection_index = parseInt(sessionStorage.getItem("team_ship_index"),10);
}
else
{
    selection_index= 0;
}

//This section will be for setting up each element with proper pictures.
set_all_items();


//This will set all of the items for this page when the page first loads or if the next/previous buttons are pressed.
function set_all_items()
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    document.getElementById("title").textContent = sessionStorage.getItem("team_name");
    pilot_picture.style.backgroundImage = "url('"+current_ship.chosen_pilot.image_path+"')";
    maneuver_box.style.backgroundImage = "url('"+current_ship.chosen_pilot.ship_name.card+"')";

    roster_number.textContent= " : "+current_ship.roster_number;
    pilot_skill.textContent = " : "+current_ship.current_pilot_skill;
    attack.textContent = " : "+current_ship.current_attack;
    agility.textContent = " : "+current_ship.current_agility;
    hull.textContent = " : "+current_ship.current_hull;
    shields.textContent = " : "+current_ship.current_sheilds;

    //See if transfer button needs to be turned off.
    if(all_factions[chosen_team_indicies[0]].navy.length <=1 &&
       all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.length <= 1)
    {
        document.getElementById("transfer-button").style.pointerEvents = "none";
        document.getElementById("transfer-button").style.opacity = "0.3";
    }
    else
    {
        document.getElementById("transfer-button").style.pointerEvents = "auto";
        document.getElementById("transfer-button").style.opacity = "1.0";
    }

    //see if repair button needs to be turned off.
    if(current_ship.current_hull < current_ship.chosen_pilot.ship_name.hull ||
       current_ship.conditions.length > 0 ||
       current_ship.critical_hit_cards.length > 0 ||
       current_ship.current_sheilds < current_ship.chosen_pilot.ship_name.shields ||
      (current_ship.current_energy != undefined && 
       current_ship.current_energy < current_ship.chosen_pilot.ship_name.energy))
    {
        document.getElementById("repair-button").style.pointerEvents = "auto";
        document.getElementById("repair-button").style.opacity = "1.0";
    }
    else
    {
        document.getElementById("repair-button").style.pointerEvents = "none";
        document.getElementById("repair-button").style.opacity = "0.3";
    }

    //See if repair all button needs to be turned on.
    document.getElementById("repair-all-button").style.pointerEvents = "none";
    document.getElementById("repair-all-button").style.opacity = "0.3";
    let ship_list = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list;
    let button_on = false;
    for(var i=0; i < ship_list.length;i++)
    {
        if( ship_list[i].current_hull < ship_list[i].chosen_pilot.ship_name.hull ||
            ship_list[i].conditions.length > 0 ||
            ship_list[i].critical_hit_cards.length > 0 ||
            ship_list[i].current_sheilds < ship_list[i].chosen_pilot.ship_name.shields ||
           (ship_list[i].current_energy != undefined && 
            ship_list[i].current_energy < ship_list[i].chosen_pilot.ship_name.energy))
        {
            button_on = true;
            break;
        }
    }
    if(button_on == true)
    {
        document.getElementById("repair-all-button").style.pointerEvents = "auto";
        document.getElementById("repair-all-button").style.opacity = "1.0";
    }

    //If dealing with a large ship, then make energy and possibly flip button visible.
    if(current_ship.chosen_pilot.ship_name.ship_type == "largeOneCard" ||
       current_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        energy_icon.style.visibility = "visible";
        energy.style.visibility = "visible";
        energy.textContent=" : "+current_ship.current_energy;
        if(current_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
        {
            flip_button.style.visibility = "visible";
        }
        else
        {
            flip_button.style.visibility = "hidden";
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
    current_ship.upgrades.forEach(upgrade=>{
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
        //Add energy tokens if there are any.
        if(upgrade.energy_allocated > 0)
        {
            var ordnance_token_quantity = document.createElement("div");
            ordnance_token_quantity.style.gridRow = "1";
            ordnance_token_quantity.style.gridColumn = "2";
            ordnance_token_quantity.style.backgroundImage = "url('https://i.imgur.com/21ZF1eI.png')";
            ordnance_token_quantity.style.backgroundRepeat = "no-repeat";
            ordnance_token_quantity.style.backgroundSize = "100% 100%";
            ordnance_token_quantity.textContent = "X"+upgrade.energy_allocated;
            ordnance_token_quantity.style.fontSize = "xx-large";
            ordnance_token_quantity.style.fontFamily = "Impact, Charcoal, sans-serif";
            ordnance_token_quantity.style.textAlign = "right"
            ordnance_token_quantity.style.color = "white";
            upgrade_image.appendChild(ordnance_token_quantity);
        }
        
        upgrade_box.appendChild(upgrade_image);
        

    })

        //Set up main title based on which faction the player chose.
        if(chosen_team_indicies[0] == 0)
        {
            set_resource_quantities("Rebels")
        }
        else if(chosen_team_indicies[0] == 1)
        {
            set_resource_quantities("Imperial")
        }
        else
        {
            alert("ERROR: Could not determine which faction is focused.");
        }
}

//This function will take you to the upgrade screen to add/remove upgrades. 
function change_upgrades_button()
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    sessionStorage.setItem("team_ship_index",selection_index);
    sessionStorage.setItem("ship_snapshot",JSON.stringify(current_ship));//Used to compare before and after. Replacing the after if the user pressed the back button.
    window.location.href ="./Team-View-Upgrades/upgrade-screen.html";
}

//This is a function that will flip any large ship being seen on the screen.
function flip_button_click()
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    if(aft_image_showing == false)
    {
        pilot_picture.style.backgroundImage = "url('"+current_ship.chosen_pilot.aft_card_path+"')";
        aft_image_showing = true;
        agility.textContent=" : "+ current_ship.current_aft_agility;
        hull.textContent=" : "+ current_ship.current_aft_hull;
        shields.textContent=" : "+ current_ship.current_aft_shields;
    }
    else
    {
        pilot_picture.style.backgroundImage = "url('"+current_ship.chosen_pilot.image_path+"')";
        aft_image_showing = false;
        agility.textContent=" : "+ current_ship.current_agility;
        hull.textContent= " : "+ current_ship.current_hull;
        shields.textContent=" : "+ current_ship.current_sheilds;
    }
}
//This is the function for when you click the change roster number button.
function change_roster_number()
{
    open_input_popup("roster-number-box");
    document.getElementById("roster-number-input").focus();
}
//This is the function when you you close the roster number screen.
function close_button_click()
{
    close_input_popup("roster-number-box");
    let input = document.getElementById("roster-number-input");
    input.value="";
}
//This is the function for changing your roster number.
function ok_button_click() 
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    let potential_roster_number = parseInt(document.getElementById("roster-number-input").value,10);
    //If the program is unable to convert to int, run this errors procedure.
    if(isNaN(potential_roster_number))
    {
        alert("Error: What you have input is not a number.");
        document.getElementById("roster-number-input").value = "";
    }
    else
    {
        let roster_taken = false;
        //Go through each member of a team and determine if the potential roster number is already in use.
        for(let member of all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list)
        {
            if(member.roster_number == potential_roster_number)
            {
                alert("This roster number has already been chosen, please choose another.");
                document.getElementById("roster-number-input").value = "";
                document.getElementById("roster-number-input").focus();
                roster_taken = true;
                break;
            }
        }
        if(roster_taken == false)
        {
            current_ship.roster_number = potential_roster_number;
            sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
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
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    var img = document.getElementById(parent_image),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bg_image_url = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    document.getElementById('token-image').style.backgroundImage = "url('"+bg_image_url+"')";
    let eval_string = "document.getElementById('token-quantity').textContent = 'x'+current_ship."+token_type;
    eval(eval_string);
    open_input_popup("token-quantity-pop-up");
    document.getElementById("plus-button").onclick = function(){plus_button_click(token_type,parent_html_id)};
    document.getElementById("minus-button").onclick = function(){minus_button_click(token_type,parent_html_id)};
}

function plus_button_click(token_type,parent_html_id)
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    let parent_element = document.getElementById(parent_html_id);
    var stat_quantity =0;
    var eval_string = "current_ship."+token_type+"++; stat_quantity = current_ship."+token_type+";";//Increase the token type by one.
    eval(eval_string);
    if(token_type == "current_pilot_skill" && stat_quantity > 12)
    {
        current_ship.current_pilot_skill = 12;
        alert("Cannot have a pilot skill of more than twelve!");
    }
    eval_string = "document.getElementById('token-quantity').textContent = 'x'+current_ship."+token_type;//Update pop up with the correct number of this token.
    eval(eval_string);
    eval_string = "parent_element.textContent =' : '+current_ship."+token_type;//Update token box element.
    eval(eval_string);
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
}

function minus_button_click(token_type,parent_html_id)
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    let parent_element = document.getElementById(parent_html_id);
    var stat_quantity =0;
    var eval_string = "if(current_ship."+token_type+" >0){current_ship."+token_type+"--;}stat_quantity = current_ship."+token_type+";";
    eval(eval_string);
    if(token_type == "current_hull" && stat_quantity <= 0)
    {
        alert("You cannot have hull less than one before the game starts.");
        current_ship.current_hull = 1;
    }
    else
    {
        eval_string = "document.getElementById('token-quantity').textContent = 'x'+current_ship."+token_type;
        eval(eval_string);
        eval_string = "parent_element.textContent =' : '+current_ship."+token_type;//Update token box element.
        eval(eval_string);
    }
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
}

function close_stat_popup()
{
    close_input_popup("token-quantity-pop-up");
    set_all_items();
}

function add_new_ship_button()
{
    sessionStorage.setItem("team_indecies",JSON.stringify(chosen_team_indicies));
    window.location.href='Team-View-New-Ship/Ship-Selection/ship-selection.html';
}

function remove_ship_button()
{
    var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    var health_percentage = parseFloat(current_ship.current_hull / current_ship.chosen_pilot.ship_name.hull);
    var crit_hit_cost = current_ship.critical_hit_cards.length * 3;
    var total_rebate = Math.floor(health_percentage*(current_ship.chosen_pilot.cost/2)-crit_hit_cost);
    document.getElementById("rebate-quantity").textContent = ": "+ total_rebate;
    document.getElementById("confirmation-message").textContent = "Are you sure you want to remove this ship?"
    open_input_popup("confirmation-pop-up");
}

function dont_remove_ship()
{
    close_input_popup("confirmation-pop-up");
}

function remove_ship()
{
    all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.splice(selection_index,1);
    //Player currency rebate.
    var currency = parseInt(document.getElementById("rebate-quantity").textContent.toString().substring(1),10);
    all_factions[chosen_team_indicies[0]].currency+=currency;
    document.getElementById("money-quantity-label").textContent = all_factions[chosen_team_indicies[0]].currency;

    if(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.length == 0)
    {
        //remove team and go back to gameplay screen.
        all_factions[chosen_team_indicies[0]].navy.splice(chosen_team_indicies[1],1);
        sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
        sessionStorage.removeItem("team_name");
        window.location.href = "../gameplay-screen.html";
    }
    else
    {
        sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
        check_if_name_needs_to_be_downgraded(sessionStorage.getItem("team_name"));
        all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
        dont_remove_ship();
        next_button();
    }
}

function transfer_ship_button()
{
    //var current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    open_input_popup("transfer-pop-up");
    all_factions[chosen_team_indicies[0]].navy.forEach(ship_body=>{
        if(ship_body.group_name != sessionStorage.getItem("team_name"))
        {
            let transfer_button = document.createElement("button");
            transfer_button.type = "button";
            transfer_button.className = "long-button transfer-button";
            transfer_button.textContent = ship_body.group_name;
            transfer_button.style.fontFamily = "Impact, Charcoal, sans-serif";
            transfer_button.style.fontSize = "3vw";
            transfer_button.style.width = "90%";
            transfer_button.style.height = "10vh";
            transfer_button.style.marginTop = "1%";
            transfer_button.style.marginBottom = "1%";
            transfer_button.onclick = function(){
                ship_transfer(ship_body.group_name);
            }
            document.getElementById("transfer-pop-up").appendChild(transfer_button);
        }
    })
    //Create new group button
    if( all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.length > 1)//Do not make this button if the team only has one ship.
    {
        let group_button = document.createElement("button");
        group_button.type = "button";
        group_button.className = "long-button transfer-button";
        group_button.id = "transfer-new-group-button";
        group_button.textContent = "Create New Group";
        group_button.style.fontFamily = "Impact, Charcoal, sans-serif";
        group_button.style.fontSize = "3vw";
        group_button.style.width = "90%";
        group_button.style.height = "10vh";
        group_button.style.marginTop = "1%";
        group_button.style.marginBottom = "1%";
        group_button.onclick = function(){create_new_group_transfer_button();}
        document.getElementById("transfer-pop-up").appendChild(group_button);
    }

    //Back button
    let back_button = document.createElement("button");
    back_button.type = "button";
    back_button.className = "long-button transfer-button";
    back_button.id = "transfer-back-button";
    back_button.textContent = "Back";
    back_button.style.fontFamily = "Impact, Charcoal, sans-serif";
    back_button.style.fontSize = "3vw";
    back_button.style.width = "90%";
    back_button.style.height = "10vh";
    back_button.style.marginTop = "1%";
    back_button.style.marginBottom = "1%";
    back_button.onclick = function(){
        close_input_popup("transfer-pop-up");
        let buttons = document.getElementsByClassName("transfer-button");
        while (buttons.length > 0) {
            buttons[0].parentNode.removeChild(buttons[0]);
        }
    }
    document.getElementById("transfer-pop-up").appendChild(back_button);

}

function ship_transfer(transfer_to)
{
    var ship_to_transfer = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    var team_to_transfer = undefined;
    var roster_conflict = false;
    for(var i=0; i < all_factions[chosen_team_indicies[0]].navy.length;i++)
    {
        if( all_factions[chosen_team_indicies[0]].navy[i].group_name == transfer_to)
        {
            team_to_transfer = all_factions[chosen_team_indicies[0]].navy[i];
            //check for roster number incompatibility.
            for(var j=0; j < team_to_transfer.team.ship_list.length;j++)
            {
                if(team_to_transfer.team.ship_list[j].roster_number == ship_to_transfer.roster_number)
                {
                    roster_conflict = true;
                    break;
                }
            }
            if(roster_conflict == false)
            {
                team_to_transfer.team.ship_list.push(ship_to_transfer);
                all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.splice(selection_index,1);
                sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
                check_if_name_needs_to_be_upgraded(ship_to_transfer,team_to_transfer.group_name);
                all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));

                //If there are no ships in the ship body left, remove the ship body.
                if(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.length <= 0)
                {
                    all_factions[chosen_team_indicies[0]].navy.splice(chosen_team_indicies[1],1);
                    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
                    sessionStorage.removeItem("team_name");
                    window.location.href = "../gameplay-screen.html";
                }
                else
                {
                    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
                    check_if_name_needs_to_be_downgraded(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].group_name);
                    all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
                    let buttons = document.getElementsByClassName("transfer-button");
                    while (buttons.length > 0) {
                        buttons[0].parentNode.removeChild(buttons[0]);
                    }
                    close_input_popup("transfer-pop-up");
                    next_button();
                }
            }
            break;
        } 
    }
    if(roster_conflict == true)
    {
        alert("A ship has the same roster number as the transfer ship, please change roster number.");
        let buttons = document.getElementsByClassName("transfer-button");
        while (buttons.length > 0) {
            buttons[0].parentNode.removeChild(buttons[0]);
        }
        close_input_popup("transfer-pop-up");
    }
}

function create_new_group_transfer_button()
{
    close_input_popup("transfer-pop-up");
    //Remove all buttons.
    let buttons = document.getElementsByClassName("transfer-button");
    while (buttons.length > 0) {
        buttons[0].parentNode.removeChild(buttons[0]);
    }
    //fade out each button and image.
    document.getElementById("up-image").style.opacity = "0.3";
    document.getElementById("left-image").style.opacity = "0.3";
    document.getElementById("down-image").style.opacity = "0.3";
    document.getElementById("right-image").style.opacity = "0.3";
    document.getElementById("up-arrow").style.opacity = "0.3";
    document.getElementById("left-arrow").style.opacity = "0.3";
    document.getElementById("down-arrow").style.opacity = "0.3";
    document.getElementById("right-arrow").style.opacity = "0.3";
    document.getElementById("up-arrow").pointerEvents = "none";
    document.getElementById("left-arrow").pointerEvents = "none";
    document.getElementById("down-arrow").pointerEvents = "none";
    document.getElementById("right-arrow").pointerEvents = "none";

    //Add center image. 
    document.getElementById("middle-container").style.border =  all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].border;
    if(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].faction=="Rebels")
    {
        document.getElementById("middle-container").style.backgroundImage = all_factions[chosen_team_indicies[0]].image;
    }
    else if(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].faction=="Imperial")
    {
        document.getElementById("middle-container").style.backgroundImage = all_factions[chosen_team_indicies[0]].image;
    }
    else
    {
        alert("ERROR: Cannot determine whos turn it is.");
    }
    //Get coordinates for each direction.
    var current_coordinates = [parseInt(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].location.split("_")[0],10),parseInt(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].location.split("_")[1],10)];
    var up_coordinates = (current_coordinates[0])+"_"+(current_coordinates[1]-1);
    var left_coordinates = (current_coordinates[0]-1)+"_"+(current_coordinates[1]);
    var right_coordinates = (current_coordinates[0]+1)+"_"+(current_coordinates[1]);
    var down_coordinates = (current_coordinates[0])+"_"+(current_coordinates[1]+1);

    var up_image_found = false;
    var left_image_found = false;
    var right_image_found = false;
    var down_image_found = false;

    //Set onlick functions for the arrow buttons.
    
    document.getElementById("up-arrow").onclick = function(){create_split_group(up_coordinates)}
    document.getElementById("left-arrow").onclick = function(){create_split_group(left_coordinates)}
    document.getElementById("down-arrow").onclick = function(){create_split_group(down_coordinates)}
    document.getElementById("right-arrow").onclick = function(){create_split_group(right_coordinates)}

    //Check each coordinate for ship bodies
    for(var j=0; j < all_factions.length;j++)
    {
        var break_loop = false;
        for(var i=0; i < all_factions[j].navy.length;i++)
        {
            if(all_factions[j].navy[i].location == up_coordinates && up_image_found == false)
            {
                document.getElementById("up-image").style.backgroundImage = all_factions[j].image;
                document.getElementById("up-image").style.border =  all_factions[j].navy[i].border;
                up_image_found = true;
            }
            else if(all_factions[j].navy[i].location == left_coordinates && left_image_found == false)
            {
                document.getElementById("left-image").style.backgroundImage = all_factions[j].image;
                document.getElementById("left-image").style.border =  all_factions[j].navy[i].border;
                left_image_found = true;
            }
            else if(all_factions[j].navy[i].location == right_coordinates && right_image_found == false)
            {
                document.getElementById("right-image").style.backgroundImage = all_factions[j].image;
                document.getElementById("right-image").style.border =  all_factions[j].navy[i].border;
                right_image_found = true;
            }
            else if(all_factions[j].navy[i].location == down_coordinates && down_image_found == false)
            {
                document.getElementById("down-image").style.backgroundImage = all_factions[j].image;
                document.getElementById("down-image").style.border =  all_factions[j].navy[i].border;
                down_image_found = true;
            }
            if(down_image_found == true && left_image_found == true && up_image_found == true && right_image_found == true)
            {
                break_loop = true;
                break;
            }
        }
        if(break_loop == true)
        {
            break;
        }
    }
    //Check each coordinate for planets.
    if(down_image_found == false || left_image_found == false || up_image_found == false || right_image_found == false)
    {
        let active_planets = JSON.parse(sessionStorage.getItem("gc_setup_data")).active_planets;
        for(var i=0; i < active_planets.length;i++)
        {
            var planet_coordinates = active_planets[i].planet.x_coordinate+"_"+active_planets[i].planet.y_coordinate;
            if(planet_coordinates == up_coordinates && up_image_found == false)
            {
                document.getElementById("up-image").style.backgroundImage = "url('"+active_planets[i].planet.image_path+"')";
                if(active_planets[i].controlling_faction == "Rebels")
                {
                    document.getElementById("up-image").style.border = "2px solid maroon";
                    if(sessionStorage.getItem("gc_whos_turn") == "Rebels")
                    {
                        document.getElementById("up-image").style.opacity = "1.0";
                        document.getElementById("up-arrow").style.opacity = "1.0";
                        document.getElementById("up-arrow").pointerEvents = "auto"
                    }
                }
                else if(active_planets[i].controlling_faction == "Imperial")
                {
                    document.getElementById("up-image").style.border = "2px solid white";
                    if(sessionStorage.getItem("gc_whos_turn") == "Imperial")
                    {
                        document.getElementById("up-image").style.opacity = "1.0";
                        document.getElementById("up-arrow").style.opacity = "1.0";
                        document.getElementById("up-arrow").pointerEvents = "auto"
                    }
                }
                else
                {
                    document.getElementById("up-image").style.border = "2px solid blue";
                    document.getElementById("up-image").style.opacity = "1.0";
                    document.getElementById("up-arrow").style.opacity = "1.0";
                    document.getElementById("up-arrow").pointerEvents = "auto"
                }
                up_image_found = true;
            }
            else if(planet_coordinates == left_coordinates && left_image_found == false)
            {
                document.getElementById("left-image").style.backgroundImage = "url('"+active_planets[i].planet.image_path+"')";
                if(active_planets[i].controlling_faction == "Rebels")
                {
                    document.getElementById("left-image").style.border = "2px solid maroon";
                    if(sessionStorage.getItem("gc_whos_turn") == "Rebels")
                    {
                        document.getElementById("left-image").style.opacity = "1.0";
                        document.getElementById("left-arrow").style.opacity = "1.0";
                        document.getElementById("left-arrow").pointerEvents = "auto"
                    }
                }
                else if(active_planets[i].controlling_faction == "Imperial")
                {
                    document.getElementById("left-image").style.border = "2px solid white";
                    if(sessionStorage.getItem("gc_whos_turn") == "Imperial")
                    {
                        document.getElementById("left-image").style.opacity = "1.0";
                        document.getElementById("left-arrow").style.opacity = "1.0";
                        document.getElementById("left-arrow").pointerEvents = "auto"
                    }
                }
                else
                {
                    document.getElementById("left-image").style.border = "2px solid blue";
                    document.getElementById("left-image").style.opacity = "1.0";
                    document.getElementById("left-arrow").style.opacity = "1.0";
                    document.getElementById("left-arrow").pointerEvents = "auto"
                }
                left_image_found = true;
            }
            else if(planet_coordinates == right_coordinates && right_image_found == false)
            {
                document.getElementById("right-image").style.backgroundImage = "url('"+active_planets[i].planet.image_path+"')";
                if(active_planets[i].controlling_faction == "Rebels")
                {
                    document.getElementById("right-image").style.border = "2px solid maroon";
                    if(sessionStorage.getItem("gc_whos_turn") == "Rebels")
                    {
                        document.getElementById("right-image").style.opacity = "1.0";
                        document.getElementById("right-arrow").style.opacity = "1.0";
                        document.getElementById("right-arrow").pointerEvents = "auto"
                    }
                }
                else if(active_planets[i].controlling_faction == "Imperial")
                {
                    document.getElementById("right-image").style.border = "2px solid white";
                    if(sessionStorage.getItem("gc_whos_turn") == "Imperial")
                    {
                        document.getElementById("right-image").style.opacity = "1.0";
                        document.getElementById("right-arrow").style.opacity = "1.0";
                        document.getElementById("right-arrow").pointerEvents = "auto"
                    }
                }
                else
                {
                    document.getElementById("right-image").style.border = "2px solid blue";
                    document.getElementById("right-image").style.opacity = "1.0";
                    document.getElementById("right-arrow").style.opacity = "1.0";
                    document.getElementById("right-arrow").pointerEvents = "auto"
                }
                right_image_found = true;
            }
            else if(planet_coordinates == down_coordinates && down_image_found == false)
            {
                document.getElementById("down-image").style.backgroundImage = "url('"+active_planets[i].planet.image_path+"')";
                if(active_planets[i].controlling_faction == "Rebels")
                {
                    document.getElementById("down-image").style.border = "2px solid maroon";
                    if(sessionStorage.getItem("gc_whos_turn") == "Rebels")
                    {
                        document.getElementById("down-image").style.opacity = "1.0";
                        document.getElementById("down-arrow").style.opacity = "1.0";
                        document.getElementById("down-arrow").pointerEvents = "auto"
                    }
                }
                else if(active_planets[i].controlling_faction == "Imperial")
                {
                    document.getElementById("down-image").style.border = "2px solid white";
                    if(sessionStorage.getItem("gc_whos_turn") == "Imperial")
                    {
                        document.getElementById("down-image").style.opacity = "1.0";
                        document.getElementById("down-arrow").style.opacity = "1.0";
                        document.getElementById("down-arrow").pointerEvents = "auto"
                    }
                }
                else
                {
                    document.getElementById("down-image").style.border = "2px solid blue";
                    document.getElementById("down-image").style.opacity = "1.0";
                    document.getElementById("down-arrow").style.opacity = "1.0";
                    document.getElementById("down-arrow").pointerEvents = "auto"
                }
                down_image_found = true;
            }
            if(down_image_found == true && left_image_found == true && up_image_found == true && right_image_found == true)
            {
                break_loop = true;
                break;
            }
        }
    }
    //Check each coordinate for path dots.
    if(down_image_found == false || left_image_found == false || up_image_found == false || right_image_found == false)
    {
        let path_dots = JSON.parse(sessionStorage.getItem("game_data")).map_paths;
        for(var i=0; i < path_dots.length;i++)
        {
            var path_coordinates = path_dots[i].x_coordinate+"_"+path_dots[i].y_coordinate;
            if(path_coordinates == up_coordinates && up_image_found == false)
            {
                document.getElementById("up-image").style.backgroundImage = "url(https://i.imgur.com/lzfAvjE.png)";
                document.getElementById("up-image").style.border = "none";
                document.getElementById("up-image").style.opacity = "1.0";
                document.getElementById("up-arrow").style.opacity = "1.0";
                document.getElementById("up-arrow").pointerEvents = "auto";
                up_image_found = true;
            }
            else if(path_coordinates == left_coordinates && left_image_found == false)
            {
                document.getElementById("left-image").style.backgroundImage = "url(https://i.imgur.com/lzfAvjE.png)";
                document.getElementById("left-image").style.border = "none";
                document.getElementById("left-image").style.opacity = "1.0";
                document.getElementById("left-arrow").style.opacity = "1.0";
                document.getElementById("left-arrow").pointerEvents = "auto";
                left_image_found = true;
            }
            else if(path_coordinates == right_coordinates && right_image_found == false)
            {
                document.getElementById("right-image").style.backgroundImage = "url(https://i.imgur.com/lzfAvjE.png)";
                document.getElementById("right-image").style.border = "none";
                document.getElementById("right-image").style.opacity = "1.0";
                document.getElementById("right-arrow").style.opacity = "1.0";
                document.getElementById("right-arrow").pointerEvents = "auto";
                right_image_found = true;
            }
            else if(path_coordinates == down_coordinates && down_image_found == false)
            {
                document.getElementById("down-image").style.backgroundImage = "url(https://i.imgur.com/lzfAvjE.png)";
                document.getElementById("down-image").style.border = "none";
                document.getElementById("down-image").style.opacity = "1.0";
                document.getElementById("down-arrow").style.opacity = "1.0";
                document.getElementById("down-arrow").pointerEvents = "auto";
                down_image_found = true;
            }
            if(down_image_found == true && left_image_found == true && up_image_found == true && right_image_found == true)
            {
                break_loop = true;
                break;
            }
        }
    }
    //Series of if statements to fill in empty space spots.
    if(up_image_found == false)
    {
        document.getElementById("up-image").style.backgroundImage = "url(https://i.imgur.com/jNLR3bO.png)";
        document.getElementById("up-image").style.border = "none";
        document.getElementById("up-image").style.opacity = "1.0";
        document.getElementById("up-arrow").style.opacity = "1.0";
        document.getElementById("up-arrow").pointerEvents = "auto";

    }
    if(left_image_found == false)
    {
        document.getElementById("left-image").style.backgroundImage = "url(https://i.imgur.com/jNLR3bO.png)";
        document.getElementById("left-image").style.border = "none";
        document.getElementById("left-image").style.opacity = "1.0";
        document.getElementById("left-arrow").style.opacity = "1.0";
        document.getElementById("left-arrow").pointerEvents = "auto";
    }
    if(right_image_found == false)
    {
        document.getElementById("right-image").style.backgroundImage = "url(https://i.imgur.com/jNLR3bO.png)";
        document.getElementById("right-image").style.border = "none";
        document.getElementById("right-image").style.opacity = "1.0";
        document.getElementById("right-arrow").style.opacity = "1.0";
        document.getElementById("right-arrow").pointerEvents = "auto";
    }
    if(down_image_found == false)
    {
        document.getElementById("down-image").style.backgroundImage = "url(https://i.imgur.com/jNLR3bO.png)";
        document.getElementById("down-image").style.border = "none";
        document.getElementById("down-image").style.opacity = "1.0";
        document.getElementById("down-arrow").style.opacity = "1.0";
        document.getElementById("down-arrow").pointerEvents = "auto";
    }
    open_input_popup("direction-pop-up");
}

function create_split_group(location)
{
    let current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    let whos_turn_index = sessionStorage.getItem("gc_whos_turn")=="Rebels"? 0:1
    let team_name = create_GC_team_name(current_ship.chosen_pilot.ship_name,whos_turn_index);//Create a team named based on what ship was chosen.
    all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    let new_team = new ship_group(team_name,sessionStorage.getItem("gc_whos_turn"),location);   
    new_team.team.ship_list.push(current_ship);
    all_factions[chosen_team_indicies[0]].navy.push(new_team);
    all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list.splice(selection_index,1);//remove ship.
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
    check_if_name_needs_to_be_downgraded(all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].group_name);
    window.location.href = "../gameplay-screen.html";
}

function repair_button_push()
{  
    var costs = calculate_repair_cost();
    document.getElementById("cost-curreny-quantity-repair").textContent = (costs.currency_cost).toString();
    document.getElementById("cost-durasteel-quantity-repair").textContent = (costs.durasteel_cost).toString();
    document.getElementById("cost-parts-quantity-repair").textContent = ().toString();
    document.getElementById("cost--quantity-repair").textContent = ().toString();
    open_input_popup("payment-type-pop-up");
}

function reapair_all_button_push()
{

}

function calculate_repair_cost()
{
    let current_ship = all_factions[chosen_team_indicies[0]].navy[chosen_team_indicies[1]].team.ship_list[selection_index];
    let cost_of_hull_repair = 0;    
    let cost_of_energy = 0;
    let cost_of_shields = 0;
    let cost_of_conditions = current_ship.conditions.length;
    let cost_of_critical_hits = current_ship.critical_hit_cards.length *3;

    //Set costs if the ship is large two cards.
    if(current_ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        cost_of_hull_repair = ((current_ship.chosen_pilot.ship_name.hull - current_ship.current_hull)+(current_ship.chosen_pilot.ship_name.aft_hull - current_ship.current_aft_hull))*2;
        cost_of_shields = (current_ship.chosen_pilot.ship_name.shields - current_ship.current_shields)+(current_ship.chosen_pilot.ship_name.aft_shields - current_ship.current_aft_shields);
        cost_of_energy = (current_ship.chosen_pilot.ship_name.energy - current_ship.current_energy)*2;
    }
    else if( current_ship.chosen_pilot.ship_name.ship_type == "largeOneCard")
    {    
        cost_of_hull_repair = (current_ship.chosen_pilot.ship_name.hull - current_ship.current_hull)*2;
        cost_of_shields = (current_ship.chosen_pilot.ship_name.shields - current_ship.current_shields);
        cost_of_energy = (current_ship.chosen_pilot.ship_name.energy - current_ship.current_energy)*2;    
    }
    else
    {
        cost_of_hull_repair = (current_ship.chosen_pilot.ship_name.hull - current_ship.current_hull)*2;
        cost_of_shields = (current_ship.chosen_pilot.ship_name.shields - current_ship.current_shields);
    }

    var costs = {
        currency_cost: (cost_of_hull_repair + cost_of_energy + cost_of_shields + cost_of_conditions + cost_of_critical_hits),
        durasteel_cost: (cost_of_hull_repair/2),
        electronics_cost: (cost_of_shields/2),
        parts_cost:(cost_of_critical_hits/3),
        alt_currency_cost: cost_of_conditions,
        tibanna_cost: cost_of_energy
    }
    return costs;
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