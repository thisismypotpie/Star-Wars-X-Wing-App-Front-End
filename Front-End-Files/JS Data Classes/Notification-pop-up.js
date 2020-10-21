//Create overlay 
var overlay = document.createElement("div");
overlay.id = "notification-overlay";
overlay.style.position = "fixed";
overlay.style.opacity = "0";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.right = "0";
overlay.style.bottom = "0";
overlay.style.backgroundColor = "rgba(0,0,0,.5)";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "0";
document.body.appendChild(overlay);


//Create notification pop-up-container

var container = document.createElement("div");
container.id="notification-pop-up-container";
container.style.left = "50%";
container.style.top = "50%";
container.style.transform = "translate(75%,-225%)";
container.style.border = "5px solid white";
container.style.zIndex = "100";
container.style.background = "url('https://i.imgur.com/nIM4P1r.jpg')";
container.style.width = "40%";
container.style.visibility = "hidden";
container.style.textAlign = "center";
document.body.appendChild(container);

//Create notification message.
var message = document.createElement("div");
message.id="notification-message";
message.style.fontFamily = "Impact, Charcoal, sans-serif";
message.style.fontSize = "3vw";
message.style.color = "white";
container.appendChild(message);

//Create ok button
var ok_btn = document.createElement("button");
ok_btn.id = "notification-ok-button";
ok_btn.style.height = "10vh";
ok_btn.style.width = "40%";
ok_btn.textContent = "OK";
ok_btn.style.backgroundImage = "url('https://i.imgur.com/QqrKDZs.png')";
ok_btn.style.backgroundSize = "100% 100%";
ok_btn.style.backgroundRepeat = "no-repeat";
ok_btn.style.backgroundColor = "transparent";
ok_btn.style.border = "none";
ok_btn.style.fontFamily = " Impact, Charcoal, sans-serif";
ok_btn.style.fontSize = "2vw";
ok_btn.style.textAlign = "center";
//ok_btn.onclick = function(){close_notification_pop_up()}
container.appendChild(ok_btn);


function show_notification_pop_up(message)
{
    document.getElementById("notification-overlay").style.opacity = 1;
    document.getElementById("notification-pop-up-container").style.visibility = "visible";
    document.getElementById("notification-overlay").style.pointerEvents = "all";
    document.getElementById("notification-message").textContent = message;
    document.getElementById("notification-pop-up-container").focus();
}


function close_notification_pop_up()
{
    document.getElementById("notification-overlay").style.opacity = 0;
    document.getElementById("notification-message").textContent = "Empty";
    document.getElementById("notification-pop-up-container").style.visibility = "hidden";
    document.getElementById("notification-overlay").style.pointerEvents = "none";
}