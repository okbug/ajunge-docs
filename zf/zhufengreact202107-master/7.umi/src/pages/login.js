import React from 'react';
import {history} from 'umi';
function Login(props){
    return (
        <div>
            <button onClick={()=>{
                localStorage.setItem('isLogin','true');
                if(props.location.state && props.location.state.from){
                    history.push(props.location.state.from);
                }
            }}>登录</button>
        </div>
    )
}
export default Login;