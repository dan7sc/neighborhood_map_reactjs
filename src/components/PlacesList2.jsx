import React, { Component } from 'react';
import searchIcon from '../img/outline-search-24px.svg';
import places from '../models/data';

class PlacesList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesList: places,
            filteredMarkers: [],
            filteredPlaces: []
        };
    }

    handleClick = (marker) => {
        // const { map, infowindow } = { ...this.props };
        // this.props.onShowInfoWindow(map, infowindow, marker);
    }

    handleInput = (e) => {
        // this.props.onHandleInput(e);
    }

    // filterMarkers = (items, filter) => {
    //     const markers = items;
    //     const filteredMarkers = [];
    //     for(let i = 0; i < items.length; i++) {
    //         if(items[i].title.toLowerCase().includes(filter.toLowerCase())) {
    //             filteredMarkers.push(items[i]);
    //             markers[i].setVisible(true);
    //         }
    //         else {
    //             markers[i].setVisible(false);
    //         }
    //     }
    //     return filteredMarkers;
    // }

    // handleFilterMarkers = (markers, filter) => {
    //     const filteredMarkers = filterMarkers(markers, filter);
    //     this.setState({ filteredMarkers });
    // }

    handleFilterPlaces = (places, filter) => {
        const filteredPlaces = [];
        const size = places.length;
        for(let i = 0; i < size; i++) {
            if(places[i].title.toLowerCase().includes(filter.toLowerCase())) {
                filteredPlaces.push(places[i]);
            }
        }
        this.setState({ filteredPlaces });
    }

    render() {
        const filteredMarkers = this.state.filterMarkers;
        const placesList = this.state.placesList;
        const listFilteredMarkers = [];
        // const listFilteredMarkers = filteredMarkers.map(item => {
        //     return <li key={item.title} onClick={() => this.handleClick(item)}>{item.title}</li>;
        // });
        // const placesList = markers.map(item => {
        //     return <li key={item.title} onClick={() => this.handleClick(item)}>{item.title}</li>;
        // });
        const listView = placesList.map(item => {
            return <li key={item.title}>{item.title}</li>;
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
                {/* { (placesList.length === 6 && listFilteredMarkers.length === 0 && filteredMarkers.length === 0) ? */}
                {/*   placesList : (listFilteredMarkers[0] === undefined && listFilteredMarkers.length === 0) ? */}
                {/*   msg : listFilteredMarkers } */}
                { (placesList.length === 6) ? listView : msg }
              </ul>
            </div>
        );
    }
}

export default PlacesList2;
