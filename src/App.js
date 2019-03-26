import React, { Component, useState } from 'react';

import Task from './components/task/task';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Task/>
      </div>
    );
  }
}

export default App;
