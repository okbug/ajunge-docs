import {combineReducers} from 'redux';
import counter from './counter';
import {connectRouter} from '../../connected-react-router';
import history from '../../history';
let reducers = {
    counter,
    router:connectRouter(history)
}
let rootReducer = combineReducers(reducers);
export default rootReducer;