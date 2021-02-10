import React, { useContext } from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
export function useHistory(){
    return useContext(RouterContext).history;
}
export function useLocation(){
    return useContext(RouterContext).location;
}

export function useParams(){
    let match = useContext(RouterContext).match;
    return match?match.params:{};
}
//context value {history,location,match}
export function useRouteMatch(path){
  let location = useLocation();//获取当前的路径对象 {pathname}
  let match = useContext(RouterContext).match;//当前的match 来自于Provider
  return path?matchPath(location.pathname,path):match;
}