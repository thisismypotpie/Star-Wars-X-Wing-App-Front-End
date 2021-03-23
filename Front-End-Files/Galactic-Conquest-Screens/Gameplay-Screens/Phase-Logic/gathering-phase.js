if(sessionStorage.getItem("gc_phase") == "gathering")
{
    gather_phase_set_up();
}

function transfer_to_gather_phase()
{
    sessionStorage.setItem("gc_phase","gathering");
    sessionStorage.setItem("resources_received","false");
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    for(var i=0; i < all_factions.length;i++)
    {
        all_factions[i].navy.foreach(group=>{
            group.has_moved = false;
        })
    }
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
    gather_phase_set_up();
}

function gather_phase_set_up()
{
    if(sessionStorage.getItem("gc_whos_turn")=="Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Gathering";
    }
    else if(sessionStorage.getItem("gc_whos_turn")=="Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Gathering";
    }
    else
    {
        alert("ERROR: Cannot determine whos turn it is.")
    }

    document.getElementById("button-three").onclick = function(){
        alert("Onward to building phase!");
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
    
    //Update resouces.
    let whos_turn_index = sessionStorage.getItem("gc_whos_turn")=="Rebels"? 0:1
    let all_factions = JSON.parse(sessionStorage.getItem("gc_factions"))
    let active_planets = JSON.parse(sessionStorage.getItem("gc_setup_data")).active_planets;
    let money_planets = 0;
    let parts_planets =0;
    let durasteel_planets = 0;
    let fuel_planets = 0;
    let tibanna_planets = 0;
    let electronics_planets = 0;
    let added_money = 0;
    let added_parts = 0;
    let added_durasteel = 0;
    let added_fuel = 0;
    let added_tibanna = 0;
    let added_electronics = 0;

    active_planets.forEach(planet=>{
        if(planet.controlling_faction == all_factions[whos_turn_index].faction)
        {
            if(planet.resource.name == "Currency")
            {
    
            }
            else if(planet.resource.name == "Tibanna")
            {

            }
            else if(planet.resource.name == "Fuel")
            {

            }
            else if(planet.resource.name == "Parts")
            {

            }
            else if(planet.resource.name == "Electronics")
            {

            }
            else if(planet.resource.name == "Durasteel")
            {

            }
            else
            {
                alert("ERROR: Unknown resource on planet: "+planet.planet.name);
            }
        }
    })

    open_input_popup("resource-report");
}

function open_input_popup(name)
{
    let overlay = document.getElementById("overlay");
    let input_popup = document.getElementById(name);
    overlay.style.opacity = 1;
    input_popup.style.visibility = "visible";
    overlay.style.pointerEvents = "all";
}

function close_input_popup(name)
{
    let overlay = document.getElementById("overlay");
    let input_popup = document.getElementById(name);
    overlay.style.opacity = 0;
    input_popup.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
}