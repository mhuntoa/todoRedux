import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'

const addReducer = (state,action)=> ({...state,tasks:[...state.tasks,{name:action.task,done:false}]})
const removeReducer = (state,action)=> ({tasks: state.tasks.filter(w=>w.name!==action.task)})
const updateReducer = (state,action)=> ({tasks: action.temp})

const rootReducer = (state,action)=>{
  switch(action.type){
    case "ADDLIST":
      return addReducer(state,action)
    case "REMOVELIST":
      return removeReducer(state,action)
    case "UPDATELIST":
      return updateReducer(state,action)
    default:
      return {...state}
  }
}

const store = createStore(rootReducer,{tasks:[]},applyMiddleware(logger))

const addAction = (task)=> ({type:"ADDLIST",task})
const removeAction = (task)=> ({type:"REMOVELIST",task})
const updateAction = (temp)=> ({type:"UPDATELIST",temp})

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      task:"",
      remaining:0
    }
  }
  componentDidMount(){
    const {tasks} = store.getState()
    this.setState({tasks})

    store.subscribe(()=>{
      const {tasks} = store.getState()
      this.setState({tasks})
    })
  }
  handleChangeTask(e){
    this.setState({task:e.target.value})
  }
  handleCheckTask(e){
    var temp
    if(e.target.checked){
      temp = [...this.state.tasks]
      temp[e.target.value].done = true
    }else {
      temp = [...this.state.tasks]
      temp[e.target.value].done = false
    }
    store.dispatch(updateAction(temp))
  }
  handleAddTask(taskName){
    store.dispatch(addAction(taskName))
  }
  handleRemoveTask(taskName){
    store.dispatch(removeAction(taskName))
  }
  render(){
    return (<div>
      <h3>Task List</h3>
      <input type="text" value={this.state.task} onChange={this.handleChangeTask.bind(this)}/>
      <button onClick={this.handleAddTask.bind(this,this.state.task)}>ADD</button>
      <ul>
        {this.state.tasks.map((record,index)=>
          <li id={index}>
            <input value={index} onClick={this.handleCheckTask.bind(this)} type="checkbox" name="taskList" checked={record.done} />
            {record.name}
            <button onClick={this.handleRemoveTask.bind(this,record.name)} value={record.name}>X</button>
          </li>
        )}
      </ul>
      <label>Remaining Task : {this.state.tasks.filter(v=>v.done===false).length}</label>
    </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <TodoList/>
    );
  }
}

export default App;
