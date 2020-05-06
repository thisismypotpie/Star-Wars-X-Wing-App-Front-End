document.getElementById("submit").addEventListener("click", function(){
    var name = document.getElementById("NameBox").value;
    var email = document.getElementById("EmailBox").value;
    var statusElement = document.getElementById("Dropoptions");
    var status = statusElement.options[statusElement.selectedIndex].text;
    var CSfour = document.getElementById("CS410P").checked;
    var CSfive = document.getElementById("CS510").checked;
    var CS = document.getElementById("CS").checked;
    var os = document.getElementById("OS").checked;
    var web = document.getElementById("Web").checked;
    var goals = document.getElementById("addition").value;



    console.log("Name: "+name);
    console.log("Email: "+email);
    console.log("Registration Status: "+status);
    if(CSfour == false && CSfive == true)
    {
        console.log("Class Section: Graduate");
    }
    else if(CSfour == true && CSfive == false)
    {
        console.log("Class Sectoin: undergraduate");
    }
    else
    {
        console.log("No school level detected.");
    }
    var classesTaken = "Courses: ";
    var added = false;
    if(CS == true)
    {
        classesTaken += "Computer Sciene";
        added = true;
    }
    if(os == true)
    {
        if(added == true)
        {
            classesTaken += ", ";
        }
        classesTaken += "Operating Systems";
        added = true;

    }
    if(web == true)
    {
        if(added == true)
        {
            classesTaken += ", ";
        }
        classesTaken += "Full Stack Web Development";
    }
    console.log(classesTaken);

    console.log("Class Goals: "+ goals);
    event.preventDefault();
  });
