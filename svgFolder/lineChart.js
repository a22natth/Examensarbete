const parent = document.querySelector("#myChart");
var before = 0;
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

// Creates chart
function createChart(climateData){
    // Takes current time (starting point of chart drawing)
    before = performance.now();
    new Chartist.Line('.ct-chart', 
   {
        labels: climateData.weatherdata.avgtemperatures.map(row => row.date),
        series: [climateData.weatherdata.avgtemperatures.map(row => row.temp)],
    },
    // Customization of line chart
    {
        height: 550,
        width: 1200,
        // Doesn't draw the line chart points
        showPoint: false,
        // Disables line smoothing
        lineSmooth: false,
          axisY: {
            offset: 30,
            // Adjust scaleMinSpace to auto adjust values (decimals to integers only eg. on y-axis)
            scaleMinSpace: 40,
        },
        axisX: {
            offset: 0,
              labelInterpolationFnc: function(value, index) {
                // For dataSmall.json set nth to 15
                // For dataMedium.json set nth 29 
                // For dataLarge.json set nth to 42
                var nth = 15;
                if(index % nth == 0){
                    return value;
                }
            }  
        },
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
  
  // Sets the value to stop so that the measuring script can
  // reload page when the rendering is done
  var stopped = true;
  localStorage.setItem("stopValue",stopped);






