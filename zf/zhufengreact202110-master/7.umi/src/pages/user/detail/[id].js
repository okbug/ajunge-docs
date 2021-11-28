import React, { Component } from 'react'

export default class detail extends Component {
    render() {
        return (
            <div>
                用户详情 {this.props.match.params.id}
            </div>
        )
    }
}
