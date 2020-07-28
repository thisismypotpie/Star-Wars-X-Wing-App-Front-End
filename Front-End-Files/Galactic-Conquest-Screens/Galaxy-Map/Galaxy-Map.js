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
         grid_coordinate.setAttribute("x",x.toString());
         grid_coordinate.setAttribute("y",y.toString());
         grid_coordinate.style.gridRow = (x).toString();
         grid_coordinate.style.gridColumn = (y).toString();
         document.getElementById('grid-container').appendChild(grid_coordinate);
     }
  }

  document.addEventListener('click', function(e) {
    red_alert(e.target);  
})

  function red_alert(clicked)
  {
      console.log(clicked);
      alert("X: "+clicked.getAttribute("x")+"\n"+"Y: "+clicked.getAttribute("y"));
  }
