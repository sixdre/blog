import React, { Component } from 'react';
import { Route, BrowserRouter , Switch, Redirect } from 'react-router-dom';
import './styles/reset.css';
import './styles/base.less';
import 'quill/dist/quill.snow.css';  
import 'quill/dist/quill.core.css';  
import 'quill/dist/quill.bubble.css';  

import Home from './views/home';
import Article from './views/article';
import Login from './views/auth/login';
import Regist from './views/auth/regist';
import NoFound from './views/auth/404';

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />    
                <Route path='/article/:id' component={Article} />
                <Route path='/regist' component={Regist} />
                <Route path='/login' component={Login} />
                <Route path='/404' component={NoFound} />
                <Redirect from='*' to='/404' />
            </Switch>
        </BrowserRouter>
    );
  }
}
// <Route exact path='/' component={App} /> 
//  <Route path='/404' component={NoFound} />
//                 <Redirect from='*' to='/404' />
export default App;
