import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import { Route, BrowserRouter , Switch, Redirect } from 'react-router-dom';
import './styles/reset.css';
import './styles/base.less';
import 'quill/dist/quill.snow.css';  
import 'quill/dist/quill.core.css';  
import 'quill/dist/quill.bubble.css';  
import App from './App';
import Login from './views/auth/login';
import Regist from './views/auth/regist';
import NoFound from './views/auth/404';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />    
            <Route path='/app' component={App} />
            <Route path='/regist' component={Regist} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={NoFound} />
            <Redirect from='*' to='/404' />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
// <Route exact path='/' component={App} /> 
//  <Route path='/404' component={NoFound} />
//                 <Redirect from='*' to='/404' />