import React from './react';
import ReactDOM from './react-dom';

function TextInput(props,ref){
  return <input ref={ref}/> 
}
const ForwardedTextInput = React.forwardRef(TextInput);
console.log(ForwardedTextInput);
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.focus();
  }
  render() {
    return (
      <div>
        <ForwardedTextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}
ReactDOM.render(<Form />, document.getElementById('root'));

/**
Warning: Function components cannot be given refs.
 Attempts to access this ref will fail. 
 Did you mean to use React.forwardRef()?
 <ForwardedTextInput ref={this.input} />

 {type:{$$typeof:REACT_FORWARD_REF,render},ref} vdom

 */