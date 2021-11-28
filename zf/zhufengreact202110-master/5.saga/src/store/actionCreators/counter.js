import * as actionTypes from '../action-types';
const actionCreators = {
    add() {
        return { type: actionTypes.ADD };
    },
    asyncAdd() {
        return { type: actionTypes.ASYNC_ADD };
    },
    stop() {
        return { type: actionTypes.STOP };
    }
}
export default actionCreators;