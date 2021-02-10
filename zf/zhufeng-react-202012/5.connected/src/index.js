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
        <div>
          <ul>
            <li><Link to="/" exact={true}>首页</Link></li>
            <li><Link to="/counter">计数器</Link></li>
          </ul>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/counter" component={Counter}/>
        </div>
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
/**
 * hashRouter
 * BrowserRouter 
 * 内部调用都是react-router库里的Router,只不过分别传入不同的history对象
 * ConnectedRouter 需要上下文中的store
 */