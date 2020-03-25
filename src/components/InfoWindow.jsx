import React, { Component } from 'react';
import utils from '../utils/utils';

class InfoWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infowindow: null
        };
    }

    createInfoWindow = (api) => {
        const infowindow = new api.maps.InfoWindow();
        infowindow.marker = null;
        this.setState({ infowindow });
    }

    setContentToInfoWindow = (content) => {
        const infowindow = this.state.infowindow;
        const contentStr = `<h6>${content[4].title}</h6>` +
              `${content[0]}${content[1]}${content[2]}${content[3]}` +
              `<div><small>Source: FourSquare, Flickr</small></div>`;
        infowindow.setContent(contentStr);
    }

    addInfoWindowToMarker = (map, marker) => {
        const infowindow = this.state.infowindow;
        infowindow.marker = marker;
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', () => {
            infowindow.marker = null;
        });
    }

    handleInfoWindow = async (map, marker) => {
        const data = await utils.requestFoursquareData(marker);
        data.push(marker);
        this.setContentToInfoWindow(data);
        this.addInfoWindowToMarker(map, marker);
    }


    handleCloseInfoWindow = (infowindow) => {
        if (infowindow.marker) {
            infowindow.marker = null;
            infowindow.close();
            this.props.onHandleIsToCloseInfoWindow(true);
        }
    }

    componentDidMount = () => {
        const googleApi = this.props.googleApi;
        this.createInfoWindow(googleApi);
    }

    componentDidUpdate = (prevProps, prevState) => {
        const infowindow = this.state.infowindow;
        const { map, clickedMarker, isToCloseInfoWindow } = { ...this.props };
        if (isToCloseInfoWindow || (infowindow.marker && infowindow.marker !== prevState.infowindow.marker)) {
            this.handleCloseInfoWindow(infowindow);
        } else if (!infowindow.marker || clickedMarker !== prevProps.clickedMarker) {
            this.handleInfoWindow(map, clickedMarker);
        }
    }

    render() {
        return <div></div>;
    }
}

export default InfoWindow;
