import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Map from './Map';

class Main extends Component {
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
                    <div className="col-sm-12 col-md-12">
                      <Map id='map' mapOptions={mapOptions} />
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
