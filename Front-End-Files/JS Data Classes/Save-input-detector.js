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
      document.body.appendChild(container);

      //Create title
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