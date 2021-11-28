import React from './react';
import ReactDOM from './react-dom';
class Dialog extends React.Component {
  render() {
    return ReactDOM.createPortal(
      <div className="dialog">{this.props.message}</div>,
      document.getElementById('dialog')
    )
  }
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Dialog message="模态窗口" />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
