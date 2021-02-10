import React from 'react';
class UserList extends React.Component{
   login = (event)=>{
    localStorage.setItem('login','true');
    let to;
    if(this.props.location.state){
       to=this.props.location.state.from||'/';
    }
    this.props.history.push(to);
   }
   render(){
       return (
           <button onClick={this.login}>登录</button>
       )
   }
}
export default UserList;
/**
 * 受控组件   原生的输入组件它的值受状态控制
 * 非受控组件 原生的输入组件的值不受状态控制
 * 
 *  You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
 */