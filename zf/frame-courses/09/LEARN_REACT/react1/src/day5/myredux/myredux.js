export function createStore(reducer, fn) {
  let state; // 用来存储根state
  let callbacks = [];
  function getState() {
    return state && JSON.parse(JSON.stringify(state))
  }
  function dispatch(action) {
    state = reducer(state, action)
    // 数据更新完成之后 触发callbacks中的回调函数
    callbacks.forEach(f => {
      f()
    })
  }
  function subscribe(f) {
    callbacks.push(f);
    return function () {
      callbacks = callbacks.filter(val => val !== f)
    }
  }
  dispatch({})// 就是为了初始的那一次的渲染的时候能够获取到正常的初始值
  if (typeof fn == 'function') {
    return fn(createStore)(reducer)
  }
  return {
    getState, dispatch, subscribe
  }
}

/* export function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer)
      // store--->{getState, dispatch, subscribe}
      let middle = middleware(store)
      let middleDispatch = middle(store.dispatch)
      return {
        ...store,
        dispatch: middleDispatch
      }
    }
  }
} */

export function combineReducers(obj) {
  return function rootReducer(state, action) {
    state = state || {};
    Object.keys(obj).forEach(key => {
      //debugger
      state[key] = obj[key](state[key], action)
    })
    return state;
  }
}

// export function mythunk(store) {
//   return function (dispatch) {
//     return function (action) {
//       if (typeof action == 'function') {
//         return action(dispatch, store.getState)
//       }
//       return dispatch(action)
//     }
//   }
// }

//用户使用的dispatch 是 thunk产生的dispatch  
// thunk 当中使用的dispatch 是 logger产生的dispatch
export const mythunk = store => dispatch => {
  // console.log('mythunk', dispatch)
  return action => {
    // debugger
    if (typeof action == 'function') {
      return action(dispatch, store.getState)
    }
    return dispatch(action)
  }
}

export const logger = store => dispatch => action => {
  // debugger
  console.log('old data', store.getState())
  let res = dispatch(action)
  console.log('new data', store.getState())
  return res;
}


export function compose(...fns) {
  let last = fns.pop()
  return function (...arg) {
    return fns.reduceRight((prev, cur) => {
      return cur(prev)
    }, last(...arg))
  }
}

export function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer)
      // store--->{getState, dispatch, subscribe}
      let middles = middlewares.map(item => item(store))
      // debugger
      // let middleDispatch = middles.map(item => item(store.dispatch))
      // middles [thunk,looger]
      let f3 = compose(...middles)
      let middleDispatch = f3(store.dispatch)
      console.log('middleDispatch', middleDispatch)
      return {
        ...store,
        dispatch: middleDispatch
      }
    }
  }
}