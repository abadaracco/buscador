import React, { Component } from 'react'
import ResultItem from './result-item.js'
import axios from 'axios'
require('../styles/results.scss');

const categories = [];

class Results extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="results-container">
        <div className="results-header">
          {this.state.data.categories && this.state.data.categories.map((category, index) => {
              if (index === this.state.data.categories.length - 1) {
                return <span key={index}> {category} </span>
              } else {
                return <span key={index}> {category} > </span>
              }
          }
          )}
        </div>
        <div className="items-container">
          {this.state.data.items && this.state.data.items.map((result, index) => {
              return (index < 4) && <ResultItem key={result.id} {...result}/>
          }
          )}
        </div>
      </div>
    )
  }
}

export default Results
