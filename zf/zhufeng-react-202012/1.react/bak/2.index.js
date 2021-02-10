import React from './react';
import ReactDOM from './react-dom';

class MouseTracker extends React.Component{
  constructor(props){
    super(props);
    this.state = {x:0,y:0};
  }
  handleMouseMove = (event)=>{
    this.setState({
      x:event.clientX,
      y:event.clientY
    });
  }
  render(){
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}
ReactDOM.render(<MouseTracker render={
  props=>(
    <div>
         <h1>移动鼠标</h1>
         <p>当前的鼠标位置x:{props.x}y:{props.y}</p>
    </div>)
}/>,document.getElementById('root'));

/* ReactDOM.render(<MouseTracker>
  {
    props=>(
    <div>
         <h1>移动鼠标</h1>
         <p>当前的鼠标位置x:{props.x}y:{props.y}</p>
    </div>)
  }
</MouseTracker>,document.getElementById('root')); */
