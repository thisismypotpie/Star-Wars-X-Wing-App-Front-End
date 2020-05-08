
//Requires
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
const ship_page = require('./Ship-Variants.js');
const maneuver_page = require('./Maneuvers.js');
const pilot_page = require('./Pilot-Variants');
const card_page = require('./card-Variants');

//Data
let ship_list = []; //list of all ships.
let all_maneuvers = [];//list of all possible maneuvers.
let all_pilots = [];//list of all pilots.
let all_conditions = [];//list of all conditions.
let all_crit_cards = [];//list of all critical hit cards.
let all_upgrades = [];//list of all critical hit cards.

//confirm that the database exists or exit out of the db queries.
var dbExists = fs.existsSync('../GameDB.db');
if(dbExists)
{
//open the database connection
 let db = new sqlite3.Database('../GameDB.db', sqlite3,(err)=>{
    if(err != null)
    {
        console.log(err);    
        return;  
    }
 });
 console.log("Connection Established");

 //Get all maneuvers and place them in all_maneuvers in the data section.
 db.all("SELECT * FROM ManeuverTable", function(err, tables){
      tables.forEach(element => {
        all_maneuvers.push(new maneuver_page.Maneuver(element.ID,element.Maneuver,element.Color,element.Range, element.RangePath, element.ManeuverPath));
      })
 })

//Ship query will go through each entry and populate a list of all ships.
db.all("SELECT * FROM ShipTable", function(err, tables){
tables.forEach(element => {
var maneuvers_for_this_ship = [];//A list of maneuvers for this ship, starts empty but maneuvers belonging to this ship will be added.

//get maneuver numbers and split each number.
let maneuver_array = element.Manuevers.split('*');

//Go through all of the maneuvers and add any that are a part of this ship to maneuvers_for_this_ship.
maneuver_array.forEach(maneuver_id_of_ship =>{
  all_maneuvers.forEach(maneuvers_from_entire_list =>{
    if(maneuver_id_of_ship == maneuvers_from_entire_list.id)
    {
      maneuvers_for_this_ship.push(maneuvers_from_entire_list);
    }
  })
})
//Add everything from database and maneuver list to create a new ship.
ship_list.push(new ship_page.ship(element.ShipType, element.Name, element.Attack, element.Agility, element.Shields, element.Hull,maneuvers_for_this_ship));
});
});

//Get all small/medium sized ship pilots.
db.all("SELECT * FROM PilotTable", function(err, tables){
tables.forEach(element =>{

  //Determine if the pilot is unique or not.
  var unique_pilot = false;
  if(element.unique_pilot == 1)
  {
    unique_pilot = true;
  }
  else
  {
    unique_pilot = false;
  }
  all_pilots.push(new pilot_page.pilot(element.Name, element.Faction, element.PilotSkill, element.Cost,element.UpgradeTypes.split('*'),element.ShipName, element.ImagePath,unique_pilot));
})
})

//Get all Condtion cards
db.all("SELECT * FROM ConditionsTable", function(err, tables){
tables.forEach(element =>{
  all_conditions.push(new card_page.condition(element.Name, element.ImagePath));

})
})

//Get all critical hit cards
db.all("SELECT * FROM CriticalHitTable", function(err, tables){
  tables.forEach(element => {
    all_crit_cards.push(new card_page.criticalHitCard(element.Name, element.ImagePath));
  })
})

//Get all upgrade cards
db.all("SELECT * FROM UpgradesTable", function(err, tables){
  tables.forEach(element => {
    all_upgrades.push(new card_page.UpgradeCard(element.Name, element.Type, element.Cost, element.Characteristics, element.ImagePath));    
  })
})

//load all data on large ships.
db.all("SELECT * FROM LargeShipTable", function(err, tables){
  tables.forEach(element =>{
    var maneuvers_for_this_ship = [];//A list of maneuvers for this ship, starts empty but maneuvers belonging to this ship will be added.
    var fore_crit_cards = [];
    var aft_crit_cards = [];
    var upgrade_types = [];
    //get maneuver numbers and split each number.
    let maneuver_array = element.Maneuvers.split('*');

    //Go through all of the maneuvers and add any that are a part of this ship to maneuvers_for_this_ship.
    maneuver_array.forEach(maneuver_id_of_ship =>{
  all_maneuvers.forEach(maneuvers_from_entire_list =>{
    if(maneuver_id_of_ship == maneuvers_from_entire_list.id)
    {
      maneuvers_for_this_ship.push(maneuvers_from_entire_list);
    }
  })
})

    //Get the aft and fore critical hit cards for each ship.
    var foreList = element.FrontCritImages.split('\n');
    var aftList = element.RearCritImages.split('\n');
    foreList.forEach(element => {
      var card_elements = element.split('*');
      fore_crit_cards.push(new card_page.criticalHitCard(card_elements[1], card_elements[0]));
    })
    aftList.forEach(element => {
      var card_elements = element.split('*');
      aft_crit_cards.push(new card_page.criticalHitCard(card_elements[1], card_elements[0]));
    })


    if(element.LargeShipType == "largeTwoCard")
    {
      ship_list.push(new ship_page.Large_Ship_Two_Cards(element.LargeShipType,element.Name,element.Attack,0,element.ForeShields, 
        element.ForeHull, maneuvers_for_this_ship, element.Energy,0,element.AftHull, element.AftShields,element.CrippledAttack,
        element.CrippledEnergy, fore_crit_cards, aft_crit_cards));
        all_pilots.push(new pilot_page.largeShipTwoCardPilot(element.Name+" Pilot", element.Faction,element.PilotSkill, element.Cost, 
        element.UpgradeTypes.split('*'), element.Name,element.ForeImage,false, element.AftImage, element.CrippledForeImage, element.CrippledAftImage));
        console.log(all_pilots[all_pilots.length-1]);
      }
    else if(element.LargeShipType == "largeOneCard")
    {
        ship_list.push(new ship_page.Large_Ship_One_Card(element.LargeShipType,element.Name,0,0,element.ForeShields, 
        element.ForeHull, maneuvers_for_this_ship, element.Energy, fore_crit_cards, aft_crit_cards));
        all_pilots.push(new pilot_page.pilot(element.Name+" Pilot", element.Faction,element.PilotSkill, element.Cost, element.UpgradeTypes.split('*'), element.Name,element.ForeImage,false));
    }
    else
    {
      console.log("Could not determine the ship type of ship: "+ element.Name);
    }
  })
})

 // close the database connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
  });

}
else
{
    console.log("Cannot find GameDB.db");
}

