  //Get data to show correct cards.
  var upgrade_type = sessionStorage.getItem("upgrade-type-chosen");
  var game_data= JSON.parse(sessionStorage.getItem("game_data"));
  let selected_upgrades = [];
  var grid_container = document.getElementById("grid-container");
  let ship_in_progress = JSON.parse(sessionStorage.getItem("ship_in_progress"));

  //Get the list of upgrades of the correct upgrade type.
  game_data.all_upgrades.forEach(upgrade => {
      if(upgrade.type == upgrade_type)
      {
        selected_upgrades.push(upgrade);
      }
  });
  selected_upgrades.forEach(upgrade =>{
    var characteristics = [];
    if(upgrade.characteristics != null)//Get characteristics to see if any of them are unique or limited.
    {
      characteristics = upgrade.characteristics.split('*');
    }
    if(characteristics.includes("Limited") || characteristics.includes("Unique"))//Check all unique upgrades and remove if someone else has them.
    {
       if(Does_this_ship_have_this_upgrade(upgrade,ship_in_progress)== true)
       {
         console.log("Removing: "+upgrade.name);
          selected_upgrades.splice(selected_upgrades.indexOf(upgrade),1);//Remove any limited upgrade as soon as the user has selected it.
       }
    }
  })
/*

 MAKE SURE TO COME BACK HERE AND PUT UP SOME CODE FOR TAKING AWAY UNIQUE UPGRADES THAT ARE BEING USED!

*/

 
  //Make a div for each upgrade.
 selected_upgrades.forEach(upgrade =>
 {
    let new_upgrade_slot = document.createElement("div");
    new_upgrade_slot.className = "grid-item";
    new_upgrade_slot.id = upgrade.name;
    new_upgrade_slot.addEventListener("click",function(){
      upgrade_item_click(new_upgrade_slot.id);
    })
    //This if statement is to deal with upgrades that are dual sided.
    if(upgrade.characteristics != null && upgrade.characteristics.includes("Dual"))
    {
      //Add style and append the first side of the dual upgrade.
      let image_paths = upgrade.image_path.split('\n');
      new_upgrade_slot.style.border = "3px solid red";
      new_upgrade_slot.style.backgroundImage="url("+image_paths[0]+")";
      grid_container.appendChild(new_upgrade_slot);

      //Add style and append the reverse side of the dual upgrade.
      let reverse_side = document.createElement("div");
      reverse_side.className = "grid-item";
      reverse_side.id = upgrade.name;
      reverse_side.style.border = "3px solid red";
      reverse_side.style.backgroundImage="url("+image_paths[1]+")";
      reverse_side.addEventListener("click",function(){
        upgrade_item_click(reverse_side.id);
      })
      grid_container.appendChild(reverse_side);
    }
    else
    {
      new_upgrade_slot.style.backgroundImage= "url("+upgrade.image_path+")";
      grid_container.appendChild(new_upgrade_slot);
    }
 });

 //Add back button
    let back_button = document.createElement("button");
    back_button.innerHTML = "Back";
    back_button.className = "grid-item button back";
    back_button.style.border = "none";
    back_button.addEventListener("click", function(){
    sessionStorage.removeItem("upgrade-type-chosen");
    window.location.href = "../Upgrade-Type-Selection-Screen/Upgrade-Type-Selection-Screen.html";
    });
    grid_container.appendChild(back_button);

  document.getElementById("grid-container").style.gridTemplateColumns="repeat(6,calc(100%/6))";  

  //I made a function here because the same click code is being used twice when a dual upgrade is being displayed. I wanted to make sure I did not copy the code twice.
  function upgrade_item_click(id)
  {
      //Loop through selected upgrades and find the one with the right name, then push that to the ship in progress upgrades.
      console.log(id);
      selected_upgrades.forEach(upgrade =>{
        if(upgrade.name == id)
        {
          ship_in_progress.upgrades.push(upgrade);
        }
      })
      sessionStorage.setItem("ship_in_progress",JSON.stringify(ship_in_progress));
      window.location.href = "../Upgrade-Screen.html";
  }