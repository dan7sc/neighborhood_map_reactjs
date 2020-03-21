import React, { Component } from 'react';

class InfoWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infowindow: null
        };
    }

    createInfoWindow = (api) => {
        const infowindow = new api.maps.InfoWindow();
        this.setState({ infowindow });
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

    handleClick = () => {
        this.props.onHandleClick();
    }

    componentDidMount = () => {
        const googleApi = this.props.googleApi;
        this.createInfoWindow(googleApi);
    }

    componentDidUpdate = (prevProps) => {
        const infowindow = this.state.infowindow;
        const { map, clickedMarker, isToCloseInfoWindow } = { ...this.props };
        if (prevProps.clickedMarker || clickedMarker !== prevProps.clickedMarker) {
            this.handleInfoWindow(map, clickedMarker);
        }
        if (isToCloseInfoWindow) infowindow.close();
    }

    render() {
        return <div></div>;
    }
}

export default InfoWindow;
