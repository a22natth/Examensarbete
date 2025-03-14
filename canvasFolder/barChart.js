const ctx = document.getElementById('myChart');

var started = false; 
var stopped = false;

// Fetches data from specified file (although might have to change when using XAMPP)
fetch('../dataFolder/dataSmall.json')

.then(function(response){
  if(response.ok == true){
    return response.json();
  }
})
// If response is ok then a chart is created with the fetched data from the JSON file
.then(function(climateData){
  createChart(climateData)
});

// Creates the linechart with passed data 
function createChart(climateData){
    started = true;
    localStorage.setItem("startValue",started);
    var before = performance.now();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: climateData.weatherdata.avgtemperatures.map(row => row.date),
      datasets: [{
        label: 'Average temperature',
        data: climateData.weatherdata.avgtemperatures.map(row => row.temp),
        borderWidth: 1, 
        pointStyle: false,
        borderColor: 'red',
        backgroundColor: 'red',
      }]
    },
    options: {
        animation: false,
      scales: {
        y: {
          beginAtZero: true,
          border: {
            dash: [2], 
          }
        }, 
        x: {
          border: {
            dash: [2]
          }
        }
      },
      maintainAspectRatio: false
    }
    
  });

  stopped = true;
  localStorage.setItem("stopValue",stopped);
  console.log("Stopped!" + stopped);
  var after = performance.now();
  console.log("Rendering took " + (after - before) + "ms to execute.");
}



