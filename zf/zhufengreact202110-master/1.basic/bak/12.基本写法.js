import React from 'react';
import ReactDOM from 'react-dom';
/**
 * render props
 * 组件的render属性是一个函数
 */
class MouseTracker extends React.Component {
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
        <h1>请移动鼠标</h1>
        <p>当前的鼠标位置是{this.state.x} {this.state.y}</p>
      </div>
    )
  }
}

ReactDOM.render(<MouseTracker />, document.getElementById('root'));
