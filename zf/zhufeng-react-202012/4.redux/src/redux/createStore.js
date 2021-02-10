
/**
 * 
 * @param {*} reducer 处理器
 * @param {*} preloadedState 仓库的初始状态
 */
function createStore(reducer,preloadedState){
    //定义一个状态变量，并且赋上默认值
    let state=preloadedState;
    let listeners = [];
    function getState(){
        return state;
    }
    /**
     * 订阅方法会返回一个取消订阅的函数
     * @param {*} listener 
     */
    function subscribe(listener){
        listeners.push(listener);
        return ()=>{
            let index = listeners.indexOf(listener);//找到函数的索引
            listeners.splice(index,1);//从索引处删除此函数
        }
    }
    /**
     * 派发action
     * @param {*} action 动作
     */
    function dispatch(action){
        //接收reducer,计算新的state
        state=reducer(state,action);
        //挨个通知订阅的函数执行
        listeners.forEach(l=>l());
        //99%是没用的，只发现一个地方到了，react ssr的时候
        return action;
    }
    //在创仓库的时候，会先派发一次action,会reducer设置的默认值生效
    dispatch({type:'@@REDUX/INIT'});
    const store = {
        getState,
        subscribe,
        dispatch
    }
    return store;
}
export default createStore;