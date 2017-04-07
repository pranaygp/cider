import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import History from '../router/History'
import * as reducers from './Reducers.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = routerMiddleware(History)

const Store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }), 
  composeEnhancers(
    applyMiddleware(middleware)
  )
)

export default Store