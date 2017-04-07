import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css'

import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar.js'

import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Store from './redux/Store'
import History from './router/History'

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <div>
        <NavBar />
        <Route component={Home} exact path="/" />
        <Route component={About} exact path="/about" />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
