import React, { Component } from 'react'
import { UserAPI } from '../utils';
export default class UserDetail extends Component {
    state = { user: {} }
    componentDidMount() {
        let user = this.props.location.state;
        //如果你是直接 刷 新的页面，而非从用户列表页跳转过来的，那以当前的location中就没有state
        if (!user) {
            let id = this.props.match.params.id;
            user = UserAPI.find(id);
        }
        if (user)
            this.setState({ user })
    }
    render() {
        let { user } = this.state;
        return (
            <div>
                <p>ID:{user.id}</p>
                <p>用户名:{user.username}</p>
            </div>
        )
    }
}