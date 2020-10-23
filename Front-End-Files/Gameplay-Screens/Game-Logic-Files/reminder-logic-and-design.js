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
container.style.left = "50%";
container.style.top = "50%";
container.style.transform = "translate(25%,-125%)";
container.style.border = "5px solid white";
container.style.zIndex = "100";
container.style.background = "url('https://i.imgur.com/nIM4P1r.jpg')";
container.style.width = "70%";
container.style.height = "80vh"
container.style.visibility = "hidden";
container.style.textAlign = "center";
container.style.display = "grid";
container.style.gridTemplateColumns= "repeat(24,calc(100%/24))"
container.style.gridTemplateRows = "repeat(24,calc(80vh/24))"
document.body.appendChild(container);


//Create reminder message.
var message = document.createElement("div");
message.id="reminder-title";
message.style.fontFamily = "Impact, Charcoal, sans-serif";
message.style.fontSize = "3vw";
message.style.color = "white";
message.textContent = "Reminders"
message.style.border = "1px solid green";
message.style.gridRow = "1/3";

container.appendChild(message);

function show_reminder_pop_up(message)
{
    document.getElementById("reminder-overlay").style.opacity = 1;
    document.getElementById("reminder-pop-up-container").style.visibility = "visible";
    document.getElementById("reminder-overlay").style.pointerEvents = "all";
    document.getElementById("reminder-title").textContent = message;
    document.getElementById("reminder-pop-up-container").focus();
}