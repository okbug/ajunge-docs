import React, { Component } from 'react'

export default class Counter extends Component {
    render() {
        return (
            <div>
                <h1>Counter</h1>
                <button onClick={()=>this.props.history.go(-1)}>返回</button>
            </div>
        )
    }
}
