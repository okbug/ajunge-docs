
import *  as actionTypes from '../action-types';
let actions = {
    add2(){
        return {type:actionTypes.ADD2};
    },
    minus2(){
        return {type:actionTypes.MINUS2};
    },
    changeColor(color){
        return {type:actionTypes.CHANGE_COLOR,payload:color};
    }
}

export default actions;