import { compose } from "redux";

function applyMiddleware(...middlewares){
    return function(createStore){
        return function(reducer){
            let store = createStore(reducer);
            let dispatch;
            //middlewareAPI是给中间用的，就向中间暴露的接口API，越少越好，越灵活越好
            //store传给middleware 1.中间件可以拿 到store任意属性 2.
            let middlewareAPI = {
                getState:store.getState,
                dispatch:action=>dispatch(action)
            }
            let chain = middlewares.map(middleware=>middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}
export default applyMiddleware;