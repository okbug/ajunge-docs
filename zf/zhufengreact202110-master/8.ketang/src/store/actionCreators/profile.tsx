
import { validate } from '@/api/profile';
import * as actionTypes from '@/store/action-types';
import { RegisterPayload, RegisterResult, LoginPayload, LoginResult } from '@/typings/user';
import { register, login } from '@/api/profile';
import { push } from 'connected-react-router';
import { message } from 'antd';
const actionCreators = {
    validate() {
        return {
            type: actionTypes.VALIDATE,
            payload: validate()
        }
    },
    register(values: RegisterPayload) {
        return function (dispatch: Function) {
            ; (async function () {
                //AxiosResponse<any, any>=RegisterResult
                let registerResult = await register<RegisterResult>(values);
                //如果成功了，可以跳转到登录页
                if (registerResult.success) {
                    dispatch(push('/login'));
                } else {
                    message.error(registerResult.message);
                }
            })();
        }
    },
    login(values: LoginPayload) {
        return function (dispatch: Function) {
            ; (async function () {
                //AxiosResponse<any, any>=RegisterResult
                let loginResult = await login<LoginResult>(values);
                //如果成功了，可以跳转到登录页
                if (loginResult.success) {
                    sessionStorage.setItem('access_token', loginResult.data.token);
                    dispatch(push('/profile'));
                } else {
                    message.error(loginResult.message);
                }
            })();
        }
    },
    changeAvatar(avatar: string) {
        return {
            type: actionTypes.CHANGE_AVATAR,
            payload: avatar//服务返回的上传后的图片的访问地址
        }
    },
    logout() {
        return function (dispatch: Function) {
            sessionStorage.removeItem('access_token');
            dispatch({ type: actionTypes.LOGOUT });
        }
    }
}
export default actionCreators;
/**
 * validate方法的话会向store.dispatch({
            type: actionTypes.VALIDATE,
            payload: validate()
        });
    redux-promise会识别或者说拦截这个action
    然后等 validate()结束之后再次派发action
    store.dispatch({
     type: actionTypes.VALIDATE,
     payload:{success:true,data:{id:1,username:'张三'}}
    });
 */