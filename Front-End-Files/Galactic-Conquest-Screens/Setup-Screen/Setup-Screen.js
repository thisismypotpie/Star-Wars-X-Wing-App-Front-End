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
        button_blur_for_pirates();
    }
    //Set planet assignment
    if(gc_setup_data.planet_assignment == "random")
    {
        button_blur_for_planet_assignment();
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
        pirate_faction:"on",
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
        planet_assignment:"manual",
        location:"Galaxy Wide",
      };
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
    alert("planet click")
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
        window.location.href= "../Gameplay-Screens/gameplay-screen.html";
    }
}