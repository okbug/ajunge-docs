import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Link} from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Counter';
import {ConnectedRouter} from './connected-react-router';
import history from './history';
import {Provider} from 'react-redux';
import store from './store';
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ul>
        <li><Link to="/" >首页</Link></li>
        <li><Link to="/counter" >Coutner</Link></li>
      </ul>
      <Route path="/" component={Home} exact={true}/>
      <Route path="/counter" component={Counter} />
    </ConnectedRouter>
  </Provider>,document.getElementById('root')
);
