/*
For this page, there will be three options for grid id's are they are as follows:
empty - The slot has no upgrade image and is not next to recieve an image.
next-selection - This slot will have a plus button image and indicates that it is the next slot to add.
$(upgrade type and name) - This slot has an upgrade image and no longer needs to be interacted with except to remove.
*/

document.getElementById("back-button").addEventListener("click", function(){
    window.location.href = "../New-Ship-Upgrade-Screen.html";
  });


let type_clickers = document.getElementsByClassName("type-clicker");

//I need to use a for loop here because type_clickers is not considered an array but a collection and therefore has no foreach function.
for(var i = 0; i < type_clickers.length;i++)
{
    type_clickers[i].addEventListener("click",function(){
        sessionStorage.setItem("upgrade-type-chosen",this.id);
        window.location.href = "../Upgrade-Selection-Screen/Upgrade-Selection-Screen.html"
        console.log(this.id);
    });
}

  