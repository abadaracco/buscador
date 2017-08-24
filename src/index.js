// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header.js'
import { browserHistory } from 'react-router';

import Routes from './routes.js';


const styles = {
  app: {
    textAlign: 'center',
  },
}

class App extends Component {
  state = {
    searchResult: {},
    search: 'Iphone 6 plus'
  };

  componentWillMount() {
    const url = 'http://localhost:3000/api/items?q=Iphone 6' ;
    fetch(url)
      .then((res) => {
        console.log('hello world', res);
      })
      .then((resThen) => {
        console.log('hello world then')
      });

    fetch('http://localhost:3000/api/items/23234234')
      .then((res) => {
        console.log('hello', res);
      })
      .then((resThen) => {
        console.log('hello then')
      })
  }

  makeNewSearch = (searchTextResult) => {
    console.log(searchTextResult);
    this.setState({ searchResult: searchTextResult });
  };

  render() {
    return (
      <div style={styles.app}>
        <Header onSubmit={this.makeNewSearch} />
        <Routes history={browserHistory} />
      </div>
    )
  }
}

const root = document.querySelector('#app');
ReactDOM.render(<App />, root);