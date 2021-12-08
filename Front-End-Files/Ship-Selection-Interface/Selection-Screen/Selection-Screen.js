/**
 Ship Selection Interface
 */


/**
 This section will be for universal variables that are used no matter which path is being invoked.
 */
 var game_data= JSON.parse(sessionStorage.getItem("game_data"));
 var selection_options = {
  faction_options: document.getElementsByClassName("faction-option"),
  ship_size_options: document.getElementsByClassName("ship-size-option"),
  ship_box: document.getElementById("ship-box-list"),
  current_index_tab: 6,
  chosenFactionElement: undefined,
  chosenShipElement: undefined
}
//This function will prepare any session storage data before moving to the next page.
function determine_page_exit_after_ship_selection(chosenShip)
{
  if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team")
  {
    sessionStorage.setItem("chosenShip",chosenShip);//Sending a ship id and faction
  }
  else if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team")
  {

  }
  else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team")
  {

  }
  else if(sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
  {

  }
  else
  {
     alert("ERROR: Unable to determine ship selection path.")
  }
  window.location.href = "../Pilot-Screen/Pilot-Screen.html";
}

function determine_page_exit_after_back_button_press()
{
  if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team" ||
     sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team")
  {
    sessionStorage.removeItem("chosen_team_name");
    sessionStorage.removeItem("Upgrade-Page-Path");
    window.location.href = "../../Freeplay-Screens/Team-Screen/Team-Screen.html";
  }
  else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team")
  {
      sessionStorage.removeItem("placement_id");
      sessionStorage.removeItem("new_team_name");
      sessionStorage.removeItem("Upgrade-Page-Path");
      window.location.href = "../../gameplay-screen.html";
  }
  else if(sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
  {
    sessionStorage.removeItem("team_indecies");
    sessionStorage.removeItem("Upgrade-Page-Path");
    window.location.href = "../../team-view.html";
  }
  else
  {
    alert("Unable to determine which ship selection path was chosen.");
  }
}
//When the user clicks on the ship size, this function will determine which ships will be displayed.
function getShipsToDisplay()
{
  var faction = selection_options.chosenFactionElement.id;
  var ship_size = selection_options.chosenShipElement.id;
  var pilots = game_data.all_pilots;
  var display_list = [];
  var added_ship = [];

  var count = 0;
  pilots.forEach(pilot => {
        console.log("count: "+count);
        //These are the criteria for small and medium ship to add to the list of ships to display.
        if(pilot.faction.toLowerCase() == faction.toLowerCase() && 
           pilot.ship_name.ship_type.toLowerCase().includes(ship_size.toLowerCase()) &&
           !added_ship.includes(pilot.ship_name.ship_name))
           {
              display_list.push([pilot.ship_name.ship_name, pilot.ship_name.id]);
              added_ship.push(pilot.ship_name.ship_name);
           }
           count++;
  });
  return display_list;
}
 /**
  This section is reserved for function that mulitple paths use.
  */
 function ship_click(selection_options, ShipElementSet)
 {
//Remove old list items from ship box if there are any.
clear_ship_options();
selection_options.current_index_tab = 6;//reset tab index.
let display_names = getShipsToDisplay();
//get the name of each ship to display and then add them to the list of ships to choose from.
display_names.forEach(name =>{
var new_item = document.createElement('li');
new_item.id = name[1];
new_item.className = "list_options ship-option";
new_item.tabIndex = selection_options.current_index_tab;
selection_options.current_index_tab++;
new_item.textContent = name[0];
//When a ship item is clicked, move to the next form.
new_item.addEventListener("click",function(){
var chosenShip = [new_item.id,selection_options.chosenFactionElement.id]
determine_page_exit_after_ship_selection(chosenShip);
});
new_item.addEventListener("focus",function(){
if(selection_options.chosenFactionElement.id == "imperial")
{
  ShipElementSet.style.backgroundColor = "darkgray";
  selection_options.chosenFactionElement.style.backgroundColor = "darkgray";
  new_item.style.backgroundColor = "darkgray";
}
else if(selection_options.chosenFactionElement.id == "rebels")
{
  ShipElementSet.style.backgroundColor = "maroon";
  selection_options.chosenFactionElement.style.backgroundColor ="maroon";
  new_item.style.backgroundColor = "maroon";
}
else if(selection_options.chosenFactionElement.id == "scum")
{
  ShipElementSet.style.backgroundColor = "saddlebrown";
  selection_options.chosenFactionElement.style.backgroundColor ="saddlebrown";
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
selection_options.ship_box.appendChild(new_item);
});
 }
  function ship_size_click(selection_options, ShipElementSet)
  {
      //Remove old list items from ship box if there are any.
      clear_ship_options();

      //When I click from individual ship back to the ship size, the old color stays so I added this to make sure that the color is reset before a new color is added.
      if(selection_options.chosenShipElement != undefined)
      {
        selection_options.chosenShipElement.style.backgroundColor = "";
      }
      selection_options.chosenShipElement = ShipElementSet;
      if(selection_options.chosenFactionElement.id == "imperial")
      {
        ShipElementSet.style.backgroundColor = "darkgray";
        selection_options.chosenFactionElement.style.backgroundColor = "darkgray";
      }
      else if(selection_options.chosenFactionElement.id == "rebels")
      {
        ShipElementSet.style.backgroundColor = "maroon";
        selection_options.chosenFactionElement.style.backgroundColor ="maroon";
      }
      else if(selection_options.chosenFactionElement.id == "scum")
      {
        ShipElementSet.style.backgroundColor = "saddlebrown";
        selection_options.chosenFactionElement.style.backgroundColor ="saddlebrown";
      }
      else
      {
        console.log("none");
      }
      //When the user clicks on a ship size, then the ship options will show up.
      ShipElementSet.addEventListener("click",()=>ship_click(selection_options, ShipElementSet));
}
function faction_click(selection_options)
{
    for(var j =0; j < selection_options.ship_size_options.length;j++)
    {
      //I needed to add this here because when in an event, the element itself come out as undefined so I needed to tie the element to a variable.
      let ShipElementSet = selection_options.ship_size_options[j];//This needed to be added because for some reason, the array index iteself would be undefined for some
      ShipElementSet.style.visibility = "visible";
      //Add focus event to the ship size box to get the correct colors for the selected items.
      selection_options.ship_size_options[j].addEventListener("focus",function(){ship_size_click(selection_options,ShipElementSet)});
      //Add blur event to the ship size box.
      selection_options.ship_size_options[j].addEventListener('blur', (event) => {
        ShipElementSet.style.backgroundColor = "";
      });
  
    }
}

function focus_faction_option(selection_options, FactionElementSet)
{
  //I needed to add focus and blur events here befcause in the css page, blur is automatic and I do not want that default. 
        
    //When I click from ship to change faction, the color stays to the old color on the ship size selection so I added this if statement to reset the background color.
    if(selection_options.chosenShipElement!= undefined)
    {
      selection_options.chosenShipElement.style.backgroundColor = "";
    }
    selection_options.chosenFactionElement = FactionElementSet;
    selection_options.chosenShipElement = undefined;//Added this to make sure that there is not selected ship size of the player wants to change factions.
           //Remove old list items from ship box if there are any.
    while (selection_options.ship_box.lastElementChild) {
      selection_options.ship_box.removeChild(selection_options.ship_box.lastElementChild);
    }
   //When you click back from a ship to a faction, I want to reset all of the background colors so the old selection color is taken away.
    for(var p = 0; p < selection_options.faction_options.length;p++)
    {
      selection_options.faction_options[p].style.backgroundColor = "";
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
}
function small_ship_click()
{
  clear_ship_options();

  var ship_ids = [];
  game_data.all_pilots.forEach(pilot=>{
    if(pilot.faction == whos_turn.faction &&
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
    if(pilot.faction == whos_turn.faction &&
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
    if(pilot.faction == whos_turn.faction &&
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
    var new_current_index_tab = 3;
    let new_item = undefined;
    game_data.ship_list.forEach(ship=>{
        if(ship_ids.includes(ship.id))
        {
          new_item = document.createElement('li');
          new_item.id = ship.id;
          new_item.className = "list_options ship-option";
          new_item.tabIndex = new_current_index_tab;
          new_current_index_tab++;
          new_item.textContent = ship.ship_name;
          new_item.onclick = ()=>determine_page_exit_after_ship_selection();
          document.getElementById("ship-box").appendChild(new_item);
        }
    })
}




/**
 This section will be for each instance that uses the upgrade screen and configure it according to which page is using it.
 */
 if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-New Team")
 {

  
  //When we add ships, this will keep track of what index number to give each li added to the ship list.
  //These will be for determining the correct ship the user has chosen.

  
  //loop through each options in the faction box and then gives them a click listener
  //to have the ship size options show up after being clicked in the color of the element
  //that was clicked. I needed to use a traditional for loop since the elements are considered
  // an HTMLCollection rather than an array and therefore have no foreach statement.
  for(var i =0; i < selection_options.faction_options.length;i++)
  {
  //I needed to add this here because when in an event, the element itself come out as undefined so I needed to tie the element to a variable.
  let FactionElementSet = selection_options.faction_options[i];
  selection_options.faction_options[i].addEventListener("click",()=>faction_click(selection_options));
  //Add focus event color background change to each item in faction box.
  selection_options.faction_options[i].addEventListener("focus", ()=>focus_faction_option(selection_options, FactionElementSet));
  selection_options.faction_options[i].addEventListener("blur", function(){
        FactionElementSet.style.backgroundColor = ""; 
  });
  }
 }
 else if(sessionStorage.getItem("Ship-Page-Path") == "Freeplay-Existing Team")
 {
  //When we add ships, this will keep track of what index number to give each li added to the ship list.
  //These will be for determining the correct ship the user has chosen.

  
  //loop through each options in the faction box and then gives them a click listener
  //to have the ship size options show up after being clicked in the color of the element
  //that was clicked. I needed to use a traditional for loop since the elements are considered
  // an HTMLCollection rather than an array and therefore have no foreach statement.
  for(var i =0; i < selection_options.faction_options.length;i++)
  {
  //I needed to add this here because when in an event, the element itself come out as undefined so I needed to tie the element to a variable.
  let FactionElementSet = selection_options.faction_options[i];
  selection_options.faction_options[i].addEventListener("click",()=>faction_click(selection_options));
  //Add focus event color background change to each item in faction box.
  selection_options.faction_options[i].addEventListener("focus", ()=>focus_faction_option(selection_options));
  selection_options.faction_options[i].addEventListener("blur", function(){
        FactionElementSet.style.backgroundColor = ""; 
  });
  }
 }
 else if(sessionStorage.getItem("Ship-Page-Path") =="GC- New Team")
 {
 /**
 GC - Create New Team
 */
var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
var whos_turn =  sessionStorage.getItem("gc_whos_turn");
var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire.
if(whos_turn == "Rebels")
{
  whos_turn = all_factions[0];
}
else if(whos_turn == "Imperial")
{
  whos_turn = all_factions[1];
}
else
{
  alert("Unkown who's turn it is.")
}

//Set resource quantities.
set_resource_quantities(whos_turn.faction);

 }
 else if(sessionStorage.getItem("Ship-Page-Path") =="GC- Existing Team")
 {
/**
 GC- Add Ship to Existing Team
 */
var game_data= JSON.parse(sessionStorage.getItem("game_data"));
var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
var whos_turn =  sessionStorage.getItem("gc_whos_turn");
var all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire.
if(whos_turn == "Rebels")
{
  whos_turn = all_factions[0];
}
else if(whos_turn == "Imperial")
{
  whos_turn = all_factions[1];
}
else
{
  alert("Unkown who's turn it is.")
}

//Set resource quantities.
set_resource_quantities(whos_turn.faction);

 }
 else //An error in case we cannot identify which path is being used.
 {
 
 }

 /**
  This section is for key bindings for this page.
  */
 //Key bindings for this screen.
document.onkeyup = function(e) {
  if(e.keyCode == 27)//escape key.
  {
    back_button_push();
  }
}

