document.onkeyup = function(e) {

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
else if(document.getElementById("search-pop-up").style.visibility == "visible")//search po-up-visible.
{
    if(e.keyCode == 39)//next key
    {
        next_team_button_click('target-team-search');
    }
    else if(e.keyCode == 37)//previous key
    {
        next_team_button_click('target-team-search');
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

else if(document.getElementById("return-button").style.visibility == "visible")//return button when searching for a ship.
{
    if(e.keyCode == 27)//escape key
    {
        return_to_main_screen();
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