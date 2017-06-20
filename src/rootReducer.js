const addReducer = (state,action)=> ({...state,tasks:[...state.tasks,{name:action.task,done:false}]})
const removeReducer = (state,action)=> ({tasks: state.tasks.filter(w=>w.name!==action.task)})
const updateReducer = (state,action)=> ({tasks: action.task})

export const rootReducer = (state,action)=>{
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
