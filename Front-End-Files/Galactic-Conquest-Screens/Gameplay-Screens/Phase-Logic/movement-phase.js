
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
    document.getElementById("button-three").onclick = function(){
        sessionStorage.setItem("gc_phase","gathering");
    };
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
            selected_team.includes("Imperial")))
            {
                remove_all_movement_spaces();
                if(get_team_based_on_name(selected_team).has_moved == false)
                {
                    show_movement_choices(selected_team);
                }
                else
                {
                    alert("The "+selected_team+" has already moved.")
                }
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
                remove_all_movement_spaces()
                if(get_team_based_on_name(e.target.id).has_moved == false)
                {
                    show_movement_choices(e.target.id);
                }
                else
                {
                    alert("The "+e.target.id+" has already moved.")
                }
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
        movement_list.push([navy_location[0],navy_location[1]+2,"2D"])
        movement_list.push([navy_location[0],navy_location[1]-2,"2U"])
        movement_list.push([navy_location[0]+2,navy_location[1],"2R"])
        movement_list.push([navy_location[0]-2,navy_location[1],"2L"])
        movement_list.push([navy_location[0]-2,navy_location[1]+2,"2UR"])
        movement_list.push([navy_location[0]+2,navy_location[1]+2,"2DR"])
        movement_list.push([navy_location[0]+2,navy_location[1]-2,"2DL"])
        movement_list.push([navy_location[0]-2,navy_location[1]-2,"2UL"])
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
        var movement_option = document.createElement("div");
        movement_option.style.gridColumn = movement_list[i].toString().split(",")[0];
        movement_option.style.gridRow = movement_list[i].toString().split(",")[1];
        movement_option.style.backgroundImage = "url(https://i.imgur.com/s8SiQpv.png)";
        movement_option.style.backgroundSize = "100%  100%";
        movement_option.style.backgroundRepeat = "no-repeat";
        movement_option.className = "movement-option";
        movement_option.id = movement_list[i].toString()+","+chosen_navy.group_name;
        movement_option.style.zIndex = "100";
        movement_option.onmouseenter = function(e){document.getElementById(e.target.id).style.border = "1px solid green";};
        movement_option.onmouseleave = function(e){document.getElementById(e.target.id).style.border = "none";};
        movement_option.onclick = function(e){move_ship_group(e.target.id.split(",")[0]+"_"+e.target.id.split(",")[1],e.target.id.split(",")[3],parseInt(e.target.id.split(",")[2][0],10));remove_all_movement_spaces()}
        document.getElementById('grid-container').appendChild(movement_option);

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

    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));

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
                var direction_suffix = movement_list[i,3,1]+movement_list[i,3,2];
                if(movement_list[i,2].includes("2"))
                {
                    for(var k= movement_list.length-1;k >= 0;k--)
                    {
                        if(movement_list[k,2] == "3"+direction_suffix)
                        {
                            movement_list.splice(i,1);//remove ship.
                            break;
                        }
                    }
                }
                else if(movement_list[i,2].includes("1"))
                {
                    for(var k= movement_list.length-1;k >= 0;k--)
                    {
                        if(movement_list[k,2] == "3"+direction_suffix ||
                           movement_list[k,2] == "2"+direction_suffix)
                        {
                            movement_list.splice(i,1);//remove ship.
                        }
                    }    
                }
                movement_list.splice(i,1);//remove ship.
                continue;
            }
        }

        //Check for empire ship body collision.
        for(var j=0; j < all_factions[1].navy.length;j++)
        {
            if(all_factions[1].navy[j].location == coordinate)
            {
                var direction_suffix = movement_list[i,3,1]+movement_list[i,3,2];
                if(movement_list[i,2].includes("2"))
                {
                    for(var k= movement_list.length-1;k >= 0;k--)
                    {
                        if(movement_list[k,2] == "3"+direction_suffix)
                        {
                            movement_list.splice(i,1);//remove ship.
                            break;
                        }
                    }
                }
                else if(movement_list[i,2].includes("1"))
                {
                    for(var k= movement_list.length-1;k >= 0;k--)
                    {
                        if(movement_list[k,2] == "3"+direction_suffix ||
                           movement_list[k,2] == "2"+direction_suffix)
                        {
                            movement_list.splice(i,1);//remove ship.
                        }
                    }    
                }
                movement_list.splice(i,1);//remove ship.
                continue;
            }
        }
    }
}

function move_ship_group(selected_location,team_name,spaces)
{
    var navy_index = sessionStorage.getItem("gc_whos_turn") =="Rebels"? 0:1;
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    var chosen_navy= undefined;
    for(var i=0; i < all_factions[navy_index].navy.length;i++)
    {
        if(all_factions[navy_index].navy[i].group_name == team_name)
        {
            chosen_navy= all_factions[navy_index].navy[i];
            break;
        }
    }
    if(all_factions[navy_index].fuel > spaces)
    {
        document.getElementById(team_name).style.gridColumn = selected_location.split("_")[0];
        document.getElementById(team_name).style.gridRow = selected_location.split("_")[1];
        chosen_navy.location = selected_location;
        chosen_navy.has_moved = true;
        all_factions[navy_index].fuel -= spaces;
        document.getElementById("fuel-quantity-label").textContent = "X "+all_factions[navy_index].fuel;
        sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
    }
    else
    {
        alert("You do not have enough fuel to move this force.");
    }

}

function remove_all_movement_spaces()
{
    var elements = document.getElementsByClassName("movement-option");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    movement_list = [];
}


