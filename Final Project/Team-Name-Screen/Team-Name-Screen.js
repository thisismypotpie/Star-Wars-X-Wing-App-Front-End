document.getElementById("new-game-button").addEventListener("click", function(){
    window.location.href = "../Team-Screen/Team-Screen.html";
  });

  const database = "http://localhost:8080";

fetch(database)
.then(response =>response.blob())
.then(data => console.log(data));