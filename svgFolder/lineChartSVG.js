
    fetch('../dataFolder/data.json')

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
        width: 600,
        height: 400,
        // Doesn't draw the line chart points
        showPoint: false,
        // Disables line smoothing
        lineSmooth: false,
  };
  
  new Chartist.Line('.ct-chart', data, options);
});