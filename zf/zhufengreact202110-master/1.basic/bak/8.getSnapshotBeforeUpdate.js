import React from './react';
import ReactDOM from './react-dom';

class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.container = React.createRef();
  }
  addMessage = () => {
    this.setState(
      state => ({ messages: [`${state.messages.length}`, ...state.messages] })
    );
  }
  componentDidMount() {
    console.log(this);
    this.timer = window.setInterval(() => {
      this.addMessage();
    }, 1000);
  }
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.container.current.scrollTop,
      prevScrollHeight: this.container.current.scrollHeight
    }
  }
  componentDidUpdate(prevProps, prevState, { prevScrollTop, prevScrollHeight }) {
    this.container.current.scrollTop = prevScrollTop + (this.container.current.scrollHeight - prevScrollHeight);
  }
  render() {
    let style = {
      height: '100px',
      width: '200px',
      border: '1px solid red',
      overflow: 'auto'
    }
    return (
      <div style={style} ref={this.container}>
        {
          this.state.messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))
        }
      </div>
    )
  }
}

ReactDOM.render(<ScrollList />, document.getElementById('root'));
