import React from './react';
import ReactDOM from './react-dom';

function Child(props, forwardRef) {
  let inputRef = React.useRef();
  //命令式的ref,我可以自定义向外使用的对象
  React.useImperativeHandle(forwardRef, () => ({
    focus() {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />
}
let ForwardChild = React.forwardRef(Child);

function Parent() {
  let inputRef = React.useRef();
  let getFocus = () => {
    inputRef.current.focus();
  }//TODO
  return (
    <div>
      <ForwardChild ref={inputRef} />
      <button onClick={getFocus}>获得焦点</button>
    </div>
  )
}
ReactDOM.render(<Parent />, document.getElementById('root'));
