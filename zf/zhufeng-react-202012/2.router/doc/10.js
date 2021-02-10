import React,{useEffect,useRef,useState} from 'react';
import ReactDOM from 'react-dom';
function Counter() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  return (
    <div>
      <p>{count}</p>
      <button onClick={()=>setCount(count+1)}>+</button>
    </div>
  )
}
function render(){
  ReactDOM.render(
    <Counter/>,
    document.getElementById('root')
  );
}
render();