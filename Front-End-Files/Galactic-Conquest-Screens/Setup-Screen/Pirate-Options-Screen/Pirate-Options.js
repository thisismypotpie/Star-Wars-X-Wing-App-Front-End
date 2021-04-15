
var gc_setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));

if(gc_setup_data.pirate_options!=null)
{
    document.getElementById("ship-number-1").textContent = gc_setup_data.pirate_options.HWK_290;
    update_token_quantity(1)
    document.getElementById("ship-number-2").textContent = gc_setup_data.pirate_options.Kihraxz_Fighter;
    update_token_quantity(2)
    document.getElementById("ship-number-3").textContent = gc_setup_data.pirate_options.M3_A_Interceptor;
    update_token_quantity(3)
    document.getElementById("ship-number-4").textContent = gc_setup_data.pirate_options.M12_L_Kimongila_Fighter;
    update_token_quantity(4)
    document.getElementById("ship-number-5").textContent = gc_setup_data.pirate_options.G_1A_Starfighter;
    update_token_quantity(5)
    document.getElementById("ship-number-6").textContent = gc_setup_data.pirate_options.Protectorate_Starfighter;
    update_token_quantity(6)
    document.getElementById("ship-number-7").textContent = gc_setup_data.pirate_options.Quadjumper;
    update_token_quantity(7)
    document.getElementById("ship-number-8").textContent = gc_setup_data.pirate_options.Scurrg_H_6_Bomber;
    update_token_quantity(8)
    document.getElementById("ship-number-9").textContent = gc_setup_data.pirate_options.StarViper;
    update_token_quantity(9)
    document.getElementById("ship-number-10").textContent = gc_setup_data.pirate_options.Y_Wing;
    update_token_quantity(10)
    document.getElementById("ship-number-11").textContent = gc_setup_data.pirate_options.Z_95_Headhunter;
    update_token_quantity(11)
    document.getElementById("ship-number-12").textContent = gc_setup_data.pirate_options.Firespray_31;
    update_token_quantity(12)
    document.getElementById("ship-number-13").textContent = gc_setup_data.pirate_options.Hounds_Tooth;
    update_token_quantity(13)
    document.getElementById("ship-number-14").textContent = gc_setup_data.pirate_options.Aggressor;
    update_token_quantity(14)
    document.getElementById("ship-number-15").textContent = gc_setup_data.pirate_options.Jump_Master_5000;
    update_token_quantity(15)
    document.getElementById("ship-number-16").textContent = gc_setup_data.pirate_options.Lancer_Class_Pusuit_Craft;
    update_token_quantity(16)
    document.getElementById("ship-number-17").textContent = gc_setup_data.pirate_options.YT_1300;
    update_token_quantity(17)
    document.getElementById("ship-number-18").textContent = gc_setup_data.pirate_options.C_ROC_Cruiser;
    update_token_quantity(18)
}

function go_back_to_gc_setup(){
    var roster_number_count = parse_roster_numbers();
    var total_ships = eval(gc_setup_data.pirate_options.total_ships)
    if(roster_number_count == -1)
    {
        return;
    }
    
    if(roster_number_count!= total_ships)
    {
        alert("Please enter "+(total_ships-roster_number_count)+" more roster number(s).")
    }
    else
    {
        sessionStorage.setItem("gc_setup_data",JSON.stringify(gc_setup_data));
        window.location.href = "../Setup-Screen.html";
    }
}

function add_ship_button_click(id)
{
    let quantity = parseInt(document.getElementById("ship-number-"+id).textContent,10);
    quantity++;
    document.getElementById("ship-number-"+id).textContent = quantity;
    update_token_quantity(id)
}

function subtract_ship_button_click(id)
{
    let quantity = parseInt(document.getElementById("ship-number-"+id).textContent,10);
    quantity--;
    if(quantity < 0)
    {
        document.getElementById("ship-number-"+id).textContent = "0";
    }
    else
    {
        document.getElementById("ship-number-"+id).textContent = quantity;
    }
    update_token_quantity(id)
}

function update_token_quantity(id)
{
    let ship_type = document.getElementById("ship-title-"+id).textContent;
    ship_type = ship_type.replace(/-/g, "_");
    ship_type = ship_type.replace(/ /g,"_");
    eval("gc_setup_data.pirate_options."+ship_type+"= parseInt(document.getElementById('ship-number-'+id).textContent,10);");
}

function parse_roster_numbers()
{
    var raw_rosters = document.getElementById("roster-number-input").value;
    raw_rosters= raw_rosters.replace(/\s+/g, '');
    var finished_rosters = raw_rosters.split(",");
    if(finished_rosters.length ==0 ||
        finished_rosters.toString() == "")
    {
        return 0;
    }
    for(var i=0; i < finished_rosters.length;i++)
    {
        if(parseInt(finished_rosters[i],10) != NaN)
        {
            finished_rosters[i] = parseInt(finished_rosters[i],10);
        }
        else
        {
            alert( finished_rosters[i]+" is not a number.")
            return -1;
        }
    }
    gc_setup_data.pirate_options.roster_numbers = finished_rosters;
    return finished_rosters.length;
}