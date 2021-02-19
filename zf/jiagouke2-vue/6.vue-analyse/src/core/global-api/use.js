/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 插件不能重复的加载
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)  [this,{a:1,b:2}]
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)  Vue.install = function(Vue,args){}
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)  export default function(){}
    }
    installedPlugins.push(plugin)
    return this
  }
}
