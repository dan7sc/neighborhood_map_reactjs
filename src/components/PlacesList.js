import React, { Component } from 'react';


class PlacesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            filteredPlaces: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.filterPlaces = this.filterPlaces.bind(this);
    }
    
    handleInput(e) {
        this.setState({
            filter: e.target.value
        });
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
        const filteredPlaces = this.filterPlaces(this.state.filter);
        const listItems = filteredPlaces.map(item => {
            return <li key={item.title}>{item.title}</li>;
        });
        const msg = <li key='message'>No Place Found</li>;

        return (
            <div>
              <input onChange={this.handleInput} type="text" placeholder="Search" size="30" />
              <ul>
                { this.state.filter }
                <br />
                { listItems[0] !== undefined ? listItems : msg }
              </ul>
            </div>  
        );
    }
}

export default PlacesList;
