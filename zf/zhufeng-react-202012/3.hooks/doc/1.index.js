import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 默认是不行的。因为每次渲染都是一个独立的闭包
 * 就类似一个全局变量
 */
let lastLatestCount={current:null};
function Counter(){
  const [count,setCount]=React.useState(0);
  //const latestCount = React.useRef(count);//{current:0}
  //console.log(lastLatestCount===latestCount);
  //lastLatestCount=latestCount;
  React.useEffect(()=>{
    lastLatestCount.current = count;
    setTimeout(()=>{
      console.log(count);
    },3000);
  });
  return (
    <div>
      <p>{count}</p>
      <button onClick={()=>setCount(count+1)}>+</button>
    </div>
  )
}
ReactDOM.render(<Counter/>,document.getElementById('root'));