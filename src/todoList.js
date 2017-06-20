import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAction, removeAction, updateAction} from './TodoActionCreators'

class TodoList extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [],
      task:"",
      remaining:0
    }
  }
  handleChangeTask(e){
    this.setState({task:e.target.value})
  }
  handleCheckTask(e){
    var temp
    if(e.target.checked){
      temp = [...this.props.tasks]
      temp[e.target.value].done = true
    }else {
      temp = [...this.props.tasks]
      temp[e.target.value].done = false
    }
    this.props.updateAction(temp)
  }
  render(){
    return (<div>
      <h3>Task List</h3>
      <input type="text" value={this.props.task} onChange={this.handleChangeTask.bind(this)}/>
      <button onClick={this.props.addAction.bind(this,this.state.task)}>ADD</button>
      <ul>
        {this.props.tasks.map((record,index)=>
          <li id={index}>
            <input value={index} onClick={this.handleCheckTask.bind(this)} type="checkbox" name="taskList" checked={record.done} />
            {record.name}
            <button onClick={this.props.removeAction.bind(this,record.name)} value={record.name}>X</button>
          </li>
        )}
      </ul>

      <label>Remaining Task : {this.props.tasks.filter(v=>v.done===false).length}</label>
    </div>
    )
  }
}

export default connect(
  (state) => ({tasks:state.tasks}),
  (dispatch) => bindActionCreators({addAction, removeAction, updateAction}, dispatch)
)(TodoList)
