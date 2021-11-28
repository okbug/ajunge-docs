

/**
 * 不管是什么中间件，不管是什么逻辑，它的基本的架构是一样的
 * getState 获取仓库中的状态
 * dispatch 重新派发动作
 * next 调用下一个中间件或者原始的store.dispatch
 */
function logger({ getState, dispatch }) {
    return function (next) {
        return function (action) {//成为我们改造后的dispatch方法
            console.log('prev state', getState());
            next(action);
            console.log('next state', getState());
            return action;
        }
    }
}
export default logger;