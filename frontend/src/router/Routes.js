import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../pages/Home';
import About from '../pages/About';

const Routes = () => {
  return (
    <div>
      <Route component={Home} exact path="/" />
      <Route component={About} exact path="/about" />
    </div>
  );
};

export default Routes;