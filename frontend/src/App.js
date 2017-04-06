import React, { Component } from 'react';
import logo from './logo.svg';
import { Grid, Row, Col } from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
        </Row>
        <Row>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </Row>
      </Grid>
    );
  }
}

export default App;
