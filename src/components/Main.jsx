import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScriptLoader from './ScriptLoader';
import PlacesList from './PlacesList2';

const APPKEY = process.env.REACT_APP_KEY;
const ID = 'map';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            clickedPlace: null
        };
    }

    handleInput = (e) => {
        this.setState({
            filter: e.target.value
        });
    }

    handleClick = (clickedPlace) => {
        this.setState({ clickedPlace });
    }

    render() {
        const { filter, clickedPlace } = { ...this.state };
        return (
            <div>
              <Header />
              <main>
                <div className="container-fluid">
                  <div className="row no-gutters">
                    <div className="col-md-3">
                      <PlacesList
                        filter={filter}
                        onHandleInput={this.handleInput}
                        onHandleClick={this.handleClick} />
                    </div>
                    <div className="col-md-9">
                      <ScriptLoader
                        id={ID}
                        appKey={APPKEY}
                        filter={filter}
                        clickedPlace={clickedPlace}
                        onHandleClick={this.handleClick} >
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
