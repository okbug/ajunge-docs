import React from 'react'
import { JunContext } from './Context.js'
class Header extends React.Component {
  static contextType = JunContext
  render() {
    console.log('Header', this.context);
    return (<>
    <h2>HEADER</h2>
    </>)
  }
}

function Main() {
  return (<>
    <h2>Main</h2>
  </>)
}

export default class App extends React.Component {
  render() {
    return (<>
      <h1>App</h1>
      <Header></Header>
      <Main></Main>
    </>)
  }
}