// 我的文章
// https://www.yuque.com/ruochuan12/bssbzg/ci77ui

const co = gen => {
    return new Promise((resolve, reject) => {
        function next(data) {
            let { value, done } = gen.next(data);
            if (done) {
                resolve(value);
            } else {
                Promise.resolve(value).then(next, reject);
            }
        }
        next(); // 这里需要自执行一次，然后不断递归调用
    })
}