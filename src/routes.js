import React from 'react';
import { Router, Route } from 'react-router';

import Results from './components/results.js'
import ItemDetails from './components/item-details.js'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/results" component={Results}/>
    <Route path="/details" component={ItemDetails}/>
  </Router>
);

export default Routes

