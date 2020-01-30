import React, { Component } from 'react';

class Header extends Component {

    render() {
        const title = 'Neighborhood Map';

        return (
            <React.Fragment>
              <header>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 text-right">
                      <h1>{title}</h1>
                    </div>
                  </div>
                  <hr />
                </div>
              </header>
            </React.Fragment>
        );
    }
}

export default Header;
