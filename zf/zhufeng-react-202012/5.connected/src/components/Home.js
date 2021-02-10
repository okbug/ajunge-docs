import React from 'react';
export default class Home extends React.Component{
    render(){
        return (
            <div>
                <h1>Home</h1>
                <button onClick={()=>this.props.history.goBack()}>返回</button>
            </div>
        )
    }
}