/**
 * 实现一个真正的日志中间件
 */
function applyMiddleware(...middlewares){
    return function(createStore){
        return function(reducer){
            let store = createStore(reducer);//先创建老仓库
            let dispatch;//指向改造后的dispatch方法
            let middlewareAPI= {
                getState:store.getState,
                dispatch:(action)=>{
                    dispatch(action)
                }//永远指向undefined
            }
            let chain = middlewares.map(middleware=>middleware(middlewareAPI));
            //let [promise,thunk,logger] = chain;
            //dispatch=promise(thunk(logger(store.dispatch)));
            dispatch=compose(...chain)(store.dispatch);
            //dispatch = middleware(middlewareAPI)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}