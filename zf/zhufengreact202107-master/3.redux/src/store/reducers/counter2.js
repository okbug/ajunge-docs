import * as actionTypes from '../action-types'
//Counter1组件对应的state
let intialState = {number:0,color:'black'};
//Counter1组件对应的reducer
function counter2(state=intialState,action){
    switch(action.type){
        case actionTypes.ADD2:
            return {...state,number:state.number+1};
        case actionTypes.MINUS2:
            return {...state,number:state.number-1};
        case actionTypes.CHANGE_COLOR:
            return {...state,color:action.payload};   
        default:
            return state;    
    }
}
export default counter2