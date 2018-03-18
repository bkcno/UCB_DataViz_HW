## Visualizing Data with Leaflet
!(/EarthquakeMap.png)
### Basic Visualization
The first task is to visualize an earthquake data set. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON Feed page and pick a data set to visualize. When click on a data set, for example 'All Earthquakes from the Past 7 Days', there will be a JSON representation of that data. Utilizing the URL of this JSON to pull in the data for the visualization. Create a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

### More Data
Plot a second data set on the map to illustrate the relationship between tectonic plates and seismic activity. Pull in a second data set and visualize it along side the original set of data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates. Plot a second data set on the map. Add a number of base maps to choose from as well as separate out the two different data sets into overlays that can be turned on and off independently. Add layer controls to the map.

### Time Keeps on Ticking
Many people don't know how much seismic activity is happening around them all the time. For example, in Southern California there are over 10,000 earthquakes each year alone. The USGS assignment seeks to create a map that will visualize just how many earthquakes happen over the course of a day/week.
Utilize a Leaflet plugin (they can be found at http://leafletjs.com/plugins.html) to visualize the earthquake as it takes place over a period of time.

