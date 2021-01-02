var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
var game_data = JSON.parse(sessionStorage.getItem("game_data"));
var converted_planets = setup_data.converted_planets;

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
  setup_data.active_planets.forEach(planet=>{
          var id = planet.planet.x_coordinate+"_"+planet.planet.y_coordinate;
          //document.getElementById(id).style.backgroundImage = "url('"+planet.image_path+"')";
          if(planet.controlling_faction == "Unaligned")
          {
            document.getElementById(id).style.backgroundColor = "blue";
            document.getElementById("faction-image").style.backgroundImage = "";
          }
          else if(planet.controlling_faction == "Rebels")
          {
            document.getElementById(id).style.backgroundColor = "red";
            document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/h4bX7cy.png')";
          }
          else if(planet.controlling_faction == "Imperial")
          {
            document.getElementById(id).style.backgroundColor = "grey";
            document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/7BL338e.png')";
          }
          else
          {
            alert(planet.name+" has no readable alliance.  Error: "+planet.controlling_faction);
            document.getElementById(id).style.backgroundColor = "black";
          }
          document.getElementById(id).setAttribute("Planet",JSON.stringify(planet));

          //Add controls for when a player goes ever a planet.
          document.getElementById(id).onmouseover= function(e)
          {
            //document.getElementById("planet-info-pop-up").style.visibility = "visible";
            document.getElementById(e.target.id).style.border = "1px solid green";
            document.getElementById("planet-name").textContent = planet.planet.name;
            document.getElementById("planet-image").style.backgroundImage = "url('"+planet.planet.image_path+"')";

           //Set up resouce image and quantity.
           document.getElementById("resource-image").style.backgroundImage = planet.resource.image_path;
           document.getElementById("resource-label").textContent="X"+planet.resource.quantity;

           //Set faction image for planet control.
            if(planet.controlling_faction == "Unaligned")
            {
              document.getElementById("faction-image").style.backgroundImage = "";
            }
            else if(planet.controlling_faction == "Rebels")
            {
              document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/h4bX7cy.png')";
            }
            else if(planet.controlling_faction == "Imperial")
            {
              document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/7BL338e.png')";
            }
            else
            {
              alert(planet.name+" has no readable alliance.  Error: "+planet.controlling_faction);
            }
          };

          //Add controls for when the mouse leaves.
          document.getElementById(id).onmouseleave = function(e)
          {
            document.getElementById(e.target.id).style.border = "none";
            document.getElementById("faction-image").style.backgroundImage ="";
            document.getElementById("planet-image").style.backgroundImage ="";
            document.getElementById("planet-name").textContent = "Planet";
            document.getElementById("resource-image").style.backgroundImage="";
            document.getElementById("resource-label").textContent = "X0";
            //document.getElementById("planet-info-pop-up").style.visibility = "hidden";
          };
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
    document.body.style.backgroundSize = "102% 130vh";
    //window.scrollTo((document.body.scrollHeight/2),(document.body.scrollHeight/2));
    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(200,calc(100%/200))";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(98vh/100))";
    /*document.getElementById("grid-container").style.backgroundSize = "100% 98vh";
    document.getElementById("grid-container").style.width = "100%";
    document.getElementById("grid-container").style.height = "98vh";*/
    document.getElementById("zoom-button").textContent = "Zoom In";
    document.getElementById("zoom-button").onclick = function(){zoom_in_button_click()};
} 

function zoom_in_button_click()
{
  document.body.style.backgroundSize = "204% 260vh";
  //window.scrollTo(saved_x_coordinate_for_map_return,saved_y_coordinate_for_map_return);
  document.getElementById("grid-container").style.gridTemplateColumns = "repeat(200,calc(200%/200))";
  document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(196vh/100))";
  /*document.getElementById("grid-container").style.backgroundSize = "100% 196vh";
  document.getElementById("grid-container").style.width = "auto";
  document.getElementById("grid-container").style.height = "196vh";*/
  document.getElementById("zoom-button").onclick = function(){zoom_out_button_click()};
  document.getElementById("zoom-button").textContent = "Zoom Out"
}