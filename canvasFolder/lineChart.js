const ctx = document.getElementById('myChart');

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
  console.log(climateData.weatherdata.avgtemperatures.map(row => row.date));
  console.log(climateData.weatherdata.avgtemperatures.map(row => row.temp));

  new Chart(ctx, {
    type: 'line',
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
}

