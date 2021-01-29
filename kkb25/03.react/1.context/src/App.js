import React, { useEffect, useState } from 'react'

function A() {
  const [am, b] = useState(0)
  useEffect(() => {
    console.log(1)
  })
  return (<>
    <h2 onClick={b(am + 1)}>{am}</h2>
    h3
  </>)
}
export default class App extends React.Component {
  render() {
    return (<>
      <h1>App</h1>
      <A></A>
    </>)
  }
}