function strip_image_tag()
{
    var text_array = document.getElementById("url-input").value.split("\n");
    text_array.forEach(text=>{
        text = text.replace('[img]','');
        text = text.replace('[/img]','');
        document.getElementById("url-output").value += text+"\n";
    })
}