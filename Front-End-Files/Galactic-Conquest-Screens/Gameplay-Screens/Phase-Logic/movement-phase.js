
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
        //for(var x=1; x < 201;x++)
        for(var x=34; x < 196;x++)
        {
           //for(var y=1; y<101;y++)
           for(var y=2; y<100;y++)
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
    var chosen_navy= undefined;
    var navy_location = [];
    for(var i=0; i < all_factions[navy_index].navy.length;i++)
    {
        if(all_factions[navy_index].navy[i].group_name == team_name)
        {
            chosen_navy= all_factions[navy_index].navy[i];
            break;
        }
    }
    if(chosen_navy== undefined)
    {
        alert("ERROR: Could not find "+team_name);
        return;
    }   
    navy_location.push(parseInt(chosen_navy.location.split("_")[0],10));
    navy_location.push(parseInt(chosen_navy.location.split("_")[1],10));
    movement_list.push([navy_location[0],navy_location[1]+1,"1D"])
    movement_list.push([navy_location[0],navy_location[1]-1,"1U"])
    movement_list.push([navy_location[0]+1,navy_location[1],"1R"])
    movement_list.push([navy_location[0]-1,navy_location[1],"1L"])
    movement_list.push([navy_location[0]+1,navy_location[1]+1,"1DR"])
    movement_list.push([navy_location[0]-1,navy_location[1]-1,"1UL"])
    movement_list.push([navy_location[0]+1,navy_location[1]-1,"1DL"])
    movement_list.push([navy_location[0]-1,navy_location[1]+1,"1UR"])
    if(chosen_navy.group_name.includes("Fleet") ||
       chosen_navy.group_name.includes("Squad"))
    {
        movement_list.push([navy_location[0],navy_location[1]+2],"2D")
        movement_list.push([navy_location[0],navy_location[1]-2],"2U")
        movement_list.push([navy_location[0]+2,navy_location[1]],"2R")
        movement_list.push([navy_location[0]-2,navy_location[1]],"2L")
        movement_list.push([navy_location[0]-2,navy_location[1]+2],"2UR")
        movement_list.push([navy_location[0]+2,navy_location[1]+2],"2DR")
        movement_list.push([navy_location[0]+2,navy_location[1]-2],"2DL")
        movement_list.push([navy_location[0]-2,navy_location[1]-2],"2UL")
    }
    if(chosen_navy.group_name.includes("Squad"))
    {
        movement_list.push([navy_location[0],navy_location[1]+3,"3D"])
        movement_list.push([navy_location[0],navy_location[1]-3,"3U"])
        movement_list.push([navy_location[0]+3,navy_location[1],"3R"])
        movement_list.push([navy_location[0]-3,navy_location[1],"3L"])
        movement_list.push([navy_location[0]-3,navy_location[1]+3,"3UR"])
        movement_list.push([navy_location[0]+3,navy_location[1]+3,"3DR"])
        movement_list.push([navy_location[0]+3,navy_location[1]-3,"3DL"])
        movement_list.push([navy_location[0]-3,navy_location[1]-3,"3UL"])
    }
    remove_invalid_movement_spaces(navy_location);
    for(var i=0; i < movement_list.length;i++)
    {
        //create new element for each 
    }
}

function remove_invalid_movement_spaces(group_location)
{
    /*
    BOUNDRIES:
    Minimum vertical boundry: 2
    Maximum vertical boundry: 99
    Minimum horizontal boundry: 34
    Maximum horzontal boundry: 195

    PLANET CUTOUT:
    left boundry: 156
    bottom left: 8
    */
    for(var i= movement_list.length-1;i >= 0;i--)
    {
        var coordinate = movement_list[i,0]+"_"+movement_list[i,1];
        //Remove movements if they go outside of boundries.
        if(movement_list[i,0] < 2 ||
           movement_list[i,0] > 99 ||
           movement_list[i,1] < 34 ||
           movement_list[i,1] > 195 ||
           ((movement_list[i,0] < 8) && 
           ( movement_list[i,1] > 155)))
        {
            movement_list.splice(i,1);//remove ship.
            continue;
        }

        //Check for rebel ship body collision.
        for(var j=0; j < all_factions[0].navy.length;j++)
        {
            if(all_factions[0].navy[j].location == coordinate)
            {
                movement_list.splice(i,1);//remove ship.
                continue;
            }
        }

        //Check for empire ship body collision.
        for(var j=0; j < all_factions[1].navy.length;j++)
        {
            if(all_factions[1].navy[j].location == coordinate)
            {
                if()
                {

                }
                else if()
                {
                    
                }
                movement_list.splice(i,1);//remove ship.
                continue;
            }
        }
    }
}


