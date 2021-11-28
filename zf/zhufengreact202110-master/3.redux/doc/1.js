
let dispatch;//它会指向改造后的dispatch，这时dispatch是undefined
let middlewareAPI = {
    dispatch: (action) => dispatch(action)
}
dispatch = (action) => { console.log('dispatch', action); }

middlewareAPI.dispatch({ type: 'add' });