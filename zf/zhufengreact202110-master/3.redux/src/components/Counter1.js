import React from 'react'
import { useSelector, useDispatch } from '../react-redux';
import actionCreators from '../store/actionCreators/counter1';

function Counter1() {
    //useSelector 替换是connect mapStateToProps
    let { number } = useSelector(state => state.counter1);
    let dispatch = useDispatch();//store.dispatch
    return (
        <div>
            <p>{number}</p>
            <button onClick={() => dispatch(actionCreators.add1())}>+</button>
            <button onClick={() => dispatch(actionCreators.minus1())}>-</button>
            <button onClick={() => dispatch(actionCreators.thunkAdd())}>thunkAdd</button>
            <button onClick={() => dispatch(actionCreators.promiseAdd())}>promiseAdd</button>
            <button onClick={() => dispatch(actionCreators.promise2Add())}>promise2Add</button>
        </div>
    )
}
export default Counter1;