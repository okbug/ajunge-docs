/* import React from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './components/Counter1';
import Counter2 from './components/Counter2';
import {Provider} from './react-redux';
import store from './store';
ReactDOM.render(
<Provider store={store}>
    <Counter1/>
    <Counter2/>
</Provider>,document.getElementById('root')); */
import store from './store';
//store.dispatch只能传普通对象
store.subscribe(()=>console.log(store.getState()));
debugger

store.dispatch(function(){
    setTimeout(()=>{
        store.dispatch(function(){
            setTimeout(()=>{
                store.dispatch(function(){
                    setTimeout(()=>{
                        store.dispatch({type:'ADD1'});
                    },3000);
                });
            },3000);
        });
    },3000);
});
//Actions must be plain objects. Use custom middleware for async actions.
//不一样吧 logger的dispatch应该是store.dispatch吧 然后执行完 再打印 更改后的状态 