// Store our API endpoint inside queryUrl 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data['features']);
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    function markerSize(magnitude) {
        return magnitude * 4;
    };
    
    // var getColors2 = d3.scaleLinear()
    // .domain(d3.extent(earthquakeData, function(feature){
    //     return feature.properties.mag;
    // }))
    // .range(['green', 'red']);

    var getColors = d3.scaleLinear()
    .domain(d3.ticks(0, 7, 6))
    .range(["green","lightyellow","yellow","orange","darkorange","red"]);

    // Create a layer with all earthquake data
    var earthquakes = L.geoJSON(earthquakeData, {

        pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, {radius: markerSize(feature.properties.mag), 
                                               fillOpacity: 0.75, 
                                               color: getColors(feature.properties.mag)});
        },
        
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
             "</h3><hr><h2> Magnitude: " + feature.properties.mag + "</h2>");
        }
    })

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
};

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
        zoom: 3,
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