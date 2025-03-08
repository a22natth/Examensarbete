var data = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [5, 2, 4, 2, 0]
    ]
  };
  
// Customization of line chart
  var options = {
    width: 500,
    height: 400,
    // Don't draw the line chart points
    showPoint: false,
    // Disable line smoothing
    lineSmooth: false,
  };
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object. As a third parameter we pass in our custom options.
  new Chartist.Line('.ct-chart', data, options);