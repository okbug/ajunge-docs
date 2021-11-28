import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Route extends React.Component{
    static contextType = RouterContext;
    render(){
        const {history,location} = this.context;
        const {component:RouteComponent,computedMatch,render,children} = this.props;
        const match = computedMatch?computedMatch:matchPath(location.pathname,this.props);
        const routeProps = {history,location};
        let renderElement=null;// null也一个合法的react渲染节点 代表我们render的返顺值，代表此组件将要渲染的内容
        if(match){
            routeProps.match=match;
            //RouteComponent>render>children
            if(RouteComponent){//如果传递了 component属性，优先渲染component
                renderElement = <RouteComponent {...routeProps}/>
            }else if(render){
                renderElement=render(routeProps);
            }else if(children){
                renderElement=children(routeProps);
            }else{
                renderElement=null;
            } 
        }else{//TODO
            if(children){
                renderElement=children(routeProps);
            }else{
                renderElement=null;
            }
        }
        return renderElement
    }
}
export default Route;

/**
 * 指定一个route组件如何渲染有三种方式
 * 1.component 如果你渲染的是一个固定 的组件，确定的组件的话就可以component
 * 2.render 如果你想自己确认，自定义渲染逻辑就可以用render
 * 
 * 1和2都是要求路径匹配才渲染或执行，如果路径不匹配什么不渲染
 * 3.children
 * 不管路由是否匹配，都渲染
 */