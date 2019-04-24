import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';
import Navigation from './components/Navigation'

class App extends Component {

  state = {
  };

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Movies />
      </React.Fragment>
    );
  }
}

export default App;
