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
else if(document.getElementById("token-quantity-pop-up").style.visibility == "visible")
{
    if(e.keyCode == 13)//close token augmentation pop up/enter-key
    {
        hide_pop_up('token-quantity-pop-up');
        check_for_death();
    }
    else if(e.keyCode == e.keyCode == 68 || e.keyCode == 39)//increase token by one/-> key or a-key
    {
        //need to find a way to complete this.
    }
    else if(e.keyCode == 65 || e.keyCode == 37)//decrease token by one/-> key or d-key)
    {
        //need to find a way to complete this.
    }

}
//Maneuver selection buttons.
else
{
    //maneuver selection if visible.
    if((e.keyCode == 68 || e.keyCode == 39)&& document.getElementById("next-maneuver-button").style.visibility != "hidden")//Next maneuver/d-key or -> key
    {
        next_maneuver_click();
    }
    else if((e.keyCode == 65 || e.keyCode == 37)&& document.getElementById("previous-maneuver-button").style.visibility != "hidden")//previous maneuver/a-key of <- key.
    {
        previous_maneuver_click();
    }
    else if(e.keyCode == 13)//go to next ship/enter-key
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
    else if(e.keyCode == 27 || e.keyCode == 8)//go to previous ship/escape-key or backspace
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
    else if(e.keyCode == 67)//cycle card type/c-key
    {
        cycle_button_click();
    }
    else if(e.keyCode == 84)//target lock/t-key
    {
        show_pop_up('target-lock-pop-up');
        target_lock_and_search_index = 0;
        document.getElementById('target-team').textContent=all_teams[target_lock_and_search_index].team_name;
        document.getElementById('roster-number-input-target-lock').focus();
    }
    else if(e.keyCode == 83)//search for ship/s-key
    {
        target_lock_and_search_index = 0;
        show_pop_up('search-pop-up');
        document.getElementById('target-team-search').textContent=all_teams[target_lock_and_search_index].team_name;
        document.getElementById('roster-number-input-search').focus();
    }

    //Key bindings for each of the tokens.
    else if(e.keyCode == 49)//augment focus tokens/1-key
    {
        augment_token_quantity('focus_tokens','focus-token');
    }
    else if(e.keyCode == 50)//augment ion tokens/2-key
    {
        augment_token_quantity('ion_tokens','ion-token');
    }
    else if(e.keyCode == 51)//augment cloak tokens/3-key
    {
        augment_token_quantity('cloak_tokens','cloak-token');
    }
    else if(e.keyCode == 52)//augment evade tokens/4-key
    {
        augment_token_quantity('evade_tokens','evade-token');
    }
    else if(e.keyCode == 53)//augment jam tokens/5-key
    {
        augment_token_quantity('jam_tokens','jam-token');
    }
    else if(e.keyCode == 54)//augment reinforce tokens/6-key
    {
        augment_token_quantity('reinforce_tokens','reinforce-token');
    }
    else if(e.keyCode == 55)//augment stress tokens/7-key
    {
        augment_token_quantity('stress_tokens','stress-token');
    }
    else if(e.keyCode == 56)//augment weapons disabled tokens/8-key
    {
        augment_token_quantity('weapons_disabled_tokens','weapons-disabled-token');
    }
    else if(e.keyCode == 57)//augment tractor beam tokens/9-key
    {
        augment_token_quantity('tractor_beam_tokens','tractor-beam-token');
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

