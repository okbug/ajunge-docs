import React from 'react';
import dva,{connect,ConnectedRouter} from './dva';
import {Route,Link,routerRedux} from './dva/router';
//const {ConnectedRouter} =routerRedux;
//dva是一个函数，执行它可以得到app实例
const app = dva();
//调用model方法定义一个模型
//redux应用的时候 单独写不同的reducer,不同的状态，然后进行合并combine
app.model({
  namespace:'counter',//命名空间
  state:{number:0},//此命令空间下面的初始状态
  reducers:{//处理器
    add(state){//处理器对象的key其实就是 action.type,此函数可以接收老状态，返回新状态
      return {number:state.number+1};
    }//只有reducer才能修改state
  },
  effects:{
    //是写业务逻辑的 调接口异步等等
    //action动作 effects = redux/effects
    *asyncAdd(action,effects){
      yield effects.call(delay,1000);//延迟一秒时间
      // counter/add should not be prefixed with namespace counter
      yield effects.put({type:'add'});//store.dispatch({type:'add'});
      let state = yield effects.select(state=>state.counter);
      console.log('state',state);
    },
    *goto({payload},{put}){
      //push是一个actionCreator 执行会返回一个action ={type:CALL_HISTORY_METHOD,payload:{method:'push',args:["/"]}}
      yield put(routerRedux.push('/'));
    }
  }
});
//如果你在model里面派发动作的时候，是可以不加namespace的

app.model({
  namespace:'counter2',
  state:{number:0},//此命令空间下面的初始状态
  reducers:{//处理器
    add(state){//处理器对象的key其实就是 action.type,此函数可以接收老状态，返回新状态
      return {number:state.number+1};
    }//只有reducer才能修改state
  },
})

function Counter(props){
 return (
   <div>
     <p>{props.number}</p>
     <button onClick={()=>props.dispatch({type:'counter/add'})}>add</button>
     <button onClick={()=>props.dispatch({type:'counter/asyncAdd'})}>asyncAdd</button>
     <button onClick={()=>props.dispatch({type:'counter/goto',payload:'/'})}>跳转到Home</button>
   </div>
 )
}

const ConnectedCounter = connect(state=>state.counter)(Counter);
const Home = ()=><div>Home</div>
//定义路由
app.router((api)=>(
  <ConnectedRouter history={api.history}>
    <>
      <Link to="/">Home</Link>
      <Link to="/counter">Counter</Link>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/counter"  component={ConnectedCounter}/>
    </>
  </ConnectedRouter>
));
//开始渲染，把app.router方法的返回值渲染到#root容器里
app.start('#root');


function delay(ms){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve('成功后的值');
    },ms);
  });
}