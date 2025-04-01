const ctx = document.getElementById('myChart');

// Fetches data from specified file (although might have to change when using XAMPP)
fetch('../dataFolder/dataTest.json')
.then(function(response){
  if(response.ok == true){
    return response.json();
  }
})
// If response is ok then a chart is created with the fetched data from the JSON file
.then(function(climateData){
  createChart(climateData);
});

// Creates the chart with passed data
function createChart(climateData){  
  // Change type to line or bar for chart-type  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: climateData.weatherdata.avgtemperatures.map(row => row.date),
        datasets: [{
          label: 'Average temperature',
          data: climateData.weatherdata.avgtemperatures.map(row => row.temp),
          borderWidth: 1
        }]
      },
    });
}