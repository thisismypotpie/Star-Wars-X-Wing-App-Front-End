const database = "http://localhost:8080";

var game_data_json = undefined;

fetch(database)
.then(response =>response.JSON())
//.then(data => console.log(data))
.then(data => data = game_data_json);

console.log(game_data_json);