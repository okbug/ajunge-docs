/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  // 你的插件可能是一个函数
  // Vuex-> 不需要依赖于 Vue本身 我写的插件不依赖于vue本身
  
  Vuex = function(_Vue,a,b,c){}  Vuex.install = function(_Vue,a,b,c){}

  Vue.use(Vuex,1,2,3)
  Vue.use = function (plugin: Function | Object) { // 单例的
    // 插件不能重复的加载
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this) // install方法的第一个参数是Vue的构造函数，其他参数是Vue.use中除了第一个参数的其他参数
    if (typeof plugin.install === 'function') { // 调用插件的install方法
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {  // 插件本身是一个函数，直接让函数执行
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)// 缓存插件
    return this
  }
}
