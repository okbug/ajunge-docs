import React, { Component } from 'react'
import { connect } from '../react-redux';
import actionCreators from '../store/actionCreators/counter2';

class Counter1 extends Component {
    render() {
        const { number, add2, minus2 } = this.props;
        return (
            <div>
                <p>{number}</p>
                <button onClick={add2}>+</button>
                <button onClick={minus2}>-</button>
            </div>
        )
    }
}
/**
 * state={counter1:{number:0},counter2:{number:0}}
 * 组件和仓库的关系
 * 输入 取总状态的某一部分通过属性输入到组件中 
 * 输出 把actionCreator通过 属传递给组件，让组件可以派发动作，修改仓库的状态
 */
const mapStateToProps = (state) => state.counter2;
const ConnectedCounter2 = connect(
    mapStateToProps,
    actionCreators
)(Counter1);
export default ConnectedCounter2;
//ConnectedCounter1

/**
 * 仓库 store 跟 组件 交互有两个方向
 * 输入 把store中的属性输出给组件，让组件用来渲染
 * 输出 在组件里可以通过派发动作action 修改状态 ，状态一更改了，就马会通知订阅函数
 * 订阅函数里会调用组件的setState方法进行刷新
 */
