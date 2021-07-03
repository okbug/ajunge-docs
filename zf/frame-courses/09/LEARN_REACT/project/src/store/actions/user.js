import { login } from '../../api'
import { UPDATEUSER } from '../types'
export function loginFn(params) {
  return (dispatch) => {
    return login(params).then(data => {
      dispatch({ type: UPDATEUSER, userInfo: { token: data.data, userName: params.userName, userLevel: 5 } })
      return data
    })
  }
}