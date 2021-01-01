if(sessionStorage.getItem("gc_phase") == "placement")
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var current_placing_faction = undefined;

    //Set up main title based on which faction the player chose.
    if(setup_data.faction_chosen == "Rebels")
    {
        document.getElementById("main-title").textContent = "Rebel Placement";
        document.getElementById("faction-image-resource-counter").style.backgroundImage = "url('https://i.imgur.com/h4bX7cy.png')";
    }
    else if(setup_data.faction_chosen == "Imperial")
    {
        document.getElementById("main-title").textContent = "Empire Placement";
        document.getElementById("faction-image-resource-counter").style.backgroundImage = "url('https://i.imgur.com/7BL338e.png')";
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