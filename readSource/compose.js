function compose(middleware) {

  // 如果中间件不是数组并且数组中的项不是函数就报错
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1 // 一个闭包的当前下标值
    const dispatch = (i) => {
      index = i;
      let fn = middleware[i];
      // if (!fn) return; // 递归的终止，因为i超出了中间件的数量
      if (i === middleware.length) { // 说明是最后一个函数
        fn = next;
      }
      return fn(context, dispatch(i + 1))
    }

    return dispatch(0)
    function dispatch(i) {

      // 也是错误处理
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]

      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve() // 因为是undefined 所以递归终止了
      // 如果是最后一个，那么fn其实是undefined
      try {
        return fn(context, dispatch.bind(null, /* 下一个函数的下标 */i + 1))
      } catch (err) {
        return err
      }
    }
  }
}


function reduceCompose(...fns) {
  return fns.reduce((a, b) => {
    return function (...args) {
      return a(b(...args));
    }
  });
}