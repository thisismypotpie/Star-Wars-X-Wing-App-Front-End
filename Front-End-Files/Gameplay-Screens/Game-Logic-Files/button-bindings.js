window.onkeyup= function(e) {
//Options button click.
if(e.keyCode == 79)//'O' key
{
    toggle_drop_down('options-drop-down-area');

    return;
}
//drop down menu for options button.
else if(document.getElementById("options-drop-down-area").style.visibility == "visible")
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
        if(sessionStorage.getItem("searching")!= null || sessionStorage.getItem("searching")!= undefined)
        {
            alert("You cannot save your game while you are doing a search, exit search to save.");
            return;
        }
        //Create overlay dynamically.
        if(document.getElementById('overlay')==null || document.getElementById('overlay')==undefined)
        {
            create_overlay_dynamically();
        }
            let overlay = document.getElementById("overlay");
            overlay.style.opacity = 1;
            overlay.style.pointerEvents = "all";
        //bring up save game form.
        if(document.getElementById('save_game_pop_up')==null || document.getElementById('save_game_pop_up')==undefined)
        {
            create_save_game_form_dynamically();
        }
            document.getElementById('save_game_pop_up').style.visibility = "visible";
            document.getElementById('save_game_input').focus();
            setTimeout(() => {
                document.getElementById('save_game_input').value = "";
            },25);//This timeout is here because otherwise there will be a "`" key pressed into the value and I was not able to find another way to delete it without a timeout.
    }
    
    document.getElementById("options-drop-down-area").style.visibility = "hidden";
    return;
}

//Bindings for target lock pop-up.
else if(document.getElementById("target-lock-pop-up").style.visibility =="visible")//target lock pop-up visible.
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
//Save game screen
else if(document.getElementById('save_game_pop_up') != null && document.getElementById('save_game_pop_up').style.visibility == "visible")
{
    if(e.keyCode == 13)//enter key
    {
        validate_save_name();
    }
    else if(e.keyCode == 27)//escape key
    {
        close_pop_up();
    }
    return;
}
else if(document.getElementById("dice-container").style.visibility == "visible")//Dice module
{
    if(e.keyCode == 39 && document.getElementById("add-attacker-dice").style.visibility == "visible")//add attacker die
    {
        add_attack_die();
    }
    else if(e.keyCode == 39 && document.getElementById("add-attacker-dice").style.visibility == "visible")//add attacker die
    {
        add_attack_die();
    }
    else if(e.keyCode == 37 && document.getElementById("minus-attacker-dice").style.visibility == "visible")//subtract attacker die
    {
        subtract_attack_die();
    }
    else if(e.keyCode == 38 && document.getElementById("add-defender-dice").style.visibility == "visible")//add defender die
    {
        add_defense_die();
    }
    else if(e.keyCode == 40 && document.getElementById("minus-defender-dice").style.visibility == "visible")//subtract defender die
    {
        subtract_defense_die();
    }
    else if(e.keyCode == 82/*r key*/ && document.getElementById("roll-dice").style.visibility == "visible")//roll dice
    {
        roll_dice_click();
    }
    else if(e.keyCode == 13 && document.getElementById("dice-results-pop-up").style.visibility == "visible")//close dice results
    {
        hide_pop_up('dice-results-pop-up');
        remove_dice();
        return;
    }
}
//Maneuver selection buttons.
else
{
    //maneuver selection if visible.
    if(e.keyCode == 39 && document.getElementById("next-maneuver-button").style.visibility == "visible")//next maneuver.
    {
        next_maneuver_click();
    }
    else if(e.keyCode == 37 && document.getElementById("previous-maneuver-button").style.visibility == "visible")//previous maneuver.
    {
        previous_maneuver_click();
    }
    //next ship
    else if(e.keyCode == 13 && 1 ==2)//enter key
    {
        if(sessionStorage.getItem("phase")!= null)
        {
            if(sessionStorage.getItem("phase") == "movement")
            {
                go_to_next_ship_movement_phase();
            }
            else if(sessionStorage.getItem("phase") == "attack")
            {
                go_to_next_ship_attack_phase();
            }
            else
            {
                alert("ERROR: Key binding for movement selection came back as: "+sessionStorage.getItem("phase"));
            }
        }
        else
        {
            go_to_next_ship_maneuver_selection();
        }
    }
    else if(e.keyCode == 27 || e.keyCode == 8)//escape key
    {
        if(sessionStorage.getItem("team_index") == 0 )
        {
            if(sessionStorage.getItem("selected_ship_index") != 0)
            {
                main_back_button_click();
            }
        }
        else
        {
            main_back_button_click();
        }
    }
    else if(e.keyCode == 67)//c key for cycling through card types.
    {
        cycle_button_click();
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

