import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css'

import NavBar from './components/NavBar.js'

import { Provider } from 'react-redux'

import { ConnectedRouter } from 'react-router-redux'

import Store from './redux/Store'
import History from './router/History'
import Routes from './router/Routes'

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <div>
        <NavBar />
        <Routes />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
