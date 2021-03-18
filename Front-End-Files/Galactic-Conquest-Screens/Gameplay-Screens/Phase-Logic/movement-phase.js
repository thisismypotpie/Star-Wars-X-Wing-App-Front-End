
var movement_list = [];//check if empty or not to see if movement disappears or appears.

if(sessionStorage.getItem("gc_phase") == "movement")
{
    movement_phase_set_up();
}

//Triggered when the player goes from placement to movement.
function transfer_to_movement_phase()
{
    //Update the session storage.
    sessionStorage.setItem("gc_phase","movement");
    if(sessionStorage.getItem("gc_whos_turn")=="Rebels")
    {
        sessionStorage.setItem("gc_whos_turn","Imperial");
    }
    else if(sessionStorage.getItem("gc_whos_turn")=="Imperial")
    {
        sessionStorage.setItem("gc_whos_turn","Rebels");
    }
    else
    {
        alert("ERROR: Cannot determine whos turn it is.");
    }
    movement_phase_set_up();
}

function movement_phase_set_up()
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    //factions[0] == rebels.  factions[1] == imperials.
    var factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
    //var turn_index = sessionStorage.getItem("gc_whos_turn") =="Rebels"? 0:1;

    if(sessionStorage.getItem("gc_whos_turn")=="Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Movement";
    }
    else if(sessionStorage.getItem("gc_whos_turn")=="Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Movement";
    }
    else
    {
        alert("ERROR: Cannot determine whos turn it is.")
    }

    //Set the other buttons in the gameplay screen.
    document.getElementById("button-three").onclick = function(){alert("Moving to gather phase!")};
    set_resource_quantities(sessionStorage.getItem("gc_whos_turn"))

        //setup screen to place forces based on where the user clicks.
        for(var x=1; x < 201;x++)
        {
           for(var y=1; y<101;y++)
           {
               var id = x+"_"+y;
               document.getElementById(id).onclick= null;
           }
        }
    
        document.getElementById("ship-body-info-pop-up").onclick=function(){
            var selected_team = document.getElementById("ship-body-title").textContent;
            if((sessionStorage.getItem("gc_whos_turn")=="Rebels" &&
            selected_team.includes("Rebel")) ||
            (sessionStorage.getItem("gc_whos_turn")=="Imperial" &&
            selected_team.id.includes("Imperial")))
            {
                show_movement_choices(selected_team);
            }
            else
            {
                alert("Not your turn bro!")
            }
        }

    for(var i=0; i<document.getElementsByClassName("ship-body").length;i++)
    {
        document.getElementsByClassName("ship-body")[i].onclick = function(e){
            if((sessionStorage.getItem("gc_whos_turn")=="Rebels" &&
            e.target.id.includes("Rebel")) ||
            (sessionStorage.getItem("gc_whos_turn")=="Imperial" &&
            e.target.id.includes("Imperial")))
            {
                show_movement_choices(e.target.id);
            }
            else
            {
                alert("Not your turn bro!")
            }
        };
    }
}

function show_movement_choices(team_name)
{
    var navy_index = sessionStorage.getItem("gc_whos_turn") =="Rebels"? 0:1;
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    for(var i=0; i < all_factions[navy_index].navy.length;i++)
    {
        
    }
}


