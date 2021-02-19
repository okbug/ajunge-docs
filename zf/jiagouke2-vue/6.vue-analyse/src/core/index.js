import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue); // 初始化全局的api方法


// web/entry-runtime-with-compiler 重写$mount方法
// web/runtime/index.js  __patch__ 全局组件和指令 （扩展的$mount）
// core/index  initGlobalAPI初始化全局的api
// instance/index  核心的构造函数


export default Vue
