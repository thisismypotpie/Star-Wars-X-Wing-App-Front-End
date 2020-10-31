window.onkeyup= function(e) {
//If the save game is open, don't take in any other button commands on this page.
if(document.getElementById("save_game_pop_up") != null && 
   document.getElementById("save_game_pop_up").style.visibility == "visible")
{
    return;
}
//Open the reminder pop up but not if the notitfication telling the user a new reminder as been created is open.
else if(document.getElementById("notification-pop-up-container").style.visibility == "visible" &&(
    e.keyCode == 13))
{
    if(e.keyCode == 13)
    {
        document.getElementById("notification-ok-button").click();
    }
}
//Key bindings for reminder creation pop up.
//Since you must type here, there is not check for which key is pressed.
else if(document.getElementById("reminder-pop-up-container").style.visibility == "visible")
{
    if(e.keyCode == 27)//exit rmeinder creation screen/escape key
    {
        document.getElementById("reminder-back-button").click();
    }
    else if(e.keyCode == 38)//go to roster entry / up arrow key
    {
            document.getElementById("roster-entry").focus();
    }
    else if(e.keyCode == 40)//go to text area / down arrow.
    {
        document.getElementById("reminder-text-area").focus();
    }
}
else if(document.getElementById("reminder-notification-pop-up-container").style.visibility != "hidden")
{
    if(e.keyCode == 13)
    {
        document.getElementById("reminder-notification-ok-button").click();
    }
}
else if(document.getElementById("reminder-notification-pop-up-container").style.visibility == "visible" &&(
        e.keyCode == 68))
{
    if(e.keyCode == 68)//check delete button/ 'D' key
    {
        if(document.getElementById("delete-reminder-checkbox").checked == false)
        {
            document.getElementById("delete-reminder-checkbox").checked = true;
        }
        else
        {
            document.getElementById("delete-reminder-checkbox").checked = false;
        }
    }
}
//drop down menu for options button.
else if(document.getElementById("options-drop-down-area").style.visibility == "visible"&&(
e.keyCode == 77 || e.keyCode == 68 || e.keyCode == 78 || e.keyCode == 65 || e.keyCode == 83))
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
else if(document.getElementById("target-lock-pop-up").style.visibility =="visible" &&(
    e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 13 || e.keyCode == 27))//target lock pop-up visible.
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
else if(document.getElementById("search-pop-up").style.visibility == "visible" &&(
    e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 13 || e.keyCode == 27))//search po-up-visible.
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
else if(document.getElementById("Notification-pop-up").style.visibility == "visible" &&(
    e.keyCode == 13 || e.keyCode == 27
))
{
    if(e.keyCode == 13)//Enter key
    {
        document.getElementById("notificatin-ok-button").click();
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
else if(document.getElementById('save_game_pop_up') != null && document.getElementById('save_game_pop_up').style.visibility == "visible" &&(
    e.keyCode == 13 || e.keyCode == 27
))
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
else if(document.getElementById("dice-container").style.visibility == "visible" &&(
    e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 82
))//Dice module
{
    if(e.keyCode == 39 && document.getElementById("add-attacker-dice").style.visibility != "hidden")//add attacker die
    {
        add_attack_die();
    }
    else if(e.keyCode == 37 && document.getElementById("minus-attacker-dice").style.visibility != "hidden")//subtract attacker die
    {
        subtract_attack_die();
    }
    else if(e.keyCode == 38 && document.getElementById("add-defender-dice").style.visibility != "hidden")//add defender die
    {
        add_defense_die();
    }
    else if(e.keyCode == 40 && document.getElementById("minus-defender-dice").style.visibility != "hidden")//subtract defender die
    {
        subtract_defense_die();
    }
    else if(e.keyCode == 82/*r key*/ && document.getElementById("roll-dice").style.visibility != "hidden")//roll dice
    {
        roll_dice_click();
    }
}
//dice result conatiner.
else if(e.keyCode == 13 && document.getElementById("dice-results-pop-up").style.visibility != "hidden")
{
    hide_pop_up('dice-results-pop-up');
    remove_dice();
    return;
}
else if(document.getElementById("card-removal-pop-up").style.visibility == "visible" &&(
    e.keyCode == 27 || e.keyCode == 8 ||e.keyCode == 70 || e.keyCode == 38 || e.keyCode ==87 || e.keyCode ==40 ||e.keyCode == 83
))
{
    if(e.keyCode == 27 || e.keyCode == 8)//go back from card removeal pop-up/esc-key or backspace
    {
        hide_pop_up('card-removal-pop-up');
        document.getElementById('flip-button-for-removal-pop-up').style.visibility ='Hidden';
        document.getElementById('removal-image').style.border = '1px solid white'
    }
    else if(document.getElementById("flip-button-for-removal-pop-up").style.visibility == "visible"
            && e.keyCode == 70)//flip dual sided upgrade/f-key
    {
        //flip_button_upgrade_index_for_key_bindings is defined at the top of the maneuver selection screen .js.
        flip_button_click_for_dual_sided_upgrades('removal-image',upgrade_index_for_key_bindings);
    }
    //To increase/decrease ordnance tokens.
    else if(document.getElementById("ordnance-token-container").style.visibility == "visible")
    {
        if(e.keyCode == 38 || e.keyCode == 87) //Add ordnance tokens/ Up arrow or w-key.
        {
            add_ordnance_token(upgrade_index_for_key_bindings);
        }
        else if(e.keyCode == 40 || e.keyCode == 83)//Subtract ordnance tokens/ down arrow or s-key.
        {
            subract_ordnance_token(upgrade_index_for_key_bindings);
        }
    }
}
else if(document.getElementById("token-quantity-pop-up").style.visibility == "visible" &&(
    e.keyCode == 13 || e.keyCode == 68 ||  e.keyCode == 39 || e.keyCode == 65 || e.keyCode == 37
))
{
    if(e.keyCode == 13)//close token augmentation pop up/enter-key
    {
        hide_pop_up('token-quantity-pop-up');
        check_for_death();
    }
    else if(e.keyCode == 68 || e.keyCode == 39)//increase token by one/-> key or a-key
    {
        plus_button_click(token_type_for_key_bindings,parent_id_for_key_bindings);
    }
    else if(e.keyCode == 65 || e.keyCode == 37)//decrease token by one/-> key or d-key)
    {
        minus_button_click(token_type_for_key_bindings,parent_id_for_key_bindings);
    }

}
//Maneuver selection buttons.
else
{
    //maneuver selection if visible.
    if( e.keyCode == 39 && document.getElementById("next-maneuver-button").style.visibility != "hidden")//Next maneuver/d-key or -> key
    {
        next_maneuver_click();
    }
    else if(e.keyCode == 37 && document.getElementById("previous-maneuver-button").style.visibility != "hidden")//previous maneuver/a-key of <- key.
    {
        previous_maneuver_click();
    }
    else if(e.keyCode == 79)//toggle drop down options/'O' key
    {
        toggle_drop_down('options-drop-down-area');
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
    else if(e.keyCode == 70 && document.getElementById("flip-button").style.visibility == "visible")
    {
        flip_button_click_for_large_ships('pilot-image')
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

    //Keybindings for each of the stats.
    else if(e.keyCode == 65)//augment attack/a-key
    {
        augment_stat_quantity('current_attack','attack-image','attack-text')
    }
    else if(e.keyCode == 71)//augment agility/g-key
    {
        augment_stat_quantity('current_agility','agility-image','agility-text')
    }
    else if(e.keyCode == 72)//augment hull/h-key
    {
        augment_stat_quantity('current_hull','hull-image','hull-text')
    }
    else if(e.keyCode == 73)//augment shields/i-key
    {
        augment_stat_quantity('current_sheilds','shield-image','shield-text')
    }
    else if(e.keyCode == 69 && document.getElementById("energy-image").style.visibility == "visible")//augment energy/e-key
    {
        augment_stat_quantity('current_energy','energy-image','energy-text')
    }
    else if(e.keyCode == 80)//augment pilot skill/p-key
    {
        augment_stat_quantity('current_pilot_skill','pilot-skill-image','pilot-skill-text');
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

