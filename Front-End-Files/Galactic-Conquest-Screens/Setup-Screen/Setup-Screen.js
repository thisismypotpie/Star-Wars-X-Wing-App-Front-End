var gc_setup_data;

//Set options if gc setup already existed.
if(sessionStorage.getItem("gc_setup_data")!= null)
{
    gc_setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    //Set correct faction.
    if(gc_setup_data.faction_chosen == "Rebels")
    {
        rebel_faction_click();
    }
    else if(gc_setup_data.faction_chosen == "Imperial")
    {
        imperial_faction_click();
    }
    //Set correct resources
    if(gc_setup_data.resources_chosen == "currency")
    {
        document.getElementById("currency-only-radio").click();
    }
    //Set planet count
    document.getElementById("start-planets-slider").value = gc_setup_data.planet_count;
    //Set if pirates are on or off.
    if(gc_setup_data.pirate_faction == "off")
    {
        document.getElementById("no-pirate-radio").click();
        button_blur_for_pirates();
    }
    else if(gc_setup_data.pirate_faction == "on")
    {
        document.getElementById("pirate-radio").click();
        button_focus_for_pirates();
    }
    //Set planet assignment
    if(gc_setup_data.planet_assignment == "manual")
    {
         document.getElementById("manual-assignment-radio").click();
    }
    else
    {
        document.getElementById("random-assignment-radio").click();
    }
    //Set location
    for(var i=0; i < document.getElementById("all-sectors").options.length;i++)
    {
        if(gc_setup_data.location == document.getElementById("all-sectors")[i].text)
        {
            document.getElementById("all-sectors")[i].selected = "selected";
            break;
        }
    }
}
else //Set up a fresh gc_setup.
{
        gc_setup_data = {
        faction_chosen:"",
        resources_chosen:"full",
        planet_count:5, 
        pirate_faction:"off",
        pirate_options:{
        total_ships:
            "gc_setup_data.pirate_options.HWK_290+gc_setup_data.pirate_options.Kihraxz_Fighter+gc_setup_data.pirate_options.M3_A_Interceptor+gc_setup_data.pirate_options.M12_L_Kimongila_Fighter+gc_setup_data.pirate_options.G_1A_Starfighter+"+
            "gc_setup_data.pirate_options.Protectorate_Starfighter+gc_setup_data.pirate_options.Quadjumper+gc_setup_data.pirate_options.Scurrg_H_6_Bomber+gc_setup_data.pirate_options.StarViper+gc_setup_data.pirate_options.Y_Wing+"+
            "gc_setup_data.pirate_options.Z_95_Headhunter+gc_setup_data.pirate_options.Firespray_31+gc_setup_data.pirate_options.Hounds_Tooth+gc_setup_data.pirate_options.Aggressor+gc_setup_data.pirate_options.Jump_Master_5000+"+
            "gc_setup_data.pirate_options.Lancer_Class_Pusuit_Craft+gc_setup_data.pirate_options.YT_1300+gc_setup_data.pirate_options.C_ROC_Cruiser;",
        HWK_290: 0,
        Kihraxz_Fighter:0,
        M3_A_Interceptor:0,
        M12_L_Kimongila_Fighter:0,
        G_1A_Starfighter:0,
        Protectorate_Starfighter:0,
        Quadjumper:0,
        Scurrg_H_6_Bomber:0,
        StarViper:0,
        Y_Wing:0,
        Z_95_Headhunter:0,
        Firespray_31:0,
        Hounds_Tooth:0,
        Aggressor:0,
        Jump_Master_5000:0,
        Lancer_Class_Pusuit_Craft:0,
        YT_1300:0,
        C_ROC_Cruiser:0
        },
        planet_assignment:"random",
        location:"Galaxy Wide",
        active_planets:[],
        converted_planets:[]
      };
      set_active_planets();
      sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

//alert("Total Ships: "+eval(gc_setup_data.pirate_options.total_ships));

function go_to_main_menu()
{
    let game_data = JSON.parse(sessionStorage.getItem("game_data"));
    sessionStorage.clear();
    sessionStorage.setItem("game_data",JSON.stringify(game_data));
    window.location.href = "../../Title-Screen(Main Menu)/index.html";
}

function set_active_planets()
{
    var all_planets = JSON.parse(sessionStorage.getItem("game_data")).all_planets;
    var new_active_planets = [];
    var new_converted_planets = [];
    //Add already existing planets from the old active planets.
    gc_setup_data.active_planets.forEach(planet=>{
        if(planet.priority <= gc_setup_data.planet_count && check_boundry(planet)==true)
        {
            new_active_planets.push(planet);
        }
    })
    //Add any new planets that have been added due to new parameters.
    all_planets.forEach(planet=>{
        if(planet.priority <= gc_setup_data.planet_count && check_boundry(planet)==true && ( gc_setup_data.active_planets.map(function(e){return e.name}).includes(planet.name))==false)
        {   var new_planet = new in_game_planet(planet);
            new_active_planets.push(new_planet);
        }
        else if(planet.priority <=3)
        {
            new_converted_planets.push(planet);
        }
    })
    // ship.upgrades.map(function(e){return e.id})
    gc_setup_data.active_planets = new_active_planets;
    gc_setup_data.converted_planets = new_converted_planets;
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function button_blur_for_pirates()
{
    document.getElementById("pirate-options-button").style.opacity = "0.3";
    document.getElementById("pirate-options-button").onclick = null;
    gc_setup_data.pirate_faction = "off";
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function button_focus_for_pirates()
{
    document.getElementById("pirate-options-button").style.opacity = "1.0";
    document.getElementById("pirate-options-button").onclick = function(){piriate_button_click();};
    gc_setup_data.pirate_faction = "on";
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function piriate_button_click()
{
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
    window.location.href = "./Pirate-Options-Screen/Pirate-Options.html";
}

function button_blur_for_planet_assignment()
{
    document.getElementById("planet-assignment-button").style.opacity = "0.3";
    document.getElementById("planet-assignment-button").onclick = null;
    gc_setup_data.planet_assignment = "random";
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function button_focus_for_planet_assignment()
{
    document.getElementById("planet-assignment-button").style.opacity = "1.0";
    document.getElementById("planet-assignment-button").onclick = function(){planet_assignment_click()};
    gc_setup_data.planet_assignment = "manual";
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function planet_assignment_click()
{
    sessionStorage.setItem('gc_setup_data',JSON.stringify(gc_setup_data));
    window.location.href="./Planet-Assignment-Screen/planet-assignment.html";
}

function rebel_faction_click()
{
    document.getElementById("rebel-faction-image").style.border = "2px solid white";
    document.getElementById("rebel-faction-image").style.opacity = "1.0";
    document.getElementById("imperial-faction-image").style.border = "none";
    document.getElementById("imperial-faction-image").style.opacity = "0.3";
    gc_setup_data.faction_chosen = "Rebels";
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function imperial_faction_click()
{
    document.getElementById("imperial-faction-image").style.border = "2px solid white";
    document.getElementById("imperial-faction-image").style.opacity = "1.0";
    document.getElementById("rebel-faction-image").style.border = "none";
    document.getElementById("rebel-faction-image").style.opacity = "0.3";
    gc_setup_data.faction_chosen = "Imperial";
    sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
}

function currency_only_click()
{
    gc_setup_data.resources_chosen ='currency';
    sessionStorage.setItem('gc_setup_data',JSON.stringify(gc_setup_data));
}

function full_resources_click()
{
    gc_setup_data.resources_chosen='full';
    sessionStorage.setItem('gc_setup_data',JSON.stringify(gc_setup_data));
}

function play_button_click()
{
    //var game_data = JSON.parse(sessionStorage.getItem("game_data"));
    if(gc_setup_data.faction_chosen == "")
    {
        alert("Please select a faction before proceeding.");
    }
    else if(gc_setup_data.pirate_faction == "on" && eval(gc_setup_data.pirate_options.total_ships) == 0)
    {
        alert("Please enter pirate parameters or turn pirates off before proceeding.");
    }
    else
    {
        //sessionStorage.setItem("gc_setup_data",gc_setup_data);
        start_and_populate_game_resources();
        if(gc_setup_data.planet_assignment == "random")
        {
            assign_random_planets();
        }
        sessionStorage.setItem("gc_phase","placement");
        sessionStorage.setItem('gc_setup_data',JSON.stringify(gc_setup_data));
        sessionStorage.setItem("gc_whos_turn",gc_setup_data.faction_chosen);
        sessionStorage.setItem("gc_first_or_second_half_of_round","1st");
        window.location.href= "../Gameplay-Screens/gameplay-screen.html";
    }
}

function check_boundry(incoming_planet)//checks incoming planet to see if it is positioned within the player set boundry.
{
   var boundry = gc_setup_data.location;
   var sector = incoming_planet.sector;
   if(boundry == sector)
   {
     return true;
   }
   else if(boundry == "Galaxy Wide")
   {
     return true;
   }
   else if(boundry == "Mid Rim" &&(sector == "Core" || sector == "Colonies" || sector == "Inner Rim" || sector == "Expansion"))
   {
      return true;
   }
   else if(boundry == "Expansion" &&(sector == "Core" || sector == "Colonies" || sector == "Inner Rim"))
   {
      return true;
   }
   else if(boundry == "Inner Rim" &&(sector == "Core" || sector == "Colonies"))
   {
      return true;
   }
   else if(boundry == "Colonies" &&(sector == "Core"))
   {
      return true;
   }
   else
   {
     return false;
   }
}

function change_planet_priority()
{
    gc_setup_data.planet_count = parseInt(document.getElementById('start-planets-slider').value,10);
    set_active_planets();
    //sessionStorage.setItem('gc_setup_data',JSON.stringify(gc_setup_data));
}

function change_galactic_boundry()
{
    gc_setup_data.location = document.getElementById('all-sectors').value;
    set_active_planets();
    //sessionStorage.setItem('gc_setup_data',JSON.stringify(gc_setup_data));
}

//Creates each faction, sets starting currency, then saves it in local storage.
function start_and_populate_game_resources()
{
    //Set up and save both the rebel and imperial factions.
    var faction = [];
    faction.push(new gc_team("Rebels"));
    faction.push(new gc_team("Imperial"));
    faction[0].currency = 10*gc_setup_data.planet_count+gc_setup_data.active_planets.length;
    faction[1].currency = 10*gc_setup_data.planet_count+gc_setup_data.active_planets.length;
    faction[0].durasteel = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[1].durasteel = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[0].electronics = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[1].electronics = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[0].parts = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[1].parts = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[0].fuel = 25*gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/5);
    faction[1].fuel = 25*gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/5);
    faction[0].tibanna = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    faction[1].tibanna = gc_setup_data.planet_count+Math.floor(gc_setup_data.active_planets.length/10);
    sessionStorage.setItem("gc_factions",JSON.stringify(faction));

    gc_setup_data.active_planets.forEach(planet=>{
        //Add resource to each active planet.
        if(gc_setup_data.resources_chosen =="currency")
        {
            planet.resource.name = "Credits";
            planet.resource.image_path = "url('https://i.imgur.com/cMjNBfW.jpg')";
        }
        else
        {
            var resource_random = Math.floor(Math.random() * (6));
            var resource_quantity = Math.floor(Math.random() * (4));
            var spawn_chance = Math.floor(Math.random() * (91))+10;
            if(resource_random == 0)
            {
                planet.resource.name = "Parts";
                planet.resource.image_path = "url('https://i.imgur.com/SkbOfo9.jpg')";
                planet.resource.quantity = resource_quantity;
                planet.resource.spawn_chance = spawn_chance;
            }
            else if(resource_random == 1)
            {
                planet.resource.name = "Fuel";
                planet.resource.image_path = "url('https://i.imgur.com/gqJjMUH.jpg')";
                planet.resource.quantity = resource_quantity;
                planet.resource.spawn_chance = spawn_chance;

            }
            else if(resource_random == 2)
            {
                planet.resource.name = "Electronics";
                planet.resource.image_path = "url('https://i.imgur.com/qOjfTHl.png')";
                planet.resource.quantity = resource_quantity;
                planet.resource.spawn_chance = spawn_chance;

            }
            else if(resource_random == 3)
            {
                planet.resource.name = "Durasteel";
                planet.resource.image_path = "url('https://i.imgur.com/1nxO0oQ.png')";
                planet.resource.quantity = resource_quantity;
                planet.resource.spawn_chance = spawn_chance;

            }
            else if(resource_random == 4)
            {
                planet.resource.name = "Currency";
                planet.resource.image_path = "url('https://i.imgur.com/cMjNBfW.jpg')";
                planet.resource.quantity = resource_quantity;
                planet.resource.spawn_chance = spawn_chance;

            }
            else if(resource_random == 5)
            {
                planet.resource.name = "Tibanna";
                planet.resource.image_path = "url('https://i.imgur.com/wfKP4ey.jpg')";
                planet.resource.quantity = resource_quantity;
                planet.resource.spawn_chance = spawn_chance;
            }
            else
            {
                alert("ERROR: Random resource assignment error.");
            }
        }
    })
}

function assign_random_planets()
{
//generate a random number between three and half the total number of planets to assigned to each faction.
  var planets_per_faction = Math.floor(Math.random() * (((gc_setup_data.active_planets.length)/2) - 3) + 3);
  var planets_assigned = 0;
  var current_index = 0;
  //Assign rebel planets.
  while(planets_assigned <= planets_per_faction)
  {
    current_index = Math.floor(Math.random() * (((gc_setup_data.active_planets.length)-1)));
    if(gc_setup_data.active_planets[current_index].controlling_faction =="Unaligned")
    {
      gc_setup_data.active_planets[current_index].controlling_faction = "Rebels";
      planets_assigned++;
    }
  }
  planets_assigned = 0;
  //Assign imperial planets.
  while(planets_assigned <= planets_per_faction)
  {
    current_index = Math.floor(Math.random() * (((gc_setup_data.active_planets.length)-1)));
    if(gc_setup_data.active_planets[current_index].controlling_faction =="Unaligned")
    {
      gc_setup_data.active_planets[current_index].controlling_faction = "Imperial";
      planets_assigned++;
    }
  }

}