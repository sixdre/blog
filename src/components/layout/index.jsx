import React, { Component } from 'react';
import Header from '../header';
class Layout extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <div className="container-page">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
