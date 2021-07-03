import React from 'react';
import ReactDOM from 'react-dom';
const FormContext = React.createContext();
const ItemContext = React.createContext();

class Form extends React.Component {

  render() {
    let { initialValues, onFinish, children } = this.props;
    // children.forEach(item => {
    //   item.formValue = initialValues[item.props.name]
    // })
    return <FormContext.Provider value={{ initialValues, onFinish }}><div>
      {children}
    </div></FormContext.Provider>
  }
}
class Item extends React.Component {
  static contextType = FormContext;
  render() {
    let { label, name, children } = this.props;
    return <ItemContext.Provider value={{ ...this.context, name: name }}><div>
      {label}{children}
    </div></ItemContext.Provider>
  }
}
Form.Item = Item


class Input extends React.Component {
  static contextType = ItemContext
  state = {
    value: this.context.initialValues[this.context.name]
  }
  change = (e) => {
    this.context.initialValues[this.context.name] = e.target.value
    this.setState({
      value: e.target.value
    })
  }
  render() {
    // console.log(this)
    let value = this.state.value
    return <input value={value} onChange={this.change} />
  }
}

class Button extends React.Component {
  static contextType = ItemContext
  render() {
    return <button onClick={(e) => {
      // console.log(this)
      // 规则的校验
      this.context.onFinish()
    }}>
      {this.props.children}
    </button>
  }
}


class App extends React.Component {
  state = {
    initValue: {
      username: "珠峰",
      psw: 12354
    }
  }
  finish = () => {
    console.log('提交')
    console.log(this.state.initValue)
  }
  render() {
    let { initValue } = this.state;
    return <div className=''>
      <Form
        initialValues={initValue}
        onFinish={this.finish}
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="psw">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button>提交</Button>
        </Form.Item>
      </Form>
    </div>;
  }
}
// ????
ReactDOM.render(<App />, document.getElementById('root'))