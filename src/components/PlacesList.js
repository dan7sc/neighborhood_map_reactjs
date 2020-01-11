import React, { Component } from 'react';


class PlacesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredPlaces: []
        };
        this.filterPlaces = this.filterPlaces.bind(this);
    }
    
    filterPlaces(filter) {
        const self = this.props;
        const filteredMarkers = [];
        for(let i = 0; i < self.places.length; i++) {
            if(self.places[i].title.toLowerCase().includes(filter.toLowerCase())) {
                filteredMarkers.push(self.places[i]);
            }
        }
        return filteredMarkers;
    }

    render() {
        const filteredPlaces = this.filterPlaces(this.props.filter);
        const listItems = filteredPlaces.map(item => {
            return <li key={item.title}>{item.title}</li>;
        });
        const msg = <li key='message'>No place was found</li>;

        return (
            <ul>
              { this.props.filter }
              <br />
              { listItems[0] !== undefined ? listItems : msg }
            </ul>
        );
    }
}

export default PlacesList;
