import React, { Component } from 'react'
import { UserAPI } from '../utils';
import { Prompt } from '../react-router-dom';
export default class UserAdd extends Component {
    usernameRef = React.createRef()
    state = { isBlocking: false }//是否阻止跳转
    handleSubmit = (event) => {
        event.preventDefault();
        //什么时候阻止 填入了内容
        //什么时候不阻止 表单为空或者说要执行提交表单动作了
        this.setState({ isBlocking: false }, () => {
            let username = this.usernameRef.current.value;
            UserAPI.add({ id: Date.now() + '', username });
            this.props.history.push('/user/list');
        });
    }
    render() {
        return (
            <>
                <Prompt
                    when={this.state.isBlocking}
                    message={
                        (location) => `请问你确定离开当前页面,跳转到${location.pathname}吗?`
                    }
                />
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={this.usernameRef} onChange={event => {
                        this.setState({ isBlocking: event.target.value.length > 0 })
                    }}></input>
                    <button type="submit">提交</button>
                </form>
            </>

        )
    }
}
