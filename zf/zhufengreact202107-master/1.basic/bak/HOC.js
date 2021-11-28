import React from 'react';
import ReactDOM from 'react-dom';
function withTracker(OldComponent){
  return class MouseTracker extends React.Component{
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
           <OldComponent {...this.state}/>
        </div>
      )
    }
  }
}



function Show(props){
  return (
    <React.Fragment>
      <h1>移动鼠标</h1>
      <p>当前鼠标的位置是 {props.x},{props.y}</p>
    </React.Fragment>
  )
}
let HighOrderShow = withTracker(Show);
function Hello(props){
  return (
    <React.Fragment>
      <h1>Hello</h1>
      <p>Hello {props.x},{props.y}</p>
    </React.Fragment>
  )
}
let HighOrderHello = withTracker(Hello);
ReactDOM.render(<HighOrderHello/>, document.getElementById('root'));