import { createStore } from './redux';
//定义二个动作类型
const ADD = 'ADD';//加1
const MINUS = 'MINUS';//减1
/**
 * 处理器
 * @param {*} oldState 老状态
 * @param {*} action 动作
 */
const reducer = (oldState={ number: 5 }, action) => {
  switch (action.type) {//判断动作的类型
    case ADD://如果是ADD的话，返回一个新的状态
      return { number: oldState.number + 1 };
    case MINUS:
      return { number: oldState.number - 1 };
    default:
      return oldState;
  }
}

let store = createStore(reducer, { number: 10 });
let counterValue = document.getElementById('counter-value');
function render(){
  counterValue.innerHTML = store.getState().number;
}
render();
store.subscribe(render);
let addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click',()=>{
  store.dispatch({type:ADD});
});
let minusBtn = document.getElementById('minus-btn');
minusBtn.addEventListener('click',()=>{
  store.dispatch({type:MINUS});
});