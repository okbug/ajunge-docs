import React from 'react';
import {history} from 'umi';
class Login extends React.Component{
    handleLogin = (event)=>{
        localStorage.setItem('isLogin','true');
        if(this.props.location.state&&this.props.location.state.from){
            history.push(this.props.location.state.from);
        }else{
            history.push('/');
        }
    }
    render(){
        return (
           <div>
               <button onClick={this.handleLogin}>登录</button>
           </div>
        )
    }
}
export default Login;