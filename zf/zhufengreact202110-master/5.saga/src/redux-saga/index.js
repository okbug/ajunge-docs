
import runSaga from './runSaga';
//import createChannel from './createChannel';
import EventEmitter from 'events';//TODO
function createSagaMiddleware() {
    //let channel = createChannel();
    let channel = new EventEmitter();
    let boundRunSaga;
    function sagaMiddleware({ getState, dispatch }) {
        boundRunSaga = runSaga.bind(null, { channel, dispatch });
        return function (next) {
            return function (action) { //这个方法就是改造后的store.dispatch
                let result = next(action);
                channel.emit(action.type, action);
                return result;
            }
        }
    }
    sagaMiddleware.run = (saga) => boundRunSaga(saga);
    return sagaMiddleware;
}
export default createSagaMiddleware;