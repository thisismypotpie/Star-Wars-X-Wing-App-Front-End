class ship_group{
    constructor(group_name,faction,location)
    {
        this.group_name = group_name;
        this.faction = faction;
        this.border = get_correct_border(group_name.split(" ")[2],faction);
        this.team = new team(group_name);
        this.location = location;
        this.image = undefined;
        this.has_moved = false;
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
        this.image = undefined;
        if(faction == "Rebels")
        {
            this.image = "url(https://i.imgur.com/mO0iijb.png)";
        }
        else if(faction == "Imperial")
        {
            this.image = "url(https://i.imgur.com/XgIWtvd.png)";
        }
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

function check_if_name_needs_to_be_downgraded(team_name)
{
    let team_type = team_name.split(' ')[2];
    let team_faction = team_name.split(' ')[1];
    var team_index = undefined;
    let input_faction = undefined;
    if(team_faction == "Rebel")
    {
        team_index = 0;
        input_faction = "Rebels";
    }
    else if(team_faction == "Imperial")
    {
        team_index = 1;
        input_faction = "Imperial";
    }
    else
    {
        alert("ERROR: Cannot determine faction from name alter in gc-variatnes.js");
    }
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
    for(var i=0;i<all_factions[team_index].navy.length;i++)
    {
        if(all_factions[team_index].navy[i].group_name == team_name)
        {
            //Get largest ship.
            var largest_ship_size = undefined;
            var largest_ship = undefined;
            all_factions[team_index].navy[i].team.ship_list.forEach(ship=>{
                if(largest_ship_size == undefined)
                {
                    largest_ship_size = ship.chosen_pilot.ship_name.ship_type;
                    largest_ship = ship;
                }
                else if(largest_ship_size == "small" &&(
                    ship.chosen_pilot.ship_name.ship_type == "medium"||
                    ship.chosen_pilot.ship_name.ship_type == "largeOneCard"||
                    ship.chosen_pilot.ship_name.ship_type == "largeTwoCard"))
                {
                    largest_ship_size = ship.chosen_pilot.ship_name.ship_type;
                    largest_ship = ship;
                }
                else if(largest_ship_size == "medium" &&(
                    ship.chosen_pilot.ship_name.ship_type == "largeOneCard"||
                    ship.chosen_pilot.ship_name.ship_type == "largeTwoCard"))
                {
                    largest_ship_size = ship.chosen_pilot.ship_name.ship_type;
                    largest_ship = ship;
                }
                else if(largest_ship_size == "largeOneCard" &&
                ship.chosen_pilot.ship_name.ship_type == "largeTwoCard")
                {
                    largest_ship_size = ship.chosen_pilot.ship_name.ship_type;
                    largest_ship = ship;
                }
            })
            if(team_type == "Armada")
            {
                if(largest_ship_size =="largeOneCard")
                {
                    let new_name = create_GC_team_name(largest_ship.chosen_pilot.ship_name,team_index);
                    all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
                    all_factions[team_index].navy[i].group_name = new_name;
                    all_factions[team_index].navy[i].team.team_name = new_name;
                    all_factions[team_index].navy[i].team.ship_list.forEach(ship=>{
                        ship.team_name = new_name;
                    })
                    alert(team_name+" has been reformed as the "+new_name);
                    all_factions[team_index].navy[i].border = get_correct_border("Fleet",input_faction);
                    sessionStorage.setItem("team_name",new_name);
                }
                else if(largest_ship_size =="medium" || largest_ship_size =="small")
                {
                    let new_name = create_GC_team_name(largest_ship.chosen_pilot.ship_name,team_index);
                    all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
                    all_factions[team_index].navy[i].group_name = new_name;
                    all_factions[team_index].navy[i].team.team_name = new_name;
                    all_factions[team_index].navy[i].team.ship_list.forEach(ship=>{
                        ship.team_name = new_name;
                    })
                    alert(team_name+" has been reformed as the "+new_name);
                    all_factions[team_index].navy[i].border = get_correct_border("Squad",input_faction);
                    sessionStorage.setItem("team_name",new_name);
                }
            }
            else if(team_type == "Fleet")
            {
                if(largest_ship_size =="medium" || largest_ship_size =="small")
                {
                    let new_name = create_GC_team_name(largest_ship.chosen_pilot.ship_name,team_index);
                    all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
                    all_factions[team_index].navy[i].group_name = new_name;
                    all_factions[team_index].navy[i].team.team_name = new_name;
                    all_factions[team_index].navy[i].team.ship_list.forEach(ship=>{
                        ship.team_name = new_name;
                    })
                    alert(team_name+" has been reformed as the "+new_name);
                    all_factions[team_index].navy[i].border = get_correct_border("Squad",input_faction);
                    sessionStorage.setItem("team_name",new_name);

                }
            }
            else if(team_type == "Squad")
            {
                //This is here just to prevent an error.
            }
            else
            {
                alert("ERROR: Could not determine ship group type in downgrading ship name.");
            }
            sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
            break;
        }
    }

}

//If someone adds or loses a ship, change the name accordingly.
function check_if_name_needs_to_be_upgraded(ship_in_progress,team_name)
{
    let team_type = team_name.split(' ')[2];
    let team_faction = team_name.split(' ')[1];
    var team_index = undefined;
    let input_faction;
    if(team_faction == "Rebel")
    {
        team_index = 0;
        input_faction = "Rebels";
    }
    else if(team_faction == "Imperial")
    {
        team_index = 1;
        input_faction = "Imperial";
    }
    else
    {
        alert("ERROR: Cannot determine faction from name alter in gc-variatnes.js");
    }
    let new_name = create_GC_team_name(ship_in_progress.chosen_pilot.ship_name,team_index);
    let all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
    if(new_name.split(" ")[2] == "Armada")
    {
        if(team_type == "Fleet" || team_type == "Squad")
        {
            //change name to new name.
            for(var i=0; i < all_factions[team_index].navy.length;i++)
            {
                if(all_factions[team_index].navy[i].group_name == team_name)
                {
                    all_factions[team_index].navy[i].group_name = new_name;
                    all_factions[team_index].navy[i].team.team_name = new_name;
                    all_factions[team_index].navy[i].team.ship_list.forEach(ship=>{
                        ship.team_name = new_name;
                    })
                    alert(team_name+" has been reformed as the "+new_name);
                    all_factions[team_index].navy[i].border = get_correct_border("Armada",input_faction);
                    sessionStorage.setItem("team_name",new_name);
                    break;
                }
            }
        }
        else
        {
            all_factions[team_index].highest_armada_number--;
        }
    }
    else if(new_name.split(" ")[2] == "Fleet")
    {
        if(team_type == "Squad")
        {
            //change name to new name.
            for(var i=0; i < all_factions[team_index].navy.length;i++)
            {
                if(all_factions[team_index].navy[i].group_name == team_name)
                {
                    all_factions[team_index].navy[i].group_name = new_name;
                    all_factions[team_index].navy[i].team.ship_list.forEach(ship=>{
                        ship.team_name = new_name;
                    })
                    alert(team_name+" has been reformed as the "+new_name);
                    all_factions[team_index].navy[i].border = get_correct_border("Fleet",input_faction);
                    sessionStorage.setItem("team_name",new_name);
                    break;
                }
            }
        }
        else
        {
            all_factions[team_index].highest_fleet_number--;
        }
    }
    else if(new_name.split(" ")[2] == "Squad")
    {
        all_factions[team_index].highest_squad_number--;
    }
    else
    {
        alert("ERROR: Can't determine ship body size: "+new_name);
    }
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
}

//Creates name of a team based on the newest number of the fleet body.
function create_GC_team_name(first_ship,faction_index)
{
   var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..
   var place_suffix = undefined;
   var number_placement = undefined;
   var ship_body_size = undefined;
   var full_name = undefined;

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
     full_name = number_placement+place_suffix+" Rebel "+ ship_body_size;
   }
   else if(faction_index == 1)
   {
     full_name = number_placement+place_suffix+" Imperial "+ship_body_size;
   }
   else
   {
       alert("ERROR: Could not compile team name!")
       return;
   }
   if(check_if_name_already_taken(full_name) == false)
   {
     return full_name;
   }
   else
   {
       return create_GC_team_name(first_ship,faction_index);
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

function check_if_name_already_taken(name)
{
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire..

    for(var i = 0; i< all_factions.length;i++)
    {
        for(var j = 0; j<all_factions[i].navy.length;j++)
        {
            if(name == all_factions[i].navy[j].group_name)
            {
                return true;
                break;
            }
        }
    }
    return false;
}

//Finds correct image of which faction and fleet size is put in. 
function get_correct_border(classification,faction)
{
    if(faction == "Rebels")
    {
        if(classification == "Squad")
        {
            return "2px solid lime";
        }
        else if(classification == "Fleet")
        {
            return "2px solid #ffa64d";
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
    else if(faction == "Imperial")
    {
        if(classification == "Squad")
        {
            return "2px solid #b3b3cc";
        }
        else if(classification == "Fleet")
        {
            return "2px solid red";
        }
        else if(classification == "Armada")
        {
            //#c44dff
            return "2px solid #b31aff";
        }
        else
        {
            alert("Error: unkown classification: "+classification)
        }
    }
    else
    {
        alert("Could not determine faction for border.")
    }
}

function get_team_indecies_based_on_name()
{
  var all_factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
  var team_name = sessionStorage.getItem("team_name");
  var chosen_team = undefined;
  let break_loop = false;
  for(var i=0; i<all_factions.length;i++)
  {
    for(var j=0; j<all_factions[i].navy.length;j++)
    {
      if(all_factions[i].navy[j].group_name == team_name)
      {
        chosen_team = [i,j];
        break_loop = true;
        break;
      }
    }
    if(break_loop == true)
    {
      break;
    }
  }
  if(chosen_team == undefined)
  {
    alert("ERROR: Could not find ship team info.");
  }
  return chosen_team;
}

function set_resource_quantities(whos_turn)
{
    let factions = JSON.parse(sessionStorage.getItem("gc_factions"));
        //Set up main title based on which faction the player chose.
        if(whos_turn == "Rebels")
        {
            document.getElementById("money-quantity-label").textContent = "X"+factions[0].currency;
            document.getElementById("tibanna-quantity-label").textContent = "X"+factions[0].tibanna;
            document.getElementById("electronics-quantity-label").textContent = "X"+factions[0].electronics;
            document.getElementById("durasteel-quantity-label").textContent = "X"+factions[0].durasteel;
            document.getElementById("fuel-quantity-label").textContent = "X"+factions[0].fuel;
            document.getElementById("parts-quantity-label").textContent = "X"+factions[0].parts;
    
        }
        else if(whos_turn == "Imperial")
        {
            document.getElementById("money-quantity-label").textContent = "X"+factions[1].currency;
            document.getElementById("tibanna-quantity-label").textContent = "X"+factions[1].tibanna;
            document.getElementById("electronics-quantity-label").textContent = "X"+factions[1].electronics;
            document.getElementById("durasteel-quantity-label").textContent = "X"+factions[1].durasteel;
            document.getElementById("fuel-quantity-label").textContent = "X"+factions[1].fuel;
            document.getElementById("parts-quantity-label").textContent = "X"+factions[1].parts;
        }
        else
        {
            alert("Unknown faction chosen, please go back and re-create setup.");
        }
}

//Used for read-only purposes, if you are attempting to change gc factions, do not use this.
function get_team_based_on_name(name)
{
    var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));
    var chosen_team = undefined;
    for(var j=0; j < all_factions.length;j++)
    {
        for(var i=0; i < all_factions[j].navy.length;i++)
        {
            if(all_factions[j].navy[i].group_name == name)
            {
                chosen_team = all_factions[j].navy[i];
                break;
            }
        }
    }
    if(chosen_team == undefined)
    {
        alert("ERROR: Cannot find team name.");
    }
    return chosen_team;
}