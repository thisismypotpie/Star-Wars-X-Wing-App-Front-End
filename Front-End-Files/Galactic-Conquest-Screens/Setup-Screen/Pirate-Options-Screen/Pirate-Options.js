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

function go_back_to_gc_setup(){
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