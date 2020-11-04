var gc_setup_data = {
    faction_chosen:"",//
    resources_chosen:"full",
    planet_count:5, //
    pirate_faction:"on",//
    planet_assignment:"manual",//
    location:"Galaxy Wide"//
  };

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
    alert("pirate click")
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