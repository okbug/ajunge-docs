import React from './react';
import ReactDOM from './react-dom';
function Counter() {
  const [number, setNumber] = React.useState(0);
  //useEffect里面的函数会在组件渲染到页面中之后执行
  React.useEffect(() => {
    console.log('开启定时器');
    const timer = setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);
    //可以让useEffect返回一个销毁函数，它会在下次执行effect之前执行
    return () => {
      console.log('销毁定时器');
      clearInterval(timer);//在开启下一个定时器之前会把上一个定时器清掉，
    }
  });
  return (
    <div>{number}</div>
  )
}

ReactDOM.render(<Counter />, document.getElementById('root'));
