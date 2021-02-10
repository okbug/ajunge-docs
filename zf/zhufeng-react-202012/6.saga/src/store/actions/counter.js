import * as types from '../action-types';

const actions = {
    add(){//reducer默认情况下只能识别ADD动作
        return {type:types.ADD}
    },
    asyncAdd(){
        return {type:types.ASYNC_ADD}
    }
}
export default actions;