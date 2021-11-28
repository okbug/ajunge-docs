import React, { Component } from 'react'
import RouterContext from './RouterContext';
import matchPath from './matchPath';
export default class Route extends Component {
    static contextType = RouterContext;
    render() {
        const { history, location } = this.context;//=Router value Provider context
        const { component: RouteComponent, render, computedMatch, children } = this.props;
        //如果有computedMatch属性，就直接用，否则就再重新计算一次match结果
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        const routeProps = { history, location };
        let element = null;
        if (match) {
            routeProps.match = match;
            this.context.params = match.params;
            if (RouteComponent) {
                element = <RouteComponent {...routeProps} />;
            } else if (render) {
                element = render(routeProps);
            } else if (children) {
                element = children(routeProps);
            } else {
                element = null;
            }
        } else {
            //不管是否匹配，都会渲染children
            if (children) {
                element = children(routeProps);
            } else {
                element = null;
            }
        }
        return element;
    }
}
