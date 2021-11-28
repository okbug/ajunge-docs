import React from 'react'
import ReactReduxContext from './ReactReduxContext';
import { bindActionCreators } from '../redux';
/**
 * 高阶组件，传递老组件，返回连接仓库后的新组件
 * 高阶组件本来就是为了共享 提供公共逻辑的
 * @param {*} mapStateToProps  把仓库中的状态经过映射后变成老组件的属性
 * @param {*} mapDispatchToProps  把store.dispatch方法和actionCreators绑定后变成老组件的属性
 * @returns 
 */
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext
            constructor(props, context) {
                super(props);
                //获取仓库  
                let { store } = context;
                let { getState, subscribe, dispatch } = store;
                //设置初始状态 
                this.state = mapStateToProps(getState());//{number:0}
                //订阅状态变化事件，当状态发生变化时执行订阅函数，重新映射新状态，修改state
                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()));
                });

                this.dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
            }
            componentWillUnmount() {
                this.unsubscribe();
            }
            render() {
                return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />
            }
        }
    }
}


export default connect;