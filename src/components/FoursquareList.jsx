import React, { Component } from 'react';
import fsapi from '../apis/four-square/api';


class FoursquareList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: [],
        };
    }

    componentDidUpdate() {
        const marker = this.props.marker;
        const list = [];
        if (marker != null && this.props.isClicked === true) {
            const request = fsapi.getLocation(marker);
            request.then(data => {
                const response = data.response.venues[0];
                // Get information about the marker
                const id = response.id;
                const address = response.location.formattedAddress[0];
                const city = response.location.formattedAddress[1];
                const country = response.location.formattedAddress[2];
                // Set information in the page
                list.push(<li key={address}>{address}</li>);
                list.push(<li key={city}>{city}</li>);
                list.push(<li key={country}>{country}</li>);
                return id;
            }).then(id => {
                const request = fsapi.getPhotoUrl(marker, id);
                request.then(data => {
                    // Get the photo url;
                    const response = data.response.photos.items[0];
                    const photoUrl = response.prefix + '200x200' + response.suffix;
                    // Set information in the page
                    list.push(<img key={photoUrl} src={photoUrl} alt="{marker.title}" />);
                    this.setState({ listView: list });
                }).catch(() => {
                    const msg = <li key='dataError'>Four Square Photo Could Not Be Loaded</li>;
                    // this.setState({ listView: msg });
                    list.push(msg);
                    this.setState({ listView: list });
                });
            }).catch(() => {
                const msg = <li key='photoError'>Four Square Data Could Not Be Loaded</li>;
                this.setState({ listView: msg });
            });
            this.props.onToggleIsClicked(this.props.isClicked);
        }
    }

    render() {
        const view = this.state.listView;
        return (
            <div className="foursquare-container">
              <h3 id="foursquare-header">FourSquare Data</h3>
              <ul id="foursquare-links">
                { view }
              </ul>
            </div>
        );
    }
}

export default FoursquareList;
