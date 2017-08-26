import React, { Component } from 'react'
import axios from 'axios'
import FontAwesome from  'react-fontawesome';
require('../styles/header.scss');

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchInput);
  };

  render() {
    return(
      <div className="header-container">
        <div className="header-logo">
          <img src={require('../images/Logo_ML@2x.png')}/>
        </div>
        <div className="header-input">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Nunca dejes de buscar"
              onChange={(event) => {this.setState({ searchInput: event.target.value })}}/>
            <button type="submit" className="header-button"><img src={require('../images/lupa.png')} /></button>
          </form>
        </div>
      </div>
    )
  }
}

export default Header

