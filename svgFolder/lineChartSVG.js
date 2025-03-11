fetch('../dataFolder/dataSmall.json')

.then(function(response){
    if(response.ok == true){
        return response.json();
    }
    })
    // If response is ok then a chart is created with the fetched data from the JSON file
.then(function(climateData){
    var data = {
        labels: climateData.weatherdata.avgtemperatures.map(row => row.date),
        series: [climateData.weatherdata.avgtemperatures.map(row => row.temp)],
      };

    // Customization of line chart
    var options = {
        height: 650,
        width: 1200,
        // Makes sure this value is always on the axis
        referenceValue: 5,
        // Doesn't draw the line chart points
        showPoint: false,
        // Disables line smoothing
        lineSmooth: false,
          axisY: {
            offset: 30,
            // Adjust scaleMinSpace to auto adjust values (decimals to integers only eg. on y-axis)
            scaleMinSpace: 30,
        },
    };
  new Chartist.Line('.ct-chart', data, options);
});