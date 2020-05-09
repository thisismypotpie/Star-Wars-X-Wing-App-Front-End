class color
{
    constructor(r,g,b,)
    {
        this.r= r;
        this.g = g;
        this.b = b;
    }
}
//Initialize with background changing.
var timer = setInterval(function(){ 
    let color = get_random_color();
    document.getElementById("body").style.backgroundColor = "rgb("+color.r+","+color.g+","+color.b+")";
 }, get_time_interval());


document.getElementById("start-stop-btn").addEventListener("click", function(){
    event.preventDefault();
   if(    document.getElementById("start-stop-btn").style.backgroundColor != "blue")
   {
    document.getElementById("start-stop-btn").style.backgroundColor = "blue";
    document.getElementById("start-stop-btn").value = "Start";
    document.getElementById("start-stop-btn").style.borderColor = "blue";
    document.getElementById("start-stop-btn").style.boxShadow = "0 0 0 0.2rem blue";
    document.getElementById("interval").disabled = false;
    clearInterval(timer);
   }
   else
   {
    document.getElementById("start-stop-btn").style.backgroundColor = "red";
    document.getElementById("start-stop-btn").value = "Stop";
    document.getElementById("start-stop-btn").style.borderColor = "red";
    document.getElementById("start-stop-btn").style.boxShadow = "0 0 0 0.2rem red";
    document.getElementById("interval").disabled = true;
    timer = setInterval(function(){ 
        let color = get_random_color();
        document.getElementById("body").style.backgroundColor = "rgb("+color.r+","+color.g+","+color.b+")";
     }, get_time_interval());
}
})

function get_random_color()
{
    let r= Math.round(Math.random() * 256);
    let g= Math.round(Math.random() * 256);
    let b= Math.round(Math.random() * 256);
    let background_color = new color(r,g,b);
    return background_color;
}

function get_time_interval()
{
    var input = document.getElementById("interval").value;
    var integer = parseFloat(input,10);
    return integer * 1000;
}
