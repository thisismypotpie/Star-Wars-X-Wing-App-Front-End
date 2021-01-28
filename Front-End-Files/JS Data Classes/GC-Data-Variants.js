class ship_group{
    constructor(group_name,faction,location)
    {
        this.group_name = group_name;
        this.faction = faction;
        this.border = get_correct_border(group_name.split(" ")[2]);
        this.team = [];
        this.location = location;
        this.image = undefined;
        if(faction == "Rebels")
        {
            this.image = "https://i.imgur.com/mO0iijb.png";
        }
        else if(faction == "Imperial")
        {
            this.image = "https://i.imgur.com/XgIWtvd.png";
        }
        else
        {
            alert("ERROR: Could not find faction for ship group.")
        }
    }
}

class gc_team{
    constructor(faction)
    {
        this.faction = faction;
        this.navy = [];
        this.currency = 0;
        this.fuel = 0;
        this.durasteel = 0;
        this.parts = 0;
        this.electronics = 0;
        this.tibanna = 0;
        this.list_of_the_fallen= [];
        this.highest_squad_number = 1;
        this.highest_fleet_number = 1;
        this.highest_armada_number = 1;
    }
}

class in_game_planet{
    constructor(planet)
    {
        this.controlling_faction= "Unaligned";
        this.planet = planet;
        this.resource = {
            name: undefined,
            image_path: undefined,
            quantity: 0,
            spawn_chance: 0
        };
    }
}

//If someone adds or loses a ship, change the name accordingly.
function check_if_name_needs_to_be_changed()
{

}

//Creates name of a team based on the newest number of the fleet body.
function create_GC_team_name(first_ship,faction_index)
{
   var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
   var place_suffix = undefined;
   var number_placement = undefined;
   var ship_body_size = undefined;

   //Set the number placement and increment the highest number;
   if(first_ship.ship_type == "small" ||
      first_ship.ship_type == "medium")
   {
    ship_body_size = "Squad";
    number_placement = all_factions[faction_index].highest_squad_number;
    all_factions[faction_index].highest_squad_number++;
   }
   else if(first_ship.ship_type =="largeOneCard")
   {
    ship_body_size = "Fleet";
    number_placement = all_factions[faction_index].highest_fleet_number;
    all_factions[faction_index].highest_fleet_number++;
   }
   else if(first_ship.ship_type =="largeTwoCard")
   {
    ship_body_size = "Armada";
    number_placement = all_factions[faction_index].highest_armada_number;
    all_factions[faction_index].highest_armada_number++;
   }
   else
   {
       alert("ERROR: Unable to determine ship body type.");
       return;
   }

   //Set number place suffix.
   if(number_placement >= 10 &&
      number_placement.toString()[number_placement.toString().length-2]=="1")
   {
         place_suffix ="th"
   }
   else if(number_placement.toString()[number_placement.toString().length-1]=="1")
   {
         place_suffix = "st";
   }
   else if(number_placement.toString()[number_placement.toString().length-1]=="2")
   {
         place_suffix = "nd";
   }
   else if(number_placement.toString()[number_placement.toString().length-1]=="3")
   {
        place_suffix = "rd";
   }
   else
   {
       place_suffix = "th";
   }
   sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
   if(faction_index == 0)
   {
    return number_placement+place_suffix+" Rebel "+ ship_body_size;
   }
   else if(faction_index == 1)
   {
    return number_placement+place_suffix+" Imperial "+ship_body_size;
   }
   else
   {
       alert("ERROR: Could not compile team name!")
       return;
   }
}

//Removes a team name is the player goes back and does not create a new team.
function remove_newly_created_team_name(team_name,faction_index)
{
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
    var split_name = team_name.split(" ");
    if(split_name[2] == "Squad")
    {
        all_factions[faction_index].highest_squad_number--;
        if(all_factions[faction_index].highest_squad_number <=0)
        {
            all_factions[faction_index].highest_squad_number = 1;
        }
    }
    else if(split_name[2] == "Fleet")
    {
        all_factions[faction_index].highest_fleet_number--;
        if(all_factions[faction_index].highest_fleet_number <=0)
        {
            all_factions[faction_index].highest_fleet_number = 1;
        }
    }
    else if(split_name[2] == "Armada")
    {
        all_factions[faction_index].highest_armada_number--;
        if(all_factions[faction_index].highest_armada_number <=0)
        {
            all_factions[faction_index].highest_armada_number = 1;
        }
    }
    else
    {
        alert("ERROR: Could not remove team name.");
    }
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
}

//Finds correct image of which faction and fleet size is put in. 
function get_correct_border(classification)
{

        if(classification == "Squad")
        {
            return "2px solid lime";
        }
        else if(classification == "Fleet")
        {
            return "2px solid red";
        }
        else if(classification == "Armada")
        {
            return "2px solid yellow";
        }
        else
        {
            alert("Error: unkown classification: "+classification)
        }
}