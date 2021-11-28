import React from './react';
import ReactDOM from './react-dom';
class ScrollList extends React.Component{
  constructor(props){
    super(props);
    this.state = {messages:[]};
    this.wrapper = React.createRef();
  }
  addMessage = ()=>{
    this.setState({
      messages:[`${this.state.messages.length}`,...this.state.messages]
    });
  }
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.addMessage();
    },1000);
  }
  //DOM更新前
  getSnapshotBeforeUpdate(){
    return {
      prevScrollTop:this.wrapper.current.scrollTop,//向上卷去的高度
      prevScrollHeight:this.wrapper.current.scrollHeight//DOM更新的内容高度
    }
  }
  //DOM更新后
  componentDidUpdate(prevProps,prevState,snapshot){
    let {prevScrollTop,prevScrollHeight}=snapshot;
    let scrollHeightDiff = this.wrapper.current.scrollHeight-prevScrollHeight;
    this.wrapper.current.scrollTop=prevScrollTop+scrollHeightDiff;
  }
  render(){
    let style = {
      height:'100px',
      width:'200px',
      border:'1px solid red',
      overflow:'auto'
    }
    return (
      <div style={style} ref={this.wrapper}>
        {
          this.state.messages.map((message,index)=>(
            <div key={index}>{message}</div>
          ))
        }
      </div>
    )
  }
}
ReactDOM.render(<ScrollList />, document.getElementById('root'));