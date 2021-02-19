/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // Vue.config api
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 暴露了内部的工具方法, 开发时尽量不要使用 
  Vue.util = { 
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set // Vue.$set
  Vue.delete = del // Vue.$delete
  Vue.nextTick = nextTick // nextTick原理

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => { // 小型的vuex
    observe(obj) // Vue.observable => defineReactive(obj)
    return obj
  }

  Vue.options = Object.create(null) // 所有的全局属性都在这里
  ASSET_TYPES.forEach(type => {
    // Vue.options.components  directivcs filters  = {}
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents) // 合并keepalive组件

  initUse(Vue) // 插件编写的方法
  initMixin(Vue) // 混合全局的方法
  initExtend(Vue) // Vue.extend() 
  initAssetRegisters(Vue) // 定义全局的components filter directive
}
