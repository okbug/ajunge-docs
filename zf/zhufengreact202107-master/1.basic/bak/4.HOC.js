import React from 'react';
import ReactDOM from 'react-dom';

const wrapper = OldComponent=>{
  return class extends OldComponent{
    constructor(props){
      debugger
      super(props);
      console.log(this.state);
      this.state = {...this.state,number:0}
      console.log('wrapper Button constructor');
    }
    handleClick = ()=>{
      this.setState({number:this.state.number+1});
    }
    componentDidMount(){
      console.log('wrapper componentDidMount');
      super.componentDidMount();
    }
    render(){
      console.log('wrapper render');
      //调用父类的render方法，返回一个虚拟DOM
      let renderVdom = super.render();//super.render代表父类的render方法
      console.log('renderVdom.props',renderVdom.props);
      let newProps = {
        ...renderVdom.props,//{name:undefined,title}
        ...this.state,//{number:0}
        onClick:this.handleClick
      }
      //1 老的React元素 新的属性 后面都是儿子们
      return React.cloneElement(renderVdom,newProps,this.state.number,this.state.name);
    }
  }
}
@wrapper
class Button extends React.Component{
  constructor(props){
    super(props);
    //此处的this就是子类的实例
    this.state = {name:'张三'}
    console.log('Button constructor');
  }
 
  componentDidMount(){
    console.log('Button componentDidMount');
  }
  render(){
    console.log('Button render');
    return <button name={this.state.name} title={this.props.title}/>
  }
}
ReactDOM.render(<Button title="标题" />, document.getElementById('root'));

/**
 * super 是父类实例
 */