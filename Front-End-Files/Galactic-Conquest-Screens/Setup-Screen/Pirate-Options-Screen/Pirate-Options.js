var pirate_ship_quantities = {
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
}
if(sessionStorage.getItem("pirate-ship-quantities")!=null)
{
    let pirate_data = JSON.parse(sessionStorage.getItem("pirate-ship-quantities"));
    document.getElementById("ship-number-1").textContent = pirate_data.HWK_290;
    update_token_quantity(1)
    document.getElementById("ship-number-2").textContent = pirate_data.Kihraxz_Fighter;
    update_token_quantity(2)
    document.getElementById("ship-number-3").textContent = pirate_data.M3_A_Interceptor;
    update_token_quantity(3)
    document.getElementById("ship-number-4").textContent = pirate_data.M12_L_Kimongila_Fighter;
    update_token_quantity(4)
    document.getElementById("ship-number-5").textContent = pirate_data.G_1A_Starfighter;
    update_token_quantity(5)
    document.getElementById("ship-number-6").textContent = pirate_data.Protectorate_Starfighter;
    update_token_quantity(6)
    document.getElementById("ship-number-7").textContent = pirate_data.Quadjumper;
    update_token_quantity(7)
    document.getElementById("ship-number-8").textContent = pirate_data.Scurrg_H_6_Bomber;
    update_token_quantity(8)
    document.getElementById("ship-number-9").textContent = pirate_data.StarViper;
    update_token_quantity(9)
    document.getElementById("ship-number-10").textContent = pirate_data.Y_Wing;
    update_token_quantity(10)
    document.getElementById("ship-number-11").textContent = pirate_data.Z_95_Headhunter;
    update_token_quantity(11)
    document.getElementById("ship-number-12").textContent = pirate_data.Firespray_31;
    update_token_quantity(12)
    document.getElementById("ship-number-13").textContent = pirate_data.Hounds_Tooth;
    update_token_quantity(13)
    document.getElementById("ship-number-14").textContent = pirate_data.Aggressor;
    update_token_quantity(14)
    document.getElementById("ship-number-15").textContent = pirate_data.Jump_Master_5000;
    update_token_quantity(15)
    document.getElementById("ship-number-16").textContent = pirate_data.Lancer_Class_Pusuit_Craft;
    update_token_quantity(16)
    document.getElementById("ship-number-17").textContent = pirate_data.YT_1300;
    update_token_quantity(17)
    document.getElementById("ship-number-18").textContent = pirate_data.C_ROC_Cruiser;
    update_token_quantity(18)
}

function go_back_to_gc_setup(){
    sessionStorage.setItem("pirate-ship-quantities",JSON.stringify(pirate_ship_quantities))
    window.location.href = "../Setup-Screen.html";
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
    eval("pirate_ship_quantities."+ship_type+"= parseInt(document.getElementById('ship-number-'+id).textContent,10);");
}