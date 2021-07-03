import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom'
import Nav from './components/common/Nav'
import { loadable } from './util'
const Home = loadable({
  loader: () => import(/*webpackChunkName:"home"*/'./views/home'),
  loading() {
    return <div>Loading...</div>
  }
})
const List = loadable({
  loader: () => import(/*webpackChunkName:"list"*/'./views/list'),
  loading() {
    return <div>Loading...</div>
  }
})
const Cart = loadable({
  loader: () => import(/*webpackChunkName:"cart"*/'./views/cart'),
  loading() {
    return <div>Loading...</div>
  }
})
const User = loadable({
  loader: () => import(/*webpackChunkName:"user"*/'./views/user'),
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
function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Redirect path='/' exact to='/home'></Redirect> */}
        <Route path='/list' exact component={List}></Route>
        <Route path='/cart' exact component={Cart}></Route>
        <Route path='/user' exact component={User}></Route>
        <Route path='/login' exact component={Login}></Route>
        <Route path='/' exact component={Home}></Route>
        <Redirect path='/*' to='/404'></Redirect>
      </Switch>
      <Nav />
    </div>
  );
}

export default App;
