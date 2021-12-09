var drop_down_active = false;
var drop_down_just_happened = false;


function toggle_drop_down(drop_down_id)
{
    if(drop_down_active == false)
    {
        drop_down_active = true;
        drop_down_just_happened = true;
        document.getElementById(drop_down_id).style.visibility = "visible";
        document.getElementById(drop_down_id).focus();
    }
    else
    {
        document.getElementById(drop_down_id).style.visibility = "hidden";
        drop_down_active = false;
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
    document.getElementById('options-drop-down-area').style.visibility = "hidden";
    drop_down_active = false;
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
    document.getElementById('options-drop-down-area').style.visibility = "hidden";
    document.getElementById("dice-container").style.visibility = "visible"
    drop_down_active = false;

}

function notes_click()
{   
    document.getElementById('options-drop-down-area').style.visibility = "hidden";
    drop_down_active = false;
    show_reminder_pop_up(document.getElementById("team-name-label").textContent,document.getElementById("roster-text").textContent);

}

function add_new_ship_click()
{
    document.getElementById('options-drop-down-area').style.visibility = "hidden";
    drop_down_active = false;
    sessionStorage.setItem("Ship-Page-Path","Freeplay-In Game");
    window.location.href = "../Ship-Selection-Interface/Selection-Screen/Selection-Screen.html";
}

function surrender_click()
{
    document.getElementById('options-drop-down-area').style.visibility = "hidden";
    surrender_team(sessionStorage.getItem("team_index"));
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
    document.getElementById("dice-container").style.visibility = "hidden"
}

function go_back_to_main_menu()
{
    show_confirmation_pop_up("Go back to main menu? All unsaved progress will be lost!");
    document.getElementById("confirmation-yes-button").onclick = ()=>{
        close_confirmation_pop_up();
        var game_data = JSON.parse(sessionStorage.getItem("game_data"));
        sessionStorage.clear();
        sessionStorage.setItem("game_data",JSON.stringify(game_data));
        window.location.href = "../../Title-Screen(Main Menu)/index.html";
    }
    document.getElementById("confirmation-no-button").onclick =  ()=>{
        close_confirmation_pop_up();
    }
}