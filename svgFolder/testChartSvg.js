
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
// Creates chart 
function createChart(climateData){
    // Chartist.Line for line-chart, Chartist.Bar for bar-chart
    new Chartist.Bar('.ct-chart', 
   {
        labels: climateData.weatherdata.avgtemperatures.map(row => row.date),
        series: [climateData.weatherdata.avgtemperatures.map(row => row.temp)],
    },
   {
  }); 
}