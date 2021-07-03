// import { createStore ,combineReducers,applyMiddleware} from 'redux'
import { createStore, combineReducers, applyMiddleware } from './myredux'
// import thunk from 'redux-thunk'
import { mythunk, logger } from './myredux'

function countReducer(state, action) {
  state = state || { count: 100, name: "珠峰" };
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + action.num
      }
    case 'minus':
      return {
        ...state,
        count: state.count - action.num
      }
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
function colorReducer(state, action) {
  state = state || {
    color: 'red'
  }
  console.log('colorReducer')
  switch (action.type) {
    case 'changeColor':
      return {
        ...state,
        color: action.color
      }

    default:
      return {
        ...state
      }
  }
}
let rootReducer = combineReducers({
  countR: countReducer,
  colorR: colorReducer
})
let store = createStore(rootReducer, applyMiddleware(mythunk, logger))
// store {getState,dispatch,subscribe}

export default store


/*
state :{
  countR:{count:xxx},
  colorR:{color:xxx}
}


*/