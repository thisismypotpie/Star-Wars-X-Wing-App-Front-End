class Maneuver{
    constructor(maneuver_type, maneuver_color, range, maneuver_symbol_path){
        this.maneuver_type  = maneuver_type;
        this.maneuver_color = maneuver_color;
        this.range = range;
        this.maneuver_symbol_path = maneuver_symbol_path;
    }
}

class Large_Maneuver extends Maneuver{
    constructor(maneuver_type, maneuver_color, range, maneuver_symbol_path, energy_symbol_path, energy_gained){
        super(maneuver_type, maneuver_color, range, maneuver_symbol_path);
        this.energy_symbol_path = energy_symbol_path;
        this.energy_gained = energy_gained;
    }

}