/*document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Upgrade-Type-Selection-Screen/Upgrade-Type-Selection-Screen.html";
  });*/

  //Get data to show correct cards.
  var upgrade_type = sessionStorage.getItem("upgrade-type-chosen");
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  let selected_upgrades = [];
  var grid_container = document.getElementById("grid-container");

  //Get the list of upgrades of the correct upgrade type.
  game_data.all_upgrades.forEach(upgrade => {
      if(upgrade.type == upgrade_type)
      {
        selected_upgrades.push(upgrade);
      }
  });
  console.log(selected_upgrades);
 
  //Make a div for each upgrade.
 selected_upgrades.forEach(upgrade =>
 {
    let new_upgrade_slot = document.createElement("div");
    new_upgrade_slot.className = "grid-item";
    new_upgrade_slot.style.backgroundImage= "url("+upgrade.image_path+")";
    grid_container.appendChild(new_upgrade_slot);
 });

 //Add back button
    let back_button = document.createElement("button");
    back_button.innerHTML = "Back";
    back_button.className = "grid-item button back";
    back_button.style.border = "none";
    back_button.addEventListener("click", function(){
    window.location.href = "../Upgrade-Type-Selection-Screen/Upgrade-Type-Selection-Screen.html";
    });
    grid_container.appendChild(back_button);

  document.getElementById("grid-container").style.gridTemplateColumns="repeat(6,calc(100%/6))";  