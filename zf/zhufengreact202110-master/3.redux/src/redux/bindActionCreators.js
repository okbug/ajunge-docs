
/**
 * 
 * @param {*} actionCreators 
 * @param {*} dispatch 
 */
function bindActionCreators(actionCreators, dispatch) {
    const boundActionCreators = {};
    for (let key in actionCreators) {
        const actionCreator = actionCreators[key];
        boundActionCreators[key] = function () {
            dispatch(actionCreator());
        }
    }
    return boundActionCreators;
}

export default bindActionCreators;

/**
const actions = {
    add() {
        return { type: ADD };
    },
    minus() {
        return { type: MINUS };
    }
};
 */
/**
const boundActions = {
    add() {
        dispatch(add());
    },
    minus() {
        dispatch(minus());
    }
}
 */