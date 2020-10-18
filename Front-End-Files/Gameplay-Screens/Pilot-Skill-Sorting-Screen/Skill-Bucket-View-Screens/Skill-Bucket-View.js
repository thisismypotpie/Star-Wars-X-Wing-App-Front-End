//Go to next ship in the roster.
function next_button()
{
    selection_index++;
    if(selection_index >= bucket_list.length)
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
        selection_index = bucket_list.length-1;
    }
    set_all_items();
}

//end button functionality section.
let buckets = JSON.parse(sessionStorage.getItem("buckets")); 
let display_index = sessionStorage.getItem("display_index");//Used to determine which bucke to look at.
let bucket = buckets[display_index];
let bucket_list = [];
let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
//Get the ships for the bucket list.
for(var i =0; i < all_teams.length;i++)
{
    if(bucket.name == all_teams[i].team_name)
    {
        bucket.roster_numbers.forEach(roster=>{
             var roster_nums = all_teams[i].ship_list.map(function(e){return e.roster_number});
             if(roster_nums.includes(roster))
             {
                var index = roster_nums.indexOf(roster);
                bucket_list.push(all_teams[i].ship_list[index]);
             }
             else
             {
                 alert("ERROR: Unable to find some of the ships for this bucket.")
             }
        })
        break;
    }
}


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
let selection_index = 0;
var aft_image_showing = false; //This is a bool for the flip button to see if the front or back image is showing. 
//end global variable set up section

//This section will be for setting up each element with proper pictures.
set_all_items();

//End picture set_up section.

//This section is for functions called throughout this file.

//This will set all of the items for this page when the page first loads or if the next/previous buttons are pressed.
function set_all_items()
{
    pilot_picture.style.backgroundImage = "url('"+bucket_list[selection_index].chosen_pilot.image_path+"')";
    maneuver_box.style.backgroundImage = "url('"+bucket_list[selection_index].chosen_pilot.ship_name.card+"')";

    roster_number.textContent= ":"+bucket_list[selection_index].roster_number;
    pilot_skill.textContent = " : "+bucket_list[selection_index].current_pilot_skill;
    attack.textContent = " : "+bucket_list[selection_index].current_attack;
    agility.textContent = " : "+bucket_list[selection_index].current_agility;
    hull.textContent = " : "+bucket_list[selection_index].current_hull;
    shields.textContent = " : "+bucket_list[selection_index].current_sheilds;

    //If dealing with a large ship, then make energy and possibly flip button visible.
    if(bucket_list[selection_index].chosen_pilot.ship_name.ship_type == "largeOneCard" ||
       bucket_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
    {
        energy_icon.style.visibility = "visible";
        energy.style.visibility = "visible";
        energy.textContent=" : "+bucket_list[selection_index].current_energy;
        if(bucket_list[selection_index].chosen_pilot.ship_name.ship_type == "largeTwoCard")
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
    bucket_list[selection_index].upgrades.forEach(upgrade=>{
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
        upgrade_box.appendChild(upgrade_image);

    })
}

//This is a function that will flip any large ship being seen on the screen.
function flip_button_click()
{
    if(aft_image_showing == false)
    {
        pilot_picture.style.backgroundImage = "url('"+bucket_list[selection_index].chosen_pilot.aft_card_path+"')";
        aft_image_showing = true;
    }
    else
    {
        pilot_picture.style.backgroundImage = "url('"+bucket_list[selection_index].chosen_pilot.image_path+"')";
        aft_image_showing = false;
    }
}