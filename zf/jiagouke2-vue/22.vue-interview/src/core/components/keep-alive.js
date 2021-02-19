/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy() // 将组件destroy
  }
  cache[key] = null
  remove(keys, key) // 移除对应的key
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  abstract: true, // 抽象组件

  props: {
    include: patternTypes, // 要缓存的有哪些
    exclude: patternTypes, // 要排除的有哪些
    max: [String, Number] // 最大缓存数量
  },

  created () {
    this.cache = Object.create(null) // {a:vnode,b:vnode}
    this.keys = []  // [a,b]
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () { // 监听include和exclude
    this.$watch('include', val => { // 变化时 更新缓存
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    
    const slot = this.$slots.default // 获取所有的内容
    const vnode: VNode = getFirstComponentChild(slot) // 获取第一个子组件
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      // 不走缓存
      if (
        // not included   不包含
        (include && (!name || !matches(include, name))) ||
        // excluded   排除
        (exclude && name && matches(exclude, name))
      ) { // 返回虚拟节点
        return vnode // 没有走缓存
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) { // 通过key 找到缓存,获取实例
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key) // 将key删除掉
        keys.push(key) // 放到末尾
      } else {
        cache[key] = vnode // 没有缓存过
        keys.push(key) // 存储key
        // prune oldest entry // 如果超过最大缓存数
        if (this.max && keys.length > parseInt(this.max)) {
          // 删除最早缓存的
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true // 标记走了缓存
    }
    return vnode || (slot && slot[0])
  }
}
