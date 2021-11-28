import React from './react';
import ReactDOM from './react-dom';
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus=()=>{
    this.input.current.focus();
  }
  render() {
    return <input  ref={this.input}/>
  }
}
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.getFocus();
  }
  render() {
    return (
      <div>
        <TextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}
ReactDOM.render(<Form />, document.getElementById('root'));
