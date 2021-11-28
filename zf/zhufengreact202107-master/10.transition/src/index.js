import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Transition} from './react-transition-group';
const transitionStyles = {
  entering:{opacity:1},//进入中
  entered:{opacity:1},//进入成功后
  exiting:{opacity:0},//退出中
  exited:{opacity:0},//退出成功后
}
const duration = 1000;
const defaultStyle= {
  width:'100px',
  height:'100px',
  backgroundColor:'green',
  opacity:0,
  transition:`opacity ${duration}ms ease-in-out`
}
function App(){
  let [visible,setVisible] = useState(false);
  return (
    <div>
      <button onClick={()=>setVisible(!visible)}>{visible?'关闭':'打开'}</button>
      <Transition in={visible} timeout={duration}>
        {
          (state)=>{
            console.log('state',state);
            return (
              <div style={{...defaultStyle,...transitionStyles[state]}}></div>
            )
          }
        }
      </Transition>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);