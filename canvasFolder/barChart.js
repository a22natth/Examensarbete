const ctx = document.getElementById('myChart');
const parent = document.querySelector("#myChart");
var before = 0;

// Fetches data from specified file (although might have to change when using XAMPP)
fetch('../dataFolder/dataLarge.json')

.then(function(response){
  if(response.ok == true){
    return response.json();
  }
})
// If response is ok then a chart is created with the fetched data from the JSON file
.then(function(climateData){
  mutationDetection(parent, () => {
    console.log("completed");
  });
  createChart(climateData);   
});

// Creates the linechart with passed data and takes current time 
function createChart(climateData){
  // Takes starting time of rendering diagram
  before = performance.now();
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
            dash: [2] 
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

function mutationDetection(parent, callback){
  let timer;
  const now = new Date();
  console.log("inside mutation" + now.getMilliseconds());
  // Creates new MutationObserver object 
  const observer = new MutationObserver(() => {
    // Each time a modification(mutation) is detected within the element
    // the timer is reset (i.e it will never reach 500ms)
    clearTimeout(timer);
    timer = setTimeout(() => {
      // If timer is reached, i.e. no modifications have been
      // made for the past 500 ms, the observer stops listening
      // and takes the time for the stop-point of the chart-drawing
      observer.disconnect();
      console.log("stopping timer and this is before" + before);
      var after = performance.now();
      var ms = (after - before) - 500;
      console.log(ms);
      callback();  
    }, 500);
  });

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



