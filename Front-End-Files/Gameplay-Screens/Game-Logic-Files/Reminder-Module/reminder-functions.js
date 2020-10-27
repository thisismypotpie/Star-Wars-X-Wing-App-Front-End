class reminder{
    constructor(team,roster,message){
        this.message = message;
        this.team = team;
        this.roster = roster;
        this.when_ships_turn = false;
        this.when_targeted = false;
        this.end_of_maneuver_selection = false;
        this.beginning_of_movement_phase = false;
        this.end_of_movement_phase = false;
        this.beginning_of_attack_phase = false;
        this.end_of_round = false;
        this.beginning_of_round = false;
    }
}


function show_reminder_pop_up(team_name)
{
    document.getElementById("reminder-team-name").textContent = team_name
    document.getElementById("reminder-overlay").style.opacity = 1;
    document.getElementById("reminder-pop-up-container").style.visibility = "visible";
    document.getElementById("reminder-overlay").style.pointerEvents = "all";
    document.getElementById("reminder-text-area").focus();
}

function hide_reminder_pop_up()
{
    clear_reminder_pop_up();
    document.getElementById("reminder-overlay").style.opacity = 0;
    document.getElementById("reminder-pop-up-container").style.visibility = "hidden";
    document.getElementById("reminder-overlay").style.pointerEvents = "none";
}

function clear_reminder_pop_up()
{
    document.getElementById("check-option1").checked = false;
    document.getElementById("check-option2").checked = false;
    document.getElementById("check-option3").checked = false;
    document.getElementById("check-option4").checked = false;
    document.getElementById("check-option5").checked = false;
    document.getElementById("check-option6").checked = false;
    document.getElementById("check-option7").checked = false;
    document.getElementById("check-option8").checked = false;
    document.getElementById("roster-entry").value = "";
    document.getElementById("reminder-text-area").value = "";
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
        //Check to see if roster is incorrect.
        if(isNaN(document.getElementById("roster-entry").value,10))
        {
            move_translate_vectors_for_notification_pop_up(-50,-60);
            show_notification_pop_up("Please enter only a number for roster number entry.");
            document.getElementById("notification-ok-button").onclick = function(){close_notification_pop_up();
                                                                                   document.getElementById("roster-entry").value = ""};
        }
        else
        {
            //Make sure at least one box is checked.
            if(document.getElementById("check-option1").checked == false &&
            document.getElementById("check-option2").checked == false &&
            document.getElementById("check-option3").checked == false &&
            document.getElementById("check-option4").checked == false &&
            document.getElementById("check-option5").checked == false &&
            document.getElementById("check-option6").checked == false &&
            document.getElementById("check-option7").checked == false &&
            document.getElementById("check-option8").checked == false)
            {
                move_translate_vectors_for_notification_pop_up(-50,-60);
                show_notification_pop_up("Ypu must have at least one option box checked.");
                document.getElementById("notification-ok-button").onclick = function(){close_notification_pop_up();};
                                                                                       
            }
            else
            {
                //See if roster number is used or not.
                if(document.getElementById("roster-entry").value != NaN &&
                document.getElementById("roster-entry").value != null &&
                document.getElementById("roster-entry").value != "")
                {
                    roster = parseInt(document.getElementById("roster-entry").value,10);
                }
                var new_reminder = new reminder(team,roster,message);
                //See which checkmarks are checked.
                if(document.getElementById("check-option1").checked == true)
                {
                    new_reminder.when_ships_turn = true;
                }
                if(document.getElementById("check-option2").checked == true)
                {
                    new_reminder.when_targeted = true;
                }
                if(document.getElementById("check-option3").checked == true)
                {
                    new_reminder.end_of_maneuver_selection = true;
                }
                if(document.getElementById("check-option4").checked == true)
                {
                    new_reminder.beginning_of_movement_phase = true;
                }
                if(document.getElementById("check-option5").checked == true)
                {
                    new_reminder.end_of_movement_phase = true;
                }
                if(document.getElementById("check-option6").checked == true)
                {
                    new_reminder.beginning_of_attack_phase = true;
                }
                if(document.getElementById("check-option7").checked == true)
                {
                    new_reminder.end_of_round = true;
                }
                if(document.getElementById("check-option8").checked == true)
                {
                    new_reminder.beginning_of_round = true;
                }

                //Set up all reminders if needed, else add to already existing new reminders.
                if(sessionStorage.getItem("all_reminders") == null)
                {
                    sessionStorage.setItem("all_reminders",JSON.stringify([]))
                }
                var reminders = JSON.parse(sessionStorage.getItem("all_reminders"));
                reminders.push(new_reminder)
                sessionStorage.setItem("all_reminders",JSON.stringify(reminders));

                move_translate_vectors_for_notification_pop_up(-50,-60);
                show_notification_pop_up("New Reminder Created!");
                document.getElementById("notification-ok-button").onclick = function(){hide_reminder_pop_up(); close_notification_pop_up()};
            }
        }
    }
}

function search_for_reminders(type_of_reminder_to_search_for)
{
    var reminders = JSON.parse(sessionStorage.getItem("all_reminders"));
    if(reminders == null ||
        reminders == undefined || 
        reminders == "")
    {
        return;
    }
    reminders.forEach(reminder=>{
        if(type_of_reminder_to_search_for == 1 && reminder.when_ships_turn == true)
        {

        }
        else if(type_of_reminder_to_search_for == 2 && reminder.when_targeted == true)
        {

        }
        else if(type_of_reminder_to_search_for == 3 && reminder.end_of_maneuver_selection == true)
        {

        }
        else if(type_of_reminder_to_search_for == 4 && reminder.beginning_of_movement_phase == true)
        {

        }
        else if(type_of_reminder_to_search_for == 5 && reminder.end_of_movement_phase == true)
        {

        }
        else if(type_of_reminder_to_search_for == 6 && reminder.beginning_of_attack_phase == true)
        {

        }
        else if(type_of_reminder_to_search_for == 7 && reminder.end_of_round == true)
        {

        }
        else if(type_of_reminder_to_search_for == 8 && reminder.beginning_of_round == true)
        {

        }
    })
}