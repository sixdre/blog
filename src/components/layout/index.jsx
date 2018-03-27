import React, { Component } from 'react';
import Header from '../header';
class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-page">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
