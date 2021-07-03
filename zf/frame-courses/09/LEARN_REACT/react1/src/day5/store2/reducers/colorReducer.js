import { CHANGE_COLOR } from '../types'
export function colorReducer(state, action) {
  state = state || {
    color: 'red'
  }
  console.log('colorReducer')
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color
      }

    default:
      return {
        ...state
      }
  }
}