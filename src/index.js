// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header.js'
import axios from "axios";
import Results from './components/results.js'


const styles = {
  app: {
    textAlign: 'center',
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      showResults: false,
      refresh: false,
      data: [],
    };
  }

  makeNewSearch = (barrios) => {
    //this.setState({ searchText: searchTextInput });
    console.log(barrios);
    const resultsUrl = 'http://localhost:3000/api/items';
    this.setState({showResults: false})

    axios.post(resultsUrl, {barrios}).then(res => {
      this.setState({data: res.data, showResults: true, refresh: !this.state.refresh});
      console.log('busco!:', res.data)
    }).catch(err => console.log(err));
  };

  render() {
    return (
      <div style={styles.app}>
        <Header onSubmit={this.makeNewSearch} />
        {this.state.showResults && <Results data={this.state.data}/>}
      </div>
    )
  }
}

const root = document.querySelector('#app');
ReactDOM.render(<App />, root);