// ==UserScript==
// @name         Chartist.js and Chart.js measuring script
// @namespace    http://tampermonkey.net/
// @version      2025-04-02
// @description  PLT measurement script
// @author       a22natth
// @match        localhost/Examensarbete/*
// @grant        none
// ==/UserScript==

var count = parseInt(localStorage.getItem("counter") || 0, 10);

// If counter is on 0 it creates a csv file which will then
// be filled with the collected data
if(count == 0){
        var saveStr = "data:text/csv;charset=utf-8,";
        localStorage.setItem("DataToSave","");
}

// All code is surrounded by a setTimeout since it
// has to wait on chart-creation code to save value of
// ms in local storage. If we don't wait, the value will not be in
// sync with the most previous ms value, but fetching ms of the previous run
setTimeout(function(){
// Gets value of stopped value
var stopped = localStorage.getItem("stopValue");
// Change value of iterations for number of runs
var iterations = 50;
// If rendering of the chart has stopped and iteration number
// has not been reached yet, every value for ms is saved into
// local storage in the created csv file
if (stopped && iterations > count){

    count++;
    localStorage.setItem("counter", count);
    console.log(count);

    var ms = localStorage.getItem("ms", ms);
    saveStr = localStorage.getItem("DataToSave");
    saveStr += count + "," + ms + "\n";
    localStorage.setItem("DataToSave",saveStr);

    // When a second has passed after the rendering has stopped
    // a page-reload function is called
    setTimeout(function(){
        location.reload();
    }, 1000);
    }
    // When the number of iterations has been reached, the CSV data is fetched
    else if(stopped && iterations == count){
       getData();
    }

}, 600);

// Allows the CSV-file to be downloaded
function getData() {
    // Gets the data from localStorage
    var save = localStorage.getItem("DataToSave");
    // Creates a Blob from the localStorage data (assuming it's a CSV formatted string)
    var blob = new Blob([save], { type: 'text/csv' });
    // Creates a temporary URL for the Blob
    var url = URL.createObjectURL(blob);
    // Creates an anchor element
    var anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute("download", "chartData.csv"); // Filename for the download
    // Append the anchor to the body and trigger the click event
    document.body.appendChild(anchor);
    anchor.click();
    // Clean up by removing the anchor and revoking the temporary URL
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    // Clears local storage
    localStorage.clear();
}
