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
container.style.position = "absolute";
container.style.left = "50%";
container.style.top = "50%";
container.style.transform = "translate(-50%,-50%)";
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
//title.style.border = "1px solid green";
title.style.gridRow = "1/3";
title.style.gridColumn = "1/25";
title.style.textAlign = "center";
container.appendChild(title);

//Create checkbox container
var checkbox_container = document.createElement("div");
checkbox_container.id = "checkbox-container"
checkbox_container.style.border = "3px solid white";
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
//checkbox_title.style.border = "1px solid purple";
checkbox_container.appendChild(checkbox_title);

//Create each option
for(var i=0; i < 8;i++)
{
    var option_container = document.createElement("div");
    option_container.id = "option-container";
    option_container.style.display = "grid";
    option_container.style.gridTemplateColumns = "repeat(10,calc(100%/10))"
    option_container.style.gridTemplateRows = "repeat(1,calc(100%/1))";
    option_container.gridColumn= "1";
    option_container.gridRow = (i+2).toString();


    var option_checkbox = document.createElement("input")
    option_checkbox.type = "checkbox";
    option_checkbox.id = "check-option"+(i+1);
    option_checkbox.style.gridRow = "1";
    option_checkbox.style.gridColumn = "1";
    option_container.appendChild(option_checkbox);
    
    var option_label = document.createElement('div');
    //option_label.style.border = "1px solid brown";
    option_label.id = "check-label"+(i+1);
    option_label.style.fontFamily = "Impact, Charcoal, sans-serif";
    option_label.style.color = "white"
    option_label.style.fontSize = "medium";
    option_label.textContent = "test";
    option_label.style.gridRow = "1";
    option_label.style.gridColumn = "2/11";
    option_label.style.textAlign = "left";
    option_container.appendChild(option_label);


    checkbox_container.appendChild(option_container);
}
document.getElementById("check-label1").textContent = "When it's this ship's turn";
document.getElementById("check-label2").textContent = "When this ship is Targetted";
document.getElementById("check-label3").textContent = "End of Maneuver Selection Phase";
document.getElementById("check-label4").textContent = "Beginning of Movement Phase";
document.getElementById("check-label5").textContent = "End of Movement Phase";
document.getElementById("check-label6").textContent = "Beginning of Attack Phase";
document.getElementById("check-label7").textContent = "End of Round";
document.getElementById("check-label8").textContent = "Beginning of Round";



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
create_button.onclick =  function(){create_new_reminder()};
container.appendChild(create_button);

//Create message div
var message_container = document.createElement("div");
message_container.id = "message-container";
//message_container.style.border = "1px solid orange";
message_container.style.gridColumn = "10/24";
message_container.style.gridRow = "4/21";
message_container.style.display = "grid";
message_container.style.gridTemplateColumns = "repeat(12,calc(100%/12))"
message_container.style.gridTemplateRows = "repeat(12,calc(100%/12))"
container.appendChild(message_container);

//Create new reminder title
var add_reminder_title = document.createElement("div");
add_reminder_title.style.gridRow = "1";
add_reminder_title.style.gridColumn = "1/13";
//add_reminder_title.style.border = "1px solid cyan";
add_reminder_title.style.fontFamily = "Impact, Charcoal, sans-serif";
add_reminder_title.style.fontSize = "2.5vw";
add_reminder_title.style.color = "white"
add_reminder_title.textContent = "Add A Reminder"
message_container.appendChild(add_reminder_title);

//Player title
var team_title = document.createElement("div");
team_title.style.gridRow = "3";
team_title.style.gridColumn = "1/3";
//team_title.style.border = "1px solid cyan";
team_title.style.fontFamily = "Impact, Charcoal, sans-serif";
team_title.style.fontSize = "2vw";
team_title.style.color = "white"
team_title.textContent = "Team: "
team_title.style.textAlign = "left"
message_container.appendChild(team_title);

//Reminder team name
var reminder_team_name = document.createElement("div");
reminder_team_name.id = "reminder-team-name";
reminder_team_name.style.gridRow = "3";
reminder_team_name.style.gridColumn = "3/9";
//reminder_team_name.style.border = "1px solid brown";
reminder_team_name.style.fontFamily = "Impact, Charcoal, sans-serif";
reminder_team_name.style.fontSize = "2vw";
reminder_team_name.style.color = "white"
reminder_team_name.textContent = "test test test test"
reminder_team_name.style.textAlign = "left"
message_container.appendChild(reminder_team_name);

//Add roster number title
var roster_number_title = document.createElement("div");
roster_number_title.style.gridRow = "3";
roster_number_title.style.gridColumn = "9/11";
//roster_number_title.style.border = "1px solid brown";
roster_number_title.style.fontFamily = "Impact, Charcoal, sans-serif";
roster_number_title.style.fontSize = "2vw";
roster_number_title.style.color = "white"
roster_number_title.textContent = "Roster:"
roster_number_title.style.textAlign = "center"
message_container.appendChild(roster_number_title);

//Add roster number input
var roster_entry = document.createElement("input");
roster_entry.id = "roster-entry";
roster_entry.type = "text";
roster_entry.style.backgroundColor = "black";
roster_entry.style.color = "white";
roster_entry.style.fontFamily = "Impact, Charcoal, sans-serif";
roster_entry.style.fontSize = "2vw";
roster_entry.style.textAlign ="center";
roster_entry.style.gridRow = "3";
roster_entry.style.gridColumn = "11/13";
message_container.appendChild(roster_entry);

//Message Title
var message_title = document.createElement("div")
message_title.style.gridRow = "5";
message_title.style.gridColumn = "1/13";
//message_title.style.border = "1px solid lime";
message_title.style.fontFamily = "Impact, Charcoal, sans-serif";
message_title.style.fontSize = "2.5vw";
message_title.style.color = "white"
message_title.textContent = "Message"
message_title.style.textAlign = "beginning";
message_container.appendChild(message_title);

//Message text area
var text_area = document.createElement("textarea");
text_area.id = "reminder-text-area";
text_area.style.gridRow = "7/13";
text_area.style.gridColumn = "1/13";
text_area.style.backgroundColor = "black";
text_area.style.color = "white";
text_area.style.fontFamily = "Impact, Charcoal, sans-serif";
text_area.style.fontSize = "x-large";
message_container.appendChild(text_area);