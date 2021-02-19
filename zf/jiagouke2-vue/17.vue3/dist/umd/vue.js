(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  // 运行时的包 里面放着dom 操作的方法
  var nodeOps = {
    // 抽离的目的 可以重写这些方法 vue3 自定义渲染器
    insert: function insert(child, parent, anchor) {
      if (anchor) {
        parent.insertBefore(child, anchor);
      } else {
        parent.appendChild(child);
      }
    },
    remove: function remove(child) {
      var parent = child.parentNode;
      parent && parent.removeChild(child);
    },
    createElement: function createElement(tag) {
      return document.createElement(tag);
    },
    hostSetElementText: function hostSetElementText(el, text) {
      el.textContent = text;
    },
    // 属性操作 。。。。
    hostPatchProps: function hostPatchProps(el, key, prevProps, nextProps) {
      if (/^on[^a-z]/.test(key)) {
        // 事件   onClick
        var eventName = key.slice(2).toLowerCase(); // 更新事件 // onClick

        prevProps && el.removeEventListener(eventName, prevProps);
        nextProps && el.addEventListener(eventName, nextProps);
      } else {
        // 其他属性
        if (nextProps == null) {
          return el.removeAttribute(key); // 删除元素上的属性
        }

        if (key == 'style') {
          for (var _key in nextProps) {
            el.style[_key] = nextProps[_key];
          }

          for (var _key2 in prevProps) {
            if (!nextProps.hasOwnProperty(_key2)) {
              el.style[_key2] = null;
            }
          }
        } else {
          // id class 
          el.setAttribute(key, nextProps);
        }
      }
    }
  };

  var activeEffect;
  function effect(fn) {
    // 默认effect 需要先执行一次
    activeEffect = fn; // 存储fn方法  数据变化 需要再次调用这个方法

    fn();
    activeEffect = null; // 页面渲染完毕要情空effect
  } // 默认只代理第一层
  // Reflect.defineProperty()
  // Reflect.ownKeys()
  // Reflect.setPrototypeOf()

  function reactive(target) {
    return new Proxy(target, {
      // proxy 不用重写每一个属性
      set: function set(target, key, value, receiver) {
        // 拦截器 ，性能更高 兼容性差
        // target[key] = value; //给原来的值做处理
        var res = Reflect.set(target, key, value, receiver);
        trigger(target, key); // 触发更新

        return res; // proxy中set方法需要有返回值
      },
      get: function get(target, key, receiver) {
        var res = Reflect.get(target, key, receiver); // target[key]

        track(target, key); // 依赖收集  只有当我在页面中取值时 才会做依赖收集

        return res;
      }
    }); // p.a.b.c.d.e
  } // { map
  //     {name:'zf',age:10}:{
  // 	// map 
  // 	name: [effect,effect]  set
  //     }
  // }
  // Dep

  var targetMap = new WeakMap();

  function track(target, key) {
    // target key 多个effect
    var depsMap = targetMap.get(target);

    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }

    var deps = depsMap.get(key);

    if (!deps) {
      depsMap.set(key, deps = new Set());
    }

    if (activeEffect && !deps.has(activeEffect)) {
      // set中有get set  has
      deps.add(activeEffect);
    }
  }

  function trigger(target, key) {
    var depsMap = targetMap.get(target);
    if (!depsMap) return;
    var effects = depsMap.get(key);
    effects && effects.forEach(function (effect) {
      return effect();
    });
  } // 依赖收集要确定的是 某个属性变了 要更新，而不是整个对象 一个属性要收集对应的effect

  function render(vnode, container) {
    // vue2 渲染页面用的方法叫patch
    // 1.初次渲染 2.dom-diff
    patch(container._vnode, vnode, container);
    container._vnode = vnode; // 上一次渲染的虚拟节点
  }
  /**
   * @param {*} n1  老的虚拟节点
   * @param {*} n2  新的虚拟节点
   * @param {*} container  容器
   */

  function patch(n1, n2, container, anchor) {
    // 后续diff时可以执行此方法
    // 组件的虚拟节点 tag是一个对象
    // 如果是组件的话 tag 可能是一个对象
    if (typeof n2.tag == 'string') {
      // 标签
      processElement(n1, n2, container, anchor); // 1） 初次渲染 2） diff操作
    } else if (_typeof(n2.tag) == 'object') {
      // 组件
      mountComponent(n2, container);
    }
  }

  function processElement(n1, n2, container, anchor) {
    if (n1 == null) {
      //初次渲染
      mountElement(n2, container, anchor);
    } else {
      patchElement(n1, n2);
    }
  }

  function patchElement(n1, n2, container) {
    // 看一下 n1 和 n2 是否一样。。。。  考虑key 不考虑没有key的情况
    var el = n2.el = n1.el; // 节点一样就复用

    var oldProps = n1.props;
    var newProps = n2.props;
    patchProps(el, oldProps, newProps); // 比对元素中的孩子

    patchChildren(n1, n2, el);
  }

  function patchChildren(n1, n2, container) {
    var c1 = n1.children;
    var c2 = n2.children; // 可能有多个儿子  另一方没儿子

    if (typeof c2 == 'string') {
      if (c1 !== c2) {
        // 直接用问题替换
        nodeOps.hostSetElementText(container, c2);
      }
    } else {
      // c2 是数组
      if (typeof c1 == 'string') {
        // 先删除c1 中原有内容 插入新内容
        nodeOps.hostSetElementText(container, '');
        mountChildren(c2, container);
      } else {
        patchKeyedChildren(c1, c2, container);
      }
    } // 相反
    // 两方都有儿子

  }

  function patchKeyedChildren(c1, c2, container) {
    // key的比较
    var e1 = c1.length - 1; // 老的最后一项的索引

    var e2 = c2.length - 1; // 新的最后一项的索引
    // 内部有优化 头头比较   尾尾比较  头尾  尾头

    var keyedToNewIndexMap = new Map(); // 1.根据新节点 生成一个key =》 index的映射表

    for (var i = 0; i <= e2; i++) {
      var currentEle = c2[i]; // 拿到这一项

      keyedToNewIndexMap.set(currentEle.props.key, i);
    } // 2.去老的里面找 看看有没有对应的  如果有一样的就复用


    var newIndexToOldIndexMap = new Array(e2 + 1); // [-1,-1,-1,-1]

    for (var _i = 0; _i <= e2; _i++) {
      newIndexToOldIndexMap[_i] = -1;
    }

    for (var _i2 = 0; _i2 <= e1; _i2++) {
      var oldVnode = c1[_i2]; // 新的索引

      var newIndex = keyedToNewIndexMap.get(oldVnode.props.key);

      if (newIndex == undefined) {
        // 老的有新的没有
        nodeOps.remove(oldVnode.el); // 删除老节点
      } else {
        // 复用 并且比对属性  因为在算法内部没有考虑值为0的情况
        newIndexToOldIndexMap[newIndex] = _i2 + 1; // [0,1,-1,-1]

        patch(oldVnode, c2[newIndex], container); // 递归 比较儿子和标签属性

        console.log(newIndexToOldIndexMap);
      }
    }

    var sequence = getSequence(newIndexToOldIndexMap); // 

    var j = sequence.length - 1; // 获取最后的索引
    // 以上方法仅仅是比对和删除无用节点 没有移动操作
    // 这里我们从后往前插入

    for (var _i3 = e2; _i3 >= 0; _i3--) {
      var _currentEle = c2[_i3];
      var anchor = _i3 + 1 <= e2 ? c2[_i3 + 1].el : null; // 有种可能新的比老的多 有可能新的比老的多 [A,B,C,D] [A,B]

      if (newIndexToOldIndexMap[_i3] === -1) {
        // 这是一个新元素 需要插入到列表中
        patch(null, _currentEle, container, anchor); // 插入到某个人的前面，而不是放到容器的后面
      } else {
        // 先将d扔到页面中
        // 根据最长递增子序列 来确定不需要移动的元素，直接跳过即可
        if (_i3 == sequence[j]) {
          // A B C D 
          j--;
        } else {
          // 获取不需要移动的 最长个数   
          nodeOps.insert(_currentEle.el, container, anchor);
        }
      }
    } // 3.新的比老的多 添加  老的比新的多就删除
    // 4.两个人key一样 比较属性，移动

  }

  function getSequence(arr) {
    // 最长递增子序列的索引
    var p = arr.slice();
    var result = [0];
    var i, j, u, v, c;
    var len = arr.length;

    for (i = 0; i < len; i++) {
      var arrI = arr[i];

      if (arrI !== 0) {
        j = result[result.length - 1];

        if (arr[j] < arrI) {
          p[i] = j;
          result.push(i);
          continue;
        }

        u = 0;
        v = result.length - 1;

        while (u < v) {
          c = (u + v) / 2 | 0;

          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }

        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1];
          }

          result[u] = i;
        }
      }
    }

    u = result.length;
    v = result[u - 1];

    while (u-- > 0) {
      result[u] = v;
      v = p[v];
    }

    return result;
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      // 比较属性
      // 1.将新的属性 全部设置 以新的为准
      for (var key in newProps) {
        var p = oldProps[key];
        var n = newProps[key];

        if (n !== p) {
          // 老的和新的不一样 以新的为准
          nodeOps.hostPatchProps(el, key, p, n);
        }
      } // 2.老的里面有的  新的没有 需要删掉


      for (var _key in oldProps) {
        if (!newProps.hasOwnProperty(_key)) {
          // 如果老的里面多的得删除掉
          nodeOps.hostPatchProps(el, _key, oldProps[_key], null);
        }
      }
    }
  }

  function mountComponent(vnode, container) {
    // 根据组件创建一个实例
    var instance = {
      vnode: vnode,
      render: null,
      // 当前setup的返回值
      subTree: null //render方法的返回的结果

    };
    var Component = vnode.tag;
    instance.render = Component.setup(vnode.props, instance); // 每个组件都有一个effect 用于局部重新渲染

    effect(function () {
      // 如果返回的是对象  template =》 render方法 把render方法在挂载到对象上
      // 这里可以做vue2 兼容 拿到vue2中的options API 和setup的返回值
      instance.subTree = instance.render && instance.render();
      patch(null, instance.subTree, container); // 将组件插入到容器中
    });
  }

  function mountElement(vnode, container, anchor) {
    var tag = vnode.tag,
        children = vnode.children,
        props = vnode.props; // 将虚拟节点和真实节点 创造映射关系

    var el = vnode.el = nodeOps.createElement(tag);

    if (props) {
      // 将当前属性赋予给当前el
      for (var key in props) {
        nodeOps.hostPatchProps(el, key, {}, props[key]);
      }
    }

    if (Array.isArray(children)) {
      mountChildren(children, el);
    } else {
      nodeOps.hostSetElementText(el, children);
    }

    nodeOps.insert(el, container, anchor);
  }

  function mountChildren(children, container) {
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      patch(null, child, container); // 递归挂载孩子节点
    }
  }

  exports.effect = effect;
  exports.reactive = reactive;
  exports.render = render;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue.js.map
