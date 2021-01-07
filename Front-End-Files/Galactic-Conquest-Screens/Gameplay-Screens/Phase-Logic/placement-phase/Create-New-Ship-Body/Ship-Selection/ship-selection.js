document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../../../../gameplay-screen.html";
  });
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
  var whos_turn =  sessionStorage.getItem("gc_whos_turn");

  function small_ship_click()
  {
    clear_ship_options();

    var ship_ids = [];
    game_data.all_pilots.forEach(pilot=>{
      if(pilot.faction == whos_turn &&
         pilot.ship_name.ship_type == "small" &&
         ship_ids.includes(pilot.ship_name.id)== false)
      {
        ship_ids.push(pilot.ship_name.id);
      }
    })
    display_ships(ship_ids);
  }

  function medium_ship_click()
  {
    clear_ship_options();

    var ship_ids = [];
    game_data.all_pilots.forEach(pilot=>{
      if(pilot.faction == whos_turn &&
         pilot.ship_name.ship_type == "medium" &&
         ship_ids.includes(pilot.ship_name.id)== false)
      {
        ship_ids.push(pilot.ship_name.id);
      }
    })
    display_ships(ship_ids);
  }

  function large_ship_click()
  {
    clear_ship_options();

    var ship_ids = [];
    game_data.all_pilots.forEach(pilot=>{
      if(pilot.faction == whos_turn &&
         (pilot.ship_name.ship_type == "largeTwoCard"||
         pilot.ship_name.ship_type == "largeOneCard") &&
         ship_ids.includes(pilot.ship_name.id)== false)
      {
        ship_ids.push(pilot.ship_name.id);
      }
    })
    display_ships(ship_ids);
  }

  function clear_ship_options()
  {
     var options = document.getElementsByClassName("ship-option");
     for(var i=options.length-1; i >= 0;i--)
     {
       options[i].remove();
     }
  }

  function display_ships(ship_ids)
  {
      var current_index_tab = 3;
      let new_item = undefined;
      game_data.ship_list.forEach(ship=>{
          if(ship_ids.includes(ship.id))
          {
            new_item = document.createElement('li');
            new_item.id = ship.id;
            new_item.className = "list_options ship-option";
            new_item.tabIndex = current_index_tab;
            current_index_tab++;
            new_item.textContent = ship.ship_name;
            new_item.onclick = function(){
              //sessionStorage.setItem("chosenShip",ship.id);//Sending a ship name and faction
              //window.location.href = "";
              alert("click!");
            }
            document.getElementById("ship-box").appendChild(new_item);
          }
      })
  }