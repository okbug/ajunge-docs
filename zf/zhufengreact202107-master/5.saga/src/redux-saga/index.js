
import runSaga from './runSaga';
import createChannel from './createChannel';
function createSagaMidleware(){
    let channel = createChannel();
    let boundRunSaga;
    function sagaMiddleware({getState,dispatch}){
        let env = {getState,dispatch,channel};
        boundRunSaga=runSaga.bind(null,env);
        return function(next){
            return function(action){//改造后的store.dispatch方法
                const result = next(action);
                channel.emit(action);
                return result;
            }
        }
    }
    sagaMiddleware.run = (saga)=>boundRunSaga(saga);
    return sagaMiddleware;
}
export default createSagaMidleware;