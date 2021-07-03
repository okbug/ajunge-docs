import { createStore, combineReducers, logger, thunk, hello, applyMiddleware } from './myredux'
// import thunk from 'redux-thunk'
function CountReducer(state, action) {
  state = state || {
    count: 100
  }
  switch (action.type) {
    case "ADD":
      let num = action.qqq || 1;
      num *= 2
      return {
        ...state,
        count: state.count + num
      }
    case "MINUS":
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

  switch (action.type) {
    case 'changeName':
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
let store = createStore(rootReducer, applyMiddleware(hello, logger, thunk));
// store {getState,dispatch,subscribe}

export default store
// console.log(store)
// store.getState()=>{countState:{},nameState:{}}
