import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Project from './Project'

import Introduce from '../views/Introduce'
import DashBoard from '../views/dashboard'
import Hot from '../views/Hot'
function Loading() {
  return <h2>loading...</h2>
}

function Routes(props) {
  return <div className='my_content_box'><Suspense fallback={<Loading />}>
    <Switch>
      <Redirect path='/' exact to='/introduce' ></Redirect>
      <Project path='/introduce' component={Introduce}></Project>
      <Project path='/dashboard' component={DashBoard}></Project>
      <Project path='/add' level={6} component={Introduce}></Project>
      <Project path='/hot' component={Hot}></Project>
    </Switch>
  </Suspense></div>
}
export default Routes