// Store our API endpoint inside queryUrl 
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var lineUrl = "tectonicplates/PB2002_boundaries.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    console.log(data['features']);
    var earthquakeData = data.features;

    d3.json(lineUrl, function(lineData) {
        console.log(lineData['features']);
        var faultlineData = lineData.features;
        createFeatures(earthquakeData, faultlineData);
})});
    

function createFeatures(earthquakeData, faultlineData) {

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
                                               fillOpacity: 0.9, 
                                               color: 'black',
                                               weight: 1,
                                               fillColor: getColors(feature.properties.mag)});
        },
        
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + 
             "</h3><hr><h2> Magnitude: " + feature.properties.mag + "</h2>" +
             "<br>" + Date(feature.properties.time));
        }
    });

    var faultlines = L.geoJSON(faultlineData, {
        onEachFeature: function (feature, layer) {
            L.polyline(feature.geometry.coordinates)
        }
    });
    
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes, faultlines);
};
    
 
function createMap(earthquakes, faultlines) {

    // Define streetmap and lightmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYmtjbm8iLCJhIjoiY2pkd2dvYjdzMXM2cDJ2dDNpNWFsaDlqZCJ9." +
    "EGtSQaBvLIqSuIhqq9AszA");

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYmtjbm8iLCJhIjoiY2pkd2dvYjdzMXM2cDJ2dDNpNWFsaDlqZCJ9." +
    "EGtSQaBvLIqSuIhqq9AszA");

    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYmtjbm8iLCJhIjoiY2pkd2dvYjdzMXM2cDJ2dDNpNWFsaDlqZCJ9." +
    "EGtSQaBvLIqSuIhqq9AszA");
    
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Outdoors": streetmap,
        "Grayscale": lightmap, 
        "Satellite": satellitemap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        "Fault Lines": faultlines,
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map_one", {
        center: [35.09, -37.10],
        zoom: 3,
        layers: [lightmap, earthquakes, faultlines]
    });


    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    
    L.control
        .layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
    
    // Create legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        // Creates a div with class="info legend"
        var div = L.DomUtil.create('div', 'info legend');

        // Sets the html code inside the div
        div.innerHTML = '<span style="color:black;">MAGNITUDE</span><br/>';
        div.innerHTML += '<span style="color:green;">0 - 1</span><br/>';
        div.innerHTML += '<span style="color:yellow;">1 - 2</span><br/>';
        div.innerHTML += '<span style="color:orange;">2 - 3 </span><br/>';
        div.innerHTML += '<span style="color:darkorange;">3 - 4</span><br/>';
        div.innerHTML += '<span style="color:red;">4 + </span><br/>';

        return div;
        };

        // Add legend to myMap
        legend.addTo(myMap);
    
};

//     var maps = [streetmap, satellitemap];
//     layerGroup = L.layerGroup(maps);
//     var sliderControl = L.control.sliderControl({
//         layer: layerGroup,
//         follow: true
// });
//     myMap.addControl(sliderControl);
//     sliderControl.startSlider();