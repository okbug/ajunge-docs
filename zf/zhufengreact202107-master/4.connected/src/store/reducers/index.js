import {combineReducers} from 'redux';
import {connectRouter} from '../../connected-react-router';
import history from '../../history';
let reducers = {
   router:connectRouter(history)
}
let rootReducer = combineReducers(reducers);
export default rootReducer;