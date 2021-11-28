
import React, { Component } from 'react'
import RouterContext from './RouterContext';
import matchPath from './matchPath';
export default class Switch extends Component {
    static contextType = RouterContext
    render() {
        const { location } = this.context;
        let element, match;
        //this.props.children=[Route,Route,Route]
        //this.props.children.forEach();
        React.Children.forEach(this.props.children, (route) => {
            //如果还没有匹配上，并且当前的route是一个React元素的话
            //如果已经 匹配过了，后面的元素都跳过了，不再匹配
            if (!match && React.isValidElement(route)) {
                element = route;
                match = matchPath(location.pathname, route.props);
            }
        });
        return match ? React.cloneElement(element, { computedMatch: match }) : null;
    }
}
