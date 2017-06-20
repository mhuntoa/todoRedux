import React, { Component } from 'react';
import './App.css';
import store from './store'
import { Provider } from 'react-redux'
import TaskList from './todoList'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TaskList/>
      </Provider>
    );
  }
}

export default App;
