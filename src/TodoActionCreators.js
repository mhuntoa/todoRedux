export function addAction(task){
  return {
    type:"ADDLIST",
    task
  }
}
export function removeAction(task){
  return {
    type:"REMOVELIST",
    task
  }
}
export function updateAction(task){
  return {
    type:"UPDATELIST",
    task
  }
}
