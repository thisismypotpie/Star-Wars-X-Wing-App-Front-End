class reminder{
    constructor(team,roster,message){
        var message = message;
        var team = team;
        var roster = roster;
        var when_ships_turn = false;
        var when_targeted = false;
        var end_of_maneuver_selection = false;
        var beginning_of_movement_phase = false;
        var end_of_movement_phase = false;
        var beginning_of_attack_phase = false;
        var end_of_round = false;
        var beginning_of_round = false;
    }
}


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
    var roster = -1;
    var team = document.getElementById("reminder-team-name").textContent;
    var message = document.getElementById("reminder-text-area").value;

    //If there is no message send nofification and then return.
    if(message == null || message == undefined || message =="")
    {
        move_translate_vectors_for_notification_pop_up(-50,-60);
        show_notification_pop_up("You must have a message for your reminder");
        document.getElementById("notification-ok-button").onclick = function(){close_notification_pop_up()};
    }
    else
    {
        //Check to see if there is a roster number.
        if(isNaN(document.getElementById("roster-entry").value,10))
        {
            move_translate_vectors_for_notification_pop_up(-50,-60);
            show_notification_pop_up("Please enter only a number for roster number entry.");
            document.getElementById("notification-ok-button").onclick = function(){close_notification_pop_up();
                                                                                   document.getElementById("roster-entry").value = ""};
        }
        else
        {
            var new_reminder = new reminder()
            if(sessionStorage.getItem("all_reminders") == null)
            {
                sessionStorage.setItem("all_reminders",)
            }
            hide_reminder_pop_up();
        }
    }
}