import React, { Component } from 'react'
class Home extends Component {
    render() {
        return (
            <div>
                Home
                <button onClick={() => this.props.history.goBack()}>返回</button>
            </div>
        )
    }
}
export default Home;
