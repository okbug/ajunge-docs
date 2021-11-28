import React from 'react';

class Lifecycle  extends React.Component{
    componentDidMount(){
        if(this.props.onMount)
            this.props.onMount(this);
    }
    componentWillUnmount(){
        if(this.props.onUnMount)
            this.props.onUnMount(this);
    }
    render(){
        return null;
    }
}
export default Lifecycle;