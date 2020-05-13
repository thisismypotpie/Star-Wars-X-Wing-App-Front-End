document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  console.log(game_data.all_pilots);


  let faction_options = document.getElementsByClassName("faction-option");
  let ship_size_options = document.getElementsByClassName("ship-size-option");
  let ship_box = document.getElementById("ship-box-list");
  
//When we add ships, this will keep track of what index number to give each li added to the ship list.
  let current_index_tab = 6;
//These will be for determining the correct ship the user has chosen.
  let chosenFactionElement = undefined;
  let chosenShipElement = undefined;

  //loop through each options in the faction box and then gives them a click listener
//to have the ship size options show up after being clicked in the color of the element
//that was clicked. I needed to use a traditional for loop since the elements are considered
// an HTMLCollection rather than an array and therefore have no foreach statement.
for(var i =0; i < faction_options.length;i++)
{
  //I needed to add this here because when in an event, the element itself come out as undefined so I needed to tie the element to a variable.
  let FactionElementSet = faction_options[i];
  faction_options[i].addEventListener("click",function(){
    for(var j =0; j < ship_size_options.length;j++)
    {
      //I needed to add this here because when in an event, the element itself come out as undefined so I needed to tie the element to a variable.
      let ShipElementSet = ship_size_options[j];//This needed to be added because for some reason, the array index iteself would be undefined for some
      ShipElementSet.style.visibility = "visible";
      //Add focus event to the ship size box to get the correct colors for the selected items.
      ship_size_options[j].addEventListener("focus",function(){
        //Remove old list items from ship box if there are any.
        while (ship_box.lastElementChild) {
          ship_box.removeChild(ship_box.lastElementChild);
        }
        //When I click from individual ship back to the ship size, the old color stays so I added this to make sure that the color is reset before a new color is added.
        if(chosenShipElement != undefined)
        {
          chosenShipElement.style.backgroundColor = "";
        }
        chosenShipElement = ShipElementSet;
        if(chosenFactionElement.id == "imperial")
        {
          ShipElementSet.style.backgroundColor = "darkgray";
          chosenFactionElement.style.backgroundColor = "darkgray";
        }
        else if(chosenFactionElement.id == "rebels")
        {
          ShipElementSet.style.backgroundColor = "maroon";
          chosenFactionElement.style.backgroundColor ="maroon";
        }
        else if(chosenFactionElement.id == "scum")
        {
          ShipElementSet.style.backgroundColor = "saddlebrown";
          chosenFactionElement.style.backgroundColor ="saddlebrown";
        }
        else
        {
          console.log("none");
        }
        //When the user clicks on a ship size, then the ship options will show up.
        ShipElementSet.addEventListener("click",function(){
                  //Remove old list items from ship box if there are any.
          while (ship_box.lastElementChild) {
            ship_box.removeChild(ship_box.lastElementChild);
          }
          current_index_tab = 6;//reset tab index.
          let display_names = getShipsToDisplay();
          //get the name of each ship to display and then add them to the list of ships to choose from.
          display_names.forEach(name =>{
            var new_item = document.createElement('li');
            new_item.id = name;
            new_item.className = "list_options ship-option";
            new_item.tabIndex = current_index_tab;
            current_index_tab++;
            new_item.textContent = name;
            //When a ship item is clicked, move to the next form.
            new_item.addEventListener("dblclick",function(){
              window.location.href = "../Pilot-Screen/Pilot-Screen.html";
              sessionStorage.setItem("chosenShip",[new_item.id,chosenFactionElement.id]);
            })
            new_item.addEventListener("focus",function(){
              if(chosenFactionElement.id == "imperial")
              {
                ShipElementSet.style.backgroundColor = "darkgray";
                chosenFactionElement.style.backgroundColor = "darkgray";
                new_item.style.backgroundColor = "darkgray";
              }
              else if(chosenFactionElement.id == "rebels")
              {
                ShipElementSet.style.backgroundColor = "maroon";
                chosenFactionElement.style.backgroundColor ="maroon";
                new_item.style.backgroundColor = "maroon";
              }
              else if(chosenFactionElement.id == "scum")
              {
                ShipElementSet.style.backgroundColor = "saddlebrown";
                chosenFactionElement.style.backgroundColor ="saddlebrown";
                new_item.style.backgroundColor = "saddlebrown";
              }
              else
              {
                console.log("none");
              }  
            });
            new_item.addEventListener("blur", function(){
              new_item.style.backgroundColor="";
            });
            ship_box.appendChild(new_item);
          });
        })
      });
      //Add blur event to the ship size box.
        ship_size_options[j].addEventListener('blur', (event) => {
        ShipElementSet.style.backgroundColor = "";
      });

    }
  })
  //Add focus event color background change to each item in faction box.
  faction_options[i].addEventListener("focus", function(){ //I needed to add focus and blur events here befcause in the css page, blur is automatic and I do not want that default. 
        
        //When I click from ship to change faction, the color stays to the old color on the ship size selection so I added this if statement to reset the background color.
        if(chosenShipElement!= undefined)
        {
          chosenShipElement.style.backgroundColor = "";
        }
        chosenFactionElement = FactionElementSet;
        chosenShipElement = undefined;//Added this to make sure that there is not selected ship size of the player wants to change factions.
               //Remove old list items from ship box if there are any.
        while (ship_box.lastElementChild) {
          ship_box.removeChild(ship_box.lastElementChild);
        }
       //When you click back from a ship to a faction, I want to reset all of the background colors so the old selection color is taken away.
        for(var p = 0; p < faction_options.length;p++)
        {
            faction_options[p].style.backgroundColor = "";
        }
        if(FactionElementSet.id == "imperial")
        {
          FactionElementSet.style.backgroundColor = "darkgray";
        }
        else if(FactionElementSet.id == "rebels")
        {
          FactionElementSet.style.backgroundColor = "maroon";
        }
        else if(FactionElementSet.id == "scum")
        {
          FactionElementSet.style.backgroundColor = "saddlebrown";
        }
        else
        {
          console.log("none");
        }
  });
  faction_options[i].addEventListener("blur", function(){
        FactionElementSet.style.backgroundColor = ""; 
  });
}

//When the user clicks on the ship size, this function will determine which ships will be displayed.
function getShipsToDisplay()
{
    var faction = chosenFactionElement.id;
    var ship_size = chosenShipElement.id;
    var pilots = game_data.all_pilots;
    var display_list = [];

    var count = 0;
    pilots.forEach(pilot => {
          console.log("count: "+count);
          //These are the criteria for small and medium ship to add to the list of ships to display.
          if(pilot.faction.toLowerCase() == faction.toLowerCase() && 
             pilot.ship_name.ship_type.toLowerCase() == ship_size.toLowerCase() &&
             !display_list.includes(pilot.ship_name.ship_name))
             {
                display_list.push(pilot.ship_name.ship_name);
             }
          //These are the criteria for large ships to add to the display list.
          if(pilot.faction.toLowerCase() == faction.toLowerCase() && 
          pilot.ship_name.ship_type.toLowerCase().includes(ship_size.toLowerCase()) &&
          !display_list.includes(pilot.ship_name.ship_name))
            {
              display_list.push(pilot.ship_name.ship_name);
            }
             count++;
    });
    return display_list;
}