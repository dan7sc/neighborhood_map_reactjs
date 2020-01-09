import React, { Component } from 'react';
import gmapsApi from '../apis/google-maps/api';


class Markers extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        const map = this.props.map();
        const markers = gmapsApi.createMarkers(this.props.places);
        gmapsApi.showMarkers(map, markers);

        return markers;
    }

    componentDidMount() {
        const URL = 'https://maps.googleapis.com/maps/api/js';
        const KEY = 'AIzaSyBAjpyia7TRlb8gj-lLOz99Nw6SNxzXv-E';
        const VERSION = '3';

        if (!window.google) {
            const mapScriptTag = document.createElement('script');
            mapScriptTag.type = 'text/javascript';
            mapScriptTag.src = `${URL}?key=${KEY}&v=${VERSION}`;
            mapScriptTag.async = true;
            mapScriptTag.defer = true;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(mapScriptTag, firstScriptTag);

            mapScriptTag.addEventListener('load', () => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }

    render() {
        return (
            <div id={this.props.id} />
        );
    }
}

export default Markers;
