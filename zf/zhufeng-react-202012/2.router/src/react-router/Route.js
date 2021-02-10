import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
/**
 * 1.获取到context中的值
 * 2.匹配路由规则 里的path 是否和当前地址中的url地址是否相等
 * 如果相等，就渲染component,如果不相等，就不渲染任何东西
 */
class Route extends React.Component{
    static contextType = RouterContext
    render(){
       const {history,location} = this.context;
       const {component:RouteComponent,computedMatch,render,children} = this.props;
       const match = computedMatch?computedMatch:matchPath(location.pathname,this.props);
       let renderElement = null;
       let routeProps = {history,location};
       if(match){//如果路径匹配才会进来 ，读这二个属性
         //路由属性 如果一个组件是Route或者说路由组件渲染的，它们routeProps={}
         routeProps.match = match;
         if(RouteComponent){
          renderElement = <RouteComponent {...routeProps}/>;
         }else if(render){
          renderElement=render(routeProps);//返回一个React元素,或者说虚拟DOM
         }else if(children){
          renderElement=children(routeProps);
         }
       }else{
         if(children){
          renderElement=children(routeProps);
         }
       }
       return renderElement;
    }
}
export default Route;