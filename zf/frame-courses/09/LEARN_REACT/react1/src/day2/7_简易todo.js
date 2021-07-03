import React from 'react';
//  状态提升  就是为了提高组件的复用性 （就是把自己的状态 不要了， 变成父组件传递进来的props）
function List(props) {
  let { data, qqq, onDel } = props;
  const fn = (item) => {
    return function () {
      onDel(item)
    }
  }
  return <ul>
    {
      data.map(item => {
        return <li key={item}>
          {
            qqq ? qqq(item) : <>
              {item}
              <button onClick={fn(item)}>X</button>
              <button onClick={onDel.bind(null, item)}>XX</button>
            </>
          }
        </li>
      })
    }
  </ul>
}
class App extends React.Component {
  state = {
    listAry: ['吃饭', '睡觉', '打豆豆']
  }
  del = (item) => {
    let ary = this.state.listAry.filter(val => val !== item)
    console.log(item, ary)
    this.setState({
      listAry: ary
    })
  }
  selfHtml = (item) => {
    return <>
      <span>{item}</span>
      <button onClick={() => { this.del(item) }}>删除{item}</button>
    </>
  }
  render() {
    return <div className=''>
      <List data={this.state.listAry} qqq={this.selfHtml} />
      <List data={this.state.listAry} onDel={this.del} />
    </div>;
  }
}
export default App