import React from 'react'
export function Child(props) {
  console.log(props)
  // props.className = '6666'
  const fn = () => {
    props.onChangeName("珠峰培训6666")
  }
  return <>
    <h2>子组件1</h2>
    <button onClick={fn}>变成 珠峰6666</button>
  </>
}
export class Child2 extends React.Component {
  f = () => {
    this.props.onChangeName('珠峰8888')
  }
  render() {
    console.log(this.props)
    return <>
      <h2>子组件2</h2>
      <button onClick={this.f}>变成 珠峰8888</button>
    </>
  }
}
