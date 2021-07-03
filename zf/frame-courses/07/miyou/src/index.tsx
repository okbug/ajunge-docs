import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom'
import store from './store/index'
import { Provider } from 'react-redux'
import { loadable } from './util'
// @ts-ignore
React.Component.prototype.qq = 123
const Cart = loadable({
  loader: () => import(/*webpackChunkName:"cart"*/'./views/cart'),
  loading() {
    return <div>Loading...</div>
  }
})
const Login = loadable({
  loader: () => import(/*webpackChunkName:"login"*/'./views/login'),
  loading() {
    return <div>Loading...</div>
  }
})
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* <Switch>
        <Route path='/cart' component={Cart}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/404' render={() => <h1>404</h1>}></Route>
        <Route path='/' component={App}></Route>
      </Switch> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
