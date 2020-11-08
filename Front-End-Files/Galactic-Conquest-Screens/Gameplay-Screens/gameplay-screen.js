  var saved_x_coordinate_for_map_return = 3000;
  var saved_y_coordinate_for_map_return = 2500;
  var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
  var active_planets = undefined;
  
  //get a list of all active planets.
  get_active_planets();

  //grid-click system.
  var coordinates = [];
  for(var x=1; x < 101;x++)
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
         grid_coordinate.onmouseenter = function(e){document.getElementById(e.target.id).style.border = "1px solid red";};
         grid_coordinate.onmouseleave = function(e){document.getElementById(e.target.id).style.border = "none";};
         document.getElementById('grid-container').appendChild(grid_coordinate);
     }
  }

var rejected_ids = [];

//Load planets onto galaxy map.
  load_planets();
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
          }
      })
  }

  setTimeout(() => {
    window.focus();
    window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
}, 200); 

  function map_button_click()
  {
      saved_x_coordinate_for_map_return = window.pageXOffset;
      saved_y_coordinate_for_map_return = window.pageYOffset;
      document.body.style.backgroundSize = "100% 98vh";
      window.scrollTo(0,0);
      document.getElementById("grid-container").style.gridTemplateColumns = "repeat(100,calc(100%/100))";
      document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(98vh/100))";
      document.getElementById("map-button").onclick = function(){exit_map();};
  } 

  function exit_map()
  {
    document.body.style.backgroundSize = "500% 800vh";
    window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(100,calc(500%/100))";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(800vh/100))";
    document.getElementById("map-button").onclick = function(){map_button_click()};
    setTimeout(() => {
        window.focus();
        window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
    }, 200); 
  }

  function get_active_planets()
  {
     
  }

