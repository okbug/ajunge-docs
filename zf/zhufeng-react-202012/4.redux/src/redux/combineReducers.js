

/**
 * 把一个reducers对象变成一个reducer函数
 * @param {*} reducers 
 * let reducers = {counter1,counter2}
 * let state = {counter1:{number:5},counter2:{number:10}}
 */
function combineReducers(reducers) {
    //这个返回的函数就是我们最终的根reducer
    let rootReducer = (state = {}, action) => {
        let nextState = {};//声明一个空对象，用来保存最终的状态
        let changed = false;
        for (let key in reducers) {
            //key counter1 counter2
            const reducer = reducers[key];//分reducer
            const previousStateForKey = state[key];//老的分状态
            const nextStateForKey = reducer(previousStateForKey, action);//计算新的分状态
            if (previousStateForKey !== nextStateForKey) {
                changed = true;
            }
            nextState[key] = nextStateForKey;
        }
        //最终的状态就是长的样子就跟reducers是一样的
        return changed ? nextState : state;
    }
    return rootReducer;
}
export default combineReducers