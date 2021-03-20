if(sessionStorage.getItem("gc_phase") == "gathering")
{
    gather_phase_set_up();
}

function transfer_to_gather_phase()
{
    sessionStorage.setItem("gc_phase","gathering");
    sessionStorage.setItem("resources_received","false");
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
}