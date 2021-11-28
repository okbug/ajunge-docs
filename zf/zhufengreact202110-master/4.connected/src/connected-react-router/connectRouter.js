
import { LOCATION_CHANGE } from './actions';
function connectRouter(history) {
    const initialState = { action: history.action, location: history.location };
    return function reducer(state = initialState, { type, payload }) {
        debugger
        if (type === LOCATION_CHANGE) {
            return { ...state, action: payload.action, location: payload.location };
        }
        return state;
    }
}

export default connectRouter;