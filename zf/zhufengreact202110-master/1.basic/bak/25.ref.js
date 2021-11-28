import React from 'react';
import ReactDOM from 'react-dom';
function Counter() {
  const [number, setNumber] = React.useState(0);
  const numberRef = React.useRef();
  const handleClick = () => {
    setNumber(number + 1);
    numberRef.current = number + 1;
    console.log(numberRef.current);
  }
  React.useEffect(() => {

  });
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}
ReactDOM.render(<Counter />, document.getElementById('root'));
