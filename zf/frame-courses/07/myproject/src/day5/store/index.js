import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ADD, MINUS, CHANGENAME } from './types'
import thunk from 'redux-thunk'

/* 
纯函数  提供初始状态    修改状态
*/
function CountReducer(state, action) {
  state = state || {
    count: 100,
    name: 123,
    age: 345
  }
  switch (action.type) {
    case ADD:
      let num = action.qqq || 1;
      num *= 2
      return {
        ...state,
        count: state.count + num
      }
    case MINUS:
      return {
        ...state,
        count: state.count - action.www
      }
    default:
      return {
        ...state
      }
  }
}

let nameInit = {
  name: "珠峰"
}
function NameReducer(state, action) {
  state = state || nameInit
  // if (action.name) {
  //   return {
  //     ...state,
  //     name: action.name
  //   }
  // } else {
  //   return {
  //     ...state
  //   }
  // }
  // return {
  //   ...state,
  //   name: action.name || state.name
  // }


  switch (action.type) {
    case CHANGENAME:
      return {
        ...state,
        name: action.name
      }

    default:
      return {
        ...state
      }
  }
}

let rootReducer = combineReducers({
  countState: CountReducer,
  nameState: NameReducer
})


let store = createStore(rootReducer, applyMiddleware(thunk))



export default store

// store.getState()=>{countState:{},nameState:{}}