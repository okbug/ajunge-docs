import React from 'react';
function Input(props) {
  let { type = 'text', placeholder = '', value, onChange, onPressEnter } = props;
  const f = (e) => {
    if (e.keyCode == 13) {
      onPressEnter()
    }
  }
  return <>
    <div className="inp_box">
      <span>icon</span>
      <input
        type={type}
        placeholder={placeholder}
        onKeyDown={f}
        value={value}
        onChange={onChange} />
    </div>
  </>
}
class App extends React.Component {
  state = {
    name: "珠峰"
  }
  change = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  qqq = () => {
    console.log('enter')
  }
  render() {
    let { name } = this.state;
    return <div className=''>
      <h1>{name}</h1>
      <input type="text" placeholder='hhhh' value={name} onChange={this.change} />
      <Input
        type="text"
        placeholder='hhhh'
        value={name}
        onChange={this.change}
        onPressEnter={this.qqq} />
    </div>;
  }
}
export default App