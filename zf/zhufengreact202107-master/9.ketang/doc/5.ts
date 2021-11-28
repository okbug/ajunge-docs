/* //原始的actionCreator 
function validate() {
    return {
        type: 'VALIDATE',
        payload: validate()
    }
}
function dispatch(action) {

    return action;
}
function boundValidate() {
    return dispatch(validate());
}





function actionCreator() {
    return {
        type: 'VALIDATE',
        payload: validate()
    }
}
let props = {};
props.validate = function () {
    return dispatch(actionCreator());
};

function promiseDispatch(action) {
    return action.payload
        .then(result => dispatch({ ...action, payload: result }))
        .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
        });
}

return promiseDispatch({
    type: 'VALIDATE',
    payload: validate()
});

return Promise.reject(error); */