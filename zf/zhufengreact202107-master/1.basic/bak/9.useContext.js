import React from './react';
import ReactDOM from './react-dom';
//创建一个CounterContext
const CounterContext = React.createContext();
/**
 * 处理函数 接收老状态和动作，返回新的状态
 * @param {*} state 老状态
 * @param {*} action 动作
 */
function reducer(state={number:0},action){
   switch(action.type){
     case 'ADD':
       return {number:state.number+1};
     case 'MINUS':
       return {number:state.number-1};   
     default:
       return state;  
   }
}
function Counter(){
   let {state,dispatch} = React.useContext(CounterContext);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={()=>dispatch({type:'ADD'})}>+</button>
      <button onClick={()=>dispatch({type:'MINUS'})}>-</button>
    </div>
  )
}

function App(){
  const [state,dispatch] = React.useReducer(reducer,{number:0});
  return (
    <CounterContext.Provider value={{state,dispatch}}>
      <Counter/>
    </CounterContext.Provider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
