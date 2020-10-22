//Create overlay 
var overlay = document.createElement("div");
overlay.id = "confirmation-overlay";
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

//Create confirmation pop-up-container
var container = document.createElement("div");
container.id="confirmation-pop-up-container";
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

//Create confirmation message.
var message = document.createElement("div");
message.id="confirmation-message";
message.style.fontFamily = "Impact, Charcoal, sans-serif";
message.style.fontSize = "3vw";
message.style.color = "white";
container.appendChild(message);

//Create yes button
var yes_btn = document.createElement("button");
yes_btn.id = "confirmation-yes-button";
yes_btn.style.height = "10vh";
yes_btn.style.width = "40%";
yes_btn.textContent = "yes";
yes_btn.style.backgroundImage = "url('https://i.imgur.com/QqrKDZs.png')";
yes_btn.style.backgroundSize = "100% 100%";
yes_btn.style.backgroundRepeat = "yes-repeat";
yes_btn.style.backgroundColor = "transparent";
yes_btn.style.border = "none";
yes_btn.style.fontFamily = " Impact, Charcoal, sans-serif";
yes_btn.style.fontSize = "2vw";
yes_btn.style.textAlign = "center";
//yes_btn.onclick = function(){close_confirmation_pop_up()}
container.appendChild(yes_btn);

//Create no button
var no_btn = document.createElement("button");
no_btn.id = "confirmation-no-button";
no_btn.style.height = "10vh";
no_btn.style.width = "40%";
no_btn.textContent = "No";
no_btn.style.backgroundImage = "url('https://i.imgur.com/QqrKDZs.png')";
no_btn.style.backgroundSize = "100% 100%";
no_btn.style.backgroundRepeat = "no-repeat";
no_btn.style.backgroundColor = "transparent";
no_btn.style.border = "none";
no_btn.style.fontFamily = " Impact, Charcoal, sans-serif";
no_btn.style.fontSize = "2vw";
no_btn.style.textAlign = "center";
//no_btn.onclick = function(){close_confirmation_pop_up()}
container.appendChild(no_btn);

function show_confirmation_pop_up(message)
{
    document.getElementById("confirmation-overlay").style.opacity = 1;
    document.getElementById("confirmation-pop-up-container").style.visibility = "visible";
    document.getElementById("confirmation-overlay").style.pointerEvents = "all";
    document.getElementById("confirmation-message").textContent = message;
    document.getElementById("confirmation-pop-up-container").focus();
}

function close_confirmation_pop_up()
{
    document.getElementById("confirmation-overlay").style.opacity = 0;
    document.getElementById("confirmation-message").textContent = "Empty";
    document.getElementById("confirmation-pop-up-container").style.visibility = "hidden";
    document.getElementById("confirmation-overlay").style.pointerEvents = "none";
}

function move_translate_vectors_for_confirmation_pop_up(one,two)
{
    document.getElementById("confirmation-pop-up-container").style.transform = "translate("+one+"%,"+two+"%)";
}