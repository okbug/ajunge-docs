import React from 'react';
import {UserAPI} from '../utils';
import {Prompt} from '../react-router-dom';
class UserList extends React.Component{
   state={isBlocking:false}//阻止跳转的意思
   nameRef = React.createRef()
   handleSubmit = (event)=>{
    event.preventDefault();//不要让表单刷新
    this.setState({isBlocking:false},()=>{
        //let name = this.nameRef.current.value;
        UserAPI.add({id:Date.now()+'',name:this.state.name});
        this.props.history.push('/user/list');
    });
    
   }
   render(){
       //如果输入框中有值,值不为空就需要阻止。否则不阻止
       //Prompt when属性=true阻止，false不阻止
       return (
           <form onSubmit={this.handleSubmit}>
               <Prompt
                  when={this.state.isBlocking}
                  message={
                      location=>`请问你是否真的要跳到${location.pathname}去吗?`
                  }
               />
               <input ref={this.nameRef}
                      onChange={event=>this.setState({isBlocking:event.target.value.length>0})}
                />
               <button type="submit">提交</button>
           </form>
       )
   }
}
export default UserList;
/**
 * 受控组件   原生的输入组件它的值受状态控制
 * 非受控组件 原生的输入组件的值不受状态控制
 * 
 *  You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
 * 开心麻花
路由跳转 原来的组件是销毁了吗 
Vc
切换路由和生命周期 的关联能讲讲么 可以例子 
学习
Consumer是所有子组件可以获得还是父组件也可以获得？ 
其实你如果用 Consumer的话，跟父子关系不大 Context __current this.context
老版本的 context实现非常复杂，而且 跟父子关系关联很大
开心麻花
多个空字符串 算有东西吗 
古德猫宁
这么写的话算 
月下吴刚
官方有这个 prompt 组件吗？ 

 */