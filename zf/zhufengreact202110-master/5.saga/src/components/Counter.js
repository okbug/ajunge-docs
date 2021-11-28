import React, { Component } from 'react'
import { connect } from 'react-redux';
import actionCreators from '../store/actionCreators/counter';
class Counter extends Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add}>+</button>
                <button onClick={this.props.asyncAdd}>asyncAdd</button>
                <button onClick={this.props.stop}>stop</button>
            </div>
        )
    }
}

export default connect(state => state.counter, actionCreators)(Counter);