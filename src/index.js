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
    searchResult: {}
  };

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