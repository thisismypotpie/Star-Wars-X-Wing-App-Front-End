function add_attack_die()
{
    var raw_dice_number = document.getElementById('number-of-attacking-dice').textContent;
    raw_dice_number = raw_dice_number.split('X')[1];
    raw_dice_number = parseInt(raw_dice_number,10);
    raw_dice_number ++;
    document.getElementById('number-of-attacking-dice').textContent = "X"+raw_dice_number.toString();
}

function add_defense_die()
{
    var raw_dice_number = document.getElementById('number-of-defending-dice').textContent;
    raw_dice_number = raw_dice_number.split('X')[1];
    raw_dice_number = parseInt(raw_dice_number,10);
    raw_dice_number ++;
    document.getElementById('number-of-defending-dice').textContent = "X"+raw_dice_number.toString();
}

function subtract_attack_die()
{
    var raw_dice_number = document.getElementById('number-of-attacking-dice').textContent;
    raw_dice_number = raw_dice_number.split('X')[1];
    raw_dice_number = parseInt(raw_dice_number,10);
    raw_dice_number --;
    if(raw_dice_number < 0)
    {
        raw_dice_number = 0;
    }
    document.getElementById('number-of-attacking-dice').textContent = "X"+raw_dice_number.toString();
}

function subtract_defense_die()
{
    var raw_dice_number = document.getElementById('number-of-defending-dice').textContent;
    raw_dice_number = raw_dice_number.split('X')[1];
    raw_dice_number = parseInt(raw_dice_number,10);
    raw_dice_number --;
    if(raw_dice_number < 0)
    {
        raw_dice_number = 0;
    }
    document.getElementById('number-of-defending-dice').textContent = "X"+raw_dice_number.toString();
}

function roll_dice_click()
{
    var defense_dice = document.getElementById('number-of-defending-dice').textContent;
    defense_dice = defense_dice.split('X')[1];
    defense_dice = parseInt(defense_dice,10);
    var attack_dice = document.getElementById('number-of-attacking-dice').textContent;
    attack_dice = attack_dice.split('X')[1];
    attack_dice = parseInt(attack_dice,10);
    if(attack_dice == 0 && defense_dice == 0)
    {
        document.getElementById('notification-pop-up-title').textContent = "Someone needs to have some dice in order to roll.";
        show_pop_up("Notification-pop-up");
        return;
    }
    for(var i=0; i < attack_dice;i++)
    {
        var result = Math.floor(Math.random() * 8);
        var attack_roll = document.createElement("div");
        attack_roll.className = "dice-result-attacker";
        attack_roll.id = "attack-dice-number-"+(i+1);
        attack_roll.style.width = "100%";
        attack_roll.style.height = "15vh";
        attack_roll.style.marginBottom = "15px";
        attack_roll.style.backgroundSize = "50% 100%";
        attack_roll.style.backgroundRepeat = "no-repeat";
        attack_roll.style.backgroundColor = "transparent";
        attack_roll.style.backgroundPosition = "50%";
        attack_roll.setAttribute("opacity","1");
        attack_roll.onclick= function(){
            var roll = document.getElementById(this.id);
            if(roll.getAttribute("opacity")=="1")
            {
                roll.style.opacity = "0.25";
                roll.setAttribute("opacity","0.25");
            }
            else
            {
                roll.style.opacity = "1";
                roll.setAttribute("opacity","1"); 
            }
        };
        if(result == 0 || result == 1)
        {
            attack_roll.style.backgroundImage = "url('https://i.imgur.com/1aiuMrA.png')";
        }
        else if(result == 2 || result == 3)
        {
            attack_roll.style.backgroundImage = "url('https://i.imgur.com/WwG90kF.png')";
        }
        else if(result == 4 || result == 5)
        {
            attack_roll.style.backgroundImage = "url('https://i.imgur.com/r44JvPX.png')";
        }
        else if(result == 6 || result == 7)
        {
            attack_roll.style.backgroundImage = "url('https://i.imgur.com/AX8NQYM.png')";
        }
        else
        {
            document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine outcome of attack die, setting to zero.";
            show_pop_up("Notification-pop-up");
            attack_roll.style.backgroundImage = "url('https://i.imgur.com/1aiuMrA.png')";
        }
        document.getElementById("attacking-dice-results").appendChild(attack_roll);
    } 
    for(var i=0; i < defense_dice;i++)
    {
        var result = Math.floor(Math.random() * 8);        var result = Math.floor(Math.random() * 8);
        var defense_roll = document.createElement("div");
        defense_roll.className = "dice-result-defender";
        defense_roll.id = "defense-dice-number-"+(i+1);
        defense_roll.style.width = "100%";
        defense_roll.style.height = "15vh";
        defense_roll.style.marginBottom = "15px";
        defense_roll.style.backgroundSize = "50% 100%";
        defense_roll.style.backgroundRepeat = "no-repeat";
        defense_roll.style.backgroundColor = "transparent";
        defense_roll.style.backgroundPosition = "50%";
        defense_roll.onclick= function(){
            var roll = document.getElementById(this.id);
            if(roll.getAttribute("opacity")=="1")
            {
                roll.style.opacity = "0.25";
                roll.setAttribute("opacity","0.25");
            }
            else
            {
                roll.style.opacity = "1";
                roll.setAttribute("opacity","1"); 
            }
        };
        if(result == 0 || result == 1 || result == 2)
        {
            defense_roll.style.backgroundImage = "url('https://i.imgur.com/cu8tNhe.png')";
        }
        else if(result == 3 || result == 4)
        {
            defense_roll.style.backgroundImage = "url('https://i.imgur.com/jQTOGFS.png')";
        }
        else if(result == 5 || result == 6 || result== 7)
        {
            defense_roll.style.backgroundImage = "url('https://i.imgur.com/yErNyy7.png')";
        }
        else
        {
            document.getElementById('notification-pop-up-title').textContent = "ERROR: Could not determine outcome of defense die, setting to zero.";
            show_pop_up("Notification-pop-up");
            defense_roll.style.backgroundImage = "url('https://i.imgur.com/1aiuMrA.png')";
        }
        document.getElementById("defending-dice-results").appendChild(defense_roll);
    } 
    show_pop_up('dice-results-pop-up');
}

function remove_dice()
{
   Array.from(document.getElementsByClassName("dice-result-attacker")).forEach(element=>{
       document.getElementById("attacking-dice-results").removeChild(element);
   })
   Array.from(document.getElementsByClassName("dice-result-defender")).forEach(element=>{
    document.getElementById("defending-dice-results").removeChild(element);
})
}