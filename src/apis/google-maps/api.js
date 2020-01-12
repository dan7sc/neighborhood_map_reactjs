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
    let id;
    for (let i = 0; i < items.length; i++) {
        // Get the position from the array.
        position = items[i].location;
        title = items[i].title;
        id = i;
        console.log(title);
        // Create a marker per location, and put into markers array.
        const marker = api.createMarker(position, title, id);
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

// This function filters locations by name in the list
// and filters markers in the map
api.filterMarkers = function(items, filter, infowindow) {
    const markers = items;
    const filteredMarkers = [];
    for(let i = 0; i < items.length; i++) {
      if(items[i].title.toLowerCase().includes(filter.toLowerCase())) {
        filteredMarkers.push(items[i]);
        markers[i].setVisible(true);
      }
      else {
        markers[i].setVisible(false);
      }
    }
    // return a list of markers filtered by name
    return filteredMarkers;
}

// This function create a infowindow
api.createInfoWindow = function() {
    const infowindow = new window.google.maps.InfoWindow();

    return infowindow;
}

// This function populates the infowindow when the marker is clicked
api.populateInfoWindow = function(map, infowindow, marker) {
  // Check to make sure the infowindow is not already opened on this marker
  if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

// This function shows the infowindow through the list
api.showInfoWindow = function(infowindow, markers, id, event) {
  if(event.type === 'click') {
    api.animateMarker(markers[id]);
    api.populateInfoWindow(markers[id], infowindow);
  }
}

// This function closes the infowindow
api.closeInfoWindow = function(infowindow) {
  if(infowindow) {
    infowindow.close();
  }
}

// This function animates the marker
api.animateMarker = function(marker) {
  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  }
  else {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    // Marker bounces during two milliseconds
    setTimeout(() => {
      marker.setAnimation(null);
    }, 2000);
  }
}

export default api;
