import * as types from '../action-types';
/**
 * 这是Counter1组件的对应的分reducer
 * 它有自己独立的状态
 * 会由每个reducer自己维护自己的状态
 * @param {*} oldState 
 * @param {*} action 
 */
let initialState = {number:5}
const counter1 = (oldState=initialState, action) => {
    switch (action.type) {//判断动作的类型
      case types.ADD1://如果是ADD的话，返回一个新的状态
        return { number: oldState.number + 1 };
      case types.MINUS1:
      case types.MINUS:
        return { number: oldState.number - 1 };
      default:
        return oldState;
    }
}
/* const counter1InDva = {
  ADD1(){
    return { number: oldState.number + 1 };
  },
  MINUS1(){
    return { number: oldState.number - 1 };
  },
  MINUS(){
    return oldState;
  }
} */
export default counter1;