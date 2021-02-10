import React from 'react';
import RouterContext from './RouterContext';
import Lifecycle from './Lifecycle';
/**
 * 
 * @param {*} when 布尔值表示要不要阻止跳转
 * @param {*} message 它是一个函数，表示要阻止的时候显示什么的提示信息
 */
function Prompt({when,message}){
  return (
      <RouterContext.Consumer>
          {
              value=>{
                  if(!when)return null;
                  return (
                      <Lifecycle
                        onMount={lifecycleInstance=>{
                            lifecycleInstance.release = value.history.block(message);
                        }}
                        onUnmount={lifecycleInstance=>lifecycleInstance.release()}
                      />
                  )
              }
          }
      </RouterContext.Consumer>
  )
}
class ClassPrompt extends React.Component{
    static contextType = RouterContext;
    componentDidMount(){
        this.release = this.context.history.block(this.props.message);
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
        this.release();
    }
    render(){
        return null;
    }
}
export default Prompt;