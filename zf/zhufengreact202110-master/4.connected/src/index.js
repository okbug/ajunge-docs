import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Counter from './components/Counter';
import { ConnectedRouter } from './connected-react-router';
import history from './history';
import store from './store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </ul>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/counter" component={Counter} />
      </>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
);

/**
 * ConnectedRouter对Router多一个功能
 * 可以监听路径的变化，或者说路由的变量，并且派发动作给仓库，然后把最新的路径信息保存到仓库中
 *
 * 第二个作用
 * 就是可以通过派发动作的方式跳转路径
 */