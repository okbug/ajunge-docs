import React from './react';
import ReactDOM from './react-dom';
function withMouseTracker(OldComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <OldComponent {...this.state} />
        </div>
      )
    }
  }
}
function Show(props) {
  return (
    <div>
      <h1>请移动鼠标</h1>
      <p>当前的鼠标位置是{props.x} {props.y}</p>
    </div>
  )
}
const WithShow = withMouseTracker(Show);

ReactDOM.render(<WithShow />, document.getElementById('root'));
