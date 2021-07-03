import http from './http'
import store from '../store/index'

export interface IReg {
  name: string
  phone: string
  password: string
  passwordPay: string
}
export function register(params: IReg) {
  return http.post('/user/register', params)
}

export function login(params: any) {
  return http.post('/user/login', params).then((data: any) => {
    store.dispatch({ type: 'updateUserInfo', userInfo: data.data })
    return data
  })
}