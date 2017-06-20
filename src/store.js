import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'

const store = createStore(
  rootReducer,
  {tasks:[]},applyMiddleware(logger)
)

export default store
