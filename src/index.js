import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, HashRouter, Redirect, Switch } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);
// console.log(store.getState().user.username)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
