import * as types from './action-types';
const actions = {
    asyncAdd(){
        return {type:types.ASYNC_ADD};
    },
    stopAdd(){
        return {type:types.STOP_ADD};
    }
}
export default actions;