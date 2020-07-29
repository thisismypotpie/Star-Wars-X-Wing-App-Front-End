

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
         grid_coordinate.style.gridRow = (x).toString();
         grid_coordinate.style.gridColumn = (y).toString();
         grid_coordinate.style.backgroundSize = "100%  100%";
         grid_coordinate.style.backgroundRepeat = "no-repeat";
         document.getElementById('grid-container').appendChild(grid_coordinate);

     }
  }

  document.addEventListener('click', function(e) {
    red_alert(e.target);  
})

  function red_alert(clicked)
  {
      console.log(clicked);
      var alert_string = "";
      if(clicked.getAttribute("Planet")!=null)
      {
        alert_string+="Planet: "+clicked.getAttribute("Planet")+"\n";
      }
      alert_string+="X: "+clicked.getAttribute("x")+"\n"+"Y: "+clicked.getAttribute("y")
      alert(alert_string);
  }


  load_planets();
  function load_planets()
  {
      var game_data = JSON.parse(sessionStorage.getItem("game_data"));
      game_data.all_planets.forEach(planet=>{
          if(planet.x_coordinate !=null && planet.y_coordinate !=null)
          {
              var id = planet.x_coordinate+"_"+planet.y_coordinate;
              document.getElementById(id).style.backgroundImage = "url('"+planet.image_path+"')";
              document.getElementById(id).setAttribute("Planet",planet.name);
          }
      })
  }
