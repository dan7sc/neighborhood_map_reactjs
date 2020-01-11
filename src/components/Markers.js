import React, { Component } from 'react';
import gmapsApi from '../apis/google-maps/api';
import { createMapScriptTag } from '../utils/utils';


class Markers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: []
        };
        this.onScriptLoad = this.onScriptLoad.bind(this);
    }

    onScriptLoad() {
        const map = this.props.map();
        const markers = gmapsApi.createMarkers(this.props.places);
        this.setState({ markers });
        gmapsApi.showMarkers(map, markers);
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

    componentDidUpdate() {
        const markers = this.state.markers;
        const filter = this.props.filter;
        gmapsApi.filterMarkers(markers, filter);
    }

    render() {
        return (
            <div id={this.props.id} />
        );
    }
}

export default Markers;
