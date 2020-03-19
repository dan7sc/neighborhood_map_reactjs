import React, { Component } from 'react';

class Markers2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            filteredMarkers: []
        };
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

    animateMarker = (api, marker) => {
        if (marker.getAnimation()) {
            marker.setAnimation(null);
        }
        else {
            marker.setAnimation(api.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 2000);
        }
    }

    showMarkers = (api, map, markers) => {
        const bounds = new api.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    }

    handleInput = (e) => {
        this.props.onHandleInput(e);
    }

    handleClick = () => {
        this.props.onHandleClick();
    }

    isFiltered = (filter, element) => {
        return element.toLowerCase().includes(filter.toLowerCase());
    }

    filterMarkers = (markers, filter) => {
        const filteredMarkers = [];
        for(let i = 0; i < markers.length; i++) {
            if(this.isFiltered(filter, markers[i].title)) {
                filteredMarkers.push(markers[i]);
                markers[i].setVisible(true);
            }
            else {
                markers[i].setVisible(false);
            }
        }
        return filteredMarkers;
    }

    componentDidMount = () => {
        const { googleApi, map, places } = { ...this.props };
        if (googleApi !== null && map !== null) {
            const markers = this.createMarkers(googleApi, map, places);
            markers.forEach(marker => {
                marker.addListener('click', () => this.handleClick());
            });
            this.setState({ markers });
            this.showMarkers(googleApi, map, markers);
        }
    }

    componentDidUpdate = (prevProps) => {
        const markers = this.state.markers;
        const filter = this.props.filter;
        if (filter !== prevProps.filter) {
            const filtered = this.filterMarkers(markers, filter);
            this.setState({ filteredMarkers: filtered });
        }
    }

    render() {
        return <div></div>;
    }
}

export default Markers2;
