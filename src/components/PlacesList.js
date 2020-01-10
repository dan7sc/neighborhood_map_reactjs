import React, { Component } from 'react';


class PlacesList extends Component {
    render() {
        const listItem = this.props.places.map(place => {
            return <li key={place.title}>{place.title}</li>;
        });

        return (
            <div>
              <input  type="text" placeholder="Search" size="30" />
              <ul>
                {listItem}
              </ul>
            </div>  
        );
    }
}

export default PlacesList;
