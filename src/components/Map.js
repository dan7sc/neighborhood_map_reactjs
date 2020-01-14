import React, { Component } from 'react';
import googleMapsApi from '../apis/google-maps/api';
import Markers from './Markers';


class Map extends Component {
    constructor(props) {
        super(props);
        this.loadMap = this.loadMap.bind(this);
        this.handleMap = this.handleMap.bind(this);
    }

    handleMap(map) {
        this.props.onHandleMap(map);
    }

    loadMap() {
        const { id, mapOptions } = this.props;
        const map = googleMapsApi.createMap(id, mapOptions);
        this.handleMap(map);

        return map;
    }

    render() {
        return (
            <Markers
              onLoadMap={this.loadMap}
              id={this.props.id}
              places={this.props.places}
              filter={this.props.filter}
              onHandleInfowindow={this.props.onHandleInfowindow}
              markers={this.props.markers}
              filteredMarkers={this.props.filteredMarkers}
              onFilterMarkers={this.props.onFilterMarkers}
              onHandleMarkers={this.props.onHandleMarkers}
              options={this.props.mapOptions}/>
        );
    }
}

export default Map;
