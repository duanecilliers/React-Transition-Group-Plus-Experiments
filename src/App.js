import React, { Component } from 'react';
import BlockFader from './components/BlockFader'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <BlockFader />
        </div>
      </div>
    );
  }
}

export default App;
