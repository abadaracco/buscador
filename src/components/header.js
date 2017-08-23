import React, { Component } from 'react'
import axios from 'axios'
import FontAwesome from  'react-fontawesome';
require('../styles/header.scss');

class Header extends Component {
  state = {
    searchInput: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Event input', this.state.searchInput);
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=:' + this.state.searchInput)
      .then(resp => {
      this.props.onSubmit(resp.data);
    });
  };

  render() {
    return(
      <div className="header-container">
        <div className="header-input">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Nunca dejes de buscar"
              onChange={(event) => {this.setState({ searchInput: event.target.value })}}/>
            <button type="submit" className="header-lupa"><FontAwesome name="search" size='2x' style={{color: '#111111'}}/></button>
          </form>
        </div>
      </div>
    )
  }
}

export default Header

