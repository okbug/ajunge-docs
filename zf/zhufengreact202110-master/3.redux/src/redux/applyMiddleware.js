import compose from './compose';
function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer, preloadedState) {
            let store = createStore(reducer, preloadedState);
            let dispatch;//它会指向改造后的dispatch，这时dispatch是undefined
            //对象里面的 定义dispatch 指向哪个dispatch呢￼
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action)
            }
            let chain = middlewares.map(middleware => middleware(middlewareAPI));
            let originDispatch = store.dispatch;
            dispatch = compose(...chain)(originDispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}
export default applyMiddleware;