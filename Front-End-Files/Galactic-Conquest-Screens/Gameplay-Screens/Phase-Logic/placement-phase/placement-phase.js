if(sessionStorage.getItem("gc_phase") == "placement")
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var current_placing_faction = undefined;
    //factions[0] == rebels.  factions[1] == imperials.
    var factions =  JSON.parse(sessionStorage.getItem("gc_factions"));

    //Set up main title based on which faction the player chose.
    if(setup_data.faction_chosen == "Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Placement";
        document.getElementById("money-quantity-label").textContent = "X "+factions[0].currency;
        document.getElementById("tibanna-quantity-label").textContent = "X "+factions[0].tibanna;
        document.getElementById("electronics-quantity-label").textContent = "X "+factions[0].electronics;
        document.getElementById("durasteel-quantity-label").textContent = "X "+factions[0].durasteel;
        document.getElementById("fuel-quantity-label").textContent = "X "+factions[0].fuel;
        document.getElementById("parts-quantity-label").textContent = "X "+factions[0].parts;

    }
    else if(setup_data.faction_chosen == "Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Placement";
        document.getElementById("money-quantity-label").textContent = "X "+factions[1].currency;
        document.getElementById("tibanna-quantity-label").textContent = "X "+factions[1].tibanna;
        document.getElementById("electronics-quantity-label").textContent = "X "+factions[1].electronics;
        document.getElementById("durasteel-quantity-label").textContent = "X "+factions[1].durasteel;
        document.getElementById("fuel-quantity-label").textContent = "X "+factions[1].fuel;
        document.getElementById("parts-quantity-label").textContent = "X "+factions[1].parts;
    }
    else
    {
        alert("Unknown faction chosen, please go back and re-create setup.");
    }

    //setup screen to place forces based on where the user clicks.
    for(var x=1; x < 201;x++)
{
   for(var y=1; y<101;y++)
   {
       var id = x+"_"+y;
       document.getElementById(id).onclick= function(){
           if(confirm("Add a fleet here?")== true)
           {
               alert("Adding ship!")
           }
       }
   }
}
}