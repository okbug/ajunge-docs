import * as types from '../action-types';
/**
 * 这是Counter1组件的对应的分reducer
 * 它有自己独立的状态
 * @param {*} oldState 
 * @param {*} action 
 */
let initialState = {number:10,color:''}
const counter2 = (oldState=initialState, action) => {
    switch (action.type) {//判断动作的类型
      case types.ADD2://如果是ADD的话，返回一个新的状态
        return { number: oldState.number +1 };
      case types.MINUS2:
      case types.MINUS:  
        return { number: oldState.number - 1 };
      default:
        return oldState;
    }
}
export default counter2;