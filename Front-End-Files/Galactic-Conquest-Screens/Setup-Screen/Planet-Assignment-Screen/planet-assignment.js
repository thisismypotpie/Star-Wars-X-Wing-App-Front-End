var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
var game_data = JSON.parse(sessionStorage.getItem("game_data"));
var converted_planets = [];//planets that were turned into path dots.

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


//Load planets onto galaxy map.
load_planets();
add_path_dots();

function load_planets()
{
  var player_priority = setup_data.planet_count;

  game_data.all_planets.forEach(planet=>{
      //Only load planets that have the correct priority set by the user in the setup page.
      if(planet.x_coordinate !=null && planet.y_coordinate !=null && planet.priority <= player_priority && check_boundry(planet) == true)
      {
          var id = planet.x_coordinate+"_"+planet.y_coordinate;
          //document.getElementById(id).style.backgroundImage = "url('"+planet.image_path+"')";
          document.getElementById(id).style.backgroundColor = "blue"
          document.getElementById(id).setAttribute("Planet",JSON.stringify(planet));
          document.getElementById(id).setAttribute("Faction",load_planet_faction(planet));
          document.getElementById(id).onclick = function(){change_faction()};
      }
      else if (planet.priority <=3)//make sure planets with prio 4 or 5 are not converted, as they are planets not connected to any path.
      {
         converted_planets.push(planet);
      }
  })
}

function add_path_dots()
{
var game_data = JSON.parse(sessionStorage.getItem("game_data"));
game_data.map_paths.forEach(dot=>{
    var id_string = dot.x_coordinate+"_"+dot.y_coordinate;
    if(document.getElementById(id_string))
    {
      document.getElementById(id_string).style.backgroundImage = "url('https://i.imgur.com/lzfAvjE.png')";
    }
    else
    {
      rejected_ids.push(id_string);
    }
})
converted_planets.forEach(dot=>{//Turn each non-included planet into a path dot if they exist along a path.
  var id_string = dot.x_coordinate+"_"+dot.y_coordinate;
  if(document.getElementById(id_string))
  {
    document.getElementById(id_string).style.backgroundImage = "url('https://i.imgur.com/lzfAvjE.png')";
  }
})
}

function zoom_out_button_click()
{
    saved_x_coordinate_for_map_return = window.pageXOffset;
    saved_y_coordinate_for_map_return = window.pageYOffset;
    document.body.style.backgroundSize = "200% 196vh";
    window.scrollTo((document.body.scrollHeight/2),(document.body.scrollHeight/2));
    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(200,calc(100%/100))";
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

function check_boundry(incoming_planet)//checks incoming planet to see if it is positioned within the player set boundry.
{
   var boundry = setup_data.location;
   var sector = incoming_planet.sector;
   if(boundry == sector)
   {
     return true;
   }
   else if(boundry == "Galaxy Wide")
   {
     return true;
   }
   else if(boundry == "Mid Rim" &&(sector == "Core" || sector == "Colonies" || sector == "Inner Rim" || sector == "Expansion"))
   {
      return true;
   }
   else if(boundry == "Expansion" &&(sector == "Core" || sector == "Colonies" || sector == "Inner Rim"))
   {
      return true;
   }
   else if(boundry == "Inner Rim" &&(sector == "Core" || sector == "Colonies"))
   {
      return true;
   }
   else if(boundry == "Colonies" &&(sector == "Core"))
   {
      return true;
   }
   else
   {
     return false;
   }
}

function change_faction()
{
  //cycle between unaligned, rebel, and imperial.
}

function load_planet_faction()
{
  //check planet to see if it is in faction list.
}

