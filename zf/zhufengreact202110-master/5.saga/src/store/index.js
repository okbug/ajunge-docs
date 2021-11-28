import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '../redux-saga';
import rootSaga from './saga';
import combinedReducer from './reducers';
const sagaMiddleware = createSagaMiddleware();
let store = applyMiddleware(sagaMiddleware)(createStore)(combinedReducer);
sagaMiddleware.run(rootSaga);

export default store;
