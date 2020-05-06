var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var dbExists = fs.existsSync('./GameDB');
if(dbExists)
{
/*let db = new sqlite3.Database('./GameDB', (err)=> {
    if(err) {
        console.log("Not able to connect to database.");
    }
    else
    {
        console.log("Connection established");
    }
});*/
 let db = new sqlite3.Database('./GameDB', sqlite3.OPEN_READONLY);
 db.serialize(function(){
     db.all("SELECT * FROM ShipTable", function(err, allRows){

        if(err != null){
            console.log("There was an error retrieving ship data.");
        }
     })
 }
 
 )
}
