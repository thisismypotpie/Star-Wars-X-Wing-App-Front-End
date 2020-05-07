var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
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

db.all("SELECT * FROM ShipTable", function(err, tables){
console.log(tables);
});

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
