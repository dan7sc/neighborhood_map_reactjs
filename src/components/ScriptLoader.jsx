import React, { Component } from 'react';
import Map from './Map2';

const mapOptions = {
    center: { lat: 40.7413549, lng: -73.9980244 },
    zoom: 13
};

class ScriptLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleApi: null,
            isError: false
        };
    }

    handleGoogleApi = (googleApi) => {
        this.setState({ googleApi });
    }

    createMapScriptTag = (key) => {
        const url = 'https:maps.googleapis.com/maps/api/js';
        const version = '3';
        const mapScriptTag = document.createElement('script');
        mapScriptTag.type = 'text/javascript';
        mapScriptTag.src = `${url}?key=${key}&v=${version}`;
        mapScriptTag.async = true;
        mapScriptTag.defer = true;
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(mapScriptTag, firstScriptTag);
        return mapScriptTag;
    }

    componentDidMount = async () => {
        if (!window.google) {
            const appKey = this.props.appKey;
            try {
                const mapScriptTag = this.createMapScriptTag(appKey);
                mapScriptTag.addEventListener('load', () => {
                    this.handleGoogleApi(window.google);
                });
            } catch(e) {
                this.setState({ isError: true });
                console.log(e.toString());
            }
        }
    }

    render() {
        const { googleApi, isError } = this.state;
        const { id, filter, clickedPlace } = { ...this.props };
        const errorMessage = 'Fail to load script';
        let mapView;
        if (googleApi !== null) {
            mapView = <Map
                        id={id}
                        mapOptions={mapOptions}
                        googleApi={googleApi}
                        filter={filter}
                        clickedPlace={clickedPlace} />;
        } else {
            if (!isError) {
                mapView = <h3>Loading map ...</h3>;
            } else mapView = <h3>{errorMessage}</h3>;
        }
        return mapView;
    }
}

export default ScriptLoader;
