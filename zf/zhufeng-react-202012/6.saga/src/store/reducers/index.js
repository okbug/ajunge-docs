import {combineReducers} from 'redux';
import counter from './counter';
const reducers = {
    counter
}
let rootReducer = combineReducers(reducers);
export default rootReducer;