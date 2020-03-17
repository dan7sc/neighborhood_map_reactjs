import React, { Component } from 'react';

class Markers2 extends Component {
    constructor(props) {
        super(props);
    }

    createMarkers = (api, map, places) => {
        const markers = [];
        let position, title, id;
        for (let i = 0; i < places.length; i++) {
            position = places[i].location;
            title = places[i].title;
            id = i;
            console.log(title);
            const marker = this.createMarker(api, map, id, title, position);
            markers.push(marker);
        }
        return markers;
    }

    createMarker = (api, map, id, title, position) => {
        const marker = new api.maps.Marker({
            position: position,
            title: title,
            animation: api.maps.Animation.DROP,
            map: map,
            id: id
        });
        return marker;
    }

    showMarkers = (api, map, markers) => {
        const bounds = new api.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    }

    componentDidMount = () => {
        const { googleApi, map, places } = { ...this.props };
        if (googleApi !== null && map !== null) {
            const markers = this.createMarkers(googleApi, map, places);
            this.showMarkers(googleApi, map, markers);
        }
    }

    render() {
        return <div></div>;
    }
}

export default Markers2;
