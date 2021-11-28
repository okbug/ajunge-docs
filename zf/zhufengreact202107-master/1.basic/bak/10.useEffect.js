import React from './react';
import ReactDOM from './react-dom';
const Animation = ()=>{
  const ref = React.useRef();
  //useEffect是在页面渲染之后执行
   //useLayoutEffect的回调函数会在浏览器渲染前执行
  React.useEffect(()=>{
     ref.current.style.WebkitTransform = `translate(500px)`; 
     ref.current.style.transition = `all 500ms`;
  });
  let style = {
    width:'100px',
    height:'100px',
    backgroundColor:'red'
  }
  return (
    <div style={style} ref={ref}>我是内容</div>
  )
}

ReactDOM.render(<Animation/>, document.getElementById('root'));
