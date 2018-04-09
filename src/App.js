import React, { Component } from 'react';
import { Router, Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import history from './history';
import 'antd/dist/antd.less';
import './styles/reset.css';
import './styles/base.less';


import Home from './views/home';
import Article from './views/article';
import Personal from './views/personal';
import Write from './views/write/write';
import Login from './views/auth/login';
import Regist from './views/auth/regist';
import NoFound from './views/auth/404';


class App extends Component {

  render() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Home} />    
                <Route path='/article/:id' component={Article} />
				<Route path='/write' component={Write} />
				<Route path='/users/:id' component={Personal} />
                <Route path='/regist' component={Regist} />
                <Route path='/login' component={Login} />
                <Route path='/404' component={NoFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        </Router>
    );
  }
}
// <Route exact path='/' component={App} /> 
//  <Route path='/404' component={NoFound} />
//                 <Redirect from='*' to='/404' />
export default App;
