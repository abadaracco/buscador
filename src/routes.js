import React from 'react';
import { Router, Route } from 'react-router';

import Results from './components/results.js'
import ItemDetails from './components/item-details.js'

const EmptyComponent = (props) => {
  return (
    <div>Hello World!</div>
  )
};

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={EmptyComponent}/>
    <Route path="/items" component={Results}/>
    <Route path="/items/:id" component={ItemDetails}/>
  </Router>
);

export default Routes

