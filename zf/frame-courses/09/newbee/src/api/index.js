import http from '../util/http'

export function getAA() {
  return http.get('/api/v1/categories')
}

export function getBB() {
  return http.get('/api/v1/shop-cart')
}

// 登录接口
export function login(params) {
  return http.post('/api/v1/user/login', params)
}
// 注册接口
export function register(params) {
  return http.post('/api/v1/user/register', params)
}


// 首页信息
export function indexInfo() {
  return http.get('/api/v1/index-infos')
}

//商品详情
export function getGoodsInfo(id) {
  return http.get('/api/v1/goods/detail/' + id)
}


// 获取购物车
export function getCart() {
  return http.get('/api/v1/shop-cart')
}

// 添加购物车
export function addCart(params) {
  //params {goodsCount: 1,goodsId: 10908}
  return http.post('/api/v1/shop-cart', params)
}

// 添加商品数量
export function addGoodsCount(params) {
  //params {goodsCount: 1,goodsId: 10908}
  return http.put('/api/v1/shop-cart', params)
}

// 获取地址列表
export function getAddress() {
  return http.get('/api/v1/address')
}
// 新增地址
export function addAddress(params) {
  /* 
  cityName: "北京市"
  defaultFlag: 0
  detailAddress: "国风美唐6-507"
  provinceName: "北京"
  regionName: "昌平区"
  userName: "zhufeng"
  userPhone: "18233187958"
  */
  return http.post('/api/v1/address', params)
}

// 获取某地址的详细信息
export function getAddressInfo(id) {
  return http.get('/api/v1/address/' + id)
}


// 删除某地址的详细信息
export function delAddressInfo(id) {
  return http.delete('/api/v1/address/' + id)
}

// 获取购物车选中的商品
export function getSelectCart(ids) {
  return http.get('/api/v1/shop-cart/settle?cartItemIds=' + ids)
}

// 确认订单
export function makeSureOrder(params) {
  return http.post('/api/v1/saveOrder', params)
}

// 支付成功
export function paySuccess(params) {
  //?orderNo=16177138625505689&payType=1
  return http.get('/api/v1/paySuccess', {
    params
  })
}

// 获取订单列表
export function getOrderList(params) {
  ///api/v1/order?pageNumber=1&status=
  return http.get('/api/v1/order', { params })
}