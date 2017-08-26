// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header.js'
import { browserHistory } from 'react-router';

import Routes from './routes.js';


const styles = {
  app: {
    textAlign: 'center',
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  makeNewSearch = (searchTextInput) => {
    this.setState({ searchText: searchTextInput });
    window.location = '/items?search=' + searchTextInput;
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