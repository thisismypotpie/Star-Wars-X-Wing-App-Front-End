

document.addEventListener("keydown", function(event){ 
    console.log(event.keyCode);
    if (event.keyCode == 107 || event.keyCode == 187)//zoom in
    {
        
    }
    else if(event.keyCode == 187)//zoom out
    {

    }
  });


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
         grid_coordinate.onmouseenter = function(e){document.getElementById(e.target.id).style.border = "1px solid red";planet_check(e);};
         grid_coordinate.onmouseleave = function(e){document.getElementById(e.target.id).style.border = "none"; document.getElementById("planet-info-pop-up").style.visibility = "hidden";get_border_color(e.target.id)};
         document.getElementById('grid-container').appendChild(grid_coordinate);
     }
  }

  document.addEventListener('click', function(e) {
    red_alert(e.target);  
})

//give coordinates of clicked area.
  function red_alert(clicked)
  {
      console.log(clicked);
      var alert_string = "";
      if(clicked.getAttribute("Planet")!=null)
      {
        var planet = JSON.parse(clicked.getAttribute("Planet"));
        alert_string+="Planet: "+planet.name+"\n";
      }
      alert_string+="X: "+clicked.getAttribute("x")+"\n"+"Y: "+clicked.getAttribute("y")
      alert(alert_string);
  }

//Shows a pop-up when you hover over a planet.
function planet_check(mouse_event)
{
    var clicked = mouse_event.target;
    if(clicked.getAttribute("Planet")!=null)
    {
      var planet = JSON.parse(clicked.getAttribute("Planet"));
      document.getElementById("planet-name").textContent = planet.name;
      document.getElementById("x-coordinate").textContent = "X: "+planet.x_coordinate;
      document.getElementById("y-coordinate").textContent = "Y: "+planet.y_coordinate;
      document.getElementById("planet-image").style.backgroundImage = "url('"+planet.image_path+"')";
      if(parseInt(clicked.getAttribute('x'),10) >= 80)//80 is the width border to move the pop up to the left.
      {
        document.getElementById("planet-info-pop-up").style.left = (mouse_event.clientX - document.getElementById('planet-info-pop-up').clientWidth)+"px";
      }
      else
      {
        document.getElementById("planet-info-pop-up").style.left = mouse_event.clientX+"px";
      }
      document.getElementById("planet-info-pop-up").style.top = mouse_event.clientY+"px";
      document.getElementById("planet-info-pop-up").style.visibility = "visible";
    }
}

var rejected_ids = [];
//add_path_dots();
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
}

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
              if(planet.sector == "Core")
              {
                document.getElementById(id).style.border = "1px solid green";
              }
              else if(planet.sector == "Colonies")
              {
                document.getElementById(id).style.border = "1px solid purple";
              }
              else if(planet.sector == "Expansion")
              {
                document.getElementById(id).style.border = "1px solid orange";
              }
              else if(planet.sector == "Inner Rim")
              {
                document.getElementById(id).style.border = "1px solid yellow";
              }
              else if(planet.sector == "Mid Rim")
              {
                document.getElementById(id).style.border = "1px solid red";
              }
              else if(planet.sector == "Outer Rim")
              {
                document.getElementById(id).style.border = "1px solid white";
              }
              else if(planet.sector == "Western Reaches")
              {
                document.getElementById(id).style.border = "1px solid Black";
              }
              else if(planet.sector == "Unknown Regions")
              {
                document.getElementById(id).style.border = "1px solid brown";
              }
              document.getElementById(id).setAttribute("Planet",JSON.stringify(planet));
          }
      })
  }

  function get_border_color(id)
  {
    if(planet.sector == "Core")
    {
      document.getElementById(id).style.border = "1px solid green";
    }
    else if(planet.sector == "Colonies")
    {
      document.getElementById(id).style.border = "1px solid purple";
    }
    else if(planet.sector == "Expansion")
    {
      document.getElementById(id).style.border = "1px solid orange";
    }
    else if(planet.sector == "Inner Rim")
    {
      document.getElementById(id).style.border = "1px solid yellow";
    }
    else if(planet.sector == "Mid Rim")
    {
      document.getElementById(id).style.border = "1px solid red";
    }
    else if(planet.sector == "Outer Rim")
    {
      document.getElementById(id).style.border = "1px solid white";
    }
    else if(planet.sector == "Western Reaches")
    {
      document.getElementById(id).style.border = "1px solid Black";
    }
    else if(planet.sector == "Unknown Regions")
    {
      document.getElementById(id).style.border = "1px solid brown";
    }
  }
