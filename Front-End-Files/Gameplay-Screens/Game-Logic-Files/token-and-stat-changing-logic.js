//This will be to show the pop up for changing the quantity of a token. The tokene type will be used in an eval statement and the parent id will be used to get the background image
function augment_token_quantity(token_type,parent_id)
{
    var img = document.getElementById(parent_id),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bg_image_url = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    document.getElementById('token-image').style.backgroundImage = "url('"+bg_image_url+"')";
    let eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;
    eval(eval_string);
    show_pop_up('token-quantity-pop-up');
    document.getElementById("plus-button").onclick = function(){plus_button_click(token_type,parent_id)};
    document.getElementById("minus-button").onclick = function(){minus_button_click(token_type,parent_id)};

}

function augment_stat_quantity(token_type,parent_image,parent_text)
{
    if(token_type == "current_pilot_skill" &&
    sessionStorage.getItem("phase")!=null &&
    sessionStorage.getItem("phase")!=undefined)
    {
        alert("Cannot edit pilot skill in the movement or attack phases.");
        return;
    }
    var img = document.getElementById(parent_image),
    style = img.currentStyle || window.getComputedStyle(img, false),
    bg_image_url = style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    document.getElementById('token-image').style.backgroundImage = "url('"+bg_image_url+"')";
    let eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;
    eval(eval_string);
    show_pop_up('token-quantity-pop-up');
    document.getElementById("plus-button").onclick = function(){plus_button_click(token_type,parent_text)};
    document.getElementById("minus-button").onclick = function(){minus_button_click(token_type,parent_text)};
}

//This is what happens when you click the plus button when augmenting your number of tokens.
function plus_button_click(token_type,parent_id)
{
    let parent_element = document.getElementById(parent_id);
    var stat_quantity =0;
    var eval_string = "all_teams[team_index].ship_list[selected_ship_index]."+token_type+"++; stat_quantity = all_teams[team_index].ship_list[selected_ship_index]."+token_type+";";//Increase the token type by one.
    eval(eval_string);
    if(token_type == "current_pilot_skill" && stat_quantity > 12)
    {
        all_teams[team_index].ship_list[selected_ship_index].current_pilot_skill = 12;
        alert("Cannot have a pilot skill of more than twelve!");
    }
    eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;//Update pop up with the correct number of this token.
    eval(eval_string);
    eval_string = "parent_element.textContent = all_teams[team_index].ship_list[selected_ship_index]."+token_type;//Update token box element.
    eval(eval_string);
    parent_element.style.opacity = 1;
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}

//This is what happens when you click the minus button when augmenting your number of tokens.
function minus_button_click(token_type,parent_id)
{
    let parent_element = document.getElementById(parent_id);
    var eval_string = "if(all_teams[team_index].ship_list[selected_ship_index]."+token_type+" >0){all_teams[team_index].ship_list[selected_ship_index]."+token_type+"--;}";
    eval(eval_string);
    eval_string = "document.getElementById('token-quantity').textContent = 'x'+all_teams[team_index].ship_list[selected_ship_index]."+token_type;
    eval(eval_string);
    eval_string = "parent_element.textContent = all_teams[team_index].ship_list[selected_ship_index]."+token_type;//Update token box element.
    eval(eval_string);
    //The following line with remove text fromt the box, set opacity back to 0.25 and reset the token quantity to zero if it somehow got below zero.
    eval_string = "if(all_teams[team_index].ship_list[selected_ship_index]."+token_type+" <=0){ parent_element.style.opacity = 0.25; all_teams[team_index].ship_list[selected_ship_index]."+token_type+"=0}";
    eval(eval_string);
    sessionStorage.setItem("all_teams",JSON.stringify(all_teams));
}
