/**
 * sages 采用 Generator 函数来 yield Effects（包含指令的文本对象）
 * 为什么选择使用Generator 
 * Generator 函数的作用是可以暂停执行，再次执行的时候从上次暂停的地方继续执行
 * Effect 是一个简单的JS对象，该对象包含了一些给 middleware 解释执行的信息。
 * 
 */
function* gen() {
    yield { type: 'PUT', action: { type: 'ADD' } };//指令对象 PUT 向仓库派发一个动作{ type: 'ADD' }
    yield { type: 'PUT', action: { type: 'MINUS' } }
}

//结束了
/**
 * saga的本质原理就 这样的一个run函数，它可以自动把生成器函数执行完毕
 * @param {*} gen 
 */
function run(gen) {
    let it = gen();
    function next() {
        let { value: effect, done } = it.next();
        if (!done) {
            if (effect instanceof Promise) {
                effect.then(() => {
                    next();
                });
            } else if (effect.type === 'PUT') {
                console.log('如果type=PUT，就需要向仓库派发动作', effect.action);//store.dispatch(action);
                next();
            }
        }

    }
    next();
}
run(gen);

/* let it = gen();
it.next();
it.next();
it.next(); */