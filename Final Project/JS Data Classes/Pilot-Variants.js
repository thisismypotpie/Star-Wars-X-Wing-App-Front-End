class pilot{
    constructor(pilot_name, faction, pilot_skill, cost, upgrade_types, ship_name, image_path, uniquePilot)
    {
        this.pilot_name = pilot_name;
        this.faction = faction;
        this.pilot_skill = pilot_skill;
        this.cost = cost;
        this.upgrade_types = upgrade_types;
        this.ship_name = ship_name;
        this.image_path = image_path;
    }
    
}
module.exports.pilot = pilot;