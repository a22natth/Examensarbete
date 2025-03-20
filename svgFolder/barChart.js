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

function createChart(climateData){
      // Takes starting time of rendering diagram
    var before = performance.now();
    new Chartist.Bar('.ct-chart', 
   {
        labels: climateData.weatherdata.avgtemperatures.map(row => row.date),
        series: [climateData.weatherdata.avgtemperatures.map(row => row.temp)],
    },
    {
        //Customize chart
        height: 650,
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