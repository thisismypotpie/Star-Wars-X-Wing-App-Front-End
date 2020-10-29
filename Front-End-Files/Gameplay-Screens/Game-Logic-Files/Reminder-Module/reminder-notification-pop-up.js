
//Create overlay 
var reminder_overlay = document.createElement("div");
reminder_overlay.id = "reminder-notification-overlay";
reminder_overlay.style.position = "fixed";
reminder_overlay.style.opacity = "0";
reminder_overlay.style.top = "0";
reminder_overlay.style.left = "0";
reminder_overlay.style.right = "0";
reminder_overlay.style.bottom = "0";
reminder_overlay.style.backgroundColor = "rgba(0,0,0,.5)";
reminder_overlay.style.pointerEvents = "none";
reminder_overlay.style.zIndex = "200";
document.body.appendChild(reminder_overlay);


//Create notification pop-up-container
var reminder_container = document.createElement("div");
reminder_container.id="reminder-notification-pop-up-container";
reminder_container.style.left = "50%";
reminder_container.style.top = "50%";
reminder_container.style.transform = "translate(-50%,-50%)";
reminder_container.style.border = "5px solid white";
reminder_container.style.zIndex = "250";
reminder_container.style.background = "url('https://i.imgur.com/nIM4P1r.jpg')";
reminder_container.style.width = "60%";
reminder_container.style.height = "50vh";
reminder_container.style.visibility = "hidden";
reminder_container.style.textAlign = "center";
reminder_container.style.display = "grid";
reminder_container.style.gridTemplateColumns = "repeat(12,calc(100%/12)"
reminder_container.style.gridTemplateRows = "repeat(12,calc(100%/12))"
reminder_container.style.position = "absolute";
document.body.appendChild(reminder_container);

//Title
var title = document.createElement("div")
title.id="reminder-notification-title";
title.style.fontFamily = "Impact, Charcoal, sans-serif";
title.style.fontSize = "4vw";
title.style.color = "white";
title.style.gridColumn = "1/13";
title.style.gridRow = "1";
title.textContent = "Reminder";
//title.style.border = "1px solid red"
reminder_container.appendChild(title)

//player
var player = document.createElement("div")
player.id="reminder-notification-player";
player.style.fontFamily = "Impact, Charcoal, sans-serif";
player.style.fontSize = "2.5vw";
player.style.color = "white";
player.style.gridColumn = "2/7";
player.style.gridRow = "3";
player.textContent = "Team:";
player.style.textAlign = "left";
//player.style.border = "1px solid orange"
reminder_container.appendChild(player)

//roster
var roster = document.createElement("div")
roster.id="reminder-notification-roster";
roster.style.fontFamily = "Impact, Charcoal, sans-serif";
roster.style.fontSize = "2.5vw";
roster.style.color = "white";
roster.style.gridColumn = "8/12";
roster.style.textAlign = "center";
roster.style.gridRow = "3";
roster.textContent = "Roster:"
//roster.style.border = "1px solid purple"
reminder_container.appendChild(roster)

//Create notification message.
var reminder_message = document.createElement("div");
reminder_message.id="reminder-notification-message";
reminder_message.style.fontFamily = "Impact, Charcoal, sans-serif";
reminder_message.style.fontSize = "2.5vw";
reminder_message.style.color = "white";
reminder_message.style.gridColumn ="2/12";
reminder_message.style.gridRow = "5/10";
reminder_message.style.border = "3px solid white"
reminder_container.appendChild(reminder_message);

//Create ok button
var reminder_ok_btn = document.createElement("button");
reminder_ok_btn.id = "reminder-notification-ok-button";
reminder_ok_btn.textContent = "OK";
reminder_ok_btn.style.backgroundImage = "url('https://i.imgur.com/RkyE0Xv.png')";
reminder_ok_btn.style.backgroundSize = "100% 100%";
reminder_ok_btn.style.backgroundRepeat = "no-repeat";
reminder_ok_btn.style.backgroundColor = "transparent";
reminder_ok_btn.style.border = "none";
reminder_ok_btn.style.fontFamily = " Impact, Charcoal, sans-serif";
reminder_ok_btn.style.fontSize = "2vw";
reminder_ok_btn.style.textAlign = "center";
reminder_ok_btn.style.gridColumn = "8/11";
reminder_ok_btn.style.gridRow = "10/13";
//reminder_ok_btn.onclick = function(){close_reminder_notification_pop_up()}
reminder_container.appendChild(reminder_ok_btn);

//Create checkbox container
var checkbox_container = document.createElement("div");
checkbox_container.id = "delete-reminder-container";
checkbox_container.style.display = "grid";
checkbox_container.style.gridTemplateColumns = "repeat(10,calc(100%/10))"
checkbox_container.style.gridTemplateRows = "repeat(1,calc(100%/1))";
checkbox_container.style.gridRow= "11";
checkbox_container.style.gridColumn = "2/6";
//checkbox_container.style.border = "1px solid green";
reminder_container.appendChild(checkbox_container);

var delete_checkbox = document.createElement("input")
delete_checkbox.type = "checkbox";
delete_checkbox.id = "delete-reminder-checkbox";
delete_checkbox.style.gridRow = "1";
delete_checkbox.style.gridColumn = "1";
checkbox_container.appendChild(delete_checkbox);

var delete_label = document.createElement('div');
//option_label.style.border = "1px solid brown";
delete_label.id = "delete-checkbox-label";
delete_label.style.fontFamily = "Impact, Charcoal, sans-serif";
delete_label.style.color = "white"
delete_label.style.fontSize = "x-large";
delete_label.textContent = "Delete Reminder";
delete_label.style.gridRow = "1";
delete_label.style.gridColumn = "2/11";
delete_label.style.textAlign = "left";
delete_label.onclick = function(){toggle_checkbox("delete-reminder-checkbox")};
checkbox_container.appendChild(delete_label);


function show_reminder_notification_pop_up(reminder)
{
    document.getElementById("reminder-notification-overlay").style.opacity = 1;
    document.getElementById("reminder-notification-pop-up-container").style.visibility = "visible";
    document.getElementById("reminder-notification-overlay").style.pointerEvents = "all";
    document.getElementById("reminder-notification-message").textContent = reminder.message;
    document.getElementById("reminder-notification-player").textContent = "Team: "+reminder.team;
    document.getElementById("delete-reminder-checkbox").checked = false;
    if(parseInt(reminder.roster,10) != -1)
    {
        document.getElementById("reminder-notification-roster").textContent = "Roster: "+reminder.roster;
    }
    else
    {
        document.getElementById("reminder-notification-roster").textContent = "Roster: None";
    }
    document.getElementById("reminder-notification-pop-up-container").focus();
}


function close_reminder_notification_pop_up() 
{
    document.getElementById("reminder-notification-overlay").style.opacity = 0;
    document.getElementById("reminder-notification-message").textContent = "Empty";
    document.getElementById("reminder-notification-pop-up-container").style.visibility = "hidden";
    document.getElementById("reminder-notification-overlay").style.pointerEvents = "none";
    document.getElementById("reminder-notification-message").textContent = "";
    document.getElementById("reminder-notification-player").textContent = "";
    document.getElementById("reminder-notification-roster").textContent = "";
    document.getElementById("delete-reminder-checkbox").checked = false;
}

function move_translate_vectors_for_reminder_notification_pop_up(one,two)
{
    document.getElementById("notification-pop-up-container").style.transform = "translate("+one+"%,"+two+"%)";
}

function change_z_index_of_reminder_notification_container(newZIndex)
{
    document.getElementById("notification-pop-up-container").style.zIndex = toString(newZIndex)
}

function change_z_index_of_reminder_notification_overlay(newZIndex)
{
    document.getElementById("notification-overlay").style.zIndex = toString(newZIndex)
}

function toggle_checkbox(name)
{
    if(document.getElementById(name).checked == false)
    {
        document.getElementById(name).checked = true;
    }
    else
    {
        document.getElementById(name).checked = false;
    }
    document.getElementById("reminder-text-area").focus();
}

function check_if_reminder_needs_to_be_deleted(current_reminder_index)
{
    var deleted = false;
    if(document.getElementById("delete-reminder-checkbox").checked == true)
    {
        alert("Deleting reminder at index: "+current_reminder_index)
        var all_reminders = JSON.parse(sessionStorage.getItem("all_reminders"));
        all_reminders.splice(current_reminder_index,1);
        sessionStorage.setItem("all_reminders",JSON.stringify(all_reminders));
        deleted = true;
    }
    return deleted;
}