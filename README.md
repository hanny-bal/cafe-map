# Café Map
An interactive map of cafés in Salzburg featuring:
- an overview of all cafés,
- the cafés I already visited with some information and
- a heatmap.

The **purpose** of this map is to allow coffee enthusiasts (like me) to explore cafés in Salzburg and find new places to go to. The map was implemented using [Leaflet JS](https://leafletjs.com/) and the data was obtained through the [Overpass Turbo API](https://overpass-turbo.eu/) using the query `amenity=cafe in Salzburg`.

## Data Pre-Processing
This section provides a brief explanation on how the café data was pre-processed. First, all cafés in the city of Salzburg were retrieved from OpenStreetMap (OSM) using the [Overpass Turbo API](https://overpass-turbo.eu/), filtering by `amenity=cafe in Salzburg`. This returned a first data set which is available under `./data/cafes-osm-raw.geojson`.

However, it contained incoherent information and way too many columns. To reduce the data, I therefore used Python (in Google Colab) and QGIS to manually examine and edit the points. Several steps were then taken based on the following observations.

- Three cafés were entered as polygons. I converted them to point coordinates using the centroid.
- The address was missing for a lot of the cafés (as the volunteers probably did not enter it). I used the [Geopy](https://geopy.readthedocs.io/en/stable/#arcgis) package in Python combined with the ArcGIS geocoding API to obtain addresses for all of the places.
- Five cafés had already closed and their respective websites were not reachable. I removed those from the data set.

Subsequently, I added columns for my personal rating for the cafés that I have already visited, recommendations and my personal comments. After that, the final data set for the mapping process was ready to go.

## Map Creation
The map creation was straightforward. I used [Leaflet 1.9.4](https://leafletjs.com/) as described in the documentation and a bunch of plugins to realise my plans. The final map consists of three layers:
- An overview layer of all cafés in Salzburg,
- a layer with the cafés I visited, color-coded by rating and including my own comments and recommendations and
- a heatmap layer to visualise the café density within the city.

Wherever possible, I used a Content Delivery Network (CDN) to include JavaScript and CSS files. The map uses the CartoDB Voyager basemap due to its intuitive design that allows for easy navigation. The main UI elements include zoom buttons, a layer switcher, a fullscreen button, a legend (where needed), a scalebar and a search button.

The map is embedded in a larger HTML page to provide some context for the user.