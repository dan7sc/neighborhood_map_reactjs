import React, { Component } from 'react';
import gmapsApi from '../apis/google-maps/api';
import { createMapScriptTag } from '../utils/utils';


class Markers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infowindow: null
        };
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
        this.filterMarkers = this.filterMarkers.bind(this);
    }

    onScriptLoad() {
        const map = this.props.map();
        const infowindow = gmapsApi.createInfoWindow();
        const markers = gmapsApi.createMarkers(this.props.places);
        markers.forEach(marker => {
            marker.addListener('click', function() {
                gmapsApi.animateMarker(this);
                gmapsApi.populateInfoWindow(map, infowindow, this);
            });
        });
        this.handleMarkers(markers);
        gmapsApi.showMarkers(map, markers);
    }

    handleMarkers(markers) {
        this.props.onHandleMarkers(markers);
    }

    filterMarkers(markers, filter) {
        this.props.onFilterMarkers(markers, filter);
    }

    componentDidMount() {
        const key = 'AIzaSyBAjpyia7TRlb8gj-lLOz99Nw6SNxzXv-E';
        if (!window.google) {
            const mapScriptTag = createMapScriptTag(key);
            mapScriptTag.addEventListener('load', () => {
                this.onScriptLoad()
            });
        } else {
            this.onScriptLoad()
        }
    }

    componentDidUpdate(prevProps) {
        const markers = this.props.markers;
        const filter = this.props.filter;
        if (prevProps.filter !== filter) {
            this.filterMarkers(markers, filter);
        }
    }

    render() {
        return (
            <div id={this.props.id} />
        );
    }
}

export default Markers;
