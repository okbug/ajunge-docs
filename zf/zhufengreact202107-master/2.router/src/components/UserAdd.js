import React, { Component } from 'react'
import {UserAPI} from '../utils';
import {Prompt} from '../react-router-dom';
export default class UserAdd extends Component {
    state = {isBlocking:false} //是否阻止跳转，默认值是不阻止 
    nameRef = React.createRef()
    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({isBlocking:false},()=>{
            let name = this.nameRef.current.value;
            UserAPI.add({id:Date.now()+"",name});
            this.props.history.push('/user/list');
        });
    }
    handleChange = (event)=>{
        this.setState({isBlocking:event.target.value.length>0});
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Prompt
                   when={this.state.isBlocking}
                   message={(location)=>`请问你是确定要离开当前页面，跳转到${location.pathname}吗?`}
                />
                <input type="text" ref={this.nameRef} onChange={this.handleChange}/>
                <button type="submit">添加</button>
            </form>
        )
    }
}
