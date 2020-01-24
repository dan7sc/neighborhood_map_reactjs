import React, { Component } from 'react';
import wikiApi from '../apis/wikipedia/api';


class WikipediaLinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: [],
        };
    }

    componentDidUpdate() {
        const list = [];
        const marker = this.props.marker;
        const url = 'http://en.wikipedia.org/wiki/';

        if (marker != null && this.props.isClicked === true) {
            const request = wikiApi.getData(marker);
            request.then((response) => {
                response[1].forEach(item => {
                    list.push(<li key={item}><a href={url+item}>{item}</a></li>);
                });
                this.setState({ view: list });
            }).catch(() => {
                const errorMessage = <h5 key='error'>Failed to get wikipedia resources</h5>;
                list.push(errorMessage);
                this.setState({ view: list });
            });
        }
    }

    render() {
        const view = this.state.view;
        return (
            <div>
              <h3>Relevant Wikipedia Links</h3>
              <ul>
                { view }
              </ul>
            </div>
        );
    }
}

export default WikipediaLinkList;
