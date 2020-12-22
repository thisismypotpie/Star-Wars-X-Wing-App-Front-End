
class ship_group{
    constructor(classification,faction)
    {
        this.classification = classification;
        this.faction = faction;
        this.image = get_correct_image(classification,faction);
        this.fuel = 0;
        this.alloy = 0;
        this.parts = 0;
        this.electronics = 0;
        this.team = [];
    }
}

class gc_team{
    constructor(faction)
    {
        this.faction = faction;
        this.armada = [];
        this.currency = 0;
        this.blueprints = [];
    }
}

class in_game_planet{
    constructor(planet)
    {
        this.controlling_faction= undefined;
        this.planet = planet;
        this.resource = undefined;
    }
}

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