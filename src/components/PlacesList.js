import React, { Component } from 'react';


class PlacesList extends Component {
    constructor(props) {
        super(props);
        this.filterPlaces = this.filterPlaces.bind(this);
    }
    
    filterPlaces(places, filter) {
        this.props.onFilterPlaces(places, filter);
    }

    componentDidMount() {
        const {places, filter} = {...this.props};
        this.filterPlaces(places, filter);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.filterPlaces(this.props.places, this.props.filter);
        }
    }
    
    render() {
        const listItems = this.props.filteredPlaces.map(item => {
            return <li key={item.title}>{item.title}</li>;
        });
        const msg = <li key='message'>No place was found</li>;

        return (
            <ul>
              { listItems[0] !== undefined ? listItems : msg }
            </ul>
        );
    }
}

export default PlacesList;
