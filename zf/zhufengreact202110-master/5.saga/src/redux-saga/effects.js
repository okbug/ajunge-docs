import * as effectTypes from './effectTypes';

export function take(actionType) {
    return { type: effectTypes.TAKE, actionType };
}

export function put(action) {
    return { type: effectTypes.PUT, action };
}
export function fork(saga, args) {
    return { type: effectTypes.FORK, saga, args };
}
export function takeEvery(actionType, saga) {
    function* takeEveryHelper() {
        while (true) {
            const action = yield take(actionType);
            yield fork(saga, [action]);
        }
    }
    return fork(takeEveryHelper);
}

export function call(fn, ...args) {
    return { type: effectTypes.CALL, fn, args };
}
export function cps(fn, ...args) {
    return { type: effectTypes.CPS, fn, args };
}
export function all(iterators) {
    return { type: effectTypes.ALL, iterators };
}
export function cancel(task) {
    return { type: effectTypes.CANCEL, task };
}

