(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // 拿到数组原型上的方法 （原来的方法）
  var oldArrayProtoMethods = Array.prototype; // 继承一下   ES5的方法

  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // this就是observer里的value
      // 当调用数组我们劫持后的这7个方法 页面应该更新 
      // 我要知道数组对应哪个dep
      var result = oldArrayProtoMethods[method].apply(this, args);
      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push': // arr.push({a:1},{b:2})

        case 'unshift':
          //这两个方法都是追加 追加的内容可能是对象类型，应该被再次进行劫持
          inserted = args;
          break;

        case 'splice':
          // vue.$set原理
          inserted = args.slice(2);
      }

      if (inserted) ob.observeArray(inserted); // 给数组新增的值也要进行观测

      ob.dep.notify(); // 通知数组更新

      return result;
    };
  });

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      // vm.a
      get: function get() {
        return vm[data][key]; // vm._data.a
      },
      set: function set(newValue) {
        // vm.a = 100;
        vm[data][key] = newValue; // vm._data.a = 100;
      }
    });
  }
  function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      // 不能被枚举，不能被循环出来
      configurable: false,
      value: value
    });
  }
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];
  var strats = {};

  strats.data = function (parentVal, childValue) {
    return childValue; // 这里应该有合并data的策略
  }; // strats.computed = function() {}
  // strats.watch = function() {}


  function mergeHook(parentVal, childValue) {
    // 生命周期的合并
    if (childValue) {
      if (parentVal) {
        return parentVal.concat(childValue); // 爸爸和儿子进行拼接
      } else {
        return [childValue]; //儿子需要转化成数组
      }
    } else {
      return parentVal; // 不合并了 采用父亲的
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  function mergeOptions(parent, child) {
    // 遍历父亲 ，可能是父亲有 儿子没有 
    var options = {};

    for (var key in parent) {
      // 父亲和儿子都有在这就处理了
      mergeField(key);
    } // 儿子有父亲没有 在这处理


    for (var _key in child) {
      // 将儿子多的赋予到父亲上
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      // 合并字段
      // 根据key 不同的策略来进行合并 
      if (strats[key]) {
        options[key] = strats[key](parent[key], child[key]);
      } else {
        // todo默认合并
        options[key] = child[key];
      }
    }

    return options;
  }
  var callbacks = [];
  var pending = false;

  function flushCallbacks() {
    while (callbacks.length) {
      var cb = callbacks.shift();
      cb();
    } // 让nextTick中传入的方法依次执行


    pending = false; // 标识已经执行完毕
  }

  var timerFunc;

  if (Promise) {
    timerFunc = function timerFunc() {
      Promise.resolve().then(flushCallbacks); // 异步处理更新
    };
  } else if (MutationObserver) {
    // 可以监控dom变化,监控完毕后是异步更新
    var observe = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(1); // 先创建一个文本节点

    observe.observe(textNode, {
      characterData: true
    }); // 观测文本节点中的内容

    timerFunc = function timerFunc() {
      textNode.textContent = 2; // 文中的内容改成2
    };
  } else if (setImmediate) {
    timerFunc = function timerFunc() {
      setImmediate(flushCallbacks);
    };
  } else {
    timerFunc = function timerFunc() {
      setTimeout(flushCallbacks);
    };
  }

  function nextTick(cb) {
    // 因为内部会调用nextTick 用户也会调用，但是异步只需要一次
    callbacks.push(cb);

    if (!pending) {
      // vue3 里的nextTick原理就是promise.then 没有做兼容性处理了
      timerFunc(); // 这个方法是异步方法 做了兼容处理了

      pending = true;
    }
  }

  var id = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.subs = [];
      this.id = id++;
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 我们希望 watcher 可以存放dep 
        Dep.target.addDep(this); // 实现双向记忆的，让watcher记住dep的同时 ，让dep 也记住watcher
        // this.subs.push(Dep.target);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null; // 静态属性 就一份

  function pushTarget(watcher) {
    Dep.target = watcher; // 保留watcher
  }
  function popTarget() {
    Dep.target = null; // 将变量删除掉
  }
  // dep 可以存多个watcher    
  // 一个watcher可以对应多个dep

  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);

      this.dep = new Dep(); // value ={}  value = []
      // 使用defineProperty 重新定义属性
      // 判断一个对象是否被观测过看他有没有 __ob__这个属性

      defineProperty(value, '__ob__', this);

      if (Array.isArray(value)) {
        // 我希望调用push shift unshift splice sort reverse pop
        value.__proto__ = arrayMethods;
        this.observeArray(value); // 数组中普通类型是不做观测的
      } else {
        this.walk(value);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(value) {
        value.forEach(function (item) {
          observe$1(item); // 观测数组中的对象类型
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); // 获取对象的key

        keys.forEach(function (key) {
          defineReactive(data, key, data[key]); // Vue.util.defineReactive
        });
      }
    }]);

    return Observer;
  }(); // 封装 继承


  function defineReactive(data, key, value) {
    // 获取到数组对应的dep
    var childDep = observe$1(value); // 如果值是对象类型在进行观测

    var dep = new Dep(); // 每个属性都有一个dep 
    // 当页面取值时 说明这个值用来渲染了，将这个watcher和这个属性对应起来

    Object.defineProperty(data, key, {
      get: function get() {
        // 依赖收集
        if (Dep.target) {
          // 让这个属性记住这个watcher
          dep.depend();

          if (childDep) {
            // 可能是数组可能是对象
            // 默认给数组增加了一个dep属性，当对数组这个对象取值的时候
            childDep.dep.depend(); // 数组存起来了这个渲染watcher
          }
        }

        return value;
      },
      set: function set(newValue) {
        // 依赖更新
        if (newValue === value) return;
        observe$1(newValue); // 如果用户将值改为对象继续监控

        value = newValue;
        dep.notify(); // 异步更新 防止频繁操作
      }
    }); // 数组的更新 去重  优化  组件渲染
  }

  function observe$1(data) {
    // typeof null 也是object
    // 不能不是对象 并且不是null
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    if (data.__ob__) {
      return data;
    }

    return new Observer(data); // 只观测存在的属性 data:{a:1,b:2} 
    // 数组中更改索引和长度 无法被监控
    // vm.a = {a:1}
  }

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    // vm.$watch
    // vm实例
    // exprOrFn  vm._update(vm._render())
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.exprOrFn = exprOrFn;
      this.cb = cb;
      this.options = options;
      this.user = options.user; // 这是一个用户watcher

      this.id = id$1++; // watcher的唯一标识

      this.deps = []; // watcher记录有多少dep依赖他

      this.depsId = new Set();

      if (typeof exprOrFn == 'function') {
        this.getter = exprOrFn;
      } else {
        this.getter = function () {
          // exprOrFn 可能传递过来的是一个字符串a
          // 当去当前实例上取值时 才会触发依赖收集
          var path = exprOrFn.split('.'); // ['a','a','a']

          var obj = vm;

          for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]]; // vm.a   // vm.a.a
          }

          return obj;
        };
      } // 默认会先调用一次get方法 ，进行取值 将结果保留下来


      this.value = this.get(); // 默认会调用get方法 
    }

    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }
    }, {
      key: "get",
      value: function get() {
        // Dep.target = watcher
        pushTarget(this); // 当前watcher实例

        var result = this.getter(); // 调用exprOrFn  渲染页面 取值（执行了get方法）  render方法 with(vm){_v(msg)}

        popTarget(); //渲染完成后 将watcher删掉了

        return result;
      }
    }, {
      key: "run",
      value: function run() {
        var newValue = this.get(); // 渲染逻辑

        var oldValue = this.value;
        this.value = newValue; // 更新一下老值

        if (this.user) {
          this.cb.call(this.vm, newValue, oldValue);
        }
      }
    }, {
      key: "update",
      value: function update() {
        // 这里不要每次都调用get方法 get方法会重新渲染页面
        queueWatcher(this); // 暂存的概念
        //this.get(); // 重新渲染
      }
    }]);

    return Watcher;
  }();

  var queue = []; // 将需要批量更新的watcher 存到一个队列中，稍后让watcher执行

  var has = {};
  var pending$1 = false;

  function flushSchedulerQueue() {
    queue.forEach(function (watcher) {
      watcher.run();

      if (!watcher.user) {
        watcher.cb();
      }
    });
    queue = [];
    has = {};
    pending$1 = false;
  }

  function queueWatcher(watcher) {
    var id = watcher.id; // 对watcher进行去重

    if (has[id] == null) {
      queue.push(watcher); // 并且将watcher存到队列中

      has[id] = true; // 等待所有同步代码执行完毕后在执行

      if (!pending$1) {
        // 如果还没清空队列，就不要在开定时器了  防抖处理 
        nextTick(flushSchedulerQueue);
        pending$1 = true;
      }
    }
  }
  // 1.是想把这个渲染watcher 放到了Dep.target属性上
  // 2.开始渲染 取值会调用get方法,需要让这个属性的dep 存储当前的watcher
  // 3.页面上所需要的属性都会将这个watcher存在自己的dep中
  // 4.等会属性更新了 就重新调用渲染逻辑 通知自己存储的watcher来更新

  function initState(vm) {
    // vm.$options
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) {
      initWatch(vm);
    }
  }

  function initData(vm) {
    // 数据的初始化操作
    var data = vm.$options.data; // vm._data 保存用户的所有的data

    vm._data = data = typeof data == 'function' ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe$1(data); // 让这个对象重新定义set 和 get
  }

  function initWatch(vm) {
    var watch = vm.$options.watch;

    var _loop = function _loop(key) {
      var handler = watch[key]; // handler可能是 

      if (Array.isArray(handler)) {
        // 数组 、
        handler.forEach(function (handle) {
          createWatcher(vm, key, handle);
        });
      } else {
        createWatcher(vm, key, handler); // 字符串 、 对象 、 函数
      }
    };

    for (var key in watch) {
      _loop(key);
    }
  }

  function createWatcher(vm, exprOrFn, handler, options) {
    // options 可以用来标识 是用户watcher
    if (_typeof(handler) == 'object') {
      options = handler;
      handler = handler.handler; // 是一个函数
    }

    if (typeof handler == 'string') {
      handler = vm[handler]; // 将实例的方法作为handler
    } // key handler 用户传入的选项


    return vm.$watch(exprOrFn, handler, options);
  }

  function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
      nextTick(cb);
    };

    Vue.prototype.$watch = function (exprOrFn, cb) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // 数据应该依赖这个watcher  数据变化后应该让watcher从新执行
      var watcher = new Watcher(this, exprOrFn, cb, _objectSpread2(_objectSpread2({}, options), {}, {
        user: true
      }));

      if (options.immediate) {
        cb(); // 如果是immdiate应该立刻执行
      }
    };
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名
  // ?:匹配不捕获

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // </my:xx>

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的    aaa="aaa"  a='aaa'   a=aaa

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >    >   <div></div>  <br/>

  function parseHTML(html) {
    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        // 标签名
        type: 1,
        // 元素类型
        children: [],
        // 孩子列表
        attrs: attrs,
        // 属性集合
        parent: null // 父元素

      };
    }

    var root;
    var currentParent;
    var stack = [];

    function start(tagName, attrs) {
      // 创建一个元素 作为根元素
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element; // 当前解析的标签 保存起来

      stack.push(element); // 将生产的ast元素放到栈中
    } // <div> <p></p> hello</div>    currentParent=p


    function end(tagName) {
      // 在结尾标签处 创建父子关系
      var element = stack.pop(); // 取出栈中的最后一个

      currentParent = stack[stack.length - 1];

      if (currentParent) {
        // 在闭合时可以知道这个标签的父亲是谁
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      text = text.trim();

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    }

    while (html) {
      // 只要html不为空字符串就一直解析
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        // 肯定是标签
        var startTagMatch = parseStartTag(); // 开始标签匹配的结果 处理开始

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          // 处理结束标签
          advance(endTagMatch[0].length);
          end(endTagMatch[1]); // 将结束标签传入 

          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        // 是处理文本
        text = html.substring(0, textEnd);
      }

      if (text) {
        // 处理文本
        advance(text.length);
        chars(text);
      }
    }

    function advance(n) {
      // 将字符串进行截取操作 在更新html内容
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 删除开始标签
        // 如果直接是闭合标签了 说明没有属性

        var _end, attr; // 不是结尾标签 能匹配到属性


        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length); // 去掉当前属性
        }

        if (_end) {
          // >  删除匹配到的结束标签
          advance(_end[0].length);
          return match;
        }
      }
    }

    return root;
  }

  // 编写<div id="app" style="color:red"> hello {{name}} <span>hello</span></div>
  // 结果:render(){
  //    return _c('div',{id:'app',style:{color:'red'}},_v('hello'+_s(name)),_c('span',null,_v('hello')))
  //}
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //  语法层面的转义

  function genProps(attrs) {
    //  id   "app"     / style  "fontSize:12px;color:red"
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          var obj = {}; // 对样式进行特殊的处理 

          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(node) {
    if (node.type == 1) {
      return generate(node); // 生产元素节点的字符串
    } else {
      var text = node.text; // 获取文本
      // 如果是普通文本 不带{{}}

      if (!defaultTagRE.test(text)) {
        return "_v(".concat(JSON.stringify(text), ")"); // _v('hello {{ name }} world {{msg}} aa')   => _v('hello'+_s(name) +'world' + _s(msg))
      }

      var tokens = []; // 存放每一段的代码

      var lastIndex = defaultTagRE.lastIndex = 0; // 如果正则是全局模式 需要每次使用前置为0

      var match, index; // 每次匹配到的结果

      while (match = defaultTagRE.exec(text)) {
        index = match.index; // 保存匹配到的索引

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      // 将所有转化后的儿子用逗号拼接起来
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }

  function generate(el) {
    var children = genChildren(el); // 儿子的生成

    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  //  <div id="app">hello {{name}} <span>world</span> <p></p></div>
  function compileToFunctions(template) {
    // html模板 => render函数  (ast是用来描述代码的)
    // 1.需要将html代码转化成"ast"语法树 可以用ast树来描述语言本身
    // 前端必须要掌握的数据结构 (树)
    var ast = parseHTML(template); // 2.优化静态节点
    // 3.通过这课树 重新的生成代码

    var code = generate(ast); // 4.将字符串变成函数 限制取值范围 通过with来进行取值 稍后调用render函数就可以通过改变this 让这个函数内部取到结果了

    var render = new Function("with(this){return ".concat(code, "}"));
    return render;
  }

  function patch(oldVnode, vnode) {
    // oldVnode => id#app   vnode 我们根据模板产生的虚拟dom
    // 将虚拟节点转化成真实节点
    var el = createElm(vnode); // 产生真实的dom 

    var parentElm = oldVnode.parentNode; // 获取老的app的父亲 =》 body

    parentElm.insertBefore(el, oldVnode.nextSibling); // 当前的真实元素插入到app的后面

    parentElm.removeChild(oldVnode); // 删除老的节点

    return el;
  }

  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text;

    if (typeof tag == 'string') {
      // 创建元素 放到vnode.el上
      vnode.el = document.createElement(tag); // 只有元素才有属性

      updateProperties(vnode);
      children.forEach(function (child) {
        // 遍历儿子 将儿子渲染后的结果扔到父亲中
        vnode.el.appendChild(createElm(child));
      });
    } else {
      // 创建文件 放到vnode.el上
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  } // vue 的渲染流程 =》 先初始化数据 =》 将模板进行编译 =》 render函数 =》 生成虚拟节点 =》 生成真实的dom  =》 扔到页面上


  function updateProperties(vnode) {
    var el = vnode.el;
    var newProps = vnode.data || {};

    for (var key in newProps) {
      if (key == 'style') {
        // {color:red}
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key == 'class') {
        el.className = el["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this; // 用新的创建的元素 替换老的vm.$el

      vm.$el = patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    vm.$el = el; // 调用render方法去渲染 el属性
    // 先调用render方法创建虚拟节点，在将虚拟节点渲染到页面上

    callHook(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      vm._update(vm._render()); // 渲染 、 更新

    }; // 这个watcher是用于渲染的 目前没有任何功能  updateComponent()
    // 初始化就会创建watcher


    var watcher = new Watcher(vm, updateComponent, function () {
      callHook(vm, 'updated');
    }, true); // 渲染watcher 只是个名字
    // 要把属性 和 watcher绑定在一起 

    callHook(vm, 'mounted');
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook]; // vm.$options.created  = [a1,a2,a3]

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm); // 更改生命周期中的this
      }
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options); // 需要将用户自定义的options 和全局的options做合并

      callHook(vm, 'beforeCreate');
      initState(vm); // 初始化状态

      callHook(vm, 'created');

      if (vm.$options.el) {
        // 挂载的逻辑
        vm.$mount(vm.$options.el);
      }
    }; // 1.render 2.template 3.外部template  （el存在的时候）


    Vue.prototype.$mount = function (el) {
      // 挂载操作
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        } // template => render方法
        // 1.处理模板变为ast树 2.标记静态节点 3.codegen=>return 字符串 4.new Function + with (render函数)


        var render = compileToFunctions(template);
        options.render = render;
      } // 渲染时用的都是这个render方法
      // 需要挂载这个组件


      mountComponent(vm, el);
    };
  }

  function renderMixin(Vue) {
    // 用对象来描述dom的解构
    Vue.prototype._c = function () {
      // 创建虚拟dom元素
      return createElement.apply(void 0, arguments);
    }; // 1.当结果是对象时 会对这个对象取值


    Vue.prototype._s = function (val) {
      // stringify
      return val == null ? '' : _typeof(val) == 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._v = function (text) {
      // 创建虚拟dom文本元素
      return createTextVnode(text);
    };

    Vue.prototype._render = function () {
      // _render = render
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };
  } // _c('div',{},_v(),_c())

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, data.key, children);
  }

  function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  } // 用来产生虚拟dom的,操作真实dom浪费性能


  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function initGlobalApi(Vue) {
    Vue.options = {}; // Vue.components Vue.diretive 

    Vue.mixin = function (mixin) {
      // 合并对象  （我先考虑生命周期） 不考虑其他的合并 data computed watch
      this.options = mergeOptions(this.options, mixin);
    }; // Vue.options, options
    // 用户 new Vue({created(){}})

  }

  // es6的类的写法 一个整体

  function Vue(options) {
    this._init(options); // 组件初始化的入口

  } // 原型方法


  initMixin(Vue); // init方法

  lifecycleMixin(Vue); // _update

  renderMixin(Vue); // _render

  stateMixin(Vue); // 静态方法 Vue.component Vue.directive Vue.extend Vue.mixin ...

  initGlobalApi(Vue); // 初始化方法

  return Vue;

})));
//# sourceMappingURL=vue.js.map
