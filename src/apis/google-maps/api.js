const api = {};

api.createMap = function createMap(id, opts) {
    const map = new window.google.maps.Map(document.getElementById(id), opts);

    return map;
}

api.initializeMap = function initializeMap(items, opts) {
    // Constructor creates a new map
    const map = api.createMap('map', opts);
    const markers = api.createMarkers(items);

    return [map, markers];
}

api.createMarkers = function createMarkers(items) {    // items to use as markers
    const markers = [];
    let position;
    let title;
    for (let i = 0; i < items.length; i++) {
        // Get the position from the array.
        position = items[i].location;
        title = items[i].title;
        console.log(title);
        // Create a marker per location, and put into markers array.
        const marker = api.createMarker(position, title, i);
        // Push the marker to our array of markers.
        markers.push(marker);
    }

    return markers;
}

api.createMarker = function createMarker(position, title, id) {
    const marker = new window.google.maps.Marker({
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: id
    });

    return marker;
}

// This function will loop through the markers array and display them all.
api.showMarkers = function(map, markers) {
    const bounds = new window.google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

export default api;
