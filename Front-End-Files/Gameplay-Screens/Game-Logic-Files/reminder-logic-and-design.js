//Create overlay 
var overlay = document.createElement("div");
overlay.id = "reminder-overlay";
overlay.style.position = "fixed";
overlay.style.opacity = "0";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.right = "0";
overlay.style.bottom = "0";
overlay.style.backgroundColor = "rgba(0,0,0,.5)";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "100";
document.body.appendChild(overlay);

//Create reminder pop-up-container
var container = document.createElement("div");
container.id="reminder-pop-up-container";
container.style.position = "relative";
container.style.left = "50%";
container.style.top = "50%";
container.style.transform = "translate(-50%,-125%)";
container.style.border = "5px solid white";
container.style.zIndex = "150";
container.style.background = "url('https://i.imgur.com/nIM4P1r.jpg')";
container.style.width = "70%";
container.style.height = "80vh"
container.style.visibility = "hidden";
container.style.textAlign = "center";
container.style.display = "grid";
container.style.gridTemplateColumns= "repeat(24,calc(100%/24))"
container.style.gridTemplateRows = "repeat(24,calc(80vh/24))"
document.body.appendChild(container);


//Create reminder title.
var title = document.createElement("div");
title.id="reminder-title";
title.style.fontFamily = "Impact, Charcoal, sans-serif";
title.style.fontSize = "3vw";
title.style.color = "white";
title.textContent = "Set a Reminder";
title.style.border = "1px solid green";
title.style.gridRow = "1/3";
title.style.gridColumn = "1/25";
title.style.textAlign = "center";
container.appendChild(title);

//Create checkbox container
var checkbox_container = document.createElement("div");
checkbox_container.id = "checkbox-container"
checkbox_container.style.border = "1px solid red";
checkbox_container.style.gridRow = "3/21";
checkbox_container.style.gridColumn = "2/9";
checkbox_container.style.display = "grid";
checkbox_container.style.gridTemplateColumns = "repeat(1,calc(100%/1))"
checkbox_container.style.gridTemplateRows = "repeat(9,calc(100%/9))";
container.appendChild(checkbox_container);

//Create checbox title
var checkbox_title = document.createElement("div");
checkbox_title.id = "checkbox-title";
checkbox_title.style.fontFamily = "Impact, Charcoal, sans-serif";
checkbox_title.style.color = "white"
checkbox_title.style.gridColumn = "1";
checkbox_title.style.gridRow = "1";
checkbox_title.textContent = "Reminder Options"
checkbox_title.style.fontSize = "2.5vw";
checkbox_title.style.textAlign = "center";
checkbox_title.style.border = "1px solid purple";
checkbox_container.appendChild(checkbox_title);

//Create each option
for(var i=0; i < 8;i++)
{
    var new_option = document.createElement("input")
    new_option.type = "checkbox";
    new_option.id = "check-option"+(i+1);
    new_option.gridColumn= "1";
    new_option.gridRow = (i+2).toString();
    new_option.style.border = "1px solid brown";
    new_option.style.fontFamily = "Impact, Charcoal, sans-serif";
    new_option.style.color = "white"
    new_option.style.fontSize = "1.5vw";
    new_option.innerHTML = "test";
    checkbox_container.appendChild(new_option);
}


//Create back button
var back_button = document.createElement("button");
back_button.className = "long-button";
back_button.id = "reminder-back-button";
back_button.style.gridRow = "22/24";
back_button.style.gridColumn = "4/11";
back_button.style.fontFamily = "Impact, Charcoal, sans-serif";
back_button.textContent = "Back";
back_button.onclick = function(){hide_reminder_pop_up()};
container.appendChild(back_button);

//Create "Create" button
var create_button = document.createElement("button");
create_button.className = "long-button";
create_button.id = "reminder-create-button";
create_button.style.gridRow = "22/24";
create_button.style.gridColumn = "15/22";
create_button.style.fontFamily = "Impact, Charcoal, sans-serif";
create_button.textContent = "Create";
container.appendChild(create_button);

//Create message div
var message = document.createElement("div");
message.id = "message-box";
message.style.border = "1px solid orange";
message.style.gridColumn = "10/24";
message.style.gridRow = "4/21";
container.appendChild(message);

function show_reminder_pop_up()
{
    document.getElementById("reminder-overlay").style.opacity = 1;
    document.getElementById("reminder-pop-up-container").style.visibility = "visible";
    document.getElementById("reminder-overlay").style.pointerEvents = "all";
    document.getElementById("reminder-pop-up-container").focus();
}

function hide_reminder_pop_up()
{
    document.getElementById("reminder-overlay").style.opacity = 0;
    document.getElementById("reminder-pop-up-container").style.visibility = "hidden";
    document.getElementById("reminder-overlay").style.pointerEvents = "none";
}