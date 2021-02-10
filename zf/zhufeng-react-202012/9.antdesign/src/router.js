import React from 'react';
import { Router, Switch } from 'dva/router';
import routeConfig from './routeConfig';
import {renderRoutes,renderRedirect} from './utils/routes';
//在渲染的时候，会把history 和app传递给RouterConfig
function RouterConfig({ history,app }) {
  return (
    <Router history={history}>
      <Switch>
      {renderRoutes(routeConfig,app)}
      {renderRedirect('/',true,routeConfig)}
      </Switch>
    </Router>
  );
}

export default RouterConfig;

/**
ReactDOM.render(
         <Provider store={store}>
             {app._router({history,app})}
         </Provider>,
         document.querySelector(root)
);
*/