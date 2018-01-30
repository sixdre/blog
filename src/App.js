import React, { Component } from 'react';
import { BrowserRouter as Router, Route,HashRouter   } from 'react-router-dom';
import Header from './components/header';
import Home from './views/home';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          {this.props.children}
      </div>
    );
  }
}

export default App;
