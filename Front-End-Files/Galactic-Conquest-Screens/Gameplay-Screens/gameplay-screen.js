  var saved_x_coordinate_for_map_return = document.body.scrollHeight/2;
  var saved_y_coordinate_for_map_return = document.body.scrollHeight/2;
  var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
  var active_planets = [];
  var border_color_place_holder;

  //grid-click system.
  var coordinates = [];
  for(var x=1; x < 201;x++)
  {
     for(var y=1; y<101;y++)
     {
         coordinates.push({x: x,y:y});
         var grid_coordinate = document.createElement("div");
         grid_coordinate.id = x+"_"+y;
         grid_coordinate.setAttribute("x",x.toString());
         grid_coordinate.setAttribute("y",y.toString());
         grid_coordinate.style.gridColumn = (x).toString();
         grid_coordinate.style.gridRow = (y).toString();
         grid_coordinate.style.backgroundSize = "100%  100%";
         grid_coordinate.style.backgroundRepeat = "no-repeat";
         grid_coordinate.onmouseenter = function(e){border_color_place_holder = document.getElementById(e.target.id).style.border;document.getElementById(e.target.id).style.border = "1px solid green";};
         grid_coordinate.onmouseleave = function(e){document.getElementById(e.target.id).style.border = border_color_place_holder;};
         document.getElementById('grid-container').appendChild(grid_coordinate);
     }
  }

var rejected_ids = [];

//Load planets onto galaxy map.
  load_planets();

//highlight controlled planets.
highlight_planets();

//Scroll to correct area.
  setTimeout(() => {
    window.focus();
    window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
}, 200); 

function load_planets()
{
    var game_data = JSON.parse(sessionStorage.getItem("game_data"));
    game_data.all_planets.forEach(planet=>{
        if(planet.x_coordinate !=null && planet.y_coordinate !=null)
        {
            var id = planet.x_coordinate+"_"+planet.y_coordinate;
            document.getElementById(id).style.backgroundImage = "url('"+planet.image_path+"')";
            document.getElementById(id).setAttribute("Planet",JSON.stringify(planet));
            document.getElementById(id).onclick = function(){alert(planet.name)};
            active_planets.push(new in_game_planet(planet));
        }
    })
}


  function zoom_button_click()
  {
      saved_x_coordinate_for_map_return = window.pageXOffset;
      saved_y_coordinate_for_map_return = window.pageYOffset;
      document.body.style.backgroundSize = "200% 196vh";
      window.scrollTo((document.body.scrollHeight/2),(document.body.scrollHeight/2));
      document.getElementById("grid-container").style.gridTemplateColumns = "repeat(100,calc(200%/100))";
      document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(196vh/100))";
      //document.getElementById("main-title").style.visibility = "hidden";
      document.getElementById("zoom-button").textContent = "Zoom In"
      document.getElementById("zoom-button").onclick = function(){exit_zoom();};
  } 

  function exit_zoom()
  {
    document.body.style.backgroundSize = "500% 800vh";
    window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(100,calc(500%/100))";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(800vh/100))";
    document.getElementById("zoom-button").onclick = function(){zoom_button_click()};
    document.getElementById("zoom-button").textContent = "Zoom Out"
    //document.getElementById("main-title").style.visibility = "visible";
    setTimeout(() => {
        window.focus();
        window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
    }, 200); 
  }

  function highlight_planets()
  {
      active_planets.forEach(planet=>{
        var id = planet.planet.x_coordinate+"_"+planet.planet.y_coordinate;
        if(planet.controlling_faction == "Rebels")
        {
          document.getElementById(id).style.border = "3px solid red";
        }
        else if(planet.controlling_faction == "Imperial")
        {
          document.getElementById(id).style.border = "3px solid black";
        }
        else
        {
          document.getElementById(id).style.border ="none";
        }
      })
  }

