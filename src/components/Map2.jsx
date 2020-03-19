import React, { Component } from 'react';
import Markers from './Markers2';
import places from '../models/data';

class Map2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null
        };
    }

    handleMap = (map) => {
        this.setState({ map });
    }

    createMap = (api, id, opts) => {
        const map = new api.maps.Map(document.getElementById(id), opts);
        return map;
    }

    loadMap = (api) => {
        const { id, mapOptions } = { ...this.props };
        const map = this.createMap(api, id, mapOptions);
        this.handleMap(map);
    }

    componentDidMount = () => {
        const googleApi = this.props.googleApi;
        const map = this.state.map;
        if (googleApi !== null && map === null) {
            this.loadMap(googleApi);
        }
    }

    render() {
        const { id, googleApi, filter, onHandleClick } = { ...this.props };
        const map = this.state.map;
        let mapView = <div></div>;
        if (googleApi !== null) {
            mapView = <div id={id}></div>;
            if (map !== null) {
                mapView = <div id={id}>
                            <Markers
                              id={id}
                              places={places}
                              map={map}
                              googleApi={googleApi}
                              filter={filter}
                              onHandleClick={onHandleClick}/>
                          </div>;
            }
        }
        return mapView;
    }
}

export default Map2;
