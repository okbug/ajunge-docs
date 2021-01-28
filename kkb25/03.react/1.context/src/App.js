import React, { useContext } from 'react'
import { JunContext } from './Context.js'
// Context取值的第一种方法
class Header extends React.Component {
  static contextType = JunContext
  render() {
    console.log('Header', this.context);
    return (<>
    <h2>HEADER</h2>
    </>)
  }
}
// Context取值的第二种方法
function Main() {
  return (<>
    <JunContext.Consumer>
      {
        value => (<>
        <h2 onClick={() => console.log('Main', value)}>Main</h2>
        </>)
      }
    </JunContext.Consumer>
    
  </>)
}
// Context取值的第三种方法
function Footer() {
  const value = useContext(JunContext)
  console.log('footer', value);
  return (<>
  <h2>Footer</h2>
  </>)
}

export default class App extends React.Component {
  render() {
    return (<>
      <h1>App</h1>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>)
  }
}