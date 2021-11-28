import React from 'react'
import {useSelector,useBoundDispatch} from '../react-redux';
import actions from '../store/actions/counter2';
let mapStateToProps = state=>state.counter2;
function Counter3(props){
    //在函数组件的中可以使用useSelector替换掉mapStateToProps
    let counter2 = useSelector(mapStateToProps,(left,right)=>left===right);
    let {add2,minus2,changeColor} = useBoundDispatch(actions);
    const {number,color}=counter2;
    return (
        <div style={{color}}>
            <p>{number}</p>
            <button onClick={add2}>+</button>
            <button onClick={minus2}>-</button>
            <button onClick={()=>changeColor('green')}>改成绿色</button>
        </div>
    )
}
export default Counter3;
/**
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 * equalityFn the function that will be used to determine equality
 */