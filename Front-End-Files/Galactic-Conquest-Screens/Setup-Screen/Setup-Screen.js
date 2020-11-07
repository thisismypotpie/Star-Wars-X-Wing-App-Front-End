var gc_setup_data = {
    faction_chosen:"",
    resources_chosen:"full",
    planet_count:5, 
    pirate_faction:"on",
    planet_assignment:"manual",
    location:"Galaxy Wide",
    include_unknown_region:"no"
  };

//if 
if(sessionStorage.getItem("gc-setup-data")!= null)
{
    let data = JSON.parse(sessionStorage.getItem("gc-setup-data"));
    //Set correct faction.
    if(data.faction_chosen == "Rebels")
    {
        rebel_faction_click();
    }
    else if(data.faction_chosen == "Imperial")
    {
        imperial_faction_click();
    }
    //Set correct resources
    if(data.resources_chosen == "currency")
    {
        document.getElementById("currency-only-radio").click();
    }
    //Set planet count
    document.getElementById("start-planets-slider").value = data.planet_count;
    //Set if pirates are on or off.
    if(data.pirate_faction == "off")
    {
        button_blur_for_pirates();
    }
    //Set planet assignment
    if(data.planet_assignment == "random")
    {
        button_blur_for_planet_assignment();
    }
    //Set location
    for(var i=0; i < document.getElementById("all-sectors").options.length;i++)
    {
        if(data.location == document.getElementById("all-sectors")[i].text)
        {
            document.getElementById("all-sectors")[i].selected = "selected";
            break;
        }
    }
    //Set unknown region.
    if(data.include_unknown_region == "yes")
    {
        document.getElementById("unknown-region").checked = true;
    }
}

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
}

function button_focus_for_pirates()
{
    document.getElementById("pirate-options-button").style.opacity = "1.0";
    document.getElementById("pirate-options-button").onclick = function(){piriate_button_click();};
    gc_setup_data.pirate_faction = "on";
}

function piriate_button_click()
{
    sessionStorage.setItem("gc-setup-data",JSON.stringify(gc_setup_data));
    window.location.href = "./Pirate-Options-Screen/Pirate-Options.html";
}

function button_blur_for_planet_assignment()
{
    document.getElementById("planet-assignment-button").style.opacity = "0.3";
    document.getElementById("planet-assignment-button").onclick = null;
    gc_setup_data.planet_assignment = "random"
}

function button_focus_for_planet_assignment()
{
    document.getElementById("planet-assignment-button").style.opacity = "1.0";
    document.getElementById("planet-assignment-button").onclick = function(){planet_assignment_click()};
    gc_setup_data.planet_assignment = "manual"
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
}

function imperial_faction_click()
{
    document.getElementById("imperial-faction-image").style.border = "2px solid white";
    document.getElementById("imperial-faction-image").style.opacity = "1.0";
    document.getElementById("rebel-faction-image").style.border = "none";
    document.getElementById("rebel-faction-image").style.opacity = "0.3";
    gc_setup_data.faction_chosen = "Imperial";
}

function see_if_include_unknown_regions()
{
    if(document.getElementById("unknown-region").checked)
    {
        gc_setup_data.include_unknown_region = "yes";
    }
    else
    {
        gc_setup_data.include_unknown_region = "no";
    }
}

function play_button_click()
{
    window.location.href= "../Gameplay-Screens/gameplay-screen.html";
}