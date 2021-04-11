//var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
var game_data = JSON.parse(sessionStorage.getItem("game_data"));
//var converted_planets = setup_data.converted_planets;

//For the border and collection of all elements.
var all_ship_body_elements = [];
var all_ship_body_border_colors = [];

//for(var x=1; x < 201;x++)
for(var x=34; x < 196;x++)
{
   //for(var y=1; y<101;y++)
   for(var y=2; y<100;y++)
   {
        var grid_coordinate = document.createElement("div");
        grid_coordinate.id = x+"_"+y;
        grid_coordinate.setAttribute("type","Wild Space");
        grid_coordinate.style.gridColumn = (x).toString();
        grid_coordinate.style.gridRow = (y).toString();
        grid_coordinate.style.backgroundSize = "100%  100%";
        grid_coordinate.style.backgroundRepeat = "no-repeat";
        //grid_coordinate.style.pointerEvents = "all";
        grid_coordinate.onmouseenter = function(e){document.getElementById(e.target.id).style.border = "1px solid green";};
        grid_coordinate.onmouseleave = function(e){document.getElementById(e.target.id).style.border = "none";};
        document.getElementById('grid-container').appendChild(grid_coordinate);
   }
}

//Load planets onto galaxy map.
load_planets();
add_path_dots();
place_ship_bodies();

function load_planets()
{
  var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
  setup_data.active_planets.forEach(planet=>{
          var id = planet.planet.x_coordinate+"_"+planet.planet.y_coordinate;
          if(planet.controlling_faction == "Unaligned")
          {
            document.getElementById(id).style.backgroundColor = "mediumblue";
            document.getElementById("faction-image").style.backgroundImage = "";
          }
          else if(planet.controlling_faction == "Rebels")
          {
            document.getElementById(id).style.backgroundColor = "maroon";
            document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/h4bX7cy.png')";
          }
          else if(planet.controlling_faction == "Imperial")
          {
            document.getElementById(id).style.backgroundColor = "black";
            document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/7BL338e.png')";
          }
          else
          {
            alert(planet.name+" has no readable alliance.  Error: "+planet.controlling_faction);
            document.getElementById(id).style.backgroundColor = "black";
          }
          document.getElementById(id).setAttribute("planet_id",planet.planet.id);//Used when searching for planets.
          document.getElementById(id).setAttribute("type","Planet");//Used when determining pirate rolls or repairs.

          //Add controls for when a player goes ever a planet.
          document.getElementById(id).onmouseover= function(e)
          {
            populate_planet_info_container(planet,e.target.id);
          };

          //Add controls for when the mouse leaves.
          document.getElementById(id).onmouseleave = function(e)
          {
            clear_planet_info_container(e.target.id);
          };
  })
}

function add_path_dots()
{
var game_data = JSON.parse(sessionStorage.getItem("game_data"));
var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
var converted_planets = setup_data.converted_planets;
game_data.map_paths.forEach(dot=>{
    var id_string = dot.x_coordinate+"_"+dot.y_coordinate;
    if(document.getElementById(id_string))
    {
      document.getElementById(id_string).style.backgroundImage = "url('https://i.imgur.com/lzfAvjE.png')";
      document.getElementById(id_string).setAttribute("type","HyperSpace Lane");//Used when determining pirate rolls.

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
    document.getElementById(id_string).setAttribute("type","HyperSpace Lane");//Used when determining pirate rolls.
  }
})
}

function zoom_out_button_click()
{
    document.body.style.backgroundSize = "102% 130vh";
    document.getElementById("grid-container").style.gridTemplateColumns = "repeat(200,calc(100%/200))";
    document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(98vh/100))";
    document.getElementById("zoom-button").textContent = "Zoom In";
    document.getElementById("zoom-button").onclick = function(){zoom_in_button_click()};
} 

function zoom_in_button_click()
{
  document.body.style.backgroundSize = "408% 520vh";
  document.getElementById("grid-container").style.gridTemplateColumns = "repeat(200,calc(400%/200))";
  document.getElementById("grid-container").style.gridTemplateRows = "repeat(100,calc(392vh/100))";
  window.scrollBy(document.body.scrollHeight/2,document.body.scrollHeight/2);
  document.getElementById("zoom-button").onclick = function(){zoom_out_button_click()};
  document.getElementById("zoom-button").textContent = "Zoom Out"
}


function place_ship_bodies()
{
   check_for_combat_report();
   let all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));//[0] is rebels, [1] is empire.
   all_factions.forEach(faction=>{
     faction.navy.forEach(ship_body=>{
      var ship_element = document.createElement("div");
      ship_element.style.gridColumn = (ship_body.location.split("_")[0]).toString();
      ship_element.style.gridRow = (ship_body.location.split("_")[1]).toString();
      ship_element.style.backgroundImage = "url("+ship_body.image+")";
      ship_element.style.border = ship_body.border;
      ship_element.className = "ship-body";
      ship_element.id = ship_body.group_name;
      ship_element.style.pointerEvents = "all";
      ship_element.onmouseenter = function(e)
      { 
        check_if_planet_over_ship_body(ship_body.location);
        show_ship_body_stats(e);
        document.getElementById("team-view-button").onclick = function()
        {
          sessionStorage.setItem('team_name',e.target.id);
          window.location.href='./Team-View-Screen/team-view.html';
        }
      }
      ship_element.onmouseleave = function()
      {
       document.getElementById(ship_body.location).style.border = "none";
       clear_planet_info_container(ship_body.location);
       //document.getElementById("ship-body-info-pop-up").style.visibility = "hidden";
      }
      all_ship_body_elements.push(ship_element.id);
      all_ship_body_border_colors.push(ship_body.border);
       document.getElementById('grid-container').appendChild(ship_element);
     })
   })
}

function check_if_planet_over_ship_body(planet_element_id)
{
  var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
  var planet_in_question  =get_planet(parseInt(document.getElementById(planet_element_id).getAttribute("planet_id"),10),0,setup_data.active_planets.length-1);
  if(planet_in_question !=null)
  {
    populate_planet_info_container(planet_in_question,planet_element_id);
  }
}

//Create small pop up for ship bodies.
function show_ship_body_stats(mouse_event)
{
   var chosen_team = get_team_based_on_passed_event(mouse_event);
  //Set horizontal orientation 
    if(parseInt(chosen_team.location.split("_")[0],10) >= 175)//80 is the width border to move the pop up to the left.
    {
      document.getElementById("ship-body-info-pop-up").style.left = (mouse_event.clientX - document.getElementById('ship-body-info-pop-up').clientWidth)+"px";
    }
    else
    {
      document.getElementById("ship-body-info-pop-up").style.left = mouse_event.clientX+"px";
    }

  //Set vertical orientation
    if(parseInt(chosen_team.location.split("_")[1],10) >= 80)
    {
      document.getElementById("ship-body-info-pop-up").style.top = mouse_event.clientY - document.getElementById('ship-body-info-pop-up').clientHeight+"px";
    }
    else
    {
      document.getElementById("ship-body-info-pop-up").style.top = mouse_event.clientY+"px";
    }


    if(chosen_team.faction == "Rebels")
    {
      document.getElementById("faction-image-background").style.backgroundImage = "url('https://i.imgur.com/mO0iijb.png')";
    }
    else if(chosen_team.faction == "Imperial")
    {
      document.getElementById("faction-image-background").style.backgroundImage = "url('https://i.imgur.com/XgIWtvd.png')";
    }
    else
    {
      alert("ERROR: Unable to determine faction for: "+mouse_event.target.id);
    }

    document.getElementById("ship-body-title").textContent = mouse_event.target.id;
    document.getElementById("ship-count").textContent = "Ships: "+chosen_team.team.ship_list.length;
    document.getElementById("ship-health").textContent = "Health: "+get_total_health(mouse_event.target.id);
    document.getElementById("ship-body-info-pop-up").style.visibility = "visible";
}

//Using binary search to get planet based on id.
function get_planet(id_goal,low_range_end,high_range_end)
{
    var setup_data = JSON.parse(sessionStorage.getItem("gc_setup_data"));
    var test_index = Math.floor((low_range_end+high_range_end)/2);//Create average of low and high to test middle of active planets.
    var test_id = setup_data.active_planets[test_index].planet.id

    if( test_id == id_goal)
    {
        //planet found.
        return setup_data.active_planets[test_index];
    }
    else if(low_range_end == high_range_end)
    {
        //No match
        return null;
    }
    else if(id_goal> test_id)//get everything in upper half.
    {
        return get_planet(id_goal,test_index,high_range_end)
    }
    else//get everyting in lower half.
    {
        return get_planet(id_goal,low_range_end,test_index);
    }
}

function populate_planet_info_container(planet,element_id)
{
  document.getElementById(element_id).style.border = "1px solid green";
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
    document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/mO0iijb.png')";
  }
  else if(planet.controlling_faction == "Imperial")
  {
    document.getElementById("faction-image").style.backgroundImage = "url('https://i.imgur.com/XgIWtvd.png')";
  }
  else
  {
    alert(planet.name+" has no readable alliance.  Error: "+planet.controlling_faction);
  }
}

function clear_planet_info_container(id)
{
  document.getElementById(id).style.border = "none";
  document.getElementById("faction-image").style.backgroundImage ="";
  document.getElementById("planet-image").style.backgroundImage ="";
  document.getElementById("planet-name").textContent = "Planet";
  document.getElementById("resource-image").style.backgroundImage="";
  document.getElementById("resource-label").textContent = "X0";
  sessionStorage.removeItem("team_name");
}

function get_team_based_on_passed_event(event)
{
  //factions[0] == rebels.  factions[1] == imperials.
  var all_factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
  var chosen_team = undefined;
  let break_loop = false;
  for(var i=0; i<all_factions.length;i++)
  {
    for(var j=0; j<all_factions[i].navy.length;j++)
    {
      if(all_factions[i].navy[j].group_name == event.target.id)
      {
        chosen_team = all_factions[i].navy[j];
        break_loop = true;
        break;
      }
    }
    if(break_loop == true)
    {
      break;
    }
  }
  if(chosen_team == undefined)
  {
    alert("ERROR: Could not find ship team info.");
  }
  return chosen_team;
}

function get_total_health(team_name)
{
  var all_factions =  JSON.parse(sessionStorage.getItem("gc_factions"));
  sessionStorage.setItem('team_name',team_name);
  var indicies = get_team_indecies_based_on_name(team_name);
  var current_team = all_factions[indicies[0]].navy[indicies[1]].team.ship_list;
  var total_health = 0;
  var total_possible_health = 0;
  current_team.forEach(ship=>{
      total_possible_health += ship.chosen_pilot.ship_name.hull;
      total_health += ship.current_hull;
  })
  return Math.round(total_health * 100.0 / total_possible_health)+"%";
}

//Blink the border every second.
setInterval(function(){ 
      for(var i=0;i<all_ship_body_elements.length;i++)
      {
        if(document.getElementById(all_ship_body_elements[i]).style.border == "none")
        {
          document.getElementById(all_ship_body_elements[i]).style.border = all_ship_body_border_colors[i];
        }
        else if(get_team_based_on_name(document.getElementById(all_ship_body_elements[i]).id).has_moved == false)
        {
          document.getElementById(all_ship_body_elements[i]).style.border = "none";
        }
      }
}, 500);

function check_for_combat_report()
{
  //After combat changes.
if(sessionStorage.getItem("combat_report")!=null)
{
    alert("combat report!")
    let combat_report = JSON.parse(sessionStorage.getItem("combat_report"));
    let all_factions = JSON.parse(sessionStorage.getItem("gc_factions"));

    //Go through each team in the combat report and update the team.
    combat_report.forEach(report=>{
        for(var i=0; i < all_factions.length;i++)
        {
            for(var j= all_factions[i].navy.length-1; j>= 0;j--)
            {
                if(all_factions[i].navy[j].group_name == report.team_name)
                {
                    if(report.outcome == "Defeated")//If a team is completely destroyed, remove it.
                    {
                        alert(all_factions[i].navy[j].group_name+" has been destroyed");
                        all_factions[i].navy.splice(j,1);//remove ship.
                        sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
                    }
                    else//If a team has retreated or won, replace old team with new one.
                    {
                        alert(all_factions[i].navy[j].group_name+" has been updated.")
                        all_factions[i].navy[j].team.ship_list = report.team_remnant;
                        sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
                        check_if_name_needs_to_be_downgraded(all_factions[i].navy[j].group_name);
                        all_factions = JSON.parse(sessionStorage.getItem("gc_factions"))
                    }
                }
            }
        }
    })
    sessionStorage.setItem("gc_factions",JSON.stringify(all_factions));
    sessionStorage.removeItem("combat_report");
}
}
