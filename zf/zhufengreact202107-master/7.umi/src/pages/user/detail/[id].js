import React, { Component } from 'react'

export default class Detail extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                ID=    {this.props.match.params.id}
            </div>
        )
    }
}
