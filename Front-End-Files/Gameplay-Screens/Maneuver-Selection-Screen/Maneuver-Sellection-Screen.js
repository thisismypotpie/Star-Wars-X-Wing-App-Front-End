//Get data needed for this page.
var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
var selected_ship_index = 0;
var maneuver_index = 0;

//Grab element needed to manipulate.
var pilot_image = document.getElementById("pilot-image");
var roster_number_label = document.getElementById("roster-text");
var pilot_skill_label = document.getElementById("pilot-skill-text");
var attack_label = document.getElementById("attack-text");
var agility_label = document.getElementById("agility-text");
var hull_label = document.getElementById("hull-text");
var shield_label = document.getElementById("shield-text");
var energy_label = document.getElementById("energy-text");
var maneuver_range_label = document.getElementById("maneuver-range");
var maneuver_type_label = document.getElementById("maneuver-type");

//Set the first pilot to select maneuver of  the first team.
pilot_image.style.backgroundImage = "url("+all_teams[0].ship_list[selected_ship_index].chosen_pilot.image_path+")";
roster_number_label.innerText = all_teams[0].ship_list[selected_ship_index].roster_number;
pilot_skill_label.innerText = all_teams[0].ship_list[selected_ship_index].current_pilot_skill;
attack_label.innerText = all_teams[0].ship_list[selected_ship_index].current_attack;
agility_label.innerText = all_teams[0].ship_list[selected_ship_index].current_agility;
hull_label.innerText = all_teams[0].ship_list[selected_ship_index].current_hull;
shield_label.innerText = all_teams[0].ship_list[selected_ship_index].current_sheilds;
energy_label.innerText = all_teams[0].ship_list[selected_ship_index].current_energy;
maneuver_range_label.style.backgroundImage = "url("+all_teams[0].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].range_symbol_path+")";
maneuver_type_label.style.backgroundImage = "url("+all_teams[0].ship_list[selected_ship_index].chosen_pilot.ship_name.maneuvers[maneuver_index].maneuver_symbol_path+")";