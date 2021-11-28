import React, { Component } from 'react'
import {connect} from '../react-redux';
import actions from '../store/actions/counter1';
import * as actionTypes from '../store/action-types';
//Counter1.props = {...state.counter1,...actions};
class Counter1 extends Component {
    render() {
        let {color,number,add1,minus1,changeColor,thunkAdd,promiseAdd,promise2Add} = this.props;
        return (
            <div style={{color}}>
                <p>{number}</p>
                <button onClick={add1}>+</button>
                <button onClick={minus1}>-</button>
                <button onClick={()=>changeColor('red')}>改成红色</button>
                <button onClick={thunkAdd}>thunkAdd</button>
                <button onClick={promiseAdd}>promiseAdd</button>
                <button onClick={promise2Add}>promise2Add</button>
            </div>
        )
    }
}
//把仓库中的状态映射为组件的属性对象 输入
let mapStateToProps = state=>state.counter1;
//把dispatch方法映射为一个属性对象 
let mapDispatchToProps = dispath=>({
    add1(){
        dispath({type:actionTypes.ADD1});
    },
    minus1(){
        dispath({type:actionTypes.MINUS1});
    },
    changeColor(color){
        dispath({type:actionTypes.CHANGE_COLOR,payload:color});
    }
})
//把派发的动作映射为属性对象
//let mapDispatchToProps
export default connect(
    mapStateToProps,
    //mapDispatchToProps //第一种
    actions //第二种
)(Counter1);
/**
 * 组件关联仓库两个方向 
 * 输入 组件里使用仓库提供的状态进行组件的渲染
 * 输出 在组件可以派发动作从而修改仓库中的状态 
 */