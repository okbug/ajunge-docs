import React from 'react';
import {useSelector,useDispatch} from '../react-redux';
function Counter1(){
    let dispatch = useDispatch();//store.dispatch
    const mapStateToProps = state=>({
        counter1:state.counter1,
        counter2:state.counter2,
        something:'something'
    });
    let state = useSelector(mapStateToProps);//获取状态
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={()=>dispatch({type:'ADD1'})}>add1</button>
            <button onClick={()=>dispatch({type:'MINUS1'})}>minus1</button>
            <button onClick={()=>dispatch({type:'MINUS'})}>minus</button>
        </div>
    ) 
}
export default Counter1;
/**
const dispatch = useDispatch()
const logout = () => dispatch(logoutAction()) 
 */