//This file is used when the random teams create a new team or when you are selecting a pilot and need create an in game class.

class target_lock{
    constructor(assignment_number,targetting_team,targetting_roster,targetted_team,targetted_roster)
    {
        
        this.assignment_number = assignment_number;
        this.targetting_team = targetting_team;
        this.targetting_roster = targetting_roster;
        this.targetted_team = targetted_team;
        this.targetted_roster = targetted_roster;
    }
}

class in_game_ship_status{
    //This constructor will set a default state based on the pilot sent to it.
    constructor(incoming_pilot, team_name)
    {
        this.upgrades = [];
        this.critical_hit_cards = [];
        this.chosen_pilot = incoming_pilot;
        this.roster_number = 0;
        this.chosen_maneuver = null;
        this.team_name = team_name;
        this.conditions = [];
        this.stress_tokens = 0;
        this.ion_tokens = 0;
        this.weapons_disabled_tokens = 0;
        this.focus_tokens = 0;
        this.jam_tokens = 0;
        this.tractor_beam_tokens = 0;
        this.reinforce_tokens = 0;
        this.cloak_tokens = 0;
        this.evade_tokens = 0;
        this.current_attack = this.chosen_pilot.ship_name.attack;
        this.current_agility = this.chosen_pilot.ship_name.agility;
        this.current_sheilds = this.chosen_pilot.ship_name.shields;
        this.current_hull = this.chosen_pilot.ship_name.hull;
        this.current_pilot_skill = this.chosen_pilot.pilot_skill;
    }
}

class large_one_card_in_game_ship_status extends in_game_ship_status{
        constructor(incoming_pilot,team_name)
        {
            super(incoming_pilot, team_name);
            this.current_energy = incoming_pilot.ship_name.energy;
        }
}

class large_two_card_in_game_ship_status extends in_game_ship_status{
    constructor(incoming_pilot, team_name)
    {
        super(incoming_pilot, team_name);
        this.current_energy = incoming_pilot.ship_name.energy;
        this.current_aft_agility = incoming_pilot.ship_name.aft_agility;
        this.current_aft_shields = incoming_pilot.ship_name.aft_shields;
        this.current_aft_hull = incoming_pilot.ship_name.aft_hull;
        this.aft_showing = false;
    }
}

class team{
    constructor(name)
    {
        this.team_name = name;
        this.has_initiative_token = false;
        this.ship_list = [];
    }
}

//Calculate cost of a single ship. input: ship.
function Calculate_cost_of_ship(to_calculate)
{
    var cost = 0;
    //add cost of pilot.
    cost += to_calculate.chosen_pilot.cost;
    //Add cost of each upgrade.
    to_calculate.upgrades.forEach(upgrade =>{
    cost+= upgrade.cost;
    })
    return cost;
}
//Calculate cost of a team input: team.
function Calculate_cost_of_team(to_calculate)
{
    var cost = 0;
    if(to_calculate.ship_list != undefined && to_calculate.ship_list != null)
    {
        to_calculate.ship_list.forEach(ship =>{
            cost += Calculate_cost_of_ship(ship);
        })
    }
    return cost;
}

//Checks to see if any member of a team has a specific upgrade.
function Does_anyone_on_this_team_have_this_upgrade(to_compare, team)
{
    var upgrade_found = false;
    team.ship_list.forEach(ship_member=>{
        if(Does_this_ship_have_this_upgrade(to_compare,ship_member) == true)
        {            
            upgrade_found = true;
        }
    })
    return upgrade_found;
}
//Checks to see if this function has a specified upgrade.
function Does_this_ship_have_this_upgrade(to_compare, ship)
{
    var upgrade_found = false;
    ship.upgrades.forEach(upgrade=>{
        if(upgrade.name == to_compare.name &&
        upgrade.type == to_compare.type &&
        upgrade.cost == to_compare.cost &&
        upgrade.characteristics == to_compare.characteristics)
        {
            upgrade_found = true;
        }
    })
    return upgrade_found;
}

function get_next_available_target_number(all_locks)
{
    if(all_locks.length == 0)
    {
        return 1;
    }
    all_locks = Array.from(all_locks);
    var numbers = all_locks.map(function(e){return e.assignment_number});
    var chosen_number = undefined;
    var current_number = 1;
    while(chosen_number == undefined)
    {
        if(!numbers.includes(current_number) || current_number > 10000)
        {
            chosen_number = current_number;
        }
        else
        {
            current_number++;
        }
        if(current_number > 10000)
        {
            alert("ERROR: could not determine an assignment number for a target lock.");
        }
    }
    return chosen_number;
}