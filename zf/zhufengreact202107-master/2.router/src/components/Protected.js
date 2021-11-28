import React from 'react'
import {Redirect,Route} from '../react-router-dom';
const Protected = (props)=>{
    const {path,component:RouteComponent} = props;
    return (
        <Route path={path} render={
            (routeProps)=>(
                localStorage.getItem('login')?<RouteComponent {...routeProps}/>:
                <Redirect to={{pathname:'/login',state:{from:path}}}/>
            )
        }
        />
    )
}
export default Protected;
