import React from 'react';
import Router from './Router'
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

function Admin({ routes, loggedInUser }) {
  // TODO remove this line to use login functionality
  loggedInUser = 'fake';
  return (typeof loggedInUser === 'undefined' && (
    <Redirect to="/login" />
  )) || (
    <div className="container">
        <h1 style={{textAlign:'center'}}>Admin</h1>
        <Router routes={routes} />
    </div>
  );
}

Admin.defaultProps = {
  routes:PropTypes.array.isRequired,
};

export default Admin;
