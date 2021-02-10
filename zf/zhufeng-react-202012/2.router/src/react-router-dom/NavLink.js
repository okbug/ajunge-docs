import React from 'react';
import {Link} from './';
import {__RouterContext as RouterContext,Route} from '../react-router';
import {matchPath} from '../react-router';
function NavLink(props){
    const {
        to,//匹配的路径
        className:classNameProp='',//原生类名
        style:styleProp={},//原始的行内样式对象
        activeClassName='',
        activeStyle={},
        children,
        exact
    } = props;
   return (
    <Route path={to} exact={exact} children={
         (routeProps) =>{
            let match = routeProps.match;
            let className =match?joinClassnames(classNameProp,activeClassName):classNameProp;
            let style = match?{...styleProp,...activeStyle}:styleProp;
            let linkProps = {
                className,
                style,
                to,
                children
            }
            return <Link {...linkProps}/>;
        }
    }/>
   )

}
//源码如何实现的  并没有用到children
function NavLink2(props){
    let context = React.useContext(RouterContext);
    let {pathname}= context.location;
    const {
        to,//匹配的路径
        className:classNameProp='',//原生类名
        style:styleProp={},//原始的行内样式对象
        activeClassName='',
        activeStyle={},
        children,
        exact
    } = props;
    //匹配当前的路径和自己to路径 是否匹配
    let isActive = matchPath(pathname,{path:to,exact});
    let className =isActive?joinClassnames(classNameProp,activeClassName):classNameProp;
    let style = isActive?{...styleProp,...activeStyle}:styleProp;
    let linkProps = {
        className,
        style,
        to,
        children
    }
    return <Link {...linkProps}/>;

}
function joinClassnames(...classNames){
    //把空的类名过滤掉
    return classNames.filter(c=>c).join(' ');
}
export default NavLink;
/**
 * 
 */