var game_data= JSON.parse(sessionStorage.getItem("game_data"));
function sort_pilots_for_viewing(ship_name, faction)
{
    var pilot_list =[];
    pilot_list = get_pilots(ship_name,faction);
    pilot_list = sort_pilots(pilot_list,0,pilot_list.length-1);
    return pilot_list;
}

function get_pilots(ship_name,faction)
{
    var pilots = [];
    game_data.all_pilots.forEach(pilot => {
        console.log("Comparing: "+pilot.faction+" to "+faction+" \n and "+
        pilot.ship_name.ship_name+" to "+ship_name);
        if(pilot.ship_name.ship_name == ship_name
           && pilot.faction.toLowerCase() == faction.toLowerCase())
        {
          pilots.push(pilot);
        }
  
  });
  return pilots;
}

function sort_pilots(pilot_list,low,high)
{
   if(low < high)
   {
      var pivot = quick_sort_partition(pilot_list,low,high);

      sort_pilots(pilot_list,low,pivot-1);
      sort_pilots(pilot_list,pivot+1,high);
   }
   return pilot_list;
}

//used in the sort_pilots function as a quick sort partition.
function quick_sort_partition(pilot_list,low,high)
{
  var pivot = pilot_list[high].pilot_skill;
  var i = low -1;

  for(var j =low; j<= high-1;j++)
  {
      if(pilot_list[j].pilot_skill <= pivot)
      {
        i++;
        pilot_list = quick_sort_swap(pilot_list,i,j)
      }
  }
  pilot_list = quick_sort_swap(pilot_list,(i+1),high);
  return(i+1);
}

function quick_sort_swap(pilot_list,index_one,index_two)
{
  var holder = pilot_list[index_one];
  pilot_list[index_one] =  pilot_list[index_two];
  pilot_list[index_two] = holder;
  return pilot_list;
}