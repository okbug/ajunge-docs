import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Project from './Project'

const Login = React.lazy(() => import(/*webpackChunkName:"login" */'../views/Login'))
const Layout = React.lazy(() => import(/*webpackChunkName:"layout" */'../views/Layout'))
function Loading() {
  return <h2>loading...</h2>
}

function App(props) {
  return <HashRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/404' render={() => <h1>404</h1>}></Route>
        {/* <Route path='/' component={Layout}></Route> */}
        <Project path='/' component={Layout}></Project>
      </Switch>
    </Suspense>
  </HashRouter >
}

export default App