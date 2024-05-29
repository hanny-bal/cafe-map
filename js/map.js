/*
 * Café Map, David Hanny, ST 2024 
 * PS Advanced Cartography and Geovisualisation
 * University of Salzburg
 */

// create a new map with a fullscreen button
var map = new L.Map('map', {
    fullscreenControl: true,
    // OR
    fullscreenControl: {
        pseudoFullscreen: false // if true, fullscreen to page width and height
    }
});

// set center and zoom to Salzburg
map.setView([47.805, 13.04], 12.5);


// ----------- Base layer ----------- //
// Add a base layer, in my case CartoDB voyager. The basemap it is well-suited for navigation (which is important for cafés).
// I don't really see the point of other basemap choices for my purpose.
L.tileLayer('http://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// add the GeoJSON layer of cafés, including the popup
// to achieve reasonable popups, we need to loop over every feature and check which values are filled
// also, we need it to build the main popup text


// ----------- All cafés layer ----------- //
// create a layer with clustering functionality
var overviewLayer = L.markerClusterGroup({
    maxClusterRadius: 45
});

// creates a marker with the coffee icon
var coffeeMarker = L.AwesomeMarkers.icon({
    icon: 'coffee',
    iconColor: 'white',
    prefix: 'fa',
    markerColor: 'black'
});
    
// add the markers to the layer
var overviewMarkers = L.geoJson(cafes, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: coffeeMarker
        });
    },
    onEachFeature: function (feature, layer) {
        // <test> ? if true <operation_1> : else <operation_2> is a short-form if statement
        var address = feature.properties.address ? `Address: ${feature.properties.address}` : "Address not available";
        var openingHours = feature.properties.opening_hours ? `Opening hours: ${feature.properties.opening_hours}` : "Opening hours not available";
        var website = feature.properties.website ? `Website: <a href="${feature.properties.website}" target="_blank">${feature.properties.website}</a>` : "Website not available";
        
        // create some meaningful popup text
        var popupContent = `<b>${feature.properties.name}</b><br>` +
                           `${address}<br>` +
                           `${openingHours}<br>` +
                           `${website}`;
                
        // and add it
        layer.bindPopup(popupContent);
    }      
}).addTo(overviewLayer);
map.addLayer(overviewLayer);


// ----------- UI elements ----------- //
// place zoom and fullscreen buttons at the top right
map.zoomControl.setPosition('topright');
map.fullscreenControl.setPosition('topright');

// create a dictionary that stores the map layers and add a layer control
var overlayMaps = {
    'All Cafés': overviewLayer
};
var layerControl = L.control.layers(overlayMaps).addTo(map);

// add a scalebar
L.control.scale({
    imperial: false,  // no ft here ;)
    position: 'bottomleft'
}).addTo(map);



// ----------- Search bar ----------- //
// add a searcg bar for the main layer
map.addControl(new L.Control.Search({
    layer: overviewLayer,
    propertyName: 'name'
}));

/*
TODO:
- add a search bar
- add recommended layer
- add a heatmap layer using https://github.com/Leaflet/Leaflet.heat?tab=readme-ov-file
*/