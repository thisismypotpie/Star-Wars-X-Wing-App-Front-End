// Enter your code here

const url = 'https://swapi.dev/api/people/';

fetch(url)
.then(response =>{return response.json();})
.then(data =>{
    //console.log(data.results);
    data.results.forEach(element => {
        console.log(element["name"]);
        document.getElementById("results").innerHTML+="."+element["name"]+" - "+element["birth_year"]+"<br>";
    });
});

fetch('https://swapi.dev/api/planets/')
.then(response =>response.json())
.then(data => console.log(data));
