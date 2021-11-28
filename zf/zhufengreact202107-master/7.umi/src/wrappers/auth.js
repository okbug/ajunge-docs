
import {Redirect} from 'umi';
function Auth(props){
    console.log('props',props);
    let isLogin = localStorage.getItem('isLogin');
    if(isLogin){//如果有值说明登录过了
        return props.children;
    }else{//如果没有值，重定向到登录面
        return <Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
    }
}
export default Auth;