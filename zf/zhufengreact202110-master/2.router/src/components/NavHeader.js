import React, { Component } from 'react'
import { withRouter } from '../react-router-dom';
//Cannot read property 'push' of undefined
class NavHeader extends Component {
    render() {
        return (
            <div onClick={() => this.props.history.push('/')}>{this.props.title}</div>
        )
    }
}
let WithRouterNavHeader = withRouter(NavHeader);
export default WithRouterNavHeader;
/**
 * 只有Route渲染出来的组件才会有props.history属性
 * WithRouterNavHeader = (props) => {/props={title:'珠峰架构'}
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
 */