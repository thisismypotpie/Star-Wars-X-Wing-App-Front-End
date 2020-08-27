 function masterUpgradeFilter(ship_to_add,upgrade_type)
 {
    var upgrade_list = [];
     //If team is null then we are at the new ship with no team.
    upgrade_list = filter_out_upgrade_type(upgrade_type);
    upgrade_list = filter_out_ship_specificity(upgrade_list,ship_to_add);
    upgrade_list = filter_out_ship_size(upgrade_list,ship_to_add); 
    upgrade_list = filter_out_factions(upgrade_list,ship_to_add);
    upgrade_list = filter_out_limited(upgrade_list,ship_to_add);
    upgrade_list = filter_out_unique(upgrade_list,ship_to_add);
    return upgrade_list;
 }

 function filter_out_limited(upgrade_list,ship_to_add)
 {
    for(var i=upgrade_list.length-1; i >=0;i--)
    {
        if(upgrade_list[i].is_limited == true)
        {
            for(var j= ship_to_add.upgrades.length -1;j>=0;j--)
            {
                if(ship_to_add.upgrades[j].id == upgrade_list[i].id)
                {
                    console.log("Removing upgrade: "+upgrade_list[i].name+" by limited keyword filter.")
                    upgrade_list.splice(i,1);
                }
            }
        }
    }
    return upgrade_list;
 }

 function filter_out_unique(upgrade_list,ship_to_add)
 {
    var all_teams = JSON.parse(sessionStorage.getItem("all_teams"));
    for(var i=upgrade_list.length -1; i>=0;i--)//Check all teams
    {
        if(upgrade_list[i].is_unique == true)
        {   
            for(var j = 0; j < all_teams.length;j++)//Check all teams
            {
                for(var k= all_teams[j].ship_list.length-1;k>=0;k--)
                {
                    for(var q = all_teams[j].ship_list[k].upgrades.length-1; q>=0;q--)
                    {
                        if(upgrade_list[i].id == all_teams[j].ship_list[k].upgrades[q].id)
                        {
                            console.log("Removing upgrade: "+upgrade_list[i].name+" by unique keyword filter.")
                            upgrade_list.splice(i,1);
                        }
                    }
                }
            }
            for(var j = ship_to_add.upgrades.length -1;j >=0;j--)//check ship in progress
            {
                if(ship_to_add.upgrades[j].id == upgrade_list[i].id)
                {
                    console.log("Removing upgrade: "+upgrade_list[i].name+" by unique keyword filter.")
                    upgrade_list.splice(i,1);
                }
            }
        }
    }
    return upgrade_list;
 }

 function filter_out_factions(upgrade_list,ship_to_add)
 {
     var ship_faction = ship_to_add.chosen_pilot.faction;
     var upgrade_factions = [];
    for(var i=upgrade_list.length -1;i>=0;i--)
    {
        if(upgrade_list[i].rebel_only == true)
        {
            upgrade_factions.push("Rebels");
        }
        if(upgrade_list[i].imperial_only  == true)
        {
            upgrade_factions.push("Imperial");
        }
        if(upgrade_list[i].scum_only == true)
        {
            upgrade_factions.push("Scum");
        }
        if(upgrade_factions.length == 0)
        {
            console.log("ERROR: The upgrade "+upgrade_list[i].name+" is not open to any faction!")
        }
        if(!upgrade_factions.includes(ship_faction))
        {
            console.log(upgrade_factions)
            console.log("Removing upgrade: "+upgrade_list[i].name+" by faction filter.")
            upgrade_list.splice(i,1);
        }
        upgrade_factions = [];
    }
    return upgrade_list;
 }

 function filter_out_ship_size(upgrade_list,ship_to_add)
 {
     var size_validated = false;
     for(var i= upgrade_list.length-1;i>=0;i--)
     {
        if(upgrade_list[i].ship_size_specifics.length > 0)
        {
            for(var j=0; j < upgrade_list[i].ship_size_specifics.length;j++)
            {
                if(ship_to_add.chosen_pilot.ship_name.ship_type.toLowerCase() == upgrade_list[i].ship_size_specifics[j].toLowerCase() ||
                   (upgrade_list[i].ship_size_specifics[j].toLowerCase() == "large" && ship_to_add.chosen_pilot.ship_name.ship_type.toLowerCase().includes("large")))//large ships
                {
                    size_validated = true;
                    break;
                }
            }
            if(size_validated == false)
            {
                console.log("Removing upgrade: "+upgrade_list[i].name+" by size filter.")
                upgrade_list.splice(i,1);
            }
            else
            {
                size_validated = false;
            }
        }
     }
    return upgrade_list
 }

 function filter_out_ship_specificity(upgrade_list,ship_to_add)
 {
     var ship_verified = false;
    for(var i= upgrade_list.length-1;i >=0;i--)
    {
        if(upgrade_list[i].ship_specifics.length > 0)
        {
            for(var j =0;j < upgrade_list[i].ship_specifics.length;j++)
            {
                if(ship_to_add.chosen_pilot.ship_name.id == upgrade_list[i].ship_specifics[j])
                {
                    ship_verified = true;
                    break;
                }
            }
            if(ship_verified == false)
            {
                //console.log("Removing upgrade: "+upgrade_list[i].name+" by ship filter.")
                upgrade_list.splice(i,1);
            }
            else
            {
                ship_verified = false;
            }
        }
    }
    return upgrade_list;
 }

 function filter_out_upgrade_type(upgrade_type)
 {
    var upgrades_to_push = [];
    var game_data= JSON.parse(sessionStorage.getItem("game_data"));
      //Get the list of upgrades of the correct upgrade type.
    game_data.all_upgrades.forEach(upgrade => {
    if(upgrade.type == upgrade_type)
    {
      upgrades_to_push.push(upgrade);
    }
});
    return upgrades_to_push;
 }