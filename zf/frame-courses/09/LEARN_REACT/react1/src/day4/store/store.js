import { createStore } from 'redux'

/* 
  reducer是一个纯函数 他又两个参数 state action
  必须返回一个对象 这个对象会顶替原来的来的state
*/
function reducer(state, action) {
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
let store = createStore(reducer)

export default store