import React from 'react'
import { useSelector, useBoundDispatch } from '../react-redux';
import actionCreators from '../store/actionCreators/counter2';

function Counter2() {
    //useSelector 替换是connect mapStateToProps
    let { number } = useSelector(state => state.counter2);
    let { add2, minus2 } = useBoundDispatch(actionCreators);//store.dispatch
    return (
        <div>
            <p>{number}</p>
            <button onClick={add2}>+</button>
            <button onClick={minus2}>-</button>
        </div>
    )
}
export default Counter2;