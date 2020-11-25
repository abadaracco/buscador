import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Results from './components/results.js'
import ItemDetails from './components/item-details.js'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component=""/>
    <Route path="/items" component={Results}/>
    <Route path="/items/:id" component={ItemDetails}/>
  </Router>
);

export default Routes

