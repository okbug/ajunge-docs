import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 6. 状态
 * 可以在组件内部初始化状态对象
 * 6.1.不能直接修改state,要想修改状态，必须使用setState
 * 6.2 state更新可以是异步
 * 
 */
class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {number:0};
  }
  //生命周期函数 组件挂载完成 组件创建实例，实例render得到虚拟DOm 虚拟dom变成真实DOM，然后再挂载到父容器上
  componentDidMount(){
    setInterval(() => {
      //调用setState方法修改状态
      //1.修改状态 2 刷新组件
      //this.setState({number:this.state.number+1});  
      //要想修改状态，不能直接 修改state
      //this.state = {number:this.state.number+1};
      //Do not mutate state directly. Use setState()
      //this.state.number = this.state.number+1;
    }, 1000);
  }
  render(){
    return (
      <div>
        <p>{this.state.number}</p>
      </div>
    )
  }
}
ReactDOM.render((
  <Counter/>
),document.getElementById('root'));