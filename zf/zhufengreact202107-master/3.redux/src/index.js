import React from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './components/Counter1';
import Counter3 from './components/Counter3';
import { Provider } from './react-redux';
import store from './store';
ReactDOM.render(
<Provider store={store}>
    <Counter1 />
    <Counter3 />
</Provider>, document.getElementById('root'));