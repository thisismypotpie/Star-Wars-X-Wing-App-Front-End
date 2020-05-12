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
          //Remmove all children from the ship box by removing each last child until there are none left.
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
        chosenFactionElement = FactionElementSet;
        chosenShipElement = undefined;//Added this to make sure that there is not selected ship size of the player wants to change factions.
       
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


    pilots.forEach(pilot => {
          if(pilot.faction.toLowerCase() == faction.toLowerCase() && 
             pilot.ship_name.ship_type.toLowerCase() == ship_size.toLowerCase() &&
             !display_list.includes(pilot.ship_name))
             {
                display_list.push(pilot.ship_of_pilot.ship_name);
             }
    });
    return display_list;
}