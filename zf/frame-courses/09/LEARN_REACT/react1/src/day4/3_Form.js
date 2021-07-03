import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
let FormContext = React.createContext();
let ItemContext = React.createContext();

class Form extends React.Component {
  render() {
    let { initialValues, onFinish, children } = this.props;
    return <FormContext.Provider value={{ initialValues, onFinish }}>
      {children}
    </FormContext.Provider>
  }
}

class Item extends React.Component {
  render() {
    let { label, name, children } = this.props;
    return <ItemContext.Provider value={{ label, name }}>
      {children}
    </ItemContext.Provider>
  }
}
Form.Item = Item;

function Input() {
  let context = useContext(FormContext)
  let context2 = useContext(ItemContext)
  // console.log(context, context2)
  let value = context.initialValues[context2.name];
  let [val, setVal] = useState(value)
  return <div>
    {context2.label}<input type="text" value={val} onChange={(e) => {
      context.initialValues[context2.name] = e.target.value;
      setVal(e.target.value)
    }} />
  </div>
}

function Button(props) {
  let context = useContext(FormContext)
  let context2 = useContext(ItemContext)
  // console.log(context, context2)
  return <>
    <button onClick={context.onFinish}>{props.children}</button>
  </>
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

ReactDOM.render(<App />, document.getElementById('root'))