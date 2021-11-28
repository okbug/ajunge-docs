import { createStore } from './redux';
let counterValue = document.getElementById('counter-value');
let addBtn = document.getElementById('add-btn');
let minusBtn = document.getElementById('minus-btn');

const ADD = 'ADD';
const MINUS = 'MINUS';
/**
 * 根据老状态和动作计算新状态
 * @param {*} state 老状态，可以是任何的值 
 * @param {*} action 动作 ，必须是一个对象，别的不管，只要求里面有一个type属性，用来唯一区分一个动作
 */
function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case ADD:
      return { number: state.number + 1 };
    case MINUS:
      return { number: state.number - 1 };
    default:
      return state;//给的动作不能识别，直接返回上一个老状态
  }
}
/* reducer(undefined, { type: ADD });
reducer(undefined, { type: MINUS }); */
let store = createStore(reducer, { number: 1 });
function render() {
  counterValue.innerHTML = store.getState().number + '';
}
render();
let unsubscribe = store.subscribe(render);
setTimeout(() => {
  unsubscribe();
}, 3000);
addBtn.addEventListener('click', () => {
  store.dispatch({ type: ADD });
});
minusBtn.addEventListener('click', () => {
  store.dispatch({ type: MINUS });
});


