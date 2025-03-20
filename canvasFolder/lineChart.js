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
  // Takes starting time of rendering diagram 
  var before = performance.now();
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
  // Takes new time when chart has finished drawing
  // and calculates the total drawing time
  var after = performance.now();
  var ms = after - before;
  localStorage.setItem("ms", ms);
}
  // Sets the value to stop so that the measuring script can
  // reload page when the rendering is done
  var stopped = true;
  localStorage.setItem("stopValue",stopped);

