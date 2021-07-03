import { ADD, MINUS, CHANGE_COLOR } from '../types'
export function fn(params) {
  console.log(params)
  return function (dispatch) {
    setTimeout(() => {
      dispatch({ type: CHANGE_COLOR, color: 'pink' })
    }, 2000);
  }
}


export function addFn(n) {
  console.log(n)
  return { type: ADD, num: n }
}
export function minusFn(n) {
  console.log(n)
  return { type: MINUS, num: n }
}
export function changeColorFn(col) {
  return { type: CHANGE_COLOR, color: col }
}