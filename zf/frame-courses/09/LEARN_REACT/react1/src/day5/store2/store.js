import { createStore, combineReducers, applyMiddleware } from 'redux'
import countReducer from './reducers/countReducer'
import { colorReducer } from './reducers/colorReducer'
import thunk from 'redux-thunk'
/* 
  reducer是一个纯函数 他又两个参数 state action
  必须返回一个对象 这个对象会顶替原来的来的state
*/
let rootReducer = combineReducers({
  countR: countReducer,
  colorR: colorReducer
})
console.log(rootReducer)

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store