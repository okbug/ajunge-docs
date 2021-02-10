import * as types from '../action-types';
const actions = {
    add1(){
        return {type:types.ADD1};
    },
    minus1(){
        return {type:types.MINUS1};
    },
    minus(){
        return {type:types.MINUS};
    }
}
export default actions;