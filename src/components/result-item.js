import React, { Component } from 'react'
require('../styles/results.scss');

class ResultItem extends Component {
  state = {

  };

  render() {
    return(
      <div className="result-item-container">
        <div className="item-image">
          <img src={this.props.thumbnail} />
        </div>
        <div className="item-info">
          <div className="item-top-text">
            <span className="item-price">${this.props.price}</span>
            <span className="item-location">{this.props.address.state_name}</span>
          </div>
          <div className="item-title">{this.props.title}</div>
        </div>
      </div>
    )
  }
}

export default ResultItem