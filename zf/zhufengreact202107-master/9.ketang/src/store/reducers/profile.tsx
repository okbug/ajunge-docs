import {AnyAction} from 'redux';
import LOGIN_TYPES from '@/typings/login-types';
import * as actionTypes from '@/store/action-types';
export interface ProfileState{
  loginState:LOGIN_TYPES //当前的登录状态
  user:any //如果登录成功，会把登录用户的信息放在这
  error:string | null //如果发生了错误，会把错误放在这
}
let initialState:ProfileState = {
    loginState:LOGIN_TYPES.UN_VALIDATE,
    user:null,
    error:null
};
export default function(state:ProfileState=initialState,action:AnyAction):ProfileState{
    switch(action.type){
        case actionTypes.VALIDATE:
            if(action.payload.success){
                return {...state,user:action.payload.data,error:null,loginState:LOGIN_TYPES.LOGINED};
            }else {
                return {...state,user:null,error:action.payload.message,loginState:LOGIN_TYPES.UNLOGIN};
            }
        case actionTypes.LOGOUT: 
           return {...state,user:null,error:null,loginState:LOGIN_TYPES.UNLOGIN};
        case actionTypes.CHANGE_AVATAR: 
           return {...state,user:{...state.user,avatar:action.payload}};
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