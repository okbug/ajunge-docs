import React from 'react';
import { Route } from 'react-router-dom'
class Home extends React.Component {
  render() {
    console.log(this)
    return <div className=''>
      home
      <Route path='/home/q' render={() => <h1>home下的qqq</h1>}></Route>
      <Route path='/home/w' render={() => <h1>home下的www</h1>}></Route>
    </div>;
  }
}
export default Home