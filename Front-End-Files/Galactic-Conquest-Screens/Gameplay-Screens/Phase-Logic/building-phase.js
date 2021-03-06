if(sessionStorage.getItem("gc_phase") == "building")
{
    building_phase_set_up();
}


function transfer_to_building_phase()
{
    sessionStorage.setItem("gc_phase","building");
    close_input_popup("resource-report");
    for(var i=0; i<document.getElementsByClassName("ship-body").length;i++)
    {
        document.getElementsByClassName("ship-body")[i].onclick = null;
    }
    document.getElementById("ship-body-info-pop-up").onclick= null;
    building_phase_set_up();  
}

function building_phase_set_up()
{
    var whos_turn = sessionStorage.getItem("gc_whos_turn");

    document.getElementById("button-three").onclick = function(){ replenish_resources(); check_for_planet_faction_converstion();transfer_to_movement_phase()};  

    set_resource_quantities(whos_turn);
    if(whos_turn == "Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Building";
    }
    else if(whos_turn == "Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Building";
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

        var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
        var planet_in_question  =get_planet(parseInt(document.getElementById(e.target.id).getAttribute("planet_id"),10),0,setup_data.active_planets.length-1);
        
        if((planet_in_question.controlling_faction =="Rebels" && whos_turn == "Rebels" ||
            planet_in_question.controlling_faction =="Imperial" && whos_turn == "Imperial") &&
            planet_in_question.controlling_faction !="Unaligned" &&
            check_for_ship_body_collision(e.target.id) == false &&
            planet_in_question!= null)
            {
                sessionStorage.setItem("placement_id",e.target.id);
                window.location.href="./Create-New-Ship-Body/Ship-Selection/ship-selection.html";
            }
        }
   }
}

}

function close_input_popup(name)
{
    let overlay = document.getElementById("overlay");
    let input_popup = document.getElementById(name);
    overlay.style.opacity = 0;
    input_popup.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
}

function check_for_ship_body_collision(id)
{
    var factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
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

function replenish_resources()
{
    let setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    setup_data.active_planets.forEach(planet=>{
        let spawn_percentile = Math.floor(Math.random() * (100))+1;
        if(spawn_percentile >= planet.resource.spawn_chance)
        {
            if(planet.resource.name == "currency")
            {
                planet.resouce.quantity += 5*Math.floor(Math.random() * (5))+1;
            }
            else if(planet.resource.name == "fuel")
            {
                planet.resource.quantity += 2*Math.floor(Math.random() * (5))+1;
            }
            else
            {
                planet.resource.quantity += Math.floor(Math.random() * (5))+1;
            }
        }
    });
    sessionStorage.setItem("gc_setup_data",JSON.stringify(setup_data));
}

function check_for_planet_faction_converstion()//At the end of someone's turn, convert planets are needed.
{
    let setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var navy_index = sessionStorage.getItem("gc_whos_turn") =="Rebels"? 0:1;
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    setup_data.active_planets.forEach(planet=>{ 
        all_factions[navy_index].navy.forEach(ship_body=>{
            if(ship_body.location == planet.planet.x_coordinate+"_"+planet.planet.y_coordinate && planet.controlling_faction != sessionStorage.getItem("gc_whos_turn"))
            {
                if(navy_index == 0)
                {
                    alert("The Rebel Alliance has taken "+planet.planet.name);
                    planet.controlling_faction = "Rebels";
                    document.getElementById(ship_body.location).style.backgroundColor = "maroon";
                }
                else if(navy_index == 1)
                {
                    alert("The Galactic Empire has taken "+planet.planet.name);
                    planet.controlling_faction = "Imperial";
                    document.getElementById(ship_body.location).style.backgroundColor = "black";
                }
                else
                {
                    alert("ERROR: Unable to determine conquering planet faction for planet: "+planet.planet.name);
                }
            }
        })
    });
    sessionStorage.setItem("gc_setup_data",JSON.stringify(setup_data));
}