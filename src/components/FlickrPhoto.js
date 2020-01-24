import React, { Component } from 'react';
import flickrApi from '../apis/flickr/api';


class FlickrPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: ''
        };
    }

    componentDidUpdate() {
        const marker = this.props.marker;
        let photoView = [];
        let photoUrl = '';
        if (marker != null && this.props.isClicked === true) {
            const request = flickrApi.getPhoto(marker);
            request().then(data => {
                // Choose random photo index
                const index = Math.round( (Math.random() * 100) % 10 );
                // Get response
                const response = data.photos.photo[index];
                // Get photo details
                const id = response.id;
                const secret = response.secret;
                const server = response.server;
                const farm = response.farm;
                const title = response.title;
                const size = 'm';
                // Set photo in the page
                photoUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
                photoView = <img src={photoUrl} alt={title} />;
                this.setState({ view: photoView });
            }).catch(() => {
                const msg = <p>Flickr Photo Could Not Be Loaded</p>;
                this.setState({ view: msg });
            });
            this.props.onToggleIsClicked(this.props.isClicked);
        }
    }

    render() {
        const view = this.state.view;
        return (
            <div className="flickr-container">
              <h3 id="flickr-header">Flickr Data</h3>
              <ul id="flickr-links">
                { view }
              </ul>
            </div>
        );
    }
}

export default FlickrPhoto;
