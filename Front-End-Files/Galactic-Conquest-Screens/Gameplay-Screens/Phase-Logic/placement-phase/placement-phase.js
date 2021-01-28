if(sessionStorage.getItem("gc_phase") == "placement")
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var current_placing_faction = undefined;
    //factions[0] == rebels.  factions[1] == imperials.
    var factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
    var whos_turn = sessionStorage.getItem("gc_whos_turn");

    //Set the other buttons in the gameplay screen.
    document.getElementById("button-three").innerHTML = "Done";
    document.getElementById("button-three").onclick = function(){done_button_placement_phase_click()};

    //Set up main title based on which faction the player chose.
    if(whos_turn == "Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Placement";
        document.getElementById("money-quantity-label").textContent = "X "+factions[0].currency;
        document.getElementById("tibanna-quantity-label").textContent = "X "+factions[0].tibanna;
        document.getElementById("electronics-quantity-label").textContent = "X "+factions[0].electronics;
        document.getElementById("durasteel-quantity-label").textContent = "X "+factions[0].durasteel;
        document.getElementById("fuel-quantity-label").textContent = "X "+factions[0].fuel;
        document.getElementById("parts-quantity-label").textContent = "X "+factions[0].parts;

    }
    else if(whos_turn == "Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Placement";
        document.getElementById("money-quantity-label").textContent = "X "+factions[1].currency;
        document.getElementById("tibanna-quantity-label").textContent = "X "+factions[1].tibanna;
        document.getElementById("electronics-quantity-label").textContent = "X "+factions[1].electronics;
        document.getElementById("durasteel-quantity-label").textContent = "X "+factions[1].durasteel;
        document.getElementById("fuel-quantity-label").textContent = "X "+factions[1].fuel;
        document.getElementById("parts-quantity-label").textContent = "X "+factions[1].parts;
    }
    else
    {
        alert("Unknown faction chosen, please go back and re-create setup.");
    }

    //setup screen to place forces based on where the user clicks.
    for(var x=1; x < 201;x++)
{
   for(var y=1; y<101;y++)
   {
       var id = x+"_"+y;
       document.getElementById(id).onclick= function(e){
           if(confirm("Add a ship group here?")== true)
           {

               var planet_in_question  =get_planet(parseInt(document.getElementById(e.target.id).getAttribute("planet_id"),10),0,setup_data.active_planets.length-1);
               //alert ("id: "+e.target.id+"\nOutput: "+planet_in_question);
               if( planet_in_question!= null)//This makes it so you can't places forces on an enemy planet.
               {
                    //alert("Planet: \n Name: "+planet_in_question.planet.name);
                    if(planet_in_question.controlling_faction =="Rebels" && whos_turn == "Imperial" ||
                       planet_in_question.controlling_faction =="Imperial" && whos_turn == "Rebels" ||
                       planet_in_question.controlling_faction =="Unaligned")
                    {                   
                         alert("You cannot place ships on enemy or unaligned planets!");
                    }
                    else if(check_for_ship_body_collision(e.target.id))
                    {
                        alert("You cannot build here, there is already a ship group there!")
                    }
                    else 
                    {
                        sessionStorage.setItem("placement_id",e.target.id);
                        window.location.href="./Phase-Logic/placement-phase/Create-New-Ship-Body/Ship-Selection/ship-selection.html";
                    }
               }
               else
               {
                    alert("Please place a ship body only on planets you control.");
               }
           }
       }
   }
}
}

function check_for_ship_body_collision(id)
{
    for(var i=0; i < factions.length;i++)
    {
        for(var j=0;j < factions[i].navy.length;j++)
        {
            if(factions[i].navy[j].location == id)
            {
                return true;
            }
        }
    }
    return false;
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
        }
        else if(sessionStorage.getItem("gc_whos_turn") == "Imperial")
        {
            sessionStorage.setItem("gc_whos_turn","Rebels");
            document.getElementById("main-title").textContent = "Rebel Placement";
            whos_turn ="Rebels";
        }
        else
        {
            alert("ERROR: Could not determine who's turn it is!")
        }
    }
    else if(sessionStorage.getItem("gc_first_or_second_half_of_round") == "2nd")
    {
        alert("Moving on to next phase!");
    }
    else
    {
        alert("ERROR: Cannot determine what half of the round it is.")
    }
}