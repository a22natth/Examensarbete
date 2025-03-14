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
    };
  new Chartist.Bar('.ct-chart', data, options);
});