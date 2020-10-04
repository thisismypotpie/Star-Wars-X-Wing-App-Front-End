var drop_down_active = false;
var drop_down_just_happened = false;

document.getElementById('options-drop-down-area').addEventListener('blur',event=>{
    drop_down_active = false;
    document.getElementById(drop_down_id).style.visibility = "hidden";
})

function toggle_drop_down(drop_down_id)
{
    if(drop_down_active == false)
    {
        drop_down_active = true;
        drop_down_just_happened = true;
        document.getElementById(drop_down_id).style.visibility = "visible";
        document.getElementById(drop_down_id).focus();
    }
}

document.addEventListener('click',event=>{
    if(drop_down_active == true && drop_down_just_happened == false)
    {
        drop_down_active = false;
        document.getElementById('options-drop-down-area').style.visibility = "hidden";   
    }
    else if(drop_down_active == true && drop_down_just_happened == true)
    {
        drop_down_just_happened = false;
    }
})


function maneuver_click()
{
    clear_modules();
    document.getElementById("maneuver-range").style.visibility = "visible";
    document.getElementById("maneuver-type").style.visibility = "visible";
    if(sessionStorage.getItem("phase") == null)//If not in the maneuver selection phase, do not show the next and previous buttons.
    {
        document.getElementById("next-maneuver-button").style.visibility = "visible";
        document.getElementById("previous-maneuver-button").style.visibility = "visible";
    }
}

function dice_click()
{
    clear_modules();
    document.getElementById("roll-dice").style.visibility = "visible";
    document.getElementById("minus-attacker-dice").style.visibility = "visible";
    document.getElementById("add-attacker-dice").style.visibility = "visible";
    document.getElementById("add-defender-dice").style.visibility = "visible";
    document.getElementById("minus-defender-dice").style.visibility = "visible";
    document.getElementById("attacker-dice-image").style.visibility = "visible";
    document.getElementById("defender-dice-image").style.visibility = "visible";
    document.getElementById("number-of-attacking-dice").style.visibility = "visible";
    document.getElementById("number-of-defending-dice").style.visibility = "visible";
}

function notes_click()
{   
    clear_modules();
    alert("notes click!")
}

function add_new_ship_click()
{
    clear_modules();
    alert("add new ship click")
}

function clear_modules()
{
    //Clear the maneuver elements.
    document.getElementById("maneuver-range").style.visibility = "hidden";
    document.getElementById("maneuver-type").style.visibility = "hidden";
    document.getElementById("next-maneuver-button").style.visibility = "hidden";
    document.getElementById("previous-maneuver-button").style.visibility = "hidden";
    //Clear the dice elements.
    document.getElementById("roll-dice").style.visibility = "hidden";
    document.getElementById("minus-attacker-dice").style.visibility = "hidden";
    document.getElementById("add-attacker-dice").style.visibility = "hidden";
    document.getElementById("add-defender-dice").style.visibility = "hidden";
    document.getElementById("minus-defender-dice").style.visibility = "hidden";
    document.getElementById("attacker-dice-image").style.visibility = "hidden";
    document.getElementById("defender-dice-image").style.visibility = "hidden";
    document.getElementById("number-of-attacking-dice").style.visibility = "hidden";
    document.getElementById("number-of-defending-dice").style.visibility = "hidden";
}
