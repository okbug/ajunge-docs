import http from './http'

export function login(params) {
  return http.post('/adminUser/login', params || {})
}

export function hot_getData(params) {
  params.configType = 3;
  return http.get('/indexConfigs', { params: params })
}