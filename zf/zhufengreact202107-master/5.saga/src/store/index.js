import {createStore,applyMiddleware} from 'redux';
import reducer from './reducer'
import createSagaMidleware from '../redux-saga';
import rootSaga from './sagas';//根saga
let sagaMiddleware  = createSagaMidleware()
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootSaga);
export default store;

