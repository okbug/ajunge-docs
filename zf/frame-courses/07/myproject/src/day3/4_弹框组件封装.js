import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './components/Modal'
class App extends React.Component {
  state = {
    show: false
  }
  cancel = () => {
    this.setState({
      show: false
    })
  }
  ok = () => {
    this.setState({
      show: false
    })
  }
  render() {
    return <div className=''>
      <button onClick={() => { this.setState({ show: true }) }}> 显示</button>
      <Modal
        visible={this.state.show}
        // okText="我的确定"
        // cancelText='我的取消'
        footer={<div><button onClick={this.ok}>哈哈</button></div>}
        // title={<h2>我自己的头部</h2>}
        onCancel={this.cancel}
        onOk={this.ok}
        className="box"
      >
        <p>身体部分</p>
        <div>hello</div>
      </Modal>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'))