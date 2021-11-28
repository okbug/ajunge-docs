import React from 'react'
import RouterContext from './RouterContext';
//高阶组件React中最重要的设计模式，没有之一
function withRouter(OldComponent) {
    function NewComponent(props){
        return (
            <RouterContext.Consumer>
                {
                    value=>{
                        return <OldComponent {...value} {...props}/>
                    }
                }
            </RouterContext.Consumer>
        )
    }
    return NewComponent
}
export default withRouter;
/* import {Route} from './';
//高阶组件 属性代理
export default function withRouter(OldComponent) {
    //TODO
    return (
        (props)=><Route render={
            routeProps=><OldComponent {...routeProps} {...props}/>
        }/>
    )
}
 */