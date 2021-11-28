import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

export function useParams(){
    let match = React.useContext(RouterContext).match;
    return match?match.params:{};
}
export function useHistory(){
     return React.useContext(RouterContext).history;
}

export function useLocation(){
    return React.useContext(RouterContext).location;
}

export function useRouteMatch(options){//TODO
    const location = useLocation();
    return matchPath(location.pathname,options);
}