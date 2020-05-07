
//Requires
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var ship = require('./Ship-Variants.js');
var maneuver = require('./Maneuvers.js');

//Data
let ship_list = [];
let maneuver_holder = [];


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

//Ship query
db.all("SELECT * FROM ShipTable", function(err, tables){
console.log(tables[0]);
tables.forEach(element => {
let maneuver_array = element.Manuevers.split('\n');
console.log(maneuver_array);

//ship_list.push(new ship(element.ShipType, element.Name, element.Attack, element.Agility, element.Shields, element.Hull, ));

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
