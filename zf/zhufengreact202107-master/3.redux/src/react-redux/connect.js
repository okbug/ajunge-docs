import React,{useState,useReducer,useLayoutEffect,useMemo,useContext} from 'react';
import { bindActionCreators } from 'redux';
import ReactReduxContext from './ReactReduxContext';

/**
 * 高阶组件 接收一个老组件，返回一个新组件
 * mapStateToProps 把状态映射为组件属性对象
 * mapDispatchToProps 把dispatch方法映射为组件属性对象
 */
function connect(mapStateToProps,mapDispatchToProps){
    return function(OldComponent){
        return function NewComponent(props){
            const {store} = useContext(ReactReduxContext)
            const {getState,subscribe,dispatch} = store;
            const lastState = getState();
            const stateProps = useMemo(()=>mapStateToProps(lastState),[lastState]);
            const dispatchProps = useMemo(()=>{
                let dispatchProps={};
                if(typeof mapDispatchToProps === 'function'){
                    dispatchProps=mapDispatchToProps(dispatch);
                }else if(typeof mapDispatchToProps === 'object'){
                    dispatchProps = bindActionCreators(mapDispatchToProps,dispatch);
                }
                return dispatchProps;
            },[]);
            
            //forceUpdate没关系，想叫什么都可以 100 +2
            //你永远不需要换，为什么？
            //const [,forceUpdate] = useReducer(x=>x+1,0);
            const [,forceUpdate] = useState({});
            // 订阅是一个非常典型的副作用 useLayoutEffect useEffect
            useLayoutEffect(() => {
                //在当前组件渲染后，执行订阅方法，让当前的组件订阅仓库中的状态变化事件，状态变化后执行forceUpdate
                return store.subscribe(()=>forceUpdate({}));
            }, [])
            return <OldComponent {...props} {...stateProps} {...dispatchProps}/>

        }
    }
}
function connect2(mapStateToProps,mapDispatchToProps){
  return function(OldComponent){
    return class extends React.Component{
        static contextType = ReactReduxContext;
        constructor(props,context){
            super(props);
            const {store} = context;
            const {getState,subscribe,dispatch} = store;
            //把状态映射为属性
            this.state = mapStateToProps(getState());
            this.unsubscribe = subscribe(()=>{
                this.setState(mapStateToProps(getState()));
            });
            //把dispatch方法映射为属性
            let dispatchProps={};
            if(typeof mapDispatchToProps === 'function'){
                dispatchProps=mapDispatchToProps(dispatch);
            }else if(typeof mapDispatchToProps === 'object'){
                dispatchProps = bindActionCreators(mapDispatchToProps,dispatch);
            }
            this.dispatchProps = dispatchProps;
        }
        componentWillUnmount(){
            this.unsubscribe && this.unsubscribe();
        }
        render(){
            return <OldComponent {...this.props} {...this.state} {...this.dispatchProps}/>
        }
    }
  }
}
export default connect;

//redux中间件