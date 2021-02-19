import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) { // Vue的构造函数
  this._init(options)
}
// 给Vue的原型上添加方法
initMixin(Vue) // Vue.prototype._init
stateMixin(Vue) //$set $delte $watch
eventsMixin(Vue) // $on $emit $once $off 
lifecycleMixin(Vue) //  Vue.prototype._update
renderMixin(Vue) // Vue.prototype._render

export default Vue
