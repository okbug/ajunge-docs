import React from './react';
import ReactDOM from './react-dom';
function App() {
  const [number1, setNumber1] = React.useState(0);
  const [number2, setNumber2] = React.useState(0);
  let handleClick1 = () => setNumber1(state => state + 1);
  let handleClick2 = () => setNumber2(state => state + 1);
  return (
    <div>
      <p>{number1}</p>
      <button onClick={handleClick1}>+</button>
      <p>{number2}</p>
      <button onClick={handleClick2}>+</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
