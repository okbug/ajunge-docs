
import React from 'react'
import RouterContext from './RouterContext';
export default function withRouter(OldComponent) {
    let NewComponent = (props) => {
        return (
            <RouterContext.Consumer>
                {
                    (value) => {//history location match
                        return <OldComponent {...props} {...value} />;
                    }
                }
            </RouterContext.Consumer>
        )
    }
    return NewComponent;
}
/**
let value = {
            history: this.props.history,
            location: this.state.location,
            match: Router.computeRootMatch(this.state.location.pathname)
}
return (
    <RouterContext.Provider value={value}>
        <RouterContext.Consumer>
                {
                    (value) => {//history location match
                        return <OldComponent {...props} {...value} />;
                    }
                }
            </RouterContext.Consumer>
    </RouterContext.Provider>
)
let context = {__currentValue:''};
context.__currentValue=value;
Consumer
context.__currentValue传递给函数的的参数
 */