function show_reminder_pop_up(team_name)
{
    document.getElementById("reminder-team-name").textContent = team_name
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

function create_new_reminder()
{
    alert("Creating new reminder!")
}