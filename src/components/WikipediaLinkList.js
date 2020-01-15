import React, { Component } from 'react';
import $ from 'jquery';


class WikipediaLinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wikipediaLinkList: [],
            failWikipediaConnection: false
        };
        this.ajaxRequest = this.ajaxRequest.bind(this);
    }

    ajaxRequest(url) {
        const self = this;
        const wikiRequestTimeout = setTimeout(function() {
            self.setState({ failWikipediaConnection: true});
        }, 5000);
        
        const resolve = async () => $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "callback",
            success: await function( response ) {
                clearTimeout(wikiRequestTimeout);
            }
        });
        return resolve;
    }

    render() {
        const list = [];
        let listToShow = [];
        const errorMessage = <h5>{'---> Failed to get wikipedia resources <---'}</h5>;
        const marker = this.props.marker;
        let previousMarker = null;
        const url = 'http://en.wikipedia.org/wiki/';

        if (marker != null || marker !== previousMarker) {
            previousMarker = marker;
            const title = marker.title.toString();
            const apiUrl = `http://en.wikipedia.org/w/api.php?action=opensearch&search=${title}&format=json`;
            const request = this.ajaxRequest(apiUrl);
            request().then(response => {
                if (this.state.failWikipediaConnection === true) this.setState({ failWikipediaConnection: false});
                response[1].forEach(item => {
                   list.push(item);
                });
                this.setState({ wikipediaLinkList: list });
            }).catch((e) => {
                if (this.state.failWikipediaConnection === false) this.setState({ failWikipediaConnection: true });
                console.log('Error:', e.status);
            });
            listToShow = this.state.wikipediaLinkList.map(item => {
                return <li key={item}><a href={url+item}>{item}</a></li>;
            });
        }

        return (
            <div>
              <h3>Relevant Wikipedia Links</h3>
              <ul>
                { this.state.failWikipediaConnection ? errorMessage : listToShow }
              </ul>
            </div>
        );
    }
}

export default WikipediaLinkList;
