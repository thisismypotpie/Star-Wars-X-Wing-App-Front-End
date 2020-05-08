
//Requires
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
const ship_page = require('./Ship-Variants.js');
const maneuver_page = require('./Maneuvers.js');

//Data
let ship_list = []; //list of all ships.
let all_maneuvers = [];//list of all possible maneuvers.

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
});//foreach loop
});//ship query

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

