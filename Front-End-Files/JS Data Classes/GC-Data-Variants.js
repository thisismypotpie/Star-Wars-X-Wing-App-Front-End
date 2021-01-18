class ship_group{
    constructor(classification,faction)
    {
        this.classification = classification;
        this.faction = faction;
        this.image = get_correct_image(classification,faction);
        this.team = [];
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
function create_GC_team_name(first_ship)
{

}

//Removes a team name is the player goes back and does not create a new team.
function remove_newly_created_team_name(team_name)
{

}

//Finds correct image of which faction and fleet size is put in. 
function get_correct_image(classification,faction)
{
    if(faction == "Rebels")
    {
        if(classification == "Squadron")
        {
            return "https://i.imgur.com/Vj0bAfw.png";
        }
        else if(classification == "Fleet")
        {
            return "https://i.imgur.com/358dy56.png";
        }
        else if(classification == "Armada")
        {
            return "https://i.imgur.com/QAncG2F.png";
        }
        else
        {
            alert("Error: unkown classification: "+classification)
        }
    }
    else if(faction == "Imperial")
    {
        if(classification == "Squadron")
        {
            return "https://i.imgur.com/QA6rw2i.png";
        }
        else if(classification == "Fleet")
        {
            return "https://i.imgur.com/uxiOfHR.png";
        }
        else if(classification == "Armada")
        {
            return "https://i.imgur.com/hDZF300.jpg";
        }
        else
        {
            alert("Error: unkown classification: "+classification)
        }e
    }
    else
    {
        alert("Error: unknown faction: "+faction);
    }
}