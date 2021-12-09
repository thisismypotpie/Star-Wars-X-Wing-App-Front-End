if(sessionStorage.getItem("gc_phase") == "placement")
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var current_placing_faction = undefined;
    //factions[0] == rebels.  factions[1] == imperials.
    var factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
    var whos_turn = sessionStorage.getItem("gc_whos_turn");

    //Set the other buttons in the gameplay screen.
    document.getElementById("button-three").onclick = function(){done_button_placement_phase_click()};

    //Set up main title based on which faction the player chose.
    set_resource_quantities(whos_turn);
    if(whos_turn == "Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Placement";
    }
    else if(whos_turn == "Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Placement";
    }
    else
    {
        alert("Unknown faction chosen, please go back and re-create setup.");
    }

    //setup screen to place forces based on where the user clicks.
    //for(var x=1; x < 201;x++)
    for(var x=34; x < 196;x++)
    {
   //for(var y=1; y<101;y++)
   for(var y=2; y<100;y++)
   {
       var id = x+"_"+y;
       document.getElementById(id).onclick= function(e){
               var planet_in_question  =get_planet(parseInt(document.getElementById(e.target.id).getAttribute("planet_id"),10),0,setup_data.active_planets.length-1);
               //alert ("id: "+e.target.id+"\nOutput: "+planet_in_question);
               if((planet_in_question.controlling_faction =="Rebels" && whos_turn == "Rebels" ||
               planet_in_question.controlling_faction =="Imperial" && whos_turn == "Imperial") &&
               planet_in_question.controlling_faction !="Unaligned" &&
               check_for_ship_body_collision(e.target.id) == false &&
               planet_in_question!= null)
               {
                        sessionStorage.setItem("placement_id",e.target.id);
                        sessionStorage.setItem("Ship-Page-Path","GC- New Team");
                        window.location.href="../../Ship-Selection-Interface/GC-Selection-Screen/ship-selection-GC.html";
               } 
       }
   }
}
}

function done_button_placement_phase_click()
{
    if(sessionStorage.getItem("gc_first_or_second_half_of_round") == "1st")
    {
        sessionStorage.setItem("gc_first_or_second_half_of_round","2nd");
        if(sessionStorage.getItem("gc_whos_turn") == "Rebels")
        {
            sessionStorage.setItem("gc_whos_turn","Imperial");
            document.getElementById("main-title").textContent = "Empire Placement";
            whos_turn = "Imperial";
            set_resource_quantities(whos_turn);
        }
        else if(sessionStorage.getItem("gc_whos_turn") == "Imperial")
        {
            sessionStorage.setItem("gc_whos_turn","Rebels");
            document.getElementById("main-title").textContent = "Rebel Placement";
            whos_turn ="Rebels";
            set_resource_quantities(whos_turn);
        }
        else
        {
            alert("ERROR: Could not determine who's turn it is!")
        }
    }
    else if(sessionStorage.getItem("gc_first_or_second_half_of_round") == "2nd")
    {
        sessionStorage.removeItem("gc_first_or_second_half_of_round");
        transfer_to_movement_phase();
    }
    else
    {
        alert("ERROR: Cannot determine what half of the round it is.")
    }
}