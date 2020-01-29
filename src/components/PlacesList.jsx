import React, { Component } from 'react';


class PlacesList extends Component {
    constructor(props) {
        super(props);
        this.state = { listMarkers: [] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(marker) {
        const { map, infowindow } = { ...this.props };
        this.props.onShowInfoWindow(map, infowindow, marker);
    }

    render() {
        const listFilteredMarkers = this.props.filteredMarkers.map(item => {
            return <li key={item.title} onClick={() => this.handleClick(item)}>{item.title}</li>;
        });
        const listMarkers = this.props.markers.map(item => {
            return <li key={item.title} onClick={() => this.handleClick(item)}>{item.title}</li>;
        });
        const msg = <li key='message'>No place was found</li>;

        return (
            <ul>
              { (listMarkers.length === 6 && listFilteredMarkers.length === 0 && this.props.filter.length === 0) ?
                listMarkers : (listFilteredMarkers[0] === undefined && listFilteredMarkers.length === 0) ? 
                msg : listFilteredMarkers }
            </ul>
        );
    }
}

export default PlacesList;
