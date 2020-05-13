document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../Selection-Screen/Selection-Screen.html";
  });
  document.getElementById("select-button").addEventListener("click", function(){
    window.location.href = "../Upgrade-Screen/Upgrade-Screen.html";
  });

  let chosen_ship = sessionStorage.getItem("chosenShip");
  console.log(chosen_ship);