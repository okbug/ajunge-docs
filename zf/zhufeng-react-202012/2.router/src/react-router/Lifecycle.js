import React from 'react';
class  LifeCycle extends React.Component{
    componentDidMount(){
        this.props.onMount&&this.props.onMount(this);
    }
    componentWillUnmount(){
        console.log('LifeCycle componentWillUnmount');
        this.props.onUnmount&&this.props.onUnmount(this);
    }
    render(){
        return null;
    }
}
export default LifeCycle;