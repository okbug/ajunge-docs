import { createStore, applyMiddleware, combineReducers } from 'redux'
import { CounterReducer } from './reducers/count'
import { userReducer } from './reducers/user'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
  countState: CounterReducer,
  userInfo: userReducer
})
let store = createStore(rootReducer, applyMiddleware(thunk))

export default store