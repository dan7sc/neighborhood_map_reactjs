import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import PlacesList from './PlacesList';
import places from '../models/data';
import gmapsApi from '../apis/google-maps/api';
import WikipediaLinkList from '../components/WikipediaLinkList';
import FoursquareList from '../components/FoursquareList';
import FlickrPhoto from '../components/FlickrPhoto';
import utils from '../utils/utils';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            filteredMarkers: [],
            filteredPlaces: [],
            markers: [],
            clickedMarker: null,
            isClicked: false,
            infowindow: null,
            map: null,
            data: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleMarkers = this.handleMarkers.bind(this);
        this.handleInfowindow = this.handleInfowindow.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.handleShowInfoWindow = this.handleShowInfoWindow.bind(this);
        this.handleFilterMarkers = this.handleFilterMarkers.bind(this);
        this.handleFilterPlaces = this.handleFilterPlaces.bind(this);
        this.handleRequestData = this.handleRequestData.bind(this);
        this.toggleIsClicked = this.toggleIsClicked.bind(this);
    }

    handleInput(e) {
        this.setState({
            filter: e.target.value
        });
    }

    handleMarkers(markers) {
        this.setState({ markers });
    }

    handleInfowindow(infowindow) {
        this.setState({ infowindow });
    }

    handleMap(map) {
        this.setState({ map });
    }

    async handleShowInfoWindow(map, infowindow, marker) {
        const data = await utils.requestFoursquareData(marker);
        // const data2 = await utils.requestFlickrData(marker);
        // console.log(data, data2);
        // data.push(data2);
        this.setState({ clickedMarker: marker });
        this.setState({ isClicked: true });
        this.setState({ data });
        gmapsApi.showInfoWindow(map, infowindow, marker, this.state.data);
    }

    handleRequestData(data) {
        this.setState({ data: data });
    }

    toggleIsClicked(isClicked) {
        this.setState({ isClicked: !isClicked });
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
                          filteredMarkers={this.state.filteredMarkers}
                          map={this.state.map}
                          infowindow={this.state.infowindow}
                          markers={this.state.markers}
                          onShowInfoWindow={this.handleShowInfoWindow}
                          onFilterMarkers={this.handleFilterMarkers}
                          filteredPlaces={this.state.filteredPlaces}
                          onFilterPlaces={this.handleFilterPlaces} />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Map
                        id='map'
                        mapOptions={mapOptions}
                        places={places}
                        infowindow={this.state.infowindow}
                        onHandleInfowindow={this.handleInfowindow}
                        map={this.state.map}
                        onHandleMap={this.handleMap}
                        markers={this.state.markers}
                        filter={this.state.filter}
                        filteredMarkers={this.state.filteredMarkers}
                        onShowInfoWindow={this.handleShowInfoWindow}
                        onHandleMarkers={this.handleMarkers}
                        onFilterMarkers={this.handleFilterMarkers} />
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <FoursquareList
                        isClicked={this.state.isClicked}
                        onToggleIsClicked={this.toggleIsClicked}
                        data={this.state.data}
                        onHandleRequestData={this.handleRequestData}
                        marker={this.state.clickedMarker} />
                    </div>
                    <div className="col-md-4">
                      <FlickrPhoto
                        isClicked={this.state.isClicked}
                        onToggleIsClicked={this.toggleIsClicked}
                        marker={this.state.clickedMarker} />
                    </div>
                    <div className="col-md-4">
                      <WikipediaLinkList
                        isClicked={this.state.isClicked}
                        onToggleIsClicked={this.toggleIsClicked}
                        marker={this.state.clickedMarker} />
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
