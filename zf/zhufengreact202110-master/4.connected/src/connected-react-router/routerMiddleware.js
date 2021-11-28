
import { CALL_HISTORY_METHOD } from './actions';
function routerMiddleware(history) {
    return function ({ getState, dispatch }) {
        return function (next) {
            return function (action) {
                debugger
                const { type, payload } = action
                if (type === CALL_HISTORY_METHOD) {
                    history[payload.method](payload.path);
                } else {
                    return next(action);
                }
            }
        }
    }
}

export default routerMiddleware;