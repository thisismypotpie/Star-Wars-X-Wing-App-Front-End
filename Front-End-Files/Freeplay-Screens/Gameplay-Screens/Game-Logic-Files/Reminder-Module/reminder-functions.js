class reminder{
    constructor(team,roster,message){
        this.message = message;
        this.team = team;
        this.roster = roster;
        this.when_ships_turn_maneuver_selection = false;
        this.when_ships_turn_movement_phase = false;
        this.when_ships_turn_attack_phase = false;
        this.when_targeted = false;
        this.between_select_and_movement_phase = false;
        this.between_movement_and_attack_phase = false;
        this.between_rounds= false;
    }
}


function show_reminder_pop_up(team_name,current_roster)
{
    document.getElementById("roster-entry").value = current_roster;
    document.getElementById("reminder-team-name").textContent = team_name;
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
            document.getElementById("check-option7").checked == false)
            {
                move_translate_vectors_for_notification_pop_up(-50,-60);
                show_notification_pop_up("You must have at least one option box checked.");
                document.getElementById("notification-ok-button").onclick = function(){close_notification_pop_up();};
                                                                                       
            }
            else
            {
                //Make sure if roster number is null, that there is not checkmark for options needing a roster number.
                //Also checks to see if the input roster number is valid.
                if((document.getElementById("roster-entry").value == NaN ||
                document.getElementById("roster-entry").value == null ||
                document.getElementById("roster-entry").value == "")&&(
                document.getElementById("check-option1").checked == true ||
                document.getElementById("check-option2").checked == true ||
                document.getElementById("check-option3").checked == true ||
                document.getElementById("check-option4").checked == true))
                {
                    move_translate_vectors_for_notification_pop_up(-50,-60);
                    show_notification_pop_up("Please enter a valid roster number in order to select the first, second, third, or fourth option.");
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
                    //Check to make sure the input roster number is valid.
                    if(check_roster_number(team,roster)==false && roster != -1)
                    {
                        move_translate_vectors_for_notification_pop_up(-50,-60);
                        show_notification_pop_up("Roster number was not found on team: "+team);
                        document.getElementById("notification-ok-button").onclick = function(){close_notification_pop_up();};
                    }
                    else
                    {
                        var new_reminder = new reminder(team,roster,message);
                        //See which checkmarks are checked.
                        if(document.getElementById("check-option1").checked == true)
                        {
                            new_reminder.when_ships_turn_maneuver_selection = true;
                        }
                        if(document.getElementById("check-option2").checked == true)
                        {
                            new_reminder.when_ships_turn_movement_phase = true;
                        }
                        if(document.getElementById("check-option3").checked == true)
                        {
                            new_reminder.when_ships_turn_attack_phase = true;
                        }
                        if(document.getElementById("check-option4").checked == true)
                        {
                            new_reminder.when_targeted = true;
                        }
                        if(document.getElementById("check-option5").checked == true)
                        {
                            new_reminder.between_select_and_movement_phase = true;
                        }
                        if(document.getElementById("check-option6").checked == true)
                        {
                            new_reminder.between_movement_and_attack_phase = true;
                        }
                        if(document.getElementById("check-option7").checked == true)
                        {
                            new_reminder.between_rounds = true;
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
    }
}

function search_for_reminders(type_of_reminder_to_search_for,index_to_start_at)
{
    var reminders = JSON.parse(sessionStorage.getItem("all_reminders"));
    var reminder_active = -1;
    if(reminders == null ||
        reminders == undefined || 
        reminders == "")
    {
        return -1;
    }
    for(var i=index_to_start_at; i < reminders.length;i++)
    {
        var reminder = reminders[i];
        if(type_of_reminder_to_search_for == 1 && reminder.when_ships_turn_maneuver_selection == true &&
           sessionStorage.getItem("phase") == null)
        {
            var selected_index = parseInt(JSON.parse(sessionStorage.getItem("selected_ship_index")),10);
            var team_index = parseInt(JSON.parse(sessionStorage.getItem("team_index")),10)
            var index_roster = all_teams[team_index].ship_list[selected_index].roster_number;
            var index_team = all_teams[team_index].team_name;
            if(index_roster == reminder.roster && index_team == reminder.team)
            {
                show_reminder_notification_pop_up(reminder);
                reminder_active  = i;
                break;
            }
        }
        else if(type_of_reminder_to_search_for == 1 && reminder.when_ships_turn_movement_phase == true &&
                sessionStorage.getItem("phase") == "movement")
        {
            var selected_index = parseInt(JSON.parse(sessionStorage.getItem("selected_ship_storage")),10);
            var team_index = parseInt(JSON.parse(sessionStorage.getItem("team_index")),10)
            var index_roster = all_teams[team_index].ship_list[selected_index].roster_number;
            var index_team = all_teams[team_index].team_name;
            if(index_roster == reminder.roster && index_team == reminder.team)
            {
                show_reminder_notification_pop_up(reminder);
                reminder_active  = i;
                break;
            }
        }
        else if(type_of_reminder_to_search_for == 1 && reminder.when_ships_turn_attack_phase == true &&
                sessionStorage.getItem("phase") == "attack")
        {
            var selected_index = parseInt(JSON.parse(sessionStorage.getItem("selected_ship_storage")),10);
            var team_index = parseInt(JSON.parse(sessionStorage.getItem("team_index")),10)
            var index_roster = all_teams[team_index].ship_list[selected_index].roster_number;
            var index_team = all_teams[team_index].team_name;
            if(index_roster == reminder.roster && index_team == reminder.team)
            {
                show_reminder_notification_pop_up(reminder);
                reminder_active  = i;
                break;
            }
        }
        else if(type_of_reminder_to_search_for == 2 && reminder.when_targeted == true)
        {
            var selected_index = parseInt(JSON.parse(sessionStorage.getItem("selected_ship_index")),10);
            var team_index = parseInt(JSON.parse(sessionStorage.getItem("team_index")),10)
            var index_roster = all_teams[team_index].ship_list[selected_index].roster_number;
            var index_team = all_teams[team_index].team_name;
            if(index_roster == reminder.roster && index_team == reminder.team)
            {
                show_reminder_notification_pop_up(reminder);
                reminder_active  = i;
                break;
            }
        }
        else if(type_of_reminder_to_search_for == 3 && reminder.between_select_and_movement_phase == true)
        {
            show_reminder_notification_pop_up(reminder);
            reminder_active  = i;
            break;
        }
        else if(type_of_reminder_to_search_for == 4 && reminder.between_movement_and_attack_phase == true)
        {
            show_reminder_notification_pop_up(reminder);
            reminder_active  = i;
            break;
        }
        else if(type_of_reminder_to_search_for == 5 && reminder.between_rounds == true)
        {
            show_reminder_notification_pop_up(reminder);
            reminder_active  = i;
            break;
        }
    }
    return reminder_active;
}


function check_roster_number(team,roster)
{
    var roster_found = false;
    for(var i=0; i < all_teams.length;i++)
    {
        if(team == all_teams[i].team_name)
        {
            var rosters = all_teams[i].ship_list.map(function(e){return e.roster_number});
            roster_found = rosters.includes(roster);
            break;
        }

    }
    return roster_found;
}