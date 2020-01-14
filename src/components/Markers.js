import React, { Component } from 'react';
import gmapsApi from '../apis/google-maps/api';
import { createMapScriptTag } from '../utils/utils';


class Markers extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
        this.handleInfowindow = this.handleInfowindow.bind(this);
        this.filterMarkers = this.filterMarkers.bind(this);
        this.loadMap = this.loadMap.bind(this);
    }

    loadMap() {
        const map = this.props.onLoadMap();

        return map;
    }
    onScriptLoad() {
        const map = this.loadMap();
        const infowindow = gmapsApi.createInfoWindow();
        this.handleInfowindow(infowindow);
        const markers = gmapsApi.createMarkers(map, infowindow, this.props.places);
        markers.forEach(marker => {
            marker.addListener('click', function() {
                gmapsApi.animateMarker(this);
                gmapsApi.populateInfoWindow(map, infowindow, this);
            });
        });
        this.handleMarkers(markers);
        gmapsApi.showMarkers(map, markers);
    }

    handleInfowindow(infowindow) {
        this.props.onHandleInfowindow(infowindow);
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
        const { markers, filter } = { ...this.props };
        const prevFilter = prevProps.filter;
        if (prevFilter !== filter) {
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
