import { combineReducers } from 'redux';
import counter from './counter';
let reducers = {
    counter
}
export default combineReducers(reducers);