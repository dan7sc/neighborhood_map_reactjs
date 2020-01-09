import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapScriptLoad = this.onMapScriptLoad.bind(this)
    }

    onMapScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.mapOptions);
        return map;
    }

    componentDidMount() {
        const URL = 'https://maps.googleapis.com/maps/api/js';
        const KEY = 'AIzaSyBAjpyia7TRlb8gj-lLOz99Nw6SNxzXv-E';
        const VERSION = '3';

        if (!window.google) {
            const mapScriptTag = document.createElement('script');
            mapScriptTag.type = 'text/javascript';
            mapScriptTag.src = `${URL}?key=${KEY}&v=${VERSION}`;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(mapScriptTag, firstScriptTag);

            mapScriptTag.addEventListener('load', () => {
                this.onMapScriptLoad()
            })
        } else {
            this.onMapScriptLoad()
        }
    }

    render() {
        return (
            <div id={this.props.id}></div>
        );
    }
}

export default Map;
