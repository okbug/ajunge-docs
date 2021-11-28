import React from './react';
import ReactDOM from './react-dom';
class Three extends React.Component{
  render(){
    return <div>Three:{this.props.number}</div>
  }
}
function Two(props){
  return <Three {...props}/>
}
class One extends React.Component{
  constructor(props){
    super(props);
    this.state = {number:0};
    setTimeout(()=>{
      this.setState({number:1});
    },1000);
  }
  render(){
    return <Two number={this.state.number}/>
  }
}
ReactDOM.render(<One />, document.getElementById('root'));
