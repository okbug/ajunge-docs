import React, { Component } from 'react'
import Lifecycle from './Lifecycle';
import RouterContext from './RouterContext';
function Prompt({when,message}){
    let value  = React.useContext(RouterContext);
    React.useEffect(()=>{
        if(when)
         return value.history.block(message);
    });
    return null;
}
export default Prompt;
/* function Prompt({when,message}){
    return (
        <RouterContext.Consumer>
            {
                value=>{
                    if(!when) return null;
                    const block = value.history.block;
                    return (
                        <Lifecycle
                        onMount={inst=>inst.release = block(message)}
                        onUnMount = {inst=>inst.release()}
                        />
                    )
                }
            }
        </RouterContext.Consumer>
    )
}
export default Prompt; */
/* export default class Prompt extends Component {
    static contextType = RouterContext
    componentDidMount(){
        if(this.props.when)
            this.release = this.context.history.block(this.props.message);
    }
    componentDidUpdate(){
        if(this.props.when)
            this.release = this.context.history.block(this.props.message);
    }
    componentWillUnmount(){
        this.release&&this.release();
    }
    render() {
        return  null;
    }
}

 */