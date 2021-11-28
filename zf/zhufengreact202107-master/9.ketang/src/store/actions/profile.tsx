
import * as actionTypes from '@/store/action-types'
import {validate,register,login} from '@/api/profile';
import { RegisterPayload, RegisterResult,LoginPayload,LoginResult } from '@/typings/user';
import { message } from 'antd';
import {push} from 'connected-react-router';
export default {
    validate(){
        return {
            type:actionTypes.VALIDATE,
            payload:validate()
        }
    },
    register(values:RegisterPayload){
        //如果逻辑处理较多，就需要派发函数
        return function(dispatch:any){
            ;(async function(){
                try{
                   let result:RegisterResult =  await register<RegisterResult>(values);
                   if(result.success){
                       dispatch(push('/login'));
                   }else{
                    message.error(result.message);
                   }
                }catch(error){
                    message.error('注册失败');
                }
            })();
        }
    },
    login(values:LoginPayload){
        //如果逻辑处理较多，就需要派发函数
        return function(dispatch:any){
            ;(async function(){
                try{
                   let result:LoginResult =  await login<LoginResult>(values);
                   if(result.success){
                       sessionStorage.setItem('access_token',result.data.token);///jwt token
                       dispatch(push('/profile'));
                   }else{
                    message.error(result.message);
                   }
                }catch(error){
                    message.error('登录失败');
                }
            })();
        }
    },
    logout(){
        return function(dispatch:any){ 
            sessionStorage.removeItem('access_token');
            dispatch({type:actionTypes.LOGOUT});
        }
    },
    changeAvatar(avatar:string){
        return {
            type:actionTypes.CHANGE_AVATAR,
            payload:avatar
        }
    }
}
/**
 * payload {success:true}
 * payload {success:false}
 */