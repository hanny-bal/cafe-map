// create a new map with a fullscreen button
var map = new L.Map('map', {
    fullscreenControl: true,
    // OR
    fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    }
});

// set center and zoom to Salzburg
map.setView([47.81, 13.03], 13);

// add a base layer, in my case voyager because it is well-suited for navigation (which is important for cafés)
L.tileLayer('http://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// add the GeoJSON layer of cafés
L.geoJSON(cafes).addTo(map)

/*
TODO:
- add a popup
- add a search bar
- add a layer switcher
- add recommended layer
- add a heatmap layer using https://github.com/Leaflet/Leaflet.heat?tab=readme-ov-file
*/