//Get the team matched to team name 
let all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
let team_chosen = get_team_from_all_teams();
document.getElementById("main-title").textContent = sessionStorage.getItem("chosen_team_name")+" Stats";
get_total_upgrade_Cost()
/*
Create and establish graphs section
*/
    create_upgrade_to_ship_cost_graph();
    create_pilot_skill_breakdown_graph();

/*
End create and establish graphs section
*/


/*
Button function Section
*/
//Triggers when the back button is pressed.
function backButtonClick()
{
    sessionStorage.removeItem("chosen_team_name");
    window.location.href= "../../Team-Screen.html";
}
/*
End button function section.
*/

/*
Misc. function section.
*/

//Retrieves the team from all teams based on the name input.
function get_team_from_all_teams()
{
    let name = sessionStorage.getItem("chosen_team_name");
    let chosen_team = undefined;
    all_teams.forEach(team=>{
        if(team.team_name == name)
        {
            chosen_team = team;
        }
    })
    return chosen_team;
}
//Gets the total cost of all ships combined.
function get_total_ship_cost()
{
    var ship_cost = 0;
    team_chosen.ship_list.forEach(ship =>{
        ship_cost += ship.chosen_pilot.cost;
    })
    return ship_cost;
}
//Gets the total cost of all upgrades combined.
function get_total_upgrade_Cost()
{
    var upgrade_cost = 0;
    team_chosen.ship_list.forEach(ship =>{
        ship.upgrades.forEach(upgrade=>{
            upgrade_cost += upgrade.cost;
        })
    })
    return upgrade_cost;
}
//Returns an array of pilots skills from all ships.
function get_pilot_skill_array()
{
    var pilot_skills = [0,0,0,0,0,0,0,0,0,0,0];
    team_chosen.ship_list.forEach(ship =>{
        if(ship.current_pilot_skill < 1)
        {
            pilot_skills[0]+=1 ;
        }
        else if(ship.current_pilot_skill == 1)
        {
            pilot_skills[1]+=1;
        }
        else if(ship.current_pilot_skill == 2)
        {
            pilot_skills[2]+=1;
        }
        else if(ship.current_pilot_skill == 3)
        {
            pilot_skills[3]+=1;
        }
        else if(ship.current_pilot_skill == 4)
        {
            pilot_skills[4]+=1;
        }
        else if(ship.current_pilot_skill == 5)
        {
            pilot_skills[5]+=1;
        }
        else if(ship.current_pilot_skill == 6)
        {
            pilot_skills[6]+=1;
        }
        else if(ship.current_pilot_skill == 7)
        {
            pilot_skills[7]+=1;
        }
        else if(ship.current_pilot_skill == 8)
        {
            pilot_skills[8]+=1;
        }
        else if(ship.current_pilot_skill == 9)
        {
            pilot_skills[9]+=1;
        }
        else if(ship.current_pilot_skill > 9 )
        {
            pilot_skills[10]+=1;
        }
        
    })
    return pilot_skills;
}
/*
End misc. function section.
*/

/*
Graph creation functions
*/
//Creates the graph for the upgrade to ship cost ratio
function create_upgrade_to_ship_cost_graph() {
let data = {
    ship: get_total_ship_cost(), 
    upgrade: get_total_upgrade_Cost(),
  };
  let donutChart = new Chart(document.getElementById("upgrade-ship-ratio"),{
    type: 'doughnut',
    data: {
    labels:["Ships ("+get_total_ship_cost()+")","Upgrades ("+get_total_upgrade_Cost()+")"],
    datasets: [
      {
    backgroundColor: [
         'rgba(54, 162, 235, 0.8)',
         'rgba(255, 206, 86, 0.8)'],
     borderColor: [
     'rgba(54, 162, 235, 1)',
     'rgba(255, 206, 86, 1)'],
     data:[data.ship, data.upgrade]  
    }]
  },
  options: {
    responsive: true,
    legend: {
        position: 'bottom',
        labels: {
            boxWidth: 20,
            padding: 20,
            fontColor: "white"
        }
    }
  }
  });
}

function create_pilot_skill_breakdown_graph()
{
    let pilot_skill_array = get_pilot_skill_array();
    let donutChart = new Chart(document.getElementById("pilot-skill-breakdown"),{
        type: 'doughnut',
        data: {
        labels:["Less Than One ("+pilot_skill_array[0]+")","One("+pilot_skill_array[1]+")","Two("+pilot_skill_array[2]+")",
        "Three("+pilot_skill_array[3]+")","Four("+pilot_skill_array[4]+")","Five("+pilot_skill_array[5]+")","Six("+pilot_skill_array[6]+")",
        "Seven("+pilot_skill_array[7]+")","Eight("+pilot_skill_array[8]+")","Nine("+pilot_skill_array[9]+")","More Than Nine("+pilot_skill_array[10]+")"],
        datasets: [
          {
        backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(102,51,0,0.8)',
            'rgba(255,69,0,0.8)',
            'rgba(45,87,44,0.8)',
            'rgba(223,240,226,0.8)'],
         borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(159, 159, 159, 1)',
            'rgba(102, 51,  0,   1)',
            'rgba(255, 69, 0, 1)',
            'rgba(45, 87, 44, 1)',
            'rgba(223, 240, 226, 1)'],
         data:[pilot_skill_array[0],pilot_skill_array[1],pilot_skill_array[2],pilot_skill_array[3],pilot_skill_array[4],pilot_skill_array[5],
        pilot_skill_array[6],pilot_skill_array[7],pilot_skill_array[8],pilot_skill_array[9],pilot_skill_array[10]]  
        }]
      },
      options: {
        responsive: true,
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 20,
                padding: 20,
                fontColor: "white"
            }
        }
      }
      });
}
/*
End graph creation functions.
*/