// Enter your code here
document.getElementById("btn").addEventListener("click", function(){
event.preventDefault();
var text = document.getElementById("userinput").value;
let comma_search = new RegExp(',');
let results = text.split(comma_search);
console.log(results);
results.forEach(element => {
    var add_div = document.createElement('DIV');
    add_div.textContent =element;
    document.getElementById("results").appendChild(add_div);
});
});
