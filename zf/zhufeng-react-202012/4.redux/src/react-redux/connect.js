import React,{useContext} from 'react';
import ReactReduxContext from './ReactReduxContext';
import {bindActionCreators} from '../redux';
/**
 * 把组件和仓库进行关联
 * 两条路或者说有两个方向
 * 1.输入 把仓库中中的状态输入或者 说传入组件，让组件可以显示  mapStateToProps
 * 2.输出 可以让组件里的操作改变仓库中状态 actions
 * 另外 为了让组件读取到最新的仓库中的状态。当仓库状态改变后，要通知组件刷新
 * @param {*} mapStateToProps 把仓库状态映射为属性
 * @param {*} mapDispatchToProps 把store.dispatch方法映射为属性
 */
function connect(mapStateToProps,mapDispatchToProps){
    return function(OldComponent){
        function NewComponent(props){
            //let [] = React.useState();

            const {store} = useContext(ReactReduxContext);
            const state = store.getState();//获取仓库中的总状态
            //let mapStateToProps = state=>state.counter1;
            //19行以state为依赖 33行以store为优化 
            const stateProps = React.useMemo(()=>{
                console.log('重新计算stateProps');
                return  mapStateToProps(state);
            },[state]);
            //const dispatchProps = bindActionCreators(actions,store.dispatch);
            //组件重新渲染不是因为store变了更新状态么 那这里为何以store为依赖优化？
            //即store里的状态改变了，也不需要重新计算
            let dispatchProps = React.useMemo(()=>{
                console.log('重新计算dispatchProps');
                let dispatchProps;
                if(typeof mapDispatchToProps === 'object'){
                    dispatchProps=bindActionCreators(mapDispatchToProps,store.dispatch);
                }else if(typeof mapDispatchToProps === 'function'){
                    dispatchProps=mapDispatchToProps(store.dispatch);
                }else{
                    dispatchProps={dispatch:store.dispatch}
                }
                return dispatchProps;
            },[store.dispatch]);
            //调用updateComponent的目的就是让状态改变，让组件更新
            //const [,updateComponent] = React.useReducer(()=>({}));
            const [,setState]= React.useState({});
            //里面可以编写一个订阅，订阅仓库中的状态变化 事件，仓库的状态发生变化后可以调用forceUpdate
            //从而让组件进行刷新，为了保证只需要订阅一次，所以可以写个依赖项store
            React.useEffect(()=>{
                let unsubscribe = store.subscribe(()=>setState({}));
                //这个函数的返回值 React会存起来，会在下次执行回调之前的执行
                return unsubscribe;
            },[store]);
            //把返回的对象当成了OldComponent组件的属性 stateProps={number:5}
            return <OldComponent {...props} {...stateProps} {...dispatchProps}/>
        }
        return NewComponent;
    }
}
/**
 * 好吧。。原来在这里做了点优化 ，
 * 我还以为一定会走scheduleupdate，因为mapStateToProps改变了props 所以才会更新 
 在hooks有优化
 如果前后的状态是一样的，那么会忽略 更新操作，不会更新组件
 {} === {} false
 0 === 0 true
 * Tony
const [, forceUpdate] = useReducer((x) => x, 0); 
Tony
张佬 这个好像不能更新啊 
Tony
必须要 x => x+1 

改变引用 
Tony
这个优化有作用吗 mapstate一直变 connected组件也一直会更新 
小行星
store的state不是改变了嘛？为什么说store没变 
store.dispatch 函数指针 没 变
store = {getState,dispatch,subscribe}
Tony
优化应该主要是对组件更不更新进行操作吧 
1.对组件更新的优化，尽量减少更新
2.减少重复计算
FE扫地僧
肯定有作用的, 比如props 其他值变了 state 没有变 
136****2778
1 
Caption
官方版本react-redux 为了保证父子组件同时订阅时的渲染次序，有个Subscription类, 这个我们说吗 
 */
function connect2(mapStateToProps,actions){
    return function(OldComponent){
        return class NewComponent extends React.Component{
            static contextType = ReactReduxContext
            componentDidMount(){
                this.unsubscribe = this.context.store.subscribe(()=>this.forceUpdate());
            }
            componentWillUnmount(){
                this.unsubscribe();
            }
            render(){
                const {store} = this.context;
                const state = store.getState();
                const stateProps = mapStateToProps(state);
                const dispatchProps = bindActionCreators(actions,store.dispatch);
                return <OldComponent {...this.props} {...stateProps} {...dispatchProps}/>
            }
        }
    }
}
export default connect;
/**
 * useReducer那不是很理解 
Tony
不订阅可以更新吗 
H
觉得返回类组件的写法会更直观点 
Tony
useState也可以是吧 

觉得返回类组件的写法会更直观点 
Tony
useState也可以是吧 
罗畅
updateComponent这个方法内部其实就会去触发页面更新的方法吧 
Caption
可以加很多的判断和参数
react-redux官方版本比我们写的复杂的多，老师 他的那么写是为什么 
store改变的话是在组件oldcomponent里面去更改store里面的状态了吧 
136****2778
这么写怎么传进去了空对象？ 
传什么值不重要，关键是只要调这个方法了，就更新组件
一业
不用hooks怎么实现呢 
小行星
1 
张润钊-2625
这样写的话，store改变了，别的组件也会刷新吧 
Tony
应该说是让他去走更新逻辑吧。因为props修改来源不是setState() 而是在mapStateToProps就已经修改了，然后compareTwoVdom就会进入dom的修改 
Tony
如果mapStateToProps没有修改  那setState传入({})应该是不会更新dom的 
136****2778
老师你订阅的setState为啥传了个空对象 
136****2778
那怎么把新数据更新视图 
Tony
直接用forceUpdate就好了  只有类才有
张润钊-2625
新数据是从props传进来的，这里的setState负责重新调用组件的render方法触发dom-diff更新视图 
罗畅
用this.forceUpdate()触发页面更新也是一样的 
136****2778
函数组件实现的 useEffect我知道返回销毁函数 但是这里没有写赋给谁 
开心麻花
react-redux的核心就是这个connect函数？ 
父子组件同时时 connect 的话，会不支导致多次更新 会的

136****2778
有 
136****2778
但是组件销毁的时候会执行useEFFect吗？ 会执行上次的返回值
136****2778
组件销毁的时候会走useEffect的那个判断分支 
136****2778
之前定时器的例子这个是返回一个销毁，下次执行先执行这个 
136****2778
为什么组件销毁会执行useEfffect 
组件销毁的时候执行是上次回调函数执行返回值 
effect的回调中要创建定时器，等组件销毁的时候要清掉定时器
勿忘心安
在dom-diff的时候 比较 
136****2778
哦 
勿忘心安
进入compiletoVdom 


 */

/**
18行才把state变成props 那业务代码之前的prop是没有这个number啊  是的
业务代码的connect是在最后面 
136****2778
没有会不会报错 看下业务代码 
export是在最后 
H
connect()() 函数柯里化的写法 
136****2778
也就是counter1 extends 相当于函数定义 没有执行？ 
136****2778
是export 才执行 

我们写的代码都是预制代码是吧  
H
那个mapDispatchToProps 在counter1里面直接传的actions对象到connect中，
然后在connect进行bindActions 么？

connect 的action需要判断是对象还是函数吧？ 是的，这个可以写
Tony
这个forceupdate是什么意思  强行让组件更新 模拟类组件的方法
136****2778
x=>x+1什么意思 
136****2778
还有0 
136****2778
为什么要用leayout 
136****2778
leyout 
H
用useEffect也可以吧  
Vc
17行   
钱炜华
useReducer里面的函数，应该从外部传入吧 

 */