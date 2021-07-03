import { UPDATEUSER } from '../types'

// 结合loacalStorage 
let str = localStorage.getItem('xinfeng_userInfo');
let initState = str ? JSON.parse(str) : {}
export function userReducer(state, action) {
  state = state || initState;
  switch (action.type) {
    case UPDATEUSER:
      localStorage.setItem('xinfeng_userInfo', JSON.stringify(action.userInfo))
      return action.userInfo
    default:
      return {
        ...state
      }
  }
}