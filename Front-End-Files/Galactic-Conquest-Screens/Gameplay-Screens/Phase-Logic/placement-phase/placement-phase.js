if(sessionStorage.getItem("gc_phase") == "placement")
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var current_placing_faction = undefined;
    //factions[0] == rebels.  factions[1] == imperials.
    var factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
    var whos_turn = sessionStorage.getItem("gc_whos_turn");

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
       document.getElementById(id).onclick= function(e){
           if(confirm("Add a ship group here?")== true)
           {

               var planet_in_question  =get_planet(parseInt(document.getElementById(e.target.id).getAttribute("planet_id"),10),0,setup_data.active_planets.length-1);
               //alert ("id: "+e.target.id+"\nOutput: "+planet_in_question);
               if( planet_in_question!= null)//This makes it so you can't places forces on an enemy planet.
               {
                    //alert("Planet: \n Name: "+planet_in_question.planet.name);
                    if(planet_in_question.controlling_faction =="Rebels" && whos_turn == "Imperial" ||
                       planet_in_question.controlling_faction =="Imperial" && whos_turn == "Rebels" ||
                       planet_in_question.controlling_faction =="Unaligned")
                    {                   
                         alert("You cannot place ships on enemy or unaligned planets!");
                    }
                    else 
                    {
                        window.location.href="./Phase-Logic/placement-phase/Create-New-Ship-Body/Ship-Selection/ship-selection.html";
                    }
               }
               else
               {
                    window.location.href="./Phase-Logic/placement-phase/Create-New-Ship-Body/Ship-Selection/ship-selection.html";
               }
           }
       }
   }
}
}

//Using binary search to get planet based on id.
function get_planet(id_goal,low_range_end,high_range_end)
{
    var test_index = Math.floor((low_range_end+high_range_end)/2);//Create average of low and high to test middle of active planets.
    var test_id = setup_data.active_planets[test_index].planet.id

    if( test_id == id_goal)
    {
        //planet found.
        return setup_data.active_planets[test_index];
    }
    else if(low_range_end == high_range_end)
    {
        //No match
        return null;
    }
    else if(id_goal> test_id)//get everything in upper half.
    {
        return get_planet(id_goal,test_index,high_range_end)
    }
    else//get everyting in lower half.
    {
        return get_planet(id_goal,low_range_end,test_index);
    }
}