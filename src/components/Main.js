import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import PlacesList from './PlacesList';
import places from '../models/data';
import gmapsApi from '../apis/google-maps/api';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            filteredMarkers: [],
            filteredPlaces: [],
            markers: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
        this.handleFilterMarkers = this.handleFilterMarkers.bind(this);
        this.handleFilterPlaces = this.handleFilterPlaces.bind(this);
    }

    handleInput(e) {
        this.setState({
            filter: e.target.value
        });
    }

    handleMarkers(markers) {
        this.setState({ markers });
    }

    handleFilterMarkers(markers, filter) {
        const filteredMarkers = gmapsApi.filterMarkers(markers, filter);
        this.setState({ filteredMarkers });
    }

    handleFilterPlaces(places, filter) {
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
        const mapOptions = {
            center: { lat: 40.7413549, lng: -73.9980244 },
            zoom: 13
        };

        return (
            <div>
              <Header />
              <main>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3">
                      <div>
                        <input onChange={this.handleInput} type="text" placeholder="Search" size="30" />
                        <PlacesList
                          places={places}
                          filter={this.state.filter}
                          filteredPlaces={this.state.filteredPlaces}
                          onFilterPlaces={this.handleFilterPlaces} />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Map
                        id='map'
                        mapOptions={mapOptions}
                        places={places}
                        markers={this.state.markers}
                        filter={this.state.filter}
                        filteredMarkers={this.state.filteredMarkers}
                        onHandleMarkers={this.handleMarkers}
                        onFilterMarkers={this.handleFilterMarkers} />
                    </div>
                  </div>
                </div>
              </main>
              <Footer />
            </div>
        );
    }
}

export default Main;
