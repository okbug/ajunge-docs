import { combineReducers,ReducersMapObject } from 'redux';
import home from './home';
import cart from './cart';
import profile from './profile';
import {connectRouter} from 'connected-react-router';
import history from '../history';
let reducers:ReducersMapObject= {
    router:connectRouter(history),
    home,
    cart,
    profile
}
//CombinedState={router:RouterState?,home:HomeState,cart:CartState,profile:ProfileState}
//typeof reducers={}
//keyof typeof reducers =router|home|cart|profile;
//typeof reducers[key] 获取 reducer的类型
//ReturnType 返回这个reducer类型的返回值类型
export type CombinedState = {
    [key in keyof typeof reducers]:ReturnType<typeof reducers[key]>
}
let rootReducer = combineReducers(reducers);
export default rootReducer;

/* export type LocationState = unknown;
export type LocationState = History.LocationState;
export function connectRouter<S = LocationState>(history: History<S>)
: Reducer<RouterState<S>>

 export interface RouterState<S = LocationState> {
    location: RouterLocation<S>
    action: RouterActionType
  }
RouterState<unknown>

 */