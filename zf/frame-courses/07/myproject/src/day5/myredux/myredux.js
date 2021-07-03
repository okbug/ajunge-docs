export function createStore(reducer, fn) {
  let state;// 用来存储数据的
  let listeners = [];
  function getState() {
    return JSON.parse(JSON.stringify(state))
  }
  function subscribe(f) {
    listeners.push(f)
    return function () {
      listeners = listeners.filter(item => item !== f)
    }
  }
  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(f => {
      typeof f === 'function' && f()
    })
  }
  dispatch({})
  // debugger
  if (typeof fn === 'function') {
    return fn(createStore)(reducer)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

export function combineReducers(obj) {
  return function rootReducer(state, action) {
    state = state || {};
    Object.keys(obj).forEach(key => {
      state[key] = obj[key](state[key], action)
    })
    return state
  }
}

function compose(...fs) {
  let first = fs.shift()
  return function (...arg) {
    return fs.reduce((prev, cur) => {
      return cur(prev)
    }, first(...arg))
  }
}
export function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer)
      // let middle = middleware(store)
      let middles = middlewares.map(item => item(store))
      // debugger
      // let tempDispatch = middle(store.dispatch)
      let f = compose(...middles)
      let tempDispatch = f(store.dispatch)
      return {
        ...store,
        // dispatch: tempDispatch,
        dispatch: function (action) {
          // debugger
          return tempDispatch(action)
        }
      }
    }
  }
}

// export function thunk(store) {
//   return function (dispatch) {
//     return function (action) {
//       // 这个函数才是用来替代 redux中的dispatch的
//       if (typeof action === 'function') {
//         return action(dispatch, store.getState);
//       }
//       return dispatch(action);
//     }
//   }
// }

export const thunk = store => dispatch => action => {
  if (typeof action === 'function') {
    return action(dispatch, store.getState);
  }
  return dispatch(action);
}

export let logger = store => dispatch => action => {
  console.log(store.getState());
  let res = dispatch(action);
  console.log(store.getState())
  return res
};

export let hello = store => dispatch => action => {
  console.log('hello中间件')
  return dispatch(action);
}

