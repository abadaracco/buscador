import React, { Component } from 'react'
require('../styles/results.scss');

class ResultItem extends Component {
  state = {

  };

  handleClick = (event) => {
    event.preventDefault();
    window.location = '/items/' + this.props.id;
  };

  render() {
    return(
      <div className="result-item-container" onClick={this.handleClick}>
        <div className="item-image">
          <img src={this.props.picture} />
        </div>
        <div className="item-info">
          <div className="item-top-text">
            <span className="item-price">${this.props.price.amount}</span>
            {this.props.free_shipping && <img src={require('../images/camion.png')}/>}
            <span className="item-location">{this.props.address.state_name}</span>
          </div>
          <div className="item-title">{this.props.title}</div>
        </div>
      </div>
    )
  }
}

export default ResultItem