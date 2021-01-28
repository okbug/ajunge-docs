Promise.all = function(promises /* Array */) {
  return new Promise((resolve, reject) => {
    const arr = []
    let count = 0;
    const isPromise = v => typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function'
    promises.forEach((p, index) => {
      if(isPromise(p)) {
        p.then(resolve,reject)
      }else {
        resolve(p)
      }
      count++
      if(++count === promises.length) {
        resolve(arr)
      }
    })
  })
}

function all(promises) {
  return new jPromise((resolve,reject)=>{
      // 异步：并发 使用for循环迭代执行 和串行 就是回调，一个任务是下一个任务的前提
      // 遍历数组，依次拿到结果
      let arr = []
      let index = 0;
      const processData = (key,data) => {
          arr[key] = data
          if(++index === promises.length) {
              resolve(arr)
          }
      }
      for(let i=0;i<promises.length;i++) {
          let result = promises[i];
          if(isPromise(result)) {
              result.then((data)=>{
                  processData(i,data)
              },reject)
          }else {
              // 如果这个result不是promise那么直接返回它。
              processData(i,result)
          }
      }
  })
}