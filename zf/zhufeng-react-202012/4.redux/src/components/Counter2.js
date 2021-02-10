import React from 'react';
import actions from '../store/actions/counter2';
import {connect} from '../react-redux'
class Counter2 extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.add2}>add2</button>
                <button onClick={this.props.minus2}>minus2</button>
                <button onClick={this.props.minus}>minus</button>
            </div>
        )
    }
}
//这是一个映射函数，可以把仓库的状态进行映射出来分状态, 分状态会成为组件属性对象
let mapStateToProps = state=>state.counter2;
//actions也会进行绑定，成为当前组件属性对象
export default connect(mapStateToProps,actions)(Counter2);
/**
 * connect负责 把仓库和组件进行关联
 * 通过Context获取store
 * 
 */