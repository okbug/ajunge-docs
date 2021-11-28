import React from 'react'
import {useSelector,useDispatch} from '../react-redux';
import actions from '../store/actions/counter2';
let mapStateToProps = state=>state.counter2;
function Counter2(props){
    //在函数组件的中可以使用useSelector替换掉mapStateToProps
    let counter2 = useSelector(mapStateToProps);
    let dispatch = useDispatch();
    const {number,color}=counter2;
    return (
        <div style={{color}}>
            <p>{number}</p>
            <button onClick={()=>dispatch(actions.add2())}>+</button>
            <button onClick={()=>dispatch(actions.minus2())}>-</button>
            <button onClick={()=>dispatch(actions.changeColor('green'))}>改成绿色</button>
        </div>
    )
}
export default Counter2;