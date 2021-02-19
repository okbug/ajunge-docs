import { mergeOptions } from "../util";

export function initGlobalApi(Vue){
    Vue.options = {}; // Vue.components Vue.diretive 
    Vue.mixin = function (mixin) {
       // 合并对象  （我先考虑生命周期） 不考虑其他的合并 data computed watch
       this.options = mergeOptions(this.options,mixin);
    }

    // Vue.options, options
    // 用户 new Vue({created(){}})
}