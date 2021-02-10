import React from './react';
import ReactDOM from './react-dom';

function Animation(){
  let style = {
    width:'100px',
    height:'100px',
    backgroundColor:'red'
  }
  return <div style={style}>内容</div>
}
ReactDOM.render(<Animation/>,document.getElementById('root'));
