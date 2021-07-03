export interface IUser {
  name?: string,
  age?: number,
  level?: number,
  address?: string,
  [key: string]: any,
}


interface IAction {
  type: string,
  userInfo: IUser
}

let str = localStorage.getItem('miyou_userInfo')
let defaultState: IUser = str ? JSON.parse(str) : {}


export function userReducer(state: IUser = defaultState, action: IAction) {
  switch (action.type) {
    case 'updateUserInfo':
      localStorage.setItem('miyou_userInfo', JSON.stringify(action.userInfo))
      return {
        ...state,
        ...action.userInfo
      }
    default:
      return {
        ...state
      }
  }
}