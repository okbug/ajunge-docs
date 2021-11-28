import React, { Component } from 'react'
import actions from '../store/actions/home';
import {connect} from 'react-redux';
class Home extends Component {
    render() {
        let {goto} = this.props;
        return (
            <div>
                <h1>首页</h1>
                <button onClick={()=>goto('/counter')}>跳转到/counter</button>
            </div>
        )
    }
}

export default connect(state=>state,actions)(Home);