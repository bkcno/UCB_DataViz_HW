// Store our API endpoint inside queryUrl 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data['features']);
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function markerSize(magnitude) {
        return magnitude * 1000;
    }

    // var cities = [
    // ];
    
    // // Create a three-color scale
    // var populationMin = d3.min(cities, function(city){
    //     return city.population;
    // });
    // var populationMax = d3.max(cities, function(city){
    //     return city.population;
    // });
    // var populationMean = d3.mean(cities, function(city){
    //     return city.population;
    // });
    // var getColors3 = d3.scaleLinear()
    //     .domain([
    //         populationMin, populationMean, populationMax
    //     ])
    //     .range([
    //         'steelblue', 'limegreen', 'tomato'
    //     ]);
    
    // // Loop through the cities array and create one marker for each city object
    // for (var i = 0; i < cities.length; i++) {
    //     L.circle(cities[i].location, {
    //         fillOpacity: 0.75,
    //         fillColor: getColors2(cities[i].population),
    //         color: "none",
    //         weight: 3,
    //         className: "city",
    //         // Setting our circle's radius equal to the output of our markerSize function
    //         // This will make our marker's size proportionate to its population
    //         radius: markerSize(cities[i].population)
    //     }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
    // }

    function handleFeature(features, layer) {
        layer.bindPopup("<h3>" + features.properties.place +
      "</h3><hr><p>" + new Date(features.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the handleFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: handleFeature
    });
    // Create a layer with all earthquake data
    var earthquakes = L.geoJSON(earthquakeData);

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and lightmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ");
    
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Outdoors": streetmap,
        "Grayscale": lightmap, 
        "Satellite": satellitemap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map_one", {
        center: [38.80, -116.42],
        zoom: 4,
        layers: [lightmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control
        .layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
}