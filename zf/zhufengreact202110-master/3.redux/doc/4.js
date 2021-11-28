function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return function (args) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            args = funcs[i](args);
        }
        return args;
    }
}

let promise = next => action => {
    console.log('promise');
    next(action);
}
let thunk = next => action => {
    console.log('thunk');
    next(action);
}
let logger = next => action => {
    console.log('logger');
    next(action);
}
//把多个中间件合并成一个函数
debugger
// [promise, thunk, logger]
let composeFN = compose(promise, thunk, logger);
let originDispatch = () => { console.log('原始的dispatch方法'); }
//把原始的dispatch方法传递给合并后的函数
let dispatch = composeFN(originDispatch);
//派发action
dispatch({ type: 'some' });
/**
 * 二个阶段
 * 1.包装获取改造后dispatch从内往外
 * 2.派发执行动作 从外往 内
 *
 */