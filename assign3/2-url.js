// Enter your code here

// Input:
// http://www.example.com?name=r2d2&email=r2d2%40me.com&human=no

// Output
// http://www.example.com
// name: r2d2
// email: r2d2@me.com
// human: no

document.getElementById("submit-btn").addEventListener("click", function(){
    event.preventDefault();
    if(document.getElementById("results_box"))
    {
        document.getElementById("results_box").remove();
    }
    var url =document.getElementById("comments").value;
     console.log(url);
     var first_pass = url.split("=");
     console.log(first_pass);
     for(var i =0; i < first_pass.length;i++)
     {
        first_pass[i] = first_pass[i].split('?')[0];
        first_pass[i] = first_pass[i].split('&')[0];
        first_pass[i].replace("%40","@");
     }
     console.log(first_pass);

     var results = document.createElement('FORM');
     results.id = "results_box";
     results.style.background = "white";
     results.style.width = "50%";
     results.style.margin = "auto";
     results.style.marginTop = "5%";
     var title = document.createElement('H2');
     title.textContent= "Results";
     results.appendChild(title);
     var subtitle = document.createElement('H3');
     subtitle.textContent= "URL";
     results.appendChild(subtitle);
     var url_result = document.createElement('SPAN');
     url_result.textContent = first_pass[0];
     results.appendChild(url_result);
     var subtitle2 = document.createElement('H3');
     subtitle2.textContent= "Query Parameters";
     results.appendChild(subtitle2);
     document.getElementById("body").appendChild(results);

  });
