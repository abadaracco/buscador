import React, { Component } from 'react'
import ResultItem from './result-item.js'
import axios from 'axios'
require('../styles/results.scss');

const categories = [];

class Results extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {

    const resultsUrl = 'http://localhost:3000/api/items?q=' + this.props.location.query.search;

    axios.get(resultsUrl).then(res => {
      console.log(res);
      this.setState({data: res.data});
    });

  }

  render() {
    return(
      <div className="results-container">
        <div className="results-header">
          Aca van las categorias
        </div>
        <div className="items-container">
          {this.state.data.items && this.state.data.items.map(result => <ResultItem key={result.id} {...result}/>)}
        </div>
      </div>
    )
  }
}

export default Results
