


export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const onLocationChange = (location, action) => ({
    type: LOCATION_CHANGE,
    payload: {
        action,
        location
    }
})

export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
export const push = (path) => ({
    type: CALL_HISTORY_METHOD,
    payload: {
        method: 'push',
        path
    }
})