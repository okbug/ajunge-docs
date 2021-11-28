import React from './react';
import ReactDOM from './react-dom';
/**
 * 组件的生命周期
 * 
 */
class Counter extends React.Component{
   constructor(props){
     super(props);
     this.state = {number:0};
     console.log('Counter 1.constructor');
   }
   componentWillMount(){
    console.log('Counter 2.componentWillMount');
   }
   componentDidMount(){
    console.log('Counter 4.componentDidMount');
   }
   handleClick = ()=>{
     this.setState({number:this.state.number+1});
   }
   shouldComponentUpdate(nextProps,nextState){
    console.log('Counter 5.shouldComponentUpdate');
    //奇数不更新，偶数更新 其实不管此方法返回true还是false, this.state其实都会改变 ，如果返回true的话页面会刷新
    return nextState.number%2 === 0;
   }
   componentWillUpdate(){
    console.log('Counter 6.componentWillUpdate');
   }
   componentDidUpdate(){
    console.log('Counter 7.componentDidUpdate');
   }
   render(){
    console.log('Counter 3.render');
     return (
       <div>
         <p>{this.state.number}</p>
         <button onClick={this.handleClick}>+</button>
       </div>
     )
   }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
