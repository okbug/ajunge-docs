import {AnyAction} from 'redux';
export interface CartState{

}
let initialState:CartState = {};
export default function(state:CartState=initialState,action:AnyAction):CartState{
    switch(action.type){
        default:
          return state;
    }
}

/* export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    //允许给这个action定义额外的属性
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any
} */