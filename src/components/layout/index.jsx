import React, { Component } from 'react';
import Header from '../header';
import { BackTop } from 'antd';
class Layout extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <div className="container-page">
            {this.props.children}
        </div>
        <BackTop />
      </div>
    );
  }
}

export default Layout;
