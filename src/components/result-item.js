import React, { Component } from 'react'
require('../styles/results.scss');

class ResultItem extends Component {
  state = {

  };

  render() {
    return(
      <div className="result-item-container">
        <div className="item-image">
          <img src={this.props.picture} />
        </div>
        <div className="item-info">
          <div className="item-top-text">
            <span className="item-price">${this.props.price.amount}</span>
            <span className="item-location">{this.props.address.state_name}</span>
          </div>
          <div className="item-title">{this.props.title}</div>
        </div>
      </div>
    )
  }
}

export default ResultItem