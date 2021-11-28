import React from './react';
import ReactDOM from './react-dom';
/**
 * 高阶组件可以反向继承
 * 一般来说子组件继承父组件，这个叫正向继承
 * 假如说你使用一个第三方库，源代码你无法修改，但又想扩展其功能
 * @param {} OldComponent 
 * @returns 
 */
//假如说这是一个第三方组件，你只使用使用修改源码
//这种写法可以拦截生命周期，拦截渲染过程

class Button extends React.Component {
  state = { name: '张三' }
  componentWillMount() {
    console.log('父亲 componentWillMount');
  }
  componentDidMount() {
    console.log('父亲 componentDidMount');
  }
  render() {
    console.log('父亲 render');
    return (
      <button name={this.state.name}>{this.props.title}</button >
    )
  }
}
const wrapper = (OldComponent) => {
  return class extends OldComponent {
    state = { number: 0 }
    componentWillMount() {
      console.log('儿子 componentWillMount');
      super.componentWillMount();
    }
    componentDidMount() {
      console.log('儿子 componentDidMount');
      super.componentDidMount();
    }
    handleClick = () => {
      this.setState({ number: this.state.number + 1 });
    }
    render() {
      console.log('儿子 render');
      let renderElement = super.render();
      let newProps = {
        ...renderElement.props,
        onClick: this.handleClick
      }
      return React.cloneElement(
        renderElement,
        newProps,
        this.state.number
      );
    }
  }
}
let WrappedButton = wrapper(Button);
ReactDOM.render(<WrappedButton title="按钮的标题" />, document.getElementById('root'));
/**
 * 属性代理的时候  返回一个新组件，新组件会渲染老组件 二个组件
 * 在这个反向继承当前，我们返回一个新组件，新组件继承自老组件的，只有一个组件
 * 反向继承含义 是什么意思
 * 一般来说如是正向的话先执行父亲再执行儿子
 * 但是在这里
 */