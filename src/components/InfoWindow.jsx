import React, { Component } from 'react';

class InfoWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infowindow: null
        };
    }

    // handleInfoWindow = (infowindow) => {
    //     this.setState({ infowindow });
    // }

    createInfoWindow = (api) => {
        const infowindow = new api.maps.InfoWindow();
        this.setState({ infowindow });
        //return infowindow;
    }

    setContentToInfoWindow = (content) => {
        const infowindow = this.state.infowindow;
        infowindow.setContent(`<h6>${content.title}</h6>`);
    }

    addInfoWindowToMarker = (map, marker) => {
        const infowindow = this.state.infowindow;
        infowindow.open(map, marker);
    }

    handleInfoWindow = (map, marker) => {
        this.setContentToInfoWindow(marker);
        this.addInfoWindowToMarker(map, marker);
    }

    componentDidMount = () => {
        const googleApi = this.props.googleApi;
        this.createInfoWindow(googleApi);
        //this.handleInfoWindow(infowindow);
    }

    componentDidUpdate = (prevProps) => {
        const { map, clickedMarker } = { ...this.props };
        if (prevProps.clickedMarker || clickedMarker !== prevProps.clickedMarker) {
            this.handleInfoWindow(map, clickedMarker);
        }
    }

    render() {
        return <div></div>;
    }
}

export default InfoWindow;