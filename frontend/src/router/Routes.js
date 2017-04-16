import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Routes = () => {
  return (
    <div>
      <Route component={Home} exact path="/" />
      <Route component={Profile} exact path="/profile" />
      <Route component={Login} exact path="/login" />
      <Route component={SignUp} exact path="/signup" />
    </div>
  );
};

export default Routes;