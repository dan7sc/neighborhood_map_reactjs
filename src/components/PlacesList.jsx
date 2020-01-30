import React, { Component } from 'react';
import searchIcon from '../img/outline-search-24px.svg';

class PlacesList extends Component {
    constructor(props) {
        super(props);
        this.state = { listMarkers: [] };
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleClick(marker) {
        const { map, infowindow } = { ...this.props };
        this.props.onShowInfoWindow(map, infowindow, marker);
    }

    handleInput(e) {
        this.props.onHandleInput(e);
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
            <div>
              <input className="input-filter" onChange={this.handleInput} type="text" placeholder="Filter" size="30" />
              <svg className="input-filter-icon" width="24px" height="24px" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <image xlinkHref={searchIcon} x="0" y="0" height="24px" width="24px"/>
              </svg>
              <ul className="list">
                { (listMarkers.length === 6 && listFilteredMarkers.length === 0 && this.props.filter.length === 0) ?
                  listMarkers : (listFilteredMarkers[0] === undefined && listFilteredMarkers.length === 0) ?
                  msg : listFilteredMarkers }
              </ul>
            </div>
        );
    }
}

export default PlacesList;
