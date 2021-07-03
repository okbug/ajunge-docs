import { combineReducers } from 'redux'
import { userReducer } from './user'


let rootReducer = combineReducers({
  userInfo: userReducer
})

export default rootReducer