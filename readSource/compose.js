function compose (middleware) {

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
      return dispatch(0)
      function dispatch (i) {

        // 也是错误处理
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = middleware[i]

        // 如果是最后一个，那么这个函数就是next方法，也就是第一个执行的
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve()
        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }