
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
        var navy_index = sessionStorage.getItem("gc_whos_turn") =="Rebels"? 0:1;
        var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
        for(var i=0; i < all_factions[navy_index].navy.length;i++)
        {
            if(check_for_combat(all_factions[navy_index].navy[i].group_name)!=null)
            {
                return;
            }
        }
            transfer_to_gather_phase();
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
        movement_option.onclick = function(e){move_ship_group(e.target.id.split(",")[0]+"_"+e.target.id.split(",")[1],e.target.id.split(",")[3],parseInt(e.target.id.split(",")[2][0],10));remove_all_movement_spaces();}
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
        var coordinate = movement_list[i][0]+"_"+movement_list[i][1];
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

        //Check for ship body collision
        for(var p=0; p < all_factions.length;p++)
        {
            for(var j=all_factions[p].navy.length-1; j >= 0;j--)
            {
                if(all_factions[p].navy[j].location == coordinate)
                {
                    var direction_suffix = movement_list[i][2].substring(1);
                    for(var k= movement_list.length-1;k >= 0;k--)
                    {
                        if(movement_list[k][2] == "3"+direction_suffix &&
                           movement_list[i][2][0] == "2")
                        {
                            movement_list.splice(k,1);//remove ship.
                            //j = all_factions[p].navy.length-1;
                        }
                        if((movement_list[k][2] == "3"+direction_suffix ||
                            movement_list[k][2] == "2"+direction_suffix)&&
                            movement_list[i][2][0] == "1")
                        {
                            movement_list.splice(k,1);//remove ship.
                        }
                    }
                    movement_list.splice(i,1);//remove ship.
                    continue;
                }
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
        document.getElementById("fuel-quantity-label").textContent = "X"+all_factions[navy_index].fuel;
        sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
        if(JSON.parse(sessionStorage.getItem("gc_setup_data")).pirate_faction == "on" &&
           document.getElementById(selected_location).getAttribute("type") == "Wild Space")
        {
            //alert("PIRATES!")
            roll_for_pirates();
        }
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

function check_for_combat(team_name)
{
    var current_team = get_team_based_on_name(team_name);
    var x_coordinate = parseInt(current_team.location.split("_")[0],10)
    var y_coordinate = parseInt(current_team.location.split("_")[1],10)
    var navy_opponent_index = sessionStorage.getItem("gc_whos_turn") =="Rebels"? 1:0;//Get opposite of who's turn it is.
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    var combat_coordinates = [];
    
    for(var i=-1; i < 2;i++)
    {
        for(var j=-1; j<2;j++)
        {
            if(i!=0 || j!=0)
            {
                combat_coordinates.push((x_coordinate+i)+"_"+(y_coordinate+j));
            }
        }
    }
    
    for(var i=0;i < all_factions[navy_opponent_index].navy.length;i++)
    {
        var group = all_factions[navy_opponent_index].navy[i];
        if(combat_coordinates.includes(group.location))
        {
            var answer = confirm("Shall the "+team_name+" engage the "+group.group_name+"?")

            if(answer)
            {
                var all_teams = [];
                all_teams.push(current_team.team);
                all_teams.push(group.team)
                sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
                move_to_combat();
                return "engaged";
            }
        }
    }

}

function roll_for_pirates()
{
    var chance = Math.floor(Math.random() * 100)+1;
    var pirate_team = new team("Pirate Raiders");
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var ships_so_far = {
        HWK_290: Math.floor(Math.random()*(setup_data.pirate_options.HWK_290)),
        Kihraxz_Fighter:Math.floor(Math.random()*(setup_data.pirate_options.Kihraxz_Fighter+1)),
        M3_A_Interceptor:Math.floor(Math.random()*(setup_data.pirate_options.M3_A_Interceptor+1)),
        M12_L_Kimongila_Fighter:Math.floor(Math.random()*(setup_data.pirate_options.M12_L_Kimongila_Fighter+1)),
        G_1A_Starfighter:Math.floor(Math.random()*(setup_data.pirate_options.G_1A_Starfighter+1)),
        Protectorate_Starfighter:Math.floor(Math.random()*(setup_data.pirate_options.Protectorate_Starfighter+1)),
        Quadjumper:Math.floor(Math.random()*(setup_data.pirate_options.Quadjumper+1)),
        Scurrg_H_6_Bomber:Math.floor(Math.random()*(setup_data.pirate_options.Scurrg_H_6_Bomber+1)),
        StarViper:Math.floor(Math.random()*(setup_data.pirate_options.StarViper+1)),
        Y_Wing:Math.floor(Math.random()*(setup_data.pirate_options.Y_Wing+1)),
        Z_95_Headhunter:Math.floor(Math.random()*(setup_data.pirate_options.Z_95_Headhunter+1)),
        Firespray_31:Math.floor(Math.random()*(setup_data.pirate_options.Firespray_31+1)),
        Hounds_Tooth:Math.floor(Math.random()*(setup_data.pirate_options.Hounds_Tooth+1)),
        Aggressor:Math.floor(Math.random()*(setup_data.pirate_options.Aggressor+1)),
        Jump_Master_5000:Math.floor(Math.random()*(setup_data.pirate_options.Jump_Master_5000+1)),
        Lancer_Class_Pusuit_Craft:Math.floor(Math.random()*(setup_data.pirate_options.Lancer_Class_Pusuit_Craft+1)),
        YT_1300:Math.floor(Math.random()*(setup_data.pirate_options.YT_1300+1)),
        C_ROC_Cruiser:Math.floor(Math.random()*(setup_data.pirate_options.C_ROC_Cruiser+1))
    }
    var all_pilots = JSON.parse(sessionStorage.getItem("game_data")).all_pilots;
    if(chance <= 100)
    {
        alert("You have been beset upon by pirates. Prepare for battle!");
        //Create list of pilots that are just scum.
        for(var i=all_pilots.length -1; i>= 0;i--)
        {
            if(all_pilots[i].faction != "Scum")
            {
                all_pilots.splice(i,1);
            }
        }
        for(var i=0; i < ships_so_far.HWK_290;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("HWK-290",all_pilots,pirate_team));
        }
        for(var i=0; i < ships_so_far.Kihraxz_Fighter;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Kihraxz Fighter",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.M3_A_Interceptor;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("M3-A Interceptor",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.M12_L_Kimongila_Fighter;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("M12-L Kimongila Fighter",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.G_1A_Starfighter;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("G-1A Starfighter",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Protectorate_Starfighter;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Protectorate Starfighter",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Quadjumper;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Quadjumper",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Scurrg_H_6_Bomber;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Scurrg H-6 Bomber",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.StarViper;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("StarViper",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Y_Wing;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Y-Wing",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Z_95_Headhunter;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Z-95 Headhunter",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Firespray_31;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Firespray-31",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Hounds_Tooth;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Hound's Tooth",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Aggressor;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Aggressor",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Jump_Master_5000;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Jump Master 5000",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.Lancer_Class_Pusuit_Craft;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("Lancer-Class Pursuit Craft",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.YT_1300;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("YT-1300",all_pilots,pirate_team));           
        }
        for(var i=0; i < ships_so_far.C_ROC_Cruiser;i++)
        {
            pirate_team.ship_list.push(add_ship_to_pirate_team("C-ROC Cruiser",all_pilots,pirate_team));           
        }
        var all_teams = [];
        all_teams.push(pirate_team);
        all_teams.push(get_team_based_on_name(document.getElementById("ship-body-title").textContent).team);
        sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
        move_to_combat();
    }
}

function add_ship_to_pirate_team(ship_type,all_pilots,selected_team)
{
    let scum_pilots = JSON.parse(JSON.stringify(all_pilots));//This is done to make a hard copy all pilots.
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var team_members = [];
    if(selected_team.ship_list.length > 0)
    {
        team_members = selected_team.ship_list.map(function(e){return e.chosen_pilot.pilot_name})
    }
    for(var i = scum_pilots.length -1; i>=0;i--)
    {
        //Remove all pilots that are not of the ship type.
        if(scum_pilots[i].ship_name.ship_name != ship_type)
        {
            scum_pilots.splice(i,1);
            continue;
        }
        //Remove unique pilots that are dead.
        if(setup_data.pirate_options.list_of_the_dead.includes(scum_pilots[i].pilot_name))
        {
            scum_pilots.splice(i,1);
            continue;
        }
        //Remove unique pilots already on the team.
        if(team_members.includes(scum_pilots[i].pilot_name) &&
           scum_pilots[i].is_unique == true)
        {
            scum_pilots.splice(i,1);
        }
    }
    if(scum_pilots.length ==0)
    {
        alert("ERROR: No pilots to choose from for ship: "+ship_type);
        return;
    }

    var pilot_index = Math.floor(Math.random() * scum_pilots.length);
    if(scum_pilots[pilot_index].ship_name.ship_type == "largeTwoCard")
    {
        return new large_two_card_in_game_ship_status(scum_pilots[pilot_index],"Pirate Raiders");
    }
    else if(scum_pilots[pilot_index].ship_name.ship_type == "largeOneCard")
    {
        return new large_one_card_in_game_ship_status(scum_pilots[pilot_index],"Pirate Raiders");
    }
    else
    {
        return new  in_game_ship_status(scum_pilots[pilot_index],"Pirate Raiders");
    }
}

function move_to_combat()
{
    var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    var buckets = bucket_sort_pilots_by_skill(all_teams);
    sort_pilots_by_skill_and_overwrite_all_teams(buckets.sorted_buckets);
    if(buckets.sorting_needed == true)
    {
      sessionStorage.setItem("buckets",JSON.stringify(buckets.sorted_buckets));
      window.location.href = "../../Gameplay-Screens/Pilot-Skill-Sorting-Screen/Pilot-Skill-Sorting-Screen.html";
    }
    else
    {
      sort_pilots_by_skill_and_overwrite_all_teams(buckets.sorted_buckets);
      all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
      all_teams[0].has_initiative_token = true;
      sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
      move_translate_vectors_for_notification_pop_up(-60,-60);
      show_notification_pop_up("The Game Begins! "+all_teams[0].team_name + " has been given first initiative!");

      //Close the notification with this line of code.
        document.getElementById("notification-ok-button").onclick = function(){
        close_notification_pop_up();
        window.location.href = "../../Gameplay-Screens/Maneuver-Selection-Screen/Maneuver-Selection-Screen.html";
      }
    }
}
