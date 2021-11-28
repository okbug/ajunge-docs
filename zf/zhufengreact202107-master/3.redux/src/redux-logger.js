function logger({getState,dispatch}){//dispatch指提改造后的dispatch
    return function(next){//调用下一个中间件 next=store.原始的dispatch方法
        return function(action){//这个就是改造后的dispatch
            console.log('prev state',getState());
            next(action);
            console.log('next state',getState());
        }
    }
}
export default logger;