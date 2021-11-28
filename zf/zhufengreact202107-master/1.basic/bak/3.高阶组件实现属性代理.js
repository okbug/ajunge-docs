import React from 'react';
import ReactDOM from 'react-dom';

const withLoading = (message)=>(OldComponent)=>{
  return class extends React.Component{
    render(){
      const xxx = {
        show:()=>{
          let div = document.createElement('div');
          div.innerHTML = `<p id="loading" style="position:absolute;top:100px;z-index:100;background-color:gray;color:red;">${message}</p>`;
          document.body.appendChild(div);
        },
        hide:()=>{
          document.getElementById('loading').remove();;
        }
      }
      return <OldComponent {...{...this.props,...xxx}}/>
    }
  }
}
class Hello extends React.Component{
  render(){
    return (
      <div>
        {this.props.title} 
        <button onClick={this.props.show}>show</button>
        <button onClick={this.props.hide}>hide</button>
      </div>
    )
  }
}
let HelloWithLoading = withLoading('加载中......')(Hello);
ReactDOM.render(<HelloWithLoading title="标题" />, document.getElementById('root'));
