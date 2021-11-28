import React from 'react';
import ReactDOM from 'react-dom';
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
    let render = typeof this.props.render=== 'function'?this.props.render:this.props.children;
    return (
      <div onMouseMove={this.handleMouseMove}>
        {render(this.state)}
      </div>
    )
  }
}
//render props 组件的属性是一个render方法，返回值是要渲染的React元素
ReactDOM.render(<MouseTracker>
      {
        (props)=>(
          <React.Fragment>
             <h1>移动鼠标</h1>
             <p>当前鼠标的位置是 {props.x},{props.y}</p>
          </React.Fragment>
         )
      } 
</MouseTracker>, document.getElementById('root'));