import React, { Component } from 'react'

export default class Login extends Component {
    login = () => {
        localStorage.setItem('login', true);
        let to = '/';
        if (this.props.location.state) {
            to = this.props.location.state.from || '/';
        }
        this.props.history.push(to);
    }
    render() {
        return (
            <button onClick={this.login}>登录</button>
        )
    }
}
