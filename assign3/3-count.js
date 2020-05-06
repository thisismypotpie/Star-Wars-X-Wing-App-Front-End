document.getElementById("find").addEventListener("click", function(){

var search = document.getElementById("input").value;
var text = document.getElementById("intro").textContent;
text = text.replace(new RegExp(search,'g'),"<mark style=\"background-color:#FFFF00;\">"+search+"</mark>");
document.getElementById("intro").innerHTML = text;
});
