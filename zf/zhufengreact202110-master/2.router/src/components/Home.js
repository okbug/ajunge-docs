import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <p>Home</p>
                <button onClick={() => this.props.history.push('/user')}>跳到/user</button>
            </div>
        )
    }
}
