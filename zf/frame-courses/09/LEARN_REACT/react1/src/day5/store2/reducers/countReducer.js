import { ADD, MINUS } from '../types'
function countReducer(state, action) {
  state = state || {
    count: 100,
    countType: "偶数"
  }
  // if (action.type == 'add') {
  //   let n = state.count + action.num;
  //   return {
  //     count: n,
  //     countType: n % 2 ? '奇数' : "偶数"
  //   }
  // } else if (action.type = 'minus') {
  //   let n = state.count - action.num;
  //   return {
  //     count: n,
  //     countType: n % 2 ? '奇数' : "偶数"
  //   }
  // } else {
  //   return {
  //     ...state
  //   }
  // }
  let n;
  console.log('countReducer')
  switch (action.type) {
    case ADD:
      n = state.count + action.num;
      return {
        count: n,
        countType: n % 2 ? '奇数' : "偶数"
      }
    case MINUS:
      n = state.count - action.num;
      return {
        count: n,
        countType: n % 2 ? '奇数' : "偶数"
      }
    default:
      return {
        ...state
      }
  }
}

export default countReducer