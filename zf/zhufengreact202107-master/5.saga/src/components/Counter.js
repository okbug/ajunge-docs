import React, { Component } from 'react'
import {connect} from 'react-redux';
import actions from '../store/actions';
class Counter extends Component {
    render() {
        let {number,asyncAdd,stopAdd} = this.props;
        return (
            <div>
                <p>{number}</p>
                <button onClick={asyncAdd}>asyncAdd</button>
                <button onClick={stopAdd}>stopAdd</button>
            </div>
        )
    }
}
export default connect(
    state=>state,
    actions
)(Counter);