import { combineReducers } from '../../redux';
import counter1 from './counter1';
import counter2 from './counter2';
let reducers = {
    counter1,//每个reducer都有自己的状态，都有自己的能响应的动作，
    counter2
}
//combineReducers可以把多个reducer 函数组件的对象合并成一个reducer,
//合成之后会返回一个总的reducer,总的reducer里面会包含一个整的state
let combinedReducer = combineReducers(reducers);
export default combinedReducer;

//合并后的状态和reducers样子差不多
/* let combinedState = {
    counter1: { number: 0 },
    counter2: { number: 0 },
} */