//I did not add a list of upgrade types. I will be attempting to make the upgrades loose based instead of rule enforced.
class pilot{
    constructor(pilot_skill, pilot_card_path, pilot_name, cost, ship_of_pilot, pilot_faction, is_unique)
    {
        this.pilot_skill = pilot_skill;
        this.pilot_card_path = pilot_card_path;
        this.pilot_name = pilot_name;
        this.cost = cost;
        this.ship_of_pilot = ship_of_pilot;
        this.pilot_faction = pilot_faction;
        this.is_unique = is_unique;
    }
}