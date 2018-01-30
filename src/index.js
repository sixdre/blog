import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,HashRouter,Redirect   } from 'react-router-dom';
import './styles/reset.css';
import './styles/base.less';
import App from './App';
import Home from './views/home';
import Article from './views/article';
import NoFound from './views/auth/404';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <HashRouter>
        <div>
            <App>
                <Route path="/home" component={Home} />
                <Route path="/article/:id" component={Article} />
               
            </App>   
            
        </div>    
	</HashRouter> 
	,document.getElementById('root'));
registerServiceWorker();
//  <Route path='/404' component={NoFound} />
//                 <Redirect from='*' to='/404' />