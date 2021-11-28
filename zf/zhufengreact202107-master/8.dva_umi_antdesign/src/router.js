import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import routeConfig from './routeConfig';
import renderRoutes from './renderRoutes';
//import { renderRoutes } from "react-router-config";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
          {renderRoutes(routeConfig)}
         {/*  <Route path="/" render={props=><IndexPage routes={routes}/>}/> */}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
