var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $searchBtn = document.querySelector("#search");
// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
// $searchBtn.addEventListener("click", handleSearchButtonClick);

var filteredData = dataSet;
console.log(filteredData.length)
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get get the current aliendata object and its fields
    var aliendata = filteredData[i];
    var fields = Object.keys(aliendata);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the aliendata object, create a new cell at set its inner text to be the current value at the current aliendata's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = aliendata[field];
    }
  }
}
function handleSearchButtonClick() {
  var filterDate = $datetimeInput.value;
  // Set filteredData to an array of all aliendata whose "date/time" matches the filter
  filteredData = dataSet.filter(function(aliendata) {
    var aliendataDate = aliendata.datetime;
    // If true, add the aliendata to the filteredData, otherwise don't add it to filteredData
    return aliendataDate === filterDate;
  });
  renderTable();
}
// Render the table for the first time on page load
renderTable();dataSet