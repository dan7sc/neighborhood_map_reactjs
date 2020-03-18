import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScriptLoader from './ScriptLoader';
import PlacesList from './PlacesList2';
// import places from '../models/data';
// import Map from './Map2';
// import Markers from './Markers2';
// import gmapsApi from '../apis/google-maps/api';
// import utils from '../utils/utils';

const APPKEY = process.env.REACT_APP_KEY;
const ID = 'map';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            // filteredMarkers: [],
            // filteredPlaces: [],
            // markers: [],
            // clickedMarker: null,
            // isClicked: false,
            // infowindow: null,
            // map: null,
            // google: null,
            // places: places,
            // data: []
        };
        //this.handleInput = this.handleInput.bind(this);
    }

    handleInput = (e) => {
        this.setState({
            filter: e.target.value
        });
    }

    render() {
        const filter = this.state.filter;
        return (
            <div>
              <Header />
              <main>
                <div className="container-fluid">
                  <div className="row no-gutters">
                    <div className="col-md-3">
                      <PlacesList
                        filter={filter}
                        onHandleInput={this.handleInput} />
                    </div>
                    <div className="col-md-9">
                      <ScriptLoader
                        id={ID}
                        appKey={APPKEY}
                        filter={filter} >
                      </ScriptLoader>
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

    // handleInput(e) {
    //     this.setState({
    //         filter: e.target.value
    //     });
    // }

    // handleMarkers(markers) {
    //     this.setState({ markers });
    // }

    // handleInfowindow(infowindow) {
    //     this.setState({ infowindow });
    // }

    // handleMap(map) {
    //     this.setState({ map });
    // }

    // async handleShowInfoWindow(map, infowindow, marker) {
    //     const data = await utils.requestFoursquareData(marker);
    //     // const data2 = await utils.requestFlickrData(marker);
    //     // console.log(data, data2);
    //     // data.push(data2);
    //     this.setState({ clickedMarker: marker });
    //     this.setState({ isClicked: true });
    //     this.setState({ data });
    //     gmapsApi.showInfoWindow(map, infowindow, marker, this.state.data);
    // }

    // handleRequestData(data) {
    //     this.setState({ data: data });
    // }

    // toggleIsClicked(isClicked) {
    //     this.setState({ isClicked: !isClicked });
    // }

    // handleFilterMarkers(markers, filter) {
    //     const filteredMarkers = gmapsApi.filterMarkers(markers, filter);
    //     this.setState({ filteredMarkers });
    // }

    // handleFilterPlaces(places, filter) {
    //     const filteredPlaces = [];
    //     const size = places.length;
    //     for(let i = 0; i < size; i++) {
    //         if(places[i].title.toLowerCase().includes(filter.toLowerCase())) {
    //             filteredPlaces.push(places[i]);
    //         }
    //     }
    //     this.setState({ filteredPlaces });
    // }


// <PlacesList
//   places={places}
//   filter={this.state.filter}
//   filteredMarkers={this.state.filteredMarkers}
//   map={this.state.map}
//   infowindow={this.state.infowindow}
//   markers={this.state.markers}
//   onShowInfoWindow={this.handleShowInfoWindow}
//   onFilterMarkers={this.handleFilterMarkers}
//   onHandleInput={this.handleInput}
//   filteredPlaces={this.state.filteredPlaces}
//   onFilterPlaces={this.handleFilterPlaces} />

// <Map
//   id='map'
//   mapOptions={mapOptions}
//   places={places}
//   infowindow={this.state.infowindow}
//   onHandleInfowindow={this.handleInfowindow}
//   map={this.state.map}
//   onHandleMap={this.handleMap}
//   markers={this.state.markers}
//   filter={this.state.filter}
//   filteredMarkers={this.state.filteredMarkers}
//   onShowInfoWindow={this.handleShowInfoWindow}
//   onHandleMarkers={this.handleMarkers}
//   onFilterMarkers={this.handleFilterMarkers} />
