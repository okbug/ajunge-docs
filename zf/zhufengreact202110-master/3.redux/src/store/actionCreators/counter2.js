import * as actionTypes from '../action-types';
const actionCreators = {
    add2() {
        return { type: actionTypes.ADD2 };
    },
    minus2() {
        return { type: actionTypes.MINUS2 };
    }
};

export default actionCreators;