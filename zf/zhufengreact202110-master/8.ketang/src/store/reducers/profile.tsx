import { AnyAction } from 'redux';
import LOGIN_TYPES from '@/typings/login-types';
import * as actionTypes from '@/store/action-types'
import { User } from '@/typings/user';
export interface ProfileState {
    loginState: LOGIN_TYPES;
    user: User | null;
    error: string | null
}

let initialState: ProfileState = {
    loginState: LOGIN_TYPES.UN_VALIDATE,
    user: null,
    error: null
};
function reducer(state: ProfileState = initialState, action: AnyAction): ProfileState {
    switch (action.type) {
        case actionTypes.VALIDATE:
            if (action.payload.success) {//当前用户已经登录
                state.loginState = LOGIN_TYPES.LOGIN_ED;
                state.user = action.payload.data;
                state.error = null;
                break;
            } else {
                state.loginState = LOGIN_TYPES.UN_LOGIN;
                state.user = null;
                state.error = action.payload;
                break;
            }
        case actionTypes.CHANGE_AVATAR:
            state.user.avatar = action.payload;
            break;
        case actionTypes.LOGOUT:
            state.loginState = LOGIN_TYPES.UN_LOGIN;
            state.user = null;
            state.error = null;
            break;
        default:
            return state;
    }
}
export default reducer;