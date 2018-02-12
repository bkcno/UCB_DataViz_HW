// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

var filteredData = dataSet;

var startingIndex = 0;
var resultsPerPage = 100;

function renderTable() {
  var endingIndex = startingIndex + resultsPerPage;
  var dataSubset = filteredData.slice(startingIndex, endingIndex);
  $tbody.innerHTML = "";
  for (var i = 0; i < dataSubset.length; i++) {
   
    var alien = dataSubset[i];
    var fields = Object.keys(alien);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = alien[field];
    }
  }
}

// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value;
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.toLowerCase();

  filteredData = dataSet.filter(function(alien) {
    var alienDate = alien.datetime.substring(0, filterDate.length);
    var alienCity = alien.city.substring(0, filterCity.length).toLowerCase();
    var alienState = alien.state.substring(0, filterState.length).toLowerCase();
    var alienCountry = alien.country.substring(0, filterCountry.length).toLowerCase();
    var alienShape = alien.shape.substring(0, filterShape.length).toLowerCase();

    if (alienDate === filterDate && alienState === filterState && alienCity === filterCity && alienCountry === filterCountry && alienShape === filterShape) {
      return true;
    }
    return false;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();
