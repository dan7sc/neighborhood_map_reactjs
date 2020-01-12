import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';
import PlacesList from './PlacesList';
import places from '../models/data';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        };
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({
            filter: e.target.value
        });
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
                        <PlacesList places={places} filter={this.state.filter} />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Map id='map' mapOptions={mapOptions} places={places} filter={this.state.filter} />
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
