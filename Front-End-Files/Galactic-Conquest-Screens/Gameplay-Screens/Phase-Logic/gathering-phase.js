if(sessionStorage.getItem("gc_phase") == "gathering")
{
    gather_phase_set_up();
}

function transfer_to_gather_phase()
{
    sessionStorage.setItem("gc_phase","gathering");
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    for(var i=0; i < all_factions.length;i++)
    {
        all_factions[i].navy.forEach(group=>{
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
    let setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
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

    setup_data.active_planets.forEach(planet=>{
        if(planet.controlling_faction == all_factions[whos_turn_index].faction)
        {
            if(planet.resource.name == "Currency")
            {
                money_planets++;
                added_money += planet.resource.quantity;
                planet.resource.quantity = 0;
            }
            else if(planet.resource.name == "Tibanna")
            {
                tibanna_planets++;
                added_tibanna += planet.resource.quantity;
                planet.resource.quantity = 0;
            }
            else if(planet.resource.name == "Fuel")
            {
                fuel_planets++;
                added_fuel += planet.resource.quantity;
                planet.resource.quantity = 0;
            }
            else if(planet.resource.name == "Parts")
            {
                parts_planets++;
                added_parts += planet.resource.quantity;
                planet.resource.quantity = 0;
            }
            else if(planet.resource.name == "Electronics")
            {
                electronics_planets++;
                added_electronics += planet.resource.quantity;
                planet.resource.quantity = 0;
            }
            else if(planet.resource.name == "Durasteel")
            {
                durasteel_planets++;
                added_durasteel += planet.resource.quantity;
                planet.resource.quantity = 0;
            }
            else
            {
                alert("ERROR: Unknown resource on planet: "+planet.planet.name);
            }
        }
    })
    all_factions[whos_turn_index].currency += added_money;
    all_factions[whos_turn_index].tibanna += added_tibanna;
    all_factions[whos_turn_index].fuel += added_fuel;
    all_factions[whos_turn_index].durasteel += added_durasteel;
    all_factions[whos_turn_index].parts += added_parts;
    all_factions[whos_turn_index].electronics += added_electronics;

    document.getElementById("money-quantity-label-gathering").textContent = "+"+added_money;
    document.getElementById("money-planet-notification").textContent = "from "+money_planets+" planets"
    document.getElementById("tibanna-quantity-gathering").textContent = "+"+added_tibanna;
    document.getElementById("tibanna-planet-notification").textContent =  "from "+tibanna_planets+" planets"
    document.getElementById("electronics-quantity-label-gathering").textContent = "+"+ added_electronics;
    document.getElementById("electronics-planet-notification").textContent =  "from "+electronics_planets+" planets"
    document.getElementById("durasteel-quantity-label-gathering").textContent = "+"+ added_durasteel;
    document.getElementById("durasteel-planet-notification").textContent =  "from "+durasteel_planets+" planets"
    document.getElementById("fuel-quantity-label-gathering").textContent = "+"+ added_fuel;
    document.getElementById("fuel-planet-notification").textContent =  "from "+fuel_planets+" planets"
    document.getElementById("parts-quantity-labe-gathering").textContent = "+"+ added_parts;
    document.getElementById("parts-planet-notification").textContent =  "from "+parts_planets+" planets"

    document.getElementById("money-quantity-label").textContent = "X"+  all_factions[whos_turn_index].currency;
    document.getElementById("tibanna-quantity-label").textContent = "X"+  all_factions[whos_turn_index].tibanna;
    document.getElementById("electronics-quantity-label").textContent = "X"+  all_factions[whos_turn_index].electronics;
    document.getElementById("durasteel-quantity-label").textContent = "X"+  all_factions[whos_turn_index].durasteel;
    document.getElementById("fuel-quantity-label").textContent = "X"+  all_factions[whos_turn_index].fuel;
    document.getElementById("parts-quantity-label").textContent = "X"+  all_factions[whos_turn_index].parts;

    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions))
    sessionStorage.setItem("gc_setup_data",JSON.stringify(setup_data));
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