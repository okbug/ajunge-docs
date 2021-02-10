import React from 'react';
import {__RouterContext as RouterContext} from '../react-router';
//static contextType只能用在类组件上，不能用于函数组件 
//this.context
function Link(props){
    return (
        <RouterContext.Consumer>
            {
                ({history})=>(
                    <a {...props} onClick={(event)=>{
                        event.preventDefault();//阻止默认事件
                        history.push(props.to);
                    }}>{props.children}</a>
                )
            }
        </RouterContext.Consumer>
    )
}
export default Link;