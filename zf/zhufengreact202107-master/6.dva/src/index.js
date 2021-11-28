import React from 'react';
import dva, { connect } from './dva';
import {Route,Link} from './dva/router';
//"react-router-redux 也是把路由和仓库状态组合的库，就是connected-react-router前身
import {push} from 'connected-react-router';
const app = dva();
app.model({
  namespace: 'counter',
  state: { number: 0 },//每个命名空间都有自己的状态
  reducers: {//还有自己的处理器reducer
    //reducers对象key就相当于actionType,值是本state对应的处理函数,state是此命名空间下的分状态，
    add(state, action) {
      return { number: state.number + 1 };
    },
    minus(state, action){
      return { number: state.number -1 };
    }
  },
  effects:{
    //监听所有的派发的counter/asyncAdd的动作，执行对应的saga函数
    *asyncAdd(action,{call,put}){
      yield call(delay,1000);
      //Warning: [sagaEffects.put] counter/add should not be prefixed with namespace counter
      //在model的effects中如果派发动作给自己的模型的话，是不需要添加namespace前缀的
      //如果是给别的model添发的话，还是要添加命名空间前缀的
      yield put({type:'add'});
    },
    *goto({payload},{call,put}){
      //希望在这时中跳转到/首页去  派发一个跳转到首页的动作
     yield put( push(payload));
    }
  }
});
const Home = ()=><div>Home</div>
function Counter(props){
  console.log('props',props);
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
      <button onClick={()=>props.dispatch({type:'counter/asyncAdd'})}>asyncAdd</button>
      <button onClick={()=>props.dispatch({type:'counter/goto',payload:'/'})}>跳转</button>
    </div>
  )
}
const ConnectedCounter = connect(
  state=>state.counter//conenct第二个参数如果没有传，默认会把store.dispatch当成参数传给组件
)(Counter);
//定义要渲染的内容 
app.router(()=>(
  <>
  <Link to="/">Home</Link>
  <Link to="/counter">Counter</Link>
  <Route path="/" component={Home} exact={true}/>
  <Route path="/counter" component={ConnectedCounter}/>
 </>
));
//开始渲染
app.start('#root');

function delay(ms){
 return new Promise(resolve=>{
   setTimeout(resolve,ms);
 });
}


/**
 * let reducers = {counter:counterReducer}
 * let rootReducer = combineReducers(reducers);
 * 
 * 一个react也就是dva应用，里面会包含好多个model
 * model都有一个命名空间
 */

/*   reducer(state,action){
    switch(action.type){
      case 'add':
        return { number: state.number + 1 };
      case 'minus':
        return { number: state.number -1 };
      default:
        return state;  
    }
  }, */