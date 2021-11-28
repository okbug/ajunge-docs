import React from './react';
import ReactDOM from './react-dom';
let ThememContext = React.createContext();
console.log(ThememContext);
//Provder负责props.value赋给它，Consumer负责取值
console.log(ThememContext._currentValue);
/**
 * 如果类组件的话，可以通过给它添加contextType静态属性来取到this.context
 * 
 */
function Header(){
  return (
    <ThememContext.Consumer>
      {
        value=>(
          <div style={{margin:'10px',border:`5px solid ${value.color}`,padding:'5px'}}>
           header
           <Title/>  
          </div>
        )
      }
    </ThememContext.Consumer>
  )
}
/* class Header extends React.Component{
  static contextType = ThememContext
  render(){
    return (
      <div style={{margin:'10px',border:`5px solid ${this.context.color}`,padding:'5px'}}>
        header
        <Title/>  
      </div>
    )
  }
} */
class Title extends React.Component{
  static contextType = ThememContext
  render(){
    return (
      <div style={{margin:'10px',border:`5px solid ${this.context.color}`,padding:'5px'}}>title</div>
    )
  }
}
class Main extends React.Component{
  static contextType = ThememContext
  render(){
    return (
      <div style={{margin:'10px',border:`5px solid ${this.context.color}`,padding:'5px'}}>
        main
        <Content/>  
      </div>
    )
  }
}
class Content extends React.Component{
  static contextType = ThememContext
  render(){
    return (
      <div style={{margin:'10px',border:`5px solid ${this.context.color}`,padding:'5px'}}>
        Content
        <button onClick={()=>this.context.changeColor('red')} style={{color:'red'}}>红色</button>
        <button onClick={()=>this.context.changeColor('green')}  style={{color:'green'}}>绿色</button>
        </div>
    )
  }
}
class Page extends React.Component{
  constructor(props){
    super(props);
    this.state = {color:'red'};
  }
  changeColor = (color)=>{
    this.setState({color});
  }
  render(){
    let value = {color:this.state.color,changeColor:this.changeColor}
    return (
      <ThememContext.Provider value={value}>
        <div style={{margin:'10px',border:`5px solid ${this.state.color}`,padding:'5px',width:'250px'}}>
          page
          <Header/>
          <Main/>
        </div>
      </ThememContext.Provider>
    )
  }
}
ReactDOM.render(<Page />, document.getElementById('root'));
/**
let context = {
  $$typeof: Symbol(react.context),
  Consumer: {$$typeof: Symbol(react.context), _context: context}
  Provider: {$$typeof: Symbol(react.provider), _context: context}
  _currentValue: {color:this.state.color,changeColor:this.changeColor}
}
 * 
 */