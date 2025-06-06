const ctx = document.getElementById('myChart');
const parent = document.getElementById("myChart");
var before = 0;

// Fetches data from specified file 
fetch('../dataFolder/dataSmall.json')
.then(function(response){
  if(response.ok == true){
    return response.json();
  }
})
// If response is ok then a chart is created with the fetched data from the JSON file
.then(function(climateData){
  mutationDetection();
  createChart(climateData);   
});

// Creates the linechart with passed data and takes current time 
function createChart(climateData){
  before = performance.now();
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
      // Remove display of main label
      plugins: {
        legend: {
          display: false,
        },
      },
     tooltips: {
        enabled: false
     },
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
      maintainAspectRatio: false,
    }
  });

}

// Handles mutation detection of chart-element
function mutationDetection(){
  let timer;

  // Each time a modification(mutation) is detected within the element
  // the callback function is called and timer is reset 
  // (i.e it will never reach 500ms)
  const callback = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // If timer is reached, i.e. no modifications have been
      // made for the past 500 ms, the observer stops listening
      // and takes the time for the stop-point of the chart-drawing
      observer.disconnect();
      var after = performance.now();
      var ms = (after - before) - 500;
      console.log(ms);
      localStorage.setItem("ms",ms);
      // Sets the value to stop so that the measuring script can
      // reload page when the rendering is done
      var stopped = true;
      localStorage.setItem("stopValue",stopped);
    }, 500);
  };

  // Creates new MutationObserver instance that is linked to the
  // callback function 
  const observer = new MutationObserver(callback);

  // Lists what should be observed in regards to the chart-element
  // And observes/listens any modifications within these
  observer.observe(parent, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });
}








