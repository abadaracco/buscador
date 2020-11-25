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
      <div className="result-item-container">
        <div className="item-image">
          <img src={this.props.picture} />
        </div>
        <div className="item-info">
          <div className="item-top-text">
            <span className="item-price">
              {this.props.price.currency === 'USD' ? 'U$S' : '$'}{this.props.price.amount}</span>
            {this.props.free_shipping && <img src={require('../images/ic_shipping@2x.png')}/>}
            <span className="item-location">{this.props.address.barrio} - {this.props.address.direccion}</span>
          </div>
          <a href={this.props.link} target="_blank" className="item-title">{this.props.title}</a>
        </div>
      </div>
    )
  }
}

export default ResultItem