import React, { Component } from 'react';
import googleMapsApi from '../apis/google-maps/api';
import Markers from './Markers';


class Map extends Component {
    constructor(props) {
        super(props);
        this.loadMap = this.loadMap.bind(this);
    }

    loadMap() {
        const { id, mapOptions } = this.props;
        const map = googleMapsApi.createMap(id, mapOptions);

        return map;
    }

    render() {
        return (
            <Markers
              id={this.props.id}
              places={this.props.places}
              filter={this.props.filter}
              markers={this.props.markers}
              filteredMarkers={this.props.filteredMarkers}
              onFilterMarkers={this.props.onFilterMarkers}
              onHandleMarkers={this.props.onHandleMarkers}
              map={() => this.loadMap()}
              options={this.props.mapOptions}/>
        );
    }
}

export default Map;
