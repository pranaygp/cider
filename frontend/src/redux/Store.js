import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import History from '../router/History'
import * as reducers from './Reducers.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = routerMiddleware(History)

const APImiddleware = store => {
  let inFlightGets = {

  }
  return next => action => {
    if(action.type === 'GET'){
      if(!inFlightGets[action.url]){
        inFlightGets[action.url] = true;
        fetch('http://localhost:8080/api/' + action.url)
          .then(r => r.json())
          .then(data => {
            store.dispatch({
              type: 'GOT',
              url: action.url,
              data
            })
            inFlightGets[action.url] = false
          })
          .catch(e => store.dispatch({
            type: 'DID_NOT_GET',
            url: action.url
          }))
      }
    }
    return next(action)
  }
}



const Store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }), 
  composeEnhancers(
    applyMiddleware(middleware, APImiddleware),
    autoRehydrate()
  )
)

persistStore(Store)

export default Store