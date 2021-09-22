document.addEventListener("keydown", function(event){ //press s to save game.
    if (event.keyCode == 192)//this is tilde key)
    {
        if(sessionStorage.getItem("searching")!= null || sessionStorage.getItem("searching")!= undefined)
        {
            alert("You cannot save your game while you are doing a search, exit search to save.");
            return;
        }
        bring_up_save_form();
    };
  });

  function bring_up_save_form()
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
            document.getElementById('save_game_input').focus();
            setTimeout(() => {
                document.getElementById('save_game_input').value = "";
            },25);//This timeout is here because otherwise there will be a "`" key pressed into the value and I was not able to find another way to delete it without a timeout.
  }


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
     save_button.id = "save-button";
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
      var error_encountered = false;
    document.getElementById('save-button').onclick = null;
      if(document.getElementById('save_game_input').value == "")
      {
          alert("You must enter a save name.");
          document.getElementById('save-button').onclick = function(){validate_save_name()};
          return;
      }
      if(document.getElementById('save_game_input').value.includes("\'"))//If this symbol makes it into sql, it messes up the queries.
      {
          alert("Testing aposterphe.")
          var name_in_question = document.getElementById('save_game_input').value;
          name_in_question = name_in_question.replace(/'/g, '');
          alert("New name: "+name_in_question);
          document.getElementById('save_game_input').value = name_in_question;
      }
       var url = "http://localhost:3000/get_game_names";//"https://star-wars-x-wing-back-end.herokuapp.com/get_game_names";
       var potential_name = document.getElementById('save_game_input').value;
       potential_name = potential_name.replace(/\s+/g, '');
       potential_name = potential_name.toLowerCase();
       potential_name = JSON.stringify(potential_name);
       potential_name = potential_name.replace(/['"]+/g, '');
       var game_names = [];
       fetch(url)
.catch(function(error) {
  console.log(error);
  alert("Something went wrong trying to get saved game names. "+error)
  return;
})
.then(response =>response.json())
.then(data => game_names = data)
.then(()=>{
            //stringify each return string and potential name. This is to make the comparison usable when seeing if the name is in either db.
            for(var i=0; i < game_names.reg_game_names.length;i++)
            {
                game_names.reg_game_names[i] = JSON.stringify(game_names.reg_game_names[i]);
                game_names.reg_game_names[i] = game_names.reg_game_names[i].replace(/['"]+/g, '');

            }
            for(var i=0; i < game_names.gc_game_names.length;i++)
            {
                game_names.gc_game_names[i] = JSON.stringify(game_names.gc_game_names[i]);
                game_names.gc_game_names[i] = game_names.gc_game_names[i].replace(/['"]+/g, '');
            }

            var viable_name = true;
            if(sessionStorage.getItem("gc_setup_data")!=null)//Check to see if a gc name is already taken as a regular game.
            {
                if(game_names.reg_game_names.includes(potential_name) &&  //If the game name you entered is in the regular game db and not in the gc database.
                    !game_names.gc_game_names.includes(potential_name))
                {
                    viable_name = false;
                    alert("The name "+potential_name+" is unavailable. Please choose another name.");
                    document.getElementById("save_game_input").value = "";
                    return;
                }
                else if((game_names.reg_game_names.includes(potential_name) && //Name has been found in both DB's and could be overwritten.
                        game_names.gc_game_names.includes(potential_name)) || 
                      ((!game_names.reg_game_names.includes(potential_name) && //Name has been found in both DB's and could be overwritten.
                        game_names.gc_game_names.includes(potential_name))))
                {
                    viable_name = false;
                    var overwrite = confirm("A galactic conquest campaign by that name already exists, would you like to overwrite it?");
                    if(overwrite == true)
                    {
                        var url = "http://localhost:3000/overwrite_game_gc";//"https://star-wars-x-wing-back-end.herokuapp.com/overwrite_game";
                        var gc_save_data= {
                            setup_data: JSON.parse(sessionStorage.getItem("gc_setup_data")),
                            faction_data: JSON.parse(sessionStorage.getItem("gc_factions")),
                            phase: sessionStorage.getItem("gc_phase"),
                            whos_turn: sessionStorage.getItem("gc_whos_turn"),
                            first_or_second_half_of_round: undefined,
                            game_name: potential_name,
                            combat_data: undefined
                        }
                        if(gc_save_data.phase =="placement")
                        {
                            gc_save_data.first_or_second_half_of_round = sessionStorage.getItem("gc_first_or_second_half_of_round");
                        }
                        if(sessionStorage.getItem("all_target_locks")!=null)//Add combat data if you are in the middle of a game.
                        {
                            gc_save_data.combat_data = {
                                reminders: JSON.parse(sessionStorage.getItem("all_reminders")),
                                save_game_name: potential_name,
                                save_game_phase: get_game_phase(),
                                target_locks: JSON.parse(sessionStorage.getItem("all_target_locks")),
                                combatting_teams: JSON.parse(sessionStorage.getItem("all_teams"))
                            }
                        }
                        fetch(url,{
                            method: 'POST',
                            body:JSON.stringify(gc_save_data)
                        })
                        .catch(error=>{
                            console.log(error)
                            alert("Something went wrong trying to overwrite the game. "+error);
                            error_encountered = true;
                            close_pop_up();
                            //return;
                        })
                        .then(()=>{
                            if(error_encountered == false)
                            {
                                alert("Game has been saved!");
                            }
                            else
                            {
                                error_encountered = false;
                            }
                            close_pop_up()
                        })
                    }
                    else
                    {
                        alert("Game not saved!");
                        document.getElementById("save_game_input").value = "";
                    }
                }
            }
            else //Check to see if name is in the regular game db.
            {
                if(game_names.reg_game_names.includes(potential_name))
                {
                    viable_name = false;
                    var overwrite = confirm("A game by that name already exists, would you like to overwrite it?");
                    if(overwrite == true)
                    {
                        if((sessionStorage.getItem("all_teams") == null || sessionStorage.getItem("all_teams") == undefined ||
                         JSON.parse(sessionStorage.getItem("all_teams")).length == 0))//dont save if freeplay and no teams created.
                        {
                            alert("There is no data to save.");
                            close_pop_up()
                            //return;
                        }
                        else//overwrite freeplay game.
                        {
                            var url = "http://localhost:3000/overwrite_game";//"https://star-wars-x-wing-back-end.herokuapp.com/overwrite_game";
                            var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
                            all_teams.push({save_game_name:potential_name,save_game_phase:get_game_phase(),target_locks:JSON.parse(sessionStorage.getItem("all_target_locks")),reminders:JSON.parse(sessionStorage.getItem("all_reminders"))});//Put name of game and game phase into the request.
                            fetch(url,{
                                method: 'POST',
                                body:JSON.stringify(all_teams)
                            })
                            .catch(error=>{
                                console.log(error)
                                alert("Something went wrong trying to overwrite the game. "+error);
                                error_encountered = true;
                                close_pop_up();
                                err
                                //return;
                            })
                            .then(()=>{
                            if(error_encountered == false)
                            {
                                alert("Game has been saved!");
                            }   
                            else
                            {
                                error_encountered = false;
                            } 
                                close_pop_up()
                            })
                        }
                    }
                    else
                    {
                        document.getElementById('save_game_input').value = "";
                    }
                }
            }
            if(viable_name == true)
            {
                //save game.
                if(sessionStorage.getItem("gc_setup_data")!=null)//save gc game.
                {
                    var url = "http://localhost:3000/save_game_gc";//"https://star-wars-x-wing-back-end.herokuapp.com/save_game_gc";
                    var gc_save_data= {
                        setup_data: JSON.parse(sessionStorage.getItem("gc_setup_data")),
                        faction_data: JSON.parse(sessionStorage.getItem("gc_factions")),
                        phase: sessionStorage.getItem("gc_phase"),
                        whos_turn: sessionStorage.getItem("gc_whos_turn"),
                        first_or_second_half_of_round: undefined,
                        game_name: potential_name,
                        combat_data: undefined
                    }
                    if(gc_save_data.phase =="placement")//Add which half the round it is if you are in the placement phase.
                    {
                        gc_save_data.first_or_second_half_of_round = sessionStorage.getItem("gc_first_or_second_half_of_round");
                    }
                    if(sessionStorage.getItem("all_target_locks")!=null)//Add combat data if you are in the middle of a game.
                    {
                        gc_save_data.combat_data = {
                            reminders: JSON.parse(sessionStorage.getItem("all_reminders")),
                            save_game_name: potential_name,
                            save_game_phase: get_game_phase(),
                            target_locks: JSON.parse(sessionStorage.getItem("all_target_locks")),
                            combatting_teams: JSON.parse(sessionStorage.getItem("all_teams"))
                        }
                    }
                    fetch(url,{
                        method: 'POST',
                        body:JSON.stringify(gc_save_data)
                    })
                    .catch(error=>{
                        console.log(error)
                        alert("Something went wrong trying to overwrite the game. "+error);
                        close_pop_up();
                    })
                    .then(()=>{                            
                        if(error_encountered == false)
                        {
                            alert("Game has been saved!");
                        }   
                        else
                        {
                            error_encountered = false;
                        } 
                            close_pop_up()
                        })
                }

                else//save regular game.
                {
                    if(sessionStorage.getItem("all_teams") == null || sessionStorage.getItem("all_teams") == undefined ||
                    JSON.parse(sessionStorage.getItem("all_teams")).length == 0)
                   {
                       alert("There is no data to save.");
                       close_pop_up();
                       //return;
                   }
                    var url = "http://localhost:3000/save_game";//"https://star-wars-x-wing-back-end.herokuapp.com/save_game";
                                    //Add name to all teams.
                    var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
                    all_teams.push({save_game_name:potential_name,save_game_phase:get_game_phase(),target_locks:JSON.parse(sessionStorage.getItem("all_target_locks")),reminders:JSON.parse(sessionStorage.getItem("all_reminders"))});
                    fetch(url,{
                        method: 'POST',
                        body:JSON.stringify(all_teams)
                    })
                    .catch(error=>{
                        console.log(error)
                        alert("Something went wrong trying to overwrite the game. "+error);
                        close_pop_up();
                    })
                    .then(()=>{                            if(error_encountered == false)
                        {
                            alert("Game has been saved!");
                        }   
                        else
                        {
                            error_encountered = false;
                        } 
                            close_pop_up()
                        })
               }

            }
})
.then(()=>{document.getElementById('save-button').onclick = function(){validate_save_name()}})
}

  function close_pop_up()
  {
    let overlay = document.getElementById("overlay");
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = "none";  
    document.getElementById("save_game_input").value = ""; 
    document.getElementById('save_game_pop_up').style.visibility = "hidden";
    document.getElementById('save_game_input').textContent = "";
  }


  function get_game_phase()
  {
      if(sessionStorage.getItem('phase') &&
         sessionStorage.getItem('movement_attack_index'))
         {
            if(sessionStorage.getItem('phase') == "movement")
            {
                return {phase:"movement", movement_attack_index: sessionStorage.getItem('movement_attack_index')}
            }
            else if(sessionStorage.getItem('phase') == 'attack')
            {
                return {phase:"attack",movement_attack_index: sessionStorage.getItem('movement_attack_index')}
            }
            else
            {
                alert("ERROR: cannot determine game phase, defaulting to squad building.")
            }
         }
         else if(sessionStorage.getItem('team_index') &&
         sessionStorage.getItem('selected_ship_index'))
         {
            return{phase:"maneuver-selection", team_index: sessionStorage.getItem('team_index'), ship_index: sessionStorage.getItem('selected_ship_index')};
         }
        return {phase:"squad-building"};
  }