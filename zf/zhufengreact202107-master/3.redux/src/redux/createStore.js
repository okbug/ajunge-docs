function isPlainObject(obj){
  if(typeof obj !== 'object' || obj === null){
    return false;
  }
  //let obj1 = {}; let obj2 = new Object();obj2.__proto__ = Object.prototype
  return Object.getPrototypeOf(obj)=== Object.prototype;
}
/**
 * 创建仓库
 * @param {*} reducer 处理器
 * @param {*} preloadedState 默认状态 或者 说初始状态 
 */
 function createStore(reducer,preloadedState){
    let state = preloadedState;
    let listeners = [];
    function getState(){
        return state;
    }
    function dispatch(action){
      if(!isPlainObject(action)){
        throw new Error('actionnte必须是纯对象，不能是函数或者其它的');
      }
      //根据老状态和action动作，计算新状态
      state = reducer(state,action);
      listeners.forEach(l=>l());
    }
    function subscribe(listener){
      listeners.push(listener);
      //subscrib会返回一个取消订阅的函数
      return ()=>{
        listeners=listeners.filter(l=>l!==listener);
      }
    }
    dispatch({type:'@@REDXU/INIT'});
    return {
      getState,//用来获取当前的仓库中的状态
      dispatch,//向仓库派发动作
      subscribe,//用来订阅仓库中的状态的变化
    }
  }
  export default createStore;