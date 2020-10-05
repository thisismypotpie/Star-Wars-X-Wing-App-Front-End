document.onkeyup = function(e) {
//Options button click.
if(e.keyCode == 79)//'O' key
{
    toggle_drop_down('options-drop-down-area');

    return;
}
//drop down menu for options button.
if(document.getElementById("options-drop-down-area").style.visibility == "visible")
{

    if(e.keyCode == 77)//M key.
    {
        maneuver_click();
    }
    else if(e.keyCode == 68)//D key.
    {
        dice_click();
    }
    else if(e.keyCode == 78)//N key.
    {
        notes_click();
    }
    else if(e.keyCode == 65)//A key.
    {
        add_new_ship_click();
    }
    else if(e.keyCode ==  83)//S key.
    {
        surrender_click();
    }
    
    document.getElementById("options-drop-down-area").style.visibility = "hidden";
    return;
}

//Bindings for target lock pop-up.
if(document.getElementById("target-lock-pop-up").style.visibility =="visible")//target lock pop-up visible.
{
    if(e.keyCode == 39)//next key
    {
        next_team_button_click('target-team');
    }
    else if(e.keyCode == 37)//previous key
    {
        previous_team_button_click('target-team')
    }
    else if(e.keyCode == 13)//Enter key
    {
        add_target_lock()
    }
    else if(e.keyCode == 27)//escape key
    {
        hide_pop_up('target-lock-pop-up')
    }
}
//Bindings for search pop-up.
else if(document.getElementById("search-pop-up").style.visibility == "visible")//search po-up-visible.
{
    if(e.keyCode == 39)//next key
    {
        next_team_button_click('target-team-search');
    }
    else if(e.keyCode == 37)//previous key
    {
        previous_team_button_click('target-team-search');
    }
    else if(e.keyCode == 13)//Enter key
    {
        find_and_display_searching_ship();
    } 
    else if(e.keyCode == 27)//escape key to go bacck.
    {
        hide_pop_up('search-pop-up');
    }
}
//Bindings for notification pop-up.
else if(document.getElementById("Notification-pop-up").style.visibility == "visible")
{
    if(e.keyCode == 13)//Enter key
    {
        hide_pop_up('Notification-pop-up');
    } 
}
else if(document.getElementById("return-button").style.visibility == "visible")//return button when searching for a ship.
{
    if(e.keyCode == 27)//escape key
    {
        return_to_main_screen();
    } 
}
//Maneuver selection buttons.
else
{
    if(e.keyCode == 39)//next maneuver.
    {
        next_maneuver_click();
    }
    if(e.keyCode == 37)//previous maneuver.
    {
        previous_maneuver_click();
    }
}

}


/*  I'll need this in the future. Is a template for differnt buttons to add key bindings.
if(e.keyCode == 39)//next key
{
    
}
else if(e.keyCode == 37)//previous key
{

}
else if(e.keyCode == 13)//Enter key
{

}
else if(e.keyCode == 27)//escape key
{

}*/

