import React from './react';
import ReactDOM from './react-dom';
function Animation() {
  const ref = React.useRef();
  React.useLayoutEffect(() => {
    ref.current.style.transform = `translate(500px)`;
    ref.current.style.transition = `all 500ms`;
  });
  let style = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'red'
  }
  return (
    <div style={style} ref={ref}></div>
  )
}
ReactDOM.render(<Animation />, document.getElementById('root'));
