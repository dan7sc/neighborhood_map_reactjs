import React, { Component } from 'react';
import searchIcon from '../img/outline-search-24px.svg';
import places from '../models/data';

const PLACES = places;

class PlacesList2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredList: PLACES
        };
    }

    handleInput = (e) => {
        this.props.onHandleInput(e);
    }

    handleClick = () => {
        this.props.onHandleClick();
    }

    isFiltered = (filter, element) => {
        return element.toLowerCase().includes(filter.toLowerCase());
    }

    handleFilterList = (toFilter, filter) => {
        const filteredList = toFilter.filter(item => {
            return this.isFiltered(filter, item.title);
        });
        return filteredList;
    }

    componentDidMount = () => {
        const filter = this.props.filter;
        const filtered = this.handleFilterList(PLACES, filter);
        this.setState({ filteredList: filtered });
    }

    componentDidUpdate = (prevProps) => {
        const filter = this.props.filter;
        if (filter !== '' && filter !== prevProps.filter) {
            const filtered = this.handleFilterList(PLACES, filter);
            this.setState({ filteredList: filtered });
        }
    }

    render() {
        const filteredList = this.state.filteredList;
        const filter = this.props.filter;
        const filteredListView = filteredList.map(item => {
            return <li key={item.title} onClick={this.handleClick}>{item.title}</li>;
        });
        const listView = PLACES.map(item => {
            return <li key={item.title} onClick={this.handleClick}>{item.title}</li>;
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
                { (filter === '' ) ? listView : filteredList !== '' && filteredList.length > 0 ? filteredListView : msg }
              </ul>
            </div>
        );
    }
}

export default PlacesList2;
