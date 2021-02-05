import React, {useState} from 'react'

function App() {
  const [state, setState] = useState(1)
  const handleClick = () => {
    setState(state + 1)
    setState(state + 1)
    Promise.resolve(1).then(() => {
      console.log(state)
      setState(state + 1)
      console.log(state)
    })
    setTimeout(() => {
      console.log('out1', state)
      setState(state + 1)
      console.log('out2', state)
    }, 0);
  }
  return (<>
    <div>{state}</div>
    <button onClick={handleClick}>Click</button>
  </>)
}
export default App