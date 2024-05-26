// define the map
// Create a new map with a fullscreen button:
var map = new L.Map('map', {
    fullscreenControl: true,
    // OR
    fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    }
});

// set center and zoom to Salzburg
map.setView([47.81, 13.03], 13);

// add a base layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// add the GeoJSON layer of cafés
L.geoJSON(cafes).addTo(map)