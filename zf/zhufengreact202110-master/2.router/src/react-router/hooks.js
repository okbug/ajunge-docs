import React from 'react'
import RouterContext from './RouterContext';
import matchPath from './matchPath';
export function useHistory() {
    let contextValue = React.useContext(RouterContext);
    return contextValue.history;
}
export function useLocation() {
    let contextValue = React.useContext(RouterContext);
    return contextValue.location;
}
export function useParams() {
    let { params, matches } = React.useContext(RouterContext);
    //matches[matches.length-1]
    return params || {};
}

/**
 * 获取一个路径匹配的结果 
 * @param {*} path 传递一个路径
 * @returns 
 */
export function useRouteMatch(pathInfo) {
    //获取当前的真实路径 /user/detail/100
    const location = useLocation();
    //获取match其实是根match
    let match = React.useContext(RouterContext).match;
    //如果传递了path,那就用当前真实的pathname跟真实的path进行匹配，得到匹配结果 
    //如果没有传递path,那就返回根匹配{ path: '/', url: '/', params: {}, isExact: pathname === '/' }
    return pathInfo ? matchPath(location.pathname, pathInfo) : match;
}