import React, { Component } from 'react'
import ResultItem from './result-item.js'
import results from '../data.js'
require('../styles/results.scss');

const categories = [];

class Results extends Component {
  state = {
    categories: ["Celulares y Teléfonos", "Celulares y Smartphones", "iPhone"]
  };

  render() {
    return(
      <div className="results-container">
        <div className="results-header">
          Aca van las categorias
        </div>
        <div className="items-container">
          {results.map(result => <ResultItem key={result.id} {...result}/>)}
        </div>
      </div>
    )
  }
}

export default Results
