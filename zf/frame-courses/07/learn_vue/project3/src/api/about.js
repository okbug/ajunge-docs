import http from './http'

export function getMsg() {
  return http.get('/about/msg')
}


export function login(options) {
  return http.post('/login', options)
}