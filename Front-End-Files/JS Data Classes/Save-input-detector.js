document.addEventListener("keydown", function(event){ //press s to save game.
    if (!(event.which == 115))
    {
        //Create overlay dynamically.
        if(document.getElementById('overlay')==null || document.getElementById('overlay')==undefined)
        {
            create_overlay_dynamically();
        }
            let overlay = document.getElementById("overlay");
            overlay.style.opacity = 1;
            overlay.style.pointerEvents = "all";
        //bring up save game form.
        if(document.getElementById('save_game_pop_up')==null || document.getElementById('save_game_pop_up')==undefined)
        {
            create_save_game_form_dynamically();
        }
            document.getElementById('save_game_pop_up').style.visibility = "visible";
    };
  });


  function create_save_game_form_dynamically()
  {
      //Create main container.
      let container = document.createElement("div");
      container.id = "save_game_pop_up";
      container.style.position = "fixed";
      container.style.top = "50%";
      container.style.left = "50%";
      container.style.transform = "translate(-50%,-50%)";
      container.style.border = "5px solid white";
      container.style.zIndex= "100";
      container.style.background = "url('https://i.imgur.com/nIM4P1r.jpg')";
      container.style.width = "40%";
      container.style.visibility = "hidden";
      container.style.textAlign = "center";
      container.style.display = "grid";
      container.style.gridTemplateColumns="repeat(12,calc(100%/12))";
      container.style.gridTemplateRows= "repeat(12,calc(60vh/12))";
      document.body.appendChild(container);

      //Create title
      let title = document.createElement("div");
      title.id = "pop-up-title";
      title.textContent = "Choose a Name to Save Your Game Under:";
      title.style.gridColumn = "1/13";
      title.style.gridRow = "1";
      title.style.color = "white";
      title.style.fontFamily="Impact, Charcoal, sans-serif";
      title.style.textAlign = "center";
      title.style.fontSize = "4vw";
      container.appendChild(title);

      //Create back button
      let back_button = document.createElement("button");
      back_button.textContent = "Back";
      back_button.style.gridColumn = "2/6";
      back_button.style.gridRow = "8/12";
      back_button.style.backgroundImage = " url('https://i.imgur.com/RkyE0Xv.png')";
      back_button.style.backgroundColor = "transparent";
      back_button.style.backgroundRepeat ="no-repeat";
      back_button.style.backgroundSize = "100% 100%";
      back_button.style.fontFamily="Impact, Charcoal, sans-serif";
      back_button.style.fontSize = "large";
      back_button.style.border = "none";
      back_button.onclick = function(){close_pop_up();};
      container.appendChild(back_button);

     //Create Save Button
     let save_button = document.createElement("button")
     save_button.textContent = "Save";
     save_button.style.gridColumn = "8/12";
     save_button.style.gridRow = "8/12";
     save_button.style.backgroundImage = " url('https://i.imgur.com/RkyE0Xv.png')";
     save_button.style.backgroundColor = "transparent";
     save_button.style.backgroundRepeat ="no-repeat";
     save_button.style.backgroundSize = "100% 100%";
     save_button.style.fontFamily="Impact, Charcoal, sans-serif";
     save_button.style.fontSize = "large";
     save_button.style.border = "none";
     save_button.onclick = function(){validate_save_name()};
     container.appendChild(save_button);

     //Create text input:
     let text_input = document.createElement("input");
     text_input.id = "save_game_input";
     text_input.type = "text";
     text_input.style.gridColumn = "2/12";
     text_input.style.gridRow = "6/8";
     text_input.style.fontFamily="Impact, Charcoal, sans-serif";
     text_input.style.fontSize = "large";
     text_input.style.backgroundColor = "black";
     text_input.style.color = "white";
     text_input.style.fontSize = "x-large";
     text_input.style.textAlign = "center";
     container.appendChild(text_input);
  }

  function create_overlay_dynamically()
  {
    let overlay = document.createElement("div");
    overlay.id  = "overlay";
    overlay.style.position = "fixed";
    overlay.style.opacity = "0";
    overlay.style.top = "0";
    overlay.style.right = "0";
    overlay.style.left = "0";
    overlay.style.bottom = "0";
    overlay.style.backgroundColor = "rgba(0,0,0,.5)";
    overlay.pointerEvents = "none";
    document.body.appendChild(overlay);
  }

  function validate_save_name()
  {
      if(document.getElementById('save_game_input').value == "")
      {
          alert("You must enter a save name.");
          return;
      }
       var url = "http://localhost:3000/get_game_names";
       var potential_name = document.getElementById('save_game_input').value;
       var game_names = [];
       fetch(url)
.catch(function(error) {
  console.log(error);
  alert("Something went wrong trying to get saved game names. "+error)
})
.then(response =>response.json())
.then(data => game_names = data)
.then(()=>{
            var viable_name = true;
            game_names.forEach(name=>{
                if(name == potential_name)
                {
                    viable_name = false;
                    var overwrite = confirm("A game by that name already exists, would you like to overwrite it?");
                    if(overwrite == true)
                    {
                        if(sessionStorage.getItem("all_teams") == null || sessionStorage.getItem("all_teams") == undefined ||
                         JSON.parse(sessionStorage.getItem("all_teams")).length == 0)
                        {
                            alert("There is no data to save.");
                            return;
                        }
                        //overwrite game.
                        var url = "http://localhost:3000/overwrite_game";
                        var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
                        all_teams.push({save_game_name:document.getElementById('save_game_input').value,save_game_phase:get_game_phase()});//Put name of game and game phase into the request.
                        fetch(url,{
                            method: 'POST',
                            body:JSON.stringify(all_teams)
                        })
                    }
                    else
                    {
                        document.getElementById('save_game_input').value = "";
                    }
                }
            })
            if(viable_name == true)
            {
                if(sessionStorage.getItem("all_teams") == null || sessionStorage.getItem("all_teams") == undefined ||
                JSON.parse(sessionStorage.getItem("all_teams")).length == 0)
               {
                   alert("There is no data to save.");
                   return;
               }
                //save game.
                var url = "http://localhost:3000/save_game";
                //Add name to all teams.
                var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
                all_teams.push({save_game_name:document.getElementById('save_game_input').value,save_game_phase:get_game_phase()});
                fetch(url,{
                    method: 'POST',
                    body:JSON.stringify(all_teams)
                })
            }
})
.then(()=>console.log("game is saved."))
}

  function close_pop_up()
  {
    let overlay = document.getElementById("overlay");
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";  
    document.getElementById("save_game_input").value = ""; 
    document.getElementById('save_game_pop_up').style.visibility = "hidden";

  }


  function get_game_phase()
  {
      return "In-Game";
  }