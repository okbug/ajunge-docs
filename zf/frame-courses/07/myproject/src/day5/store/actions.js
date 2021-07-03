export function getName() {
  return function (dispatch) {
    return Promise.resolve('hello').then(name => {
      dispatch({ type: 'CHANGENAME', name: name })
      return 345354532453
    })
  }

}