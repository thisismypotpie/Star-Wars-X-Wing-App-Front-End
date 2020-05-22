document.getElementById("back-button").addEventListener("click",function(){
    sessionStorage.removeItem("chose_team_name");
    window.location.href="../../Team-Screen.html";
})