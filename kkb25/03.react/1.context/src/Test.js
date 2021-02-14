import React, {useState} from 'react'

function Test() {
  debugger
  const arr = useState(0)
  console.log(arr)
  return (
    <>
      <div>{arr[0]}</div>
      <button onClick={() => arr[1](arr[0] + 1)}>click</button>
    </>
  )
}
export default Test