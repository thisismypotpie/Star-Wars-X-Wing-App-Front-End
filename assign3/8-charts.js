// Enter your code below

let data = {
  blue: 21,
  yellow: 11,
  red: 4,
  teal: 18,
  purple: 9,
  orange: 9,
  unknown: 4,
};
let donutChart = new Chart(document.getElementById("myChart"),{
  type: 'doughnut',
  data: {
  labels:["blue","yellow","red","teal","purple","orange","unknown"],
  datasets: [
    {
  backgroundColor: [
       'rgba(54, 162, 235, 0.8)',
       'rgba(255, 206, 86, 0.8)',
       'rgba(255, 99, 132, 0.8)',
       'rgba(75, 192, 192, 0.8)',
       'rgba(153, 102, 255, 0.8)',
       'rgba(255, 159, 64, 0.8)',
       'rgba(199, 199, 199, 0.8)'],
   borderColor: [
   'rgba(54, 162, 235, 1)',
   'rgba(255, 206, 86, 1)',
   'rgba(255, 99, 132, 1)',
   'rgba(75, 192, 192, 1)',
   'rgba(153, 102, 255, 1)',
   'rgba(255, 159, 64, 1)',
   'rgba(159, 159, 159, 1)',],
   data:[data.blue, data.yellow, data.red, data.teal,data.purple, data.orange, data.unknown]
   //data: data,  
  }]
},
options: {
  responsive: true,
  legend: {
      position: 'bottom',
      labels: {
          boxWidth: 20,
          padding: 20
      }
  }
}
});

// Colors used :

// backgroundColor: [
//   'rgba(54, 162, 235, 0.8)',
//   'rgba(255, 206, 86, 0.8)',
//   'rgba(255, 99, 132, 0.8)',
//   'rgba(75, 192, 192, 0.8)',
//   'rgba(153, 102, 255, 0.8)',
//   'rgba(255, 159, 64, 0.8)',
//   'rgba(199, 199, 199, 0.8)',
// ]
// borderColor: [
//   'rgba(54, 162, 235, 1)',
//   'rgba(255, 206, 86, 1)',
//   'rgba(255, 99, 132, 1)',
//   'rgba(75, 192, 192, 1)',
//   'rgba(153, 102, 255, 1)',
//   'rgba(255, 159, 64, 1)',
//   'rgba(159, 159, 159, 1)',
// ]
