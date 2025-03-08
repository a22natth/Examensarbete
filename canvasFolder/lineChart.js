const ctx = document.getElementById('myChart');

// Function that fetches the data from JSON file
async function fetchData(){
    const url = 'data.json'; // Idk if i need to change the url later...
    const response = await fetch(url);

    const datapoints = await response.json();
    //console.log(datapoints);
    return datapoints;
};

// Fetches just the dates (does not display them)
fetchData().then(datapoints => {
    const dates = datapoints.weatherdata.avgtemperatures.map(
        function(index){
            return index.date;
        })
    console.log(dates);
});

// Creates the linechart (yet to have the data from the JSON file though)
function createChart(data){

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false
    }
  });
}