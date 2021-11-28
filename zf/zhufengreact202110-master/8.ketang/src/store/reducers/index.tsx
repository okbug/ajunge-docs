import { ReducersMapObject } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '@/history';
import home from './home';
import cart from './cart';
import profile from './profile';
import { combineReducers } from 'redux-immer';
import produce from 'immer';
let reducers: ReducersMapObject = {
    router: connectRouter(history),
    home,
    cart,
    profile
}
export type CombinedState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

let combinedReducer = combineReducers(produce, reducers);
export default combinedReducer;

/* type CombinedState = {
    home | cart | profile: HomeState | CartState | ProfileState
} */