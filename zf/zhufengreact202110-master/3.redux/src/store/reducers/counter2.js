import * as actionTypes from '../action-types';
let initialState = { number: 0 };
function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD2:
            return { number: state.number + 1 };
        case actionTypes.MINUS2:
            return { number: state.number - 1 };
        default:
            return state;//给的动作不能识别，直接返回上一个老状态
    }
}

export default reducer;