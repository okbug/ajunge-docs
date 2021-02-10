
import runSaga from './runSaga';
import createChannel from './createChannel';
function createSagaMiddleware(){
    let channel = createChannel();//{take,put}
    let boundRunSaga;
    function sagaMiddleware({getState,dispatch}){
        //把this绑定为null,把runSaga的第一个参数绑定为env
        boundRunSaga = runSaga.bind(null,{getState,dispatch,channel})
        return function(next){//下一个中间件的dispatch方法
            //在这个项目里，我们store.dispatch就是这个函数，它就是改造后的dispatch方法了
            return function(action){
                next(action);//原生的store.dispatch方法,直接把async_add给仓库了，又给了reducer,reducer不能识别asyncadd，什么也不会发生
                channel.channelPut(action);
                //let result = 
                //return result;
            }
        }
    }
    sagaMiddleware.run = (saga)=>boundRunSaga(saga);
    return sagaMiddleware;
}
export default createSagaMiddleware;