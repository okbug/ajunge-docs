


function combineReducers(reducers) {
    //合并后的reducer ,合并后的函数
    return function rootReducer(totalState = {}, action) {
        let nextState = {};
        for (let key in reducers) {
            //根据每个子reducer的老的分状态，和动作，计算每个reducer的新的分状态
            nextState[key] = reducers[key](totalState[key], action);
        }
        return nextState;
    }
}
export default combineReducers;
/**

let reducers = {
    counter1:counter1 reducer
    counter2: counter2 reducer
}


let combinedState = {
    counter1: { number: 0 },
    counter2: { number: 0 },
}



 */